import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from 'firebase/firestore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email } = body;

    if (!fullName || !email) {
      return NextResponse.json({ message: 'Name and email are required.' }, { status: 400 });
    }

    const subscribersRef = collection(db, 'subscribers');
    const q = query(subscribersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Email exists, so check its status
      const existingDoc = querySnapshot.docs[0];
      const existingData = existingDoc.data();

      if (existingData.status === 'unsubscribed') {
        // User is re-subscribing, so update their status
        await updateDoc(existingDoc.ref, {
          status: 'subscribed',
          updatedAt: Timestamp.now(),
        });
        return NextResponse.json({ message: 'Welcome back! You have been re-subscribed.' });
      } else {
        // User is already subscribed
        return NextResponse.json({ message: 'This email is already subscribed.' }, { status: 409 });
      }
    } else {
      // Email does not exist, so create a new subscriber
      await addDoc(subscribersRef, {
        fullName,
        email,
        status: 'subscribed',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      return NextResponse.json({ message: 'Subscription successful!' }, { status: 201 });
    }
  } catch (error) {
    console.error('Subscription API error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}