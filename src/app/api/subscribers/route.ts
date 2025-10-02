import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { getSubscribersPaginated } from '@/lib/subscriber.service';
import { doc, runTransaction, getDoc, increment } from 'firebase/firestore';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'subscribed' | 'unsubscribed' | 'pending' | undefined;

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

    await runTransaction(db, async (transaction) => {
      let subscribedToDelete = 0;
      let unsubscribedToDelete = 0;
      let pendingToDelete = 0;

      // First, get all the documents to check their status before deleting
      for (const id of ids) {
        const docRef = doc(db, 'subscribers', id);
        const docSnap = await transaction.get(docRef);
        if (docSnap.exists()) {
          const status = docSnap.data().status;
          if (status === 'subscribed') subscribedToDelete++;
          else if (status === 'unsubscribed') unsubscribedToDelete++;
          else if (status === 'pending') pendingToDelete++;
        }
      }

      // Now, perform all the deletes
      ids.forEach((id: string) => {
        const docRef = doc(db, 'subscribers', id);
        transaction.delete(docRef);
      });

      // Finally, update the metadata counters
      const metadataRef = doc(db, 'metadata', 'subscribers');
      transaction.update(metadataRef, {
        subscribedCount: increment(-subscribedToDelete),
        unsubscribedCount: increment(-unsubscribedToDelete),
        pendingCount: increment(-pendingToDelete),
      });
    });

    return NextResponse.json({ message: 'Subscribers deleted successfully.' });

  } catch (error) {
    console.error('Delete API Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}