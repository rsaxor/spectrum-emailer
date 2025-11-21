import { db } from '@/lib/firebase';
import {
  collection,
  doc,
  getDoc,
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
export async function getSubscribersCount(status?: 'subscribed' | 'unsubscribed' | 'pending' | 'test') {
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
  status?: 'subscribed' | 'unsubscribed' | 'pending' | 'test',
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

export async function getSubscriberStats() {
  try {
    const subscribersCollectionRef = collection(db, 'subscribers');
    
    const activeSubscribersQuery = query(
      subscribersCollectionRef,
      where('status', '==', 'subscribed')
    );
    const activeSnapshot = await getCountFromServer(activeSubscribersQuery);
    const totalSubscribers = activeSnapshot.data().count;

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);
    const thirtyDaysAgoTimestamp = Timestamp.fromDate(thirtyDaysAgo);

    const newSubscribersQuery = query(
      subscribersCollectionRef,
      where('status', '==', 'subscribed'),
      where('createdAt', '>=', thirtyDaysAgoTimestamp)
    );
    const newSnapshot = await getCountFromServer(newSubscribersQuery);
    const newSubscribers = newSnapshot.data().count;

    return { totalSubscribers, newSubscribers };
  } catch (error) {
    console.error("Error fetching subscriber stats:", error);
    return { totalSubscribers: 0, newSubscribers: 0 };
  }
}

export async function getSubscriberById(id: string): Promise<Subscriber | null> {
  try {
    const docRef = doc(db, 'subscribers', id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }
    
    const data = docSnap.data();
    return {
      id: docSnap.id,
      fullName: data.fullName,
      email: data.email,
      status: data.status,
      createdAt: data.createdAt.toDate(),
    };
  } catch (error) {
    console.error("Error fetching subscriber by ID:", error);
    return null;
  }
}

// Function to get all counts
export async function getSubscriberCounts() {
  const metadataRef = doc(db, 'metadata', 'subscribers');
  const docSnap = await getDoc(metadataRef);
  
  if (!docSnap.exists()) {
    return { subscribedCount: 0, unsubscribedCount: 0, pendingCount: 0, testCount: 0};
  }
  
  const data = docSnap.data();
  return {
    subscribedCount: data.subscribedCount || 0,
    unsubscribedCount: data.unsubscribedCount || 0,
    pendingCount: data.pendingCount || 0,
    testCount: data.testCount || 0,
  };
}
