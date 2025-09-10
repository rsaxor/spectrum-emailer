import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, updateDoc, Timestamp } from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { id } = body; // The document ID of the subscriber

    if (!id) {
      return NextResponse.json({ message: 'Subscriber ID is required.' }, { status: 400 });
    }

    // Get a reference to the specific subscriber document
    const subscriberRef = doc(db, 'subscribers', id);

    // Update the document's status and updatedAt timestamp
    await updateDoc(subscriberRef, {
      status: 'unsubscribed',
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json({ message: 'You have been successfully unsubscribed.' });

  } catch (error) {
    console.error('Unsubscribe API error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}