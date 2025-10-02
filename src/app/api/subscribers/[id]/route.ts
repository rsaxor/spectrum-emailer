import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, Timestamp, runTransaction, increment, FieldValue } from 'firebase/firestore';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Type is now a Promise
) {
  try {
    const { id } = await params; // Await the params here
    const docRef = doc(db, 'subscribers', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return NextResponse.json({ message: 'Subscriber not found.' }, { status: 404 });
    }
    
    const data = docSnap.data();
    return NextResponse.json({
        ...data,
        id: docSnap.id,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
    });

  } catch (error) {
    console.error('Get Subscriber API Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // Type is now a Promise
) {
  try {
    const { id } = await params; // Await the params here
    const body = await request.json();
    const { fullName, status } = body;

    if (!fullName || !status) {
        return NextResponse.json({ message: 'Full name and status are required.' }, { status: 400 });
    }

    const docRef = doc(db, 'subscribers', id);

    await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(docRef);
        if (!docSnap.exists()) throw new Error("Document does not exist!");
        
        const oldStatus = docSnap.data().status;
        // Only update counters if the status has actually changed
        if (oldStatus !== status) {
            const metadataRef = doc(db, 'metadata', 'subscribers');
            const updateData: Record<string, FieldValue> = {};
            if (status === 'subscribed') {
                updateData.subscribedCount = increment(1);
                updateData.unsubscribedCount = increment(-1);
            } else { // status === 'unsubscribed'
                updateData.subscribedCount = increment(-1);
                updateData.unsubscribedCount = increment(1);
            }
            transaction.update(metadataRef, updateData);
        }
        
        transaction.update(docRef, { fullName, status, updatedAt: Timestamp.now() });
    });

    return NextResponse.json({ message: 'Subscriber updated successfully.' });

  } catch (error) {
    console.error('Update Subscriber API Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}