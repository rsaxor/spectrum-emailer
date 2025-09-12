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
      const existingDoc = querySnapshot.docs[0];
      const existingData = existingDoc.data();

      if (existingData.status === 'unsubscribed') {
        await updateDoc(existingDoc.ref, {
          status: 'subscribed',
          updatedAt: Timestamp.now(),
        });
        
        // Construct the full subscriber object to return
        const reSubscribedUser = {
            id: existingDoc.id,
            fullName: existingData.fullName,
            email: existingData.email,
            status: 'subscribed',
            createdAt: existingData.createdAt.toDate(), // Include createdAt
        };

        return NextResponse.json({ 
            message: 'Welcome back! You have been re-subscribed.',
            newSubscriber: reSubscribedUser
        });
      } else {
        return NextResponse.json({ message: 'This email is already subscribed.' }, { status: 409 });
      }
    } else {
      const newSubscriberData = {
        fullName,
        email,
        status: 'subscribed' as 'subscribed' | 'unsubscribed',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };
      const docRef = await addDoc(subscribersRef, newSubscriberData);

      return NextResponse.json({ 
        message: 'Subscription successful!',
        newSubscriber: {
          id: docRef.id,
          fullName: newSubscriberData.fullName,
          email: newSubscriberData.email,
          status: newSubscriberData.status,
          createdAt: newSubscriberData.createdAt.toDate()
        }
      }, { status: 201 });
    }
  } catch (error) {
    console.error('Subscription API error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}