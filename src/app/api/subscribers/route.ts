import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { getSubscribersPaginated } from '@/lib/subscriber.service';
import { doc, writeBatch } from 'firebase/firestore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'subscribed' | 'unsubscribed' | 'pending' |undefined;

    const { subscribers } = await getSubscribersPaginated(status);

    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Failed to fetch subscribers' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { ids } = body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ message: 'Subscriber IDs are required.' }, { status: 400 });
    }

    const batch = writeBatch(db);
    ids.forEach((id: string) => {
      const docRef = doc(db, 'subscribers', id);
      batch.delete(docRef);
    });

    await batch.commit();

    return NextResponse.json({ message: 'Subscribers deleted successfully.' });

  } catch (error) {
    console.error('Delete API Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}