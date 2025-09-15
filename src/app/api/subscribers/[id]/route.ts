import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, updateDoc, Timestamp } from 'firebase/firestore';

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
    await updateDoc(docRef, {
      fullName,
      status,
      updatedAt: Timestamp.now(),
    });

    return NextResponse.json({ message: 'Subscriber updated successfully.' });

  } catch (error) {
    console.error('Update Subscriber API Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}