import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  getCountFromServer,
  Timestamp,
  Query,
} from 'firebase/firestore';

export type Subscriber = {
  id: string;
  fullName: string;
  email: string;
  status: string;
  createdAt: Date;
};

// Function to get only the count
export async function getSubscribersCount(status?: 'subscribed' | 'unsubscribed') {
  const subscribersCollectionRef = collection(db, 'subscribers');
  let q;
  if (status) {
    q = query(subscribersCollectionRef, where('status', '==', status));
  } else {
    q = query(subscribersCollectionRef);
  }
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
}

// Updated function to handle dynamic sorting
export async function getSubscribersPaginated(
  status?: 'subscribed' | 'unsubscribed',
  lastVisible?: QueryDocumentSnapshot<DocumentData>,
  limitSize: number = 10,
  sortBy: string = 'createdAt', // Default sort
  orderDir: 'asc' | 'desc' = 'desc' // Default direction
) {
  try {
    const subscribersCollectionRef = collection(db, 'subscribers');
    
    let q: Query<DocumentData> = query(subscribersCollectionRef);

    // Apply filter
    if (status) {
      q = query(q, where('status', '==', status));
    }
    
    // Apply sorting
    q = query(q, orderBy(sortBy, orderDir));

    // Apply pagination
    if (lastVisible) {
      q = query(q, startAfter(lastVisible));
    }
    q = query(q, limit(limitSize));

    const querySnapshot = await getDocs(q);

    const subscribers: Subscriber[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Subscriber[];

    return {
      subscribers,
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1],
    };
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return { subscribers: [], lastVisible: null };
  }
}

// Function to get dashboard statistics
export async function getSubscriberStats() {
  // ... this function remains the same ...
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