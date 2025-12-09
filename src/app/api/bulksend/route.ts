import { NextResponse } from 'next/server';
import { getDbAdmin } from '@/lib/firebase-admin';
import { getSubscribersCount } from '@/lib/subscriber.service';

export async function POST(request: Request) {
  const dbAdmin = getDbAdmin();

  const { templateName, subject, entity, sendStatus } = await request.json();

  if (!templateName || !subject || !entity || !sendStatus) {
    return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
  }

  try {
    // FIX STEP 1: Count subscribers BEFORE creating job
    const totalSubscribers = await getSubscribersCount(sendStatus);

    if (totalSubscribers === 0) {
      return NextResponse.json(
        { message: 'No subscribers found for this status.' },
        { status: 400 }
      );
    }

    const job = {
      templateName,
      subject,
      entity,
      sendStatus,
      status: 'pending',
      totalSubscribers, // ✅ Set IMMEDIATELY with actual count
      sentCount: 0,
      lastProcessedIndex: 0,
      createdAt: new Date(),
    };

    const jobRef = await dbAdmin.collection('newsletterJobs').add(job);

    return NextResponse.json({
      message: 'Job queued successfully.',
      jobId: jobRef.id,
      totalSubscribers, // Return count to client for early display
    });
  } catch (error) {
    console.error('Bulksend API error:', error);
    return NextResponse.json(
      { message: 'Failed to create job.' },
      { status: 500 }
    );
  }
}
