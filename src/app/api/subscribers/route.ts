import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { getSubscribersPaginated } from '@/lib/subscriber.service';
import { doc, runTransaction, FieldValue, increment } from 'firebase/firestore';

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

    // FIX: Use transaction to atomically delete AND update metadata
    await runTransaction(db, async (transaction) => {
      // Step 1: Get all documents first to check their statuses
      const statusCounts: Record<string, number> = {
        subscribed: 0,
        unsubscribed: 0,
        pending: 0,
        test: 0,
      };

      const docRefs = ids.map(id => doc(db, 'subscribers', id));
      
      // Fetch all docs within transaction
      for (const docRef of docRefs) {
        const docSnap = await transaction.get(docRef);
        if (docSnap.exists()) {
          const status = docSnap.data().status;
          // FIX: Only count if status exists in our map
          if (status in statusCounts) {
            statusCounts[status]++;
          }
        }
      }

      // Step 2: Delete all documents
      for (const docRef of docRefs) {
        transaction.delete(docRef);
      }

      // Step 3: Update metadata with correct decrements
      const metadataRef = doc(db, 'metadata', 'subscribers');
      const updateData: Record<string, FieldValue> = {};

      if (statusCounts.subscribed > 0) {
        updateData.subscribedCount = increment(-statusCounts.subscribed);
      }
      if (statusCounts.unsubscribed > 0) {
        updateData.unsubscribedCount = increment(-statusCounts.unsubscribed);
      }
      if (statusCounts.pending > 0) {
        updateData.pendingCount = increment(-statusCounts.pending);
      }
      if (statusCounts.test > 0) {
        updateData.testCount = increment(-statusCounts.test);
      }

      // Only update if there are changes
      if (Object.keys(updateData).length > 0) {
        transaction.update(metadataRef, updateData);
      }
    });

    return NextResponse.json({ message: 'Subscribers deleted successfully.' });

  } catch (error) {
    console.error('Delete API Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}