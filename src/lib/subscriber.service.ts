import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  orderBy,
} from 'firebase/firestore';

// Define a type for our subscriber data for better type-safety
export type Subscriber = {
  id: string;
  fullName: string;
  email: string;
  status: string;
  createdAt: Date;
};

// Service function to get a list of all subscribers with optional filtering
export async function getAllSubscribers(status?: string): Promise<Subscriber[]> {
  try {
    const subscribersCollectionRef = collection(db, 'subscribers');
    
    let q;
    // If a valid status is provided, add a 'where' clause to the query
    if (status && (status === 'subscribed' || status === 'unsubscribed')) {
      q = query(
        subscribersCollectionRef, 
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
    } else {
      // Otherwise, fetch all subscribers
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

// Service function to get dashboard statistics
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