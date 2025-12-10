import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, query, where, getDocs, Timestamp, doc, increment, runTransaction } from 'firebase/firestore';

if (!process.env.NEXT_PUBLIC_BASE_URL) {
  throw new Error("Missing NEXT_PUBLIC_BASE_URL");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, entity } = body;

    if (!fullName || !email) {
      return NextResponse.json({ message: 'Name and email are required.' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    type EntityKey = keyof typeof entities;

    const entities = {
      TCC: {
        text: 'The Card Co.',
        img: 'tcc.png',
      },
      Spectrum: {
        text: 'Spectrum Sustainable Print',
        img: 'spectrum.png',
      },
      HOS: {
        text: 'House of Spectrum',
        img: 'hos.png',
      },
      All: {
        text: 'Spectrum Sustainable Print',
        img: 'all.png',
      },
    } as const;

    const fallbackEntity: EntityKey = 'Spectrum';
    const currentEntity: EntityKey = (entity && (entity in entities ? entity : fallbackEntity)) as EntityKey;

    const subscribersRef = collection(db, 'subscribers');
    const q = query(subscribersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    let newSubscriber;
    let message = '';
    let status = 200;

    if (!querySnapshot.empty) {
      const existingDoc = querySnapshot.docs[0];
      const existingData = existingDoc.data();
      if (existingData.status === 'unsubscribed') {
        await runTransaction(db, async (transaction) => {
          const metadataRef = doc(db, 'metadata', 'subscribers');
          transaction.update(existingDoc.ref, { status: 'subscribed', updatedAt: Timestamp.now(), entity: currentEntity });
          transaction.update(metadataRef, { subscribedCount: increment(1), unsubscribedCount: increment(-1) });
        });
        newSubscriber = { id: existingDoc.id, ...existingData, status: 'subscribed', createdAt: existingData.createdAt.toDate() };
        message = 'Welcome back! Subscriber has been re-subscribed.';
      } else {
        return NextResponse.json({ message: 'This email is already subscribed.' }, { status: 409 });
      }
    } else {
      const newSubscriberData = {
        fullName, 
        email, 
        status: 'subscribed' as const,
        createdAt: Timestamp.now(), 
        updatedAt: Timestamp.now(),
      };
      
      const docRef = await addDoc(subscribersRef, newSubscriberData);

      await runTransaction(db, async (transaction) => {
        transaction.set(docRef, newSubscriberData);
        const metadataRef = doc(db, 'metadata', 'subscribers');
        transaction.update(metadataRef, { subscribedCount: increment(1) });
      });
      
      newSubscriber = { id: docRef.id, ...newSubscriberData, createdAt: newSubscriberData.createdAt.toDate() };
      message = 'Subscriber added successfully!';
      status = 201;
    }

    return NextResponse.json({ message, newSubscriber }, { status });

  } catch (error) {
    console.error('Admin subscribe API error:', error);
    return NextResponse.json(
      { message: 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
