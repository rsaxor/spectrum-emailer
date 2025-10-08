import { NextResponse } from 'next/server';
import { getDbAdmin } from '@/lib/firebase-admin';

export async function POST(request: Request) {
  const dbAdmin = getDbAdmin();

  const { templateName, subject, entity, sendStatus } = await request.json();

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
