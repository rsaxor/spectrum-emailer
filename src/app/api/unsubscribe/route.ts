import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, Timestamp, runTransaction, increment } from 'firebase/firestore';
import { Resend } from 'resend';
import fs from 'fs/promises';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_EMAIL_ACCT || !process.env.NEWSLETTER_EMAIL) {
  throw new Error("Missing defined environment variables");
}
const resendAcct: string = process.env.RESEND_EMAIL_ACCT;
const newsletterEmailAdrs: string = process.env.NEWSLETTER_EMAIL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id, entity } = body;

    if (!id) {
      return NextResponse.json({ message: 'Subscriber ID is required.' }, { status: 400 });
    }

    const subscriberRef = doc(db, 'subscribers', id);
    const docSnap = await getDoc(subscriberRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ message: 'Subscriber not found.' }, { status: 404 });
    }
    const subscriberData = docSnap.data();

    await runTransaction(db, async (transaction) => {
        const metadataRef = doc(db, 'metadata', 'subscribers');
        transaction.update(subscriberRef, { status: 'unsubscribed', updatedAt: Timestamp.now() });
        transaction.update(metadataRef, { 
            subscribedCount: increment(-1),
            unsubscribedCount: increment(1) 
        });
    });

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

    const resubscribeLink = `${baseUrl}/subscribe?entity=${entity || 'Spectrum'}`;

    const templatePath = path.join(process.cwd(), 'emails', 'goodbye-unsubscribe.html');
    let htmlBody = await fs.readFile(templatePath, 'utf8');

    htmlBody = htmlBody
      .replace(/{{fullName}}/g, subscriberData.fullName)
      .replace(/{{entity}}/g, entityText)
      .replace(/{{entityImg}}/g, entityImgFile)
      .replace(/{{resubscribe}}/g, resubscribeLink);

    if (process.env.NODE_ENV === 'development') {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: resendAcct,
        subject: 'Unsubscribe Confirmation (Test)',
        html: htmlBody,
      });
    } else {
      const senderName = entity || 'Spectrum';
      const fromAddress = `${senderName} <${newsletterEmailAdrs}>`;
      await resend.emails.send({
        from: fromAddress,
        to: subscriberData.email,
        subject: 'You have been unsubscribed',
        html: htmlBody,
      });
    }

    return NextResponse.json({ message: 'You have been successfully unsubscribed.' });

  } catch (error) {
    console.error('Unsubscribe API error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}