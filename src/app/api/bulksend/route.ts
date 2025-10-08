import { NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  const { templateName, subject, entity, sendStatus } = await request.json();

  // Access env variables here, not at top-level
  const newsletterEmailAdrs = process.env.NEWSLETTER_EMAIL!;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  if (!templateName || !subject || !entity || !sendStatus) {
    return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
  }

  const job = {
    templateName,
    subject,
    entity,
    sendStatus,
    status: 'pending',
    totalSubscribers: 0,
    sentCount: 0,
    createdAt: new Date(),
  };

  const jobRef = await dbAdmin.collection('newsletterJobs').add(job);

  return NextResponse.json({
    message: 'Job queued successfully.',
    jobId: jobRef.id,
  });
}
