import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Resend } from 'resend';
import fs from 'fs/promises';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type Subscriber = {
  id: string;
  fullName: string;
  email: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Get entity from the request body
    const { templateName, subject, entity } = body; 

    if (!templateName || !subject || !entity) {
      return NextResponse.json({ message: 'Template name, subject, and entity are required.' }, { status: 400 });
    }
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const templatePath = path.join(process.cwd(), 'public', 'emails', templateName);
    const htmlBody = await fs.readFile(templatePath, 'utf8');
    
    // Determine the sender name
    const senderName = entity === 'All' ? 'Spectrum' : entity;
    const fromAddress = `${senderName} Newsletter <newsletter@emailer.spectrumdubai.com>`;
    
    if (process.env.NODE_ENV === 'development') {
      // DEVELOPMENT MODE
      const yourSignupEmail = 'ralph@spectrumdubai.com';
      const testUnsubscribeLink = `${baseUrl}/unsubscribe?id=test-id`;
      let personalizedHtml = htmlBody.replace('{{fullName}}', 'Test User');
      personalizedHtml = personalizedHtml.replace('{{unsubscribeLink}}', testUnsubscribeLink);

      const { error } = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: yourSignupEmail,
        subject: `[TEST ${entity}] ${subject}`,
        html: personalizedHtml,
      });
      
      if (error) throw new Error('Failed to send test email.');
      return NextResponse.json({ message: `Test email sent to ${yourSignupEmail}` });

    } else {
      // PRODUCTION MODE
      const subscribersRef = collection(db, 'subscribers');
      const q = query(subscribersRef, where('status', '==', 'subscribed'));
      const querySnapshot = await getDocs(q);
      
      const subscribers: Subscriber[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Subscriber[];

      if (subscribers.length === 0) {
        return NextResponse.json({ message: 'No subscribers to send to.' }, { status: 400 });
      }

      for (const subscriber of subscribers) {
        const unsubscribeLink = `${baseUrl}/unsubscribe?id=${subscriber.id}`;
        
        let personalizedHtml = htmlBody.replace('{{fullName}}', subscriber.fullName);
        personalizedHtml = personalizedHtml.replace('{{unsubscribeLink}}', unsubscribeLink);

        const { error } = await resend.emails.send({
          from: fromAddress,
          to: subscriber.email,
          subject: subject,
          html: personalizedHtml,
        });

        if (error) {
          console.error(`Failed to send to ${subscriber.email}:`, error);
        } else {
          console.log(`Successfully sent to ${subscriber.email}`);
        }
        
        await sleep(300);
      }
      return NextResponse.json({ message: `Newsletter sent to ${subscribers.length} subscribers!` });
    }

  } catch (error) {
    console.error('Send API Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}