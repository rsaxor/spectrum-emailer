import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Resend } from 'resend';
import fs from 'fs/promises';
import path from 'path';
import { escapeHtml } from '@/lib/sanitize';

const resend = new Resend(process.env.RESEND_API_KEY);

if (!process.env.RESEND_EMAIL_ACCT || !process.env.NEWSLETTER_EMAIL) {
  throw new Error("missing defined variables");
}
const resendAcct: string = process.env.RESEND_EMAIL_ACCT;
const newsletterEmailAdrs: string = process.env.NEWSLETTER_EMAIL;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type Subscriber = {
  id: string;
  fullName: string;
  email: string;
};

export async function POST(request: Request) {
  const body = await request.json();
  const { templateName, subject, entity, sendStatus } = body;

  if (!templateName || !subject || !entity || !sendStatus) {
    return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const templatePath = path.join(process.cwd(), 'netlify', 'functions', 'send-newsletters-batch', 'emails', templateName);
        
        // FIX: Validate template exists before reading
        let htmlBody: string;
        try {
          htmlBody = await fs.readFile(templatePath, 'utf8');
        } catch (fileErr) {
          console.error(`Template file not found: ${templatePath}`, fileErr);
          controller.enqueue(encoder.encode(`data: {"message": "Template '${templateName}' not found.", "error": true, "done": true}\n\n`));
          controller.close();
          return;
        }

        const liveUrl = baseUrl === 'https://emailer.spectrumdubai.com' ? baseUrl! : process.env.LIVE_URL!;
        const resubscribeLink = `${baseUrl}/subscribe`;

        if (process.env.NODE_ENV === 'development') {
          // --- DEVELOPMENT MODE (with streaming) ---
          const totalSubscribers = 5; // Simulate a list of 5 subscribers for the progress bar

          for (let count = 1; count <= totalSubscribers; count++) {
            const progressMessage = `data: {"message": "Sending TEST ${count} of ${totalSubscribers}...", "count": ${count}, "total": ${totalSubscribers}}\n\n`;
            controller.enqueue(encoder.encode(progressMessage));
            await sleep(500); // Simulate the delay
          }

          // Send one final, actual email at the end of the simulation
          const testUnsubscribeLink = `${liveUrl}/unsubscribe?id=test-id`;
          let personalizedHtml = htmlBody.replace(/{{fullName}}/g, escapeHtml('Test User'));
          personalizedHtml = personalizedHtml.replace(/{{unsubscribeLink}}/g, testUnsubscribeLink);
          personalizedHtml = personalizedHtml.replace(/{{resubscribe}}/g, resubscribeLink);
          personalizedHtml = personalizedHtml.replace(/{{host}}/g, liveUrl);
          
          await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: resendAcct,
            subject: `[TEST ${entity}] ${subject}`,
            html: personalizedHtml,
          });

        } else {
          // --- PRODUCTION MODE (with streaming) ---
          const subscribersRef = collection(db, 'subscribers');
          const q = query(subscribersRef, where('status', '==', sendStatus));
          const querySnapshot = await getDocs(q);
          const subscribers: Subscriber[] = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Subscriber[];
          const totalSubscribers = subscribers.length;

          if (totalSubscribers === 0) {
            controller.enqueue(encoder.encode(`data: {"message": "No subscribers to send to.", "done": true}\n\n`));
            controller.close();
            return;
          }

          const senderName = entity === 'All' ? 'Spectrum' : entity;
          const fromAddress = `${senderName} Newsletter <${newsletterEmailAdrs}>`;

          // Create a batch of personalized emails
          const emailBatch = subscribers.map(subscriber => {
            const unsubscribeLink = `${liveUrl}/unsubscribe?id=${subscriber.id}`;
            // FIX: Escape HTML in personalizations
            let personalizedHtml = htmlBody.replace(/{{fullName}}/g, escapeHtml(subscriber.fullName));
            personalizedHtml = personalizedHtml.replace(/{{unsubscribeLink}}/g, unsubscribeLink);
            personalizedHtml = personalizedHtml.replace(/{{resubscribe}}/g, resubscribeLink);
            personalizedHtml = personalizedHtml.replace(/{{host}}/g, liveUrl);

            return {
              from: fromAddress,
              to: subscriber.email,
              subject: subject,
              html: personalizedHtml,
            };
          });

          // Send the entire batch in a single API call
          await resend.batch.send(emailBatch);

          const progressMessage = `data: {"message": "Sent to ${totalSubscribers} subscribers...", "count": ${totalSubscribers}, "total": ${totalSubscribers}}\n\n`;
          controller.enqueue(encoder.encode(progressMessage));
        }

        // Signal completion for both modes
        controller.enqueue(encoder.encode(`data: {"message": "Finished sending!", "done": true}\n\n`));
        controller.close();

      } catch (error) {
        console.error('Send API Error:', error);
        controller.enqueue(encoder.encode(`data: {"message": "An error occurred.", "error": true, "done": true}\n\n`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
  });
}