import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, runTransaction } from 'firebase/firestore';

export async function DELETE() {
  try {
    const subscribersRef = collection(db, 'subscribers');
    const querySnapshot = await getDocs(subscribersRef);

    if (querySnapshot.empty) {
      return NextResponse.json({ message: 'No subscribers to delete.' });
    }

    await runTransaction(db, async (transaction) => {
      querySnapshot.docs.forEach(doc => {
        transaction.delete(doc.ref);
      });

      const metadataRef = doc(db, 'metadata', 'subscribers');
      transaction.set(metadataRef, { 
        subscribedCount: 0, 
        unsubscribedCount: 0,
        pendingCount: 0
      });
    });

    return NextResponse.json({ message: 'All subscribers have been deleted.' });
  } catch (error) {
    console.error('Delete All API Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}