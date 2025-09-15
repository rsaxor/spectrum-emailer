import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, writeBatch } from 'firebase/firestore';

export async function DELETE() {
  try {
    const subscribersRef = collection(db, 'subscribers');
    const querySnapshot = await getDocs(subscribersRef);

    if (querySnapshot.empty) {
      return NextResponse.json({ message: 'No subscribers to delete.' });
    }

    // Firestore can only delete up to 500 documents in a single batch
    const batch = writeBatch(db);
    querySnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    return NextResponse.json({ message: 'All subscribers have been deleted.' });
  } catch (error) {
    console.error('Delete All API Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}