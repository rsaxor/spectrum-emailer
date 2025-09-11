import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
  Query, // Import Query type
  DocumentData, // Import DocumentData type
} from 'firebase/firestore';

export type Subscriber = {
  id: string;
  fullName: string;
  email: string;
  status: string;
  createdAt: Date;
};

// This function now fetches based on the status prop
export async function getSubscribersByStatus(status?: string): Promise<Subscriber[]> {
  try {
    const subscribersCollectionRef = collection(db, 'subscribers');
    let q;
    if (status === 'subscribed' || status === 'unsubscribed') {
      q = query(subscribersCollectionRef, where('status', '==', status), orderBy('createdAt', 'desc'));
    } else {
      // Default to all
      q = query(subscribersCollectionRef, orderBy('createdAt', 'desc'));
    }
    const querySnapshot = await getDocs(q);
    // ... mapping logic remains the same
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Subscriber[];
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return [];
  }
}

export async function getSubscriberStats() {
  try {
    const subscribersCollectionRef = collection(db, 'subscribers');

    const activeSubscribersQuery = query(
      subscribersCollectionRef,
      where('status', '==', 'subscribed')
    );
    const activeSnapshot = await getDocs(activeSubscribersQuery);
    const totalSubscribers = activeSnapshot.size;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);
    const thirtyDaysAgoTimestamp = Timestamp.fromDate(thirtyDaysAgo);

    const newSubscribersQuery = query(
      subscribersCollectionRef,
      where('status', '==', 'subscribed'),
      where('createdAt', '>=', thirtyDaysAgoTimestamp)
    );
    const newSnapshot = await getDocs(newSubscribersQuery);
    const newSubscribers = newSnapshot.size;

    return { totalSubscribers, newSubscribers };
  } catch (error) {
    console.error("Error fetching subscriber stats:", error);
    return { totalSubscribers: 0, newSubscribers: 0 };
  }
}