import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, query, where, getDocs, Timestamp, doc, increment, runTransaction } from 'firebase/firestore';
import { Resend } from 'resend';
import fs from 'fs/promises';
import path from 'path';  

const resend = new Resend(process.env.RESEND_API_KEY!);

if (!process.env.RESEND_EMAIL_ACCT || !process.env.NEWSLETTER_EMAIL || !process.env.TURNSTILE_SECRET_KEY) {
  throw new Error("Missing defined environment variables");
}
const resendAcct: string = process.env.RESEND_EMAIL_ACCT;
const newsletterEmailAdrs: string = process.env.NEWSLETTER_EMAIL;
const turnstileSecretKey: string = process.env.TURNSTILE_SECRET_KEY;

async function verifyTurnstile(token: string) {
  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: turnstileSecretKey,
      response: token,
    }),
  });
  const data = await response.json();
  return data.success;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, entity, token } = body;

    if (!token || !(await verifyTurnstile(token))) {
        return NextResponse.json({ message: "Invalid CAPTCHA response." }, { status: 403 });
    }

    if (!fullName || !email) {
      return NextResponse.json({ message: 'Name and email are required.' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    type EntityKey = keyof typeof entities;

    const entities = {
      TCC: {
        text: 'The Card Co.',
        img: 'tcc.png',
      },
      Spectrum: {
        text: 'Spectrum Sustainable Print',
        img: 'spectrum.png',
      },
      HOS: {
        text: 'House of Spectrum',
        img: 'hos.png',
      },
      All: {
        text: 'Spectrum Sustainable Print',
        img: 'all.png',
      },
    } as const;

    const fallbackEntity: EntityKey = 'Spectrum';
    const currentEntity: EntityKey = (entity && (entity in entities ? entity : fallbackEntity)) as EntityKey;
    const { text: entityText, img: entityImgFile } = entities[currentEntity];

    const templatePath = path.join(process.cwd(), 'emails', 'spec0002.html');
    let htmlBody = await fs.readFile(templatePath, 'utf8');

    htmlBody = htmlBody
      .replace(/{{fullName}}/g, fullName)
      .replace(/{{entity}}/g, entityText)
      .replace(/{{entityImg}}/g, entityImgFile)
      .replace(/{{host}}/g, baseUrl);


    const subscribersRef = collection(db, 'subscribers');
    const q = query(subscribersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    let newSubscriber;
    let message = '';
    let status = 200;
    let finalHtml = '';

    if (!querySnapshot.empty) {
      const existingDoc = querySnapshot.docs[0];
      const existingData = existingDoc.data();
      if (existingData.status === 'unsubscribed') {
        await runTransaction(db, async (transaction) => {
          const metadataRef = doc(db, 'metadata', 'subscribers');
          transaction.update(existingDoc.ref, { status: 'subscribed', updatedAt: Timestamp.now(), entity: currentEntity });
          transaction.update(metadataRef, { subscribedCount: increment(1), unsubscribedCount: increment(-1) });
        });
        await updateDoc(existingDoc.ref, { status: 'subscribed', updatedAt: Timestamp.now() });
        const unsubscribeLink = `${baseUrl}/unsubscribe?id=${existingDoc.id}&entity=${entity}`;
        finalHtml = htmlBody.replace(/{{unsubscribeLink}}/g, unsubscribeLink);
        newSubscriber = { id: existingDoc.id, ...existingData, status: 'subscribed', createdAt: existingData.createdAt.toDate() };
        message = 'Welcome back! You have been re-subscribed.';
      } else {
        return NextResponse.json({ message: 'This email is already subscribed.' }, { status: 409 });
      }
    } else {
      const newSubscriberData = {
        fullName, email, status: 'subscribed' as const,
        createdAt: Timestamp.now(), updatedAt: Timestamp.now(),
      };
      
      const docRef = await addDoc(subscribersRef, newSubscriberData);

      await runTransaction(db, async (transaction) => {
        transaction.set(docRef, newSubscriberData);
        const metadataRef = doc(db, 'metadata', 'subscribers');
        transaction.update(metadataRef, { subscribedCount: increment(1) });
      });
      
      const unsubscribeLink = `${baseUrl}/unsubscribe?id=${docRef.id}&entity=${entity}`;
      finalHtml = htmlBody.replace(/{{unsubscribeLink}}/g, unsubscribeLink);
      newSubscriber = { id: docRef.id, ...newSubscriberData, createdAt: newSubscriberData.createdAt.toDate() };
      message = 'Success! You have been subscribed.';
      status = 201;
    }

    if (process.env.NODE_ENV === 'development') {
      const testFinalHtml = finalHtml.replace(/{{unsubscribeLink}}/g, `${baseUrl}/unsubscribe?id=test-id&entity=${entity}`);
      await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: resendAcct,
          subject: message.includes('Welcome back') ? `Welcome Back! (Test)` : `Welcome! (Test)`,
          html: testFinalHtml
      });
    } else {
      const senderName = currentEntity === 'All' ? 'Spectrum' : currentEntity;
      const fromAddress = `${senderName} <${newsletterEmailAdrs}>`;
      await resend.emails.send({
          from: fromAddress,
          to: email,
          subject: message.includes('Welcome back') ? 'Welcome Back!' : 'Welcome to Our Newsletter!',
          html: finalHtml
      });
    }

    return NextResponse.json({ message, newSubscriber }, { status });

  } catch (error) {
    console.error('Subscription API error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}