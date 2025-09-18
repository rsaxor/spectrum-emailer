import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';
import { Resend } from 'resend';
import fs from 'fs/promises';
import path from 'path';  

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_EMAIL_ACCT || !process.env.NEWSLETTER_EMAIL) {
  throw new Error("missing defined variables");
}
const resendAcct: string = process.env.RESEND_EMAIL_ACCT;
const newsletterEmailAdrs: string = process.env.NEWSLETTER_EMAIL;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, entity } = body;

    if (!fullName || !email) {
      return NextResponse.json({ message: 'Name and email are required.' }, { status: 400 });
    }

    const currentEntity = entity || 'Spectrum';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const entityMap = {
      TCC: 'The Card Co.',
      Spectrum: 'Spectrum Sustainable Print',
      HOS: 'House of Spectrum',
      All: 'Spectrum Sustainable Print'
    };
    const entityText = entityMap[currentEntity as keyof typeof entityMap] || 'Spectrum Sustainable Print';
    
    const templatePath = path.join(process.cwd(), 'public', 'emails', 'welcome-subscribers.html');
    let htmlBody = await fs.readFile(templatePath, 'utf8');
    htmlBody = htmlBody.replace(/{{fullName}}/g, fullName);
    htmlBody = htmlBody.replace(/{{entity}}/g, entityText);

    const subscribersRef = collection(db, 'subscribers');
    const q = query(subscribersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    let newSubscriber;
    let message = '';
    let status = 200;
    let finalHtml = '';

    // --- DATABASE LOGIC (runs in both dev and prod) ---
    if (!querySnapshot.empty) {
      const existingDoc = querySnapshot.docs[0];
      const existingData = existingDoc.data();
      if (existingData.status === 'unsubscribed') {
        await updateDoc(existingDoc.ref, { status: 'subscribed', updatedAt: Timestamp.now() });
        
        const unsubscribeLink = `${baseUrl}/unsubscribe?id=${existingDoc.id}`;
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
      
      const unsubscribeLink = `${baseUrl}/unsubscribe?id=${docRef.id}`;
      finalHtml = htmlBody.replace(/{{unsubscribeLink}}/g, unsubscribeLink);
      
      newSubscriber = { id: docRef.id, ...newSubscriberData, createdAt: newSubscriberData.createdAt.toDate() };
      message = 'Success! You have been subscribed.';
      status = 201;
    }

    // --- EMAIL SENDING LOGIC (switches based on environment) ---
    if (process.env.NODE_ENV === 'development') {
      const testUnsubscribeLink = `${baseUrl}/unsubscribe?id=test-id`;
      const testFinalHtml = finalHtml.replace(/{{unsubscribeLink}}/g, testUnsubscribeLink);
      await resend.emails.send({
          from: 'onboarding@resend.dev',
          to: resendAcct,
          subject: message.includes('Welcome back') ? `Welcome Back! (Local test for ${currentEntity})` : `Welcome to Our Newsletter!(Local test for ${currentEntity})`,
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