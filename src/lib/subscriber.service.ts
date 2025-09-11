import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
  Query,
  DocumentData,
} from 'firebase/firestore';

export type Subscriber = {
  id: string;
  fullName: string;
  email: string;
  status: string;
  createdAt: Date;
};

export async function getSubscribersByStatus(
  status?: 'subscribed' | 'unsubscribed'
): Promise<Subscriber[]> {
  try {
    const subscribersCollectionRef = collection(db, 'subscribers');
    
    let q: Query<DocumentData>;

    // This is the corrected query logic
    if (status) {
      // If a status is provided, create a query that filters AND sorts
      q = query(
        subscribersCollectionRef,
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
    } else {
      // If no status is provided (for the "All" filter), create a query that only sorts
      q = query(subscribersCollectionRef, orderBy('createdAt', 'desc'));
    }

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        fullName: data.fullName,
        email: data.email,
        status: data.status,
        createdAt: data.createdAt.toDate(),
      };
    });
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