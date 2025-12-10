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

/**
 * Get the count of subscribers with optional status filter.
 * @param status - Optional subscriber status filter
 * @returns Promise resolving to subscriber count
 */
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

/**
 * Fetch paginated subscribers with sorting and filtering.
 * Uses cursor-based pagination for scalability (not offset-based).
 * @param status - Optional status filter
 * @param lastVisible - Cursor from previous page (for pagination)
 * @param limitSize - Number of results per page
 * @param sortBy - Field to sort by (default: createdAt)
 * @param orderDir - Sort direction (asc or desc, default: desc)
 * @returns Object with paginated subscribers and cursor for next page
 */
export async function getSubscribersPaginated(
  status?: 'subscribed' | 'unsubscribed' | 'pending' | 'test',
  lastVisible?: QueryDocumentSnapshot<DocumentData>,
  limitSize: number = 10,
  sortBy: string = 'createdAt', // Default sort
  orderDir: 'asc' | 'desc' = 'desc' // Default direction
) {
  try {
    const subscribersCollectionRef = collection(db, 'subscribers');
    
    // FIX: Build query efficiently with proper ordering
    let constraints: any[] = [];

    // Apply filter
    if (status) {
      constraints.push(where('status', '==', status));
    }
    
    // Apply sorting (MUST come before pagination)
    constraints.push(orderBy(sortBy, orderDir));

    // FIX: Apply pagination cursor AFTER orderBy
    if (lastVisible) {
      constraints.push(startAfter(lastVisible));
    }
    
    // Limit results
    constraints.push(limit(limitSize + 1)); // +1 to detect if there are more pages

    const q = query(subscribersCollectionRef, ...constraints);
    const querySnapshot = await getDocs(q);

    // FIX: Check if there are more results beyond the limit
    const hasMore = querySnapshot.docs.length > limitSize;
    const docsToReturn = hasMore ? querySnapshot.docs.slice(0, limitSize) : querySnapshot.docs;

    const subscribers: Subscriber[] = docsToReturn.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
    })) as Subscriber[];

    return {
      subscribers,
      lastVisible: docsToReturn[docsToReturn.length - 1],
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return { subscribers: [], lastVisible: null, hasMore: false };
  }
}

/**
 * Get subscriber statistics (total and new subscribers in last 30 days).
 * @returns Object with totalSubscribers and newSubscribers counts
 */
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

/**
 * Fetch a single subscriber by ID.
 * @param id - Subscriber document ID
 * @returns Subscriber object or null if not found
 */
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

/**
 * Get all subscriber count breakdowns by status.
 * Reads from metadata/subscribers document.
 * @returns Object with counts for each subscriber status
 */
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

/**
 * Search subscribers by fullName or email with pagination and sorting
 * Searches across ALL subscribers in the database, not just a subset
 * @param searchQuery - Search query to match against fullName and email
 * @param status - Optional status filter
 * @param limitSize - Number of results per page
 * @param sortBy - Field to sort by
 * @param orderDir - Sort direction
 * @returns Paginated search results and cursor for next page
 */
export async function searchSubscribers(
  searchQuery: string,
  status?: 'subscribed' | 'unsubscribed' | 'pending' | 'test',
  limitSize: number = 10,
  sortBy: string = 'createdAt',
  orderDir: 'asc' | 'desc' = 'desc'
) {
  try {
    const subscribersCollectionRef = collection(db, 'subscribers');
    
    // Build base query with filters
    let q: Query<DocumentData> = query(subscribersCollectionRef);

    if (status) {
      q = query(q, where('status', '==', status));
    }
    
    // FIX: Remove artificial limit - fetch ALL matching documents for search
    q = query(q, orderBy(sortBy, orderDir));

    const querySnapshot = await getDocs(q);

    // Client-side search filtering (case-insensitive partial match)
    // This now searches across ALL documents, not a limited subset
    const normalizedQuery = searchQuery.trim().toLowerCase();
    const filteredDocs = querySnapshot.docs.filter(doc => {
      const data = doc.data();
      const fullName = data.fullName?.toLowerCase() || '';
      const email = data.email?.toLowerCase() || '';
      
      return (
        fullName.includes(normalizedQuery) ||
        email.includes(normalizedQuery)
      );
    });

    // Return only the requested limit for this page
    const subscribers: Subscriber[] = filteredDocs
      .slice(0, limitSize)
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
      })) as Subscriber[];

    return {
      subscribers,
      lastVisible: filteredDocs[limitSize - 1] || querySnapshot.docs[querySnapshot.docs.length - 1],
      hasMore: filteredDocs.length > limitSize,
    };
  } catch (error) {
    console.error("Error searching subscribers:", error);
    return { subscribers: [], lastVisible: null, hasMore: false };
  }
}

/**
 * Get comprehensive subscriber statistics including breakdown by status
 * and new subscribers in last 30 days
 * @returns Object with detailed subscriber counts and trends
 */
export async function getComprehensiveStats() {
  try {
    const subscribersCollectionRef = collection(db, 'subscribers');
    
    // Get total counts by status
    const subscribedQuery = query(
      subscribersCollectionRef,
      where('status', '==', 'subscribed')
    );
    const subscribedSnapshot = await getCountFromServer(subscribedQuery);
    const subscribedCount = subscribedSnapshot.data().count;

    const unsubscribedQuery = query(
      subscribersCollectionRef,
      where('status', '==', 'unsubscribed')
    );
    const unsubscribedSnapshot = await getCountFromServer(unsubscribedQuery);
    const unsubscribedCount = unsubscribedSnapshot.data().count;

    const pendingQuery = query(
      subscribersCollectionRef,
      where('status', '==', 'pending')
    );
    const pendingSnapshot = await getCountFromServer(pendingQuery);
    const pendingCount = pendingSnapshot.data().count;

    const testQuery = query(
      subscribersCollectionRef,
      where('status', '==', 'test')
    );
    const testSnapshot = await getCountFromServer(testQuery);
    const testCount = testSnapshot.data().count;

    // Get new subscribers in last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    thirtyDaysAgo.setHours(0, 0, 0, 0);
    const thirtyDaysAgoTimestamp = Timestamp.fromDate(thirtyDaysAgo);

    const newSubscribedQuery = query(
      subscribersCollectionRef,
      where('status', '==', 'subscribed'),
      where('createdAt', '>=', thirtyDaysAgoTimestamp)
    );
    const newSubscribedSnapshot = await getCountFromServer(newSubscribedQuery);
    const newSubscribedCount = newSubscribedSnapshot.data().count;

    const newUnsubscribedQuery = query(
      subscribersCollectionRef,
      where('status', '==', 'unsubscribed'),
      where('createdAt', '>=', thirtyDaysAgoTimestamp)
    );
    const newUnsubscribedSnapshot = await getCountFromServer(newUnsubscribedQuery);
    const newUnsubscribedCount = newUnsubscribedSnapshot.data().count;

    const newPendingQuery = query(
      subscribersCollectionRef,
      where('status', '==', 'pending'),
      where('createdAt', '>=', thirtyDaysAgoTimestamp)
    );
    const newPendingSnapshot = await getCountFromServer(newPendingQuery);
    const newPendingCount = newPendingSnapshot.data().count;

    const totalCount = subscribedCount + unsubscribedCount + pendingCount + testCount;

    return {
      total: totalCount,
      byStatus: {
        subscribed: subscribedCount,
        unsubscribed: unsubscribedCount,
        pending: pendingCount,
        test: testCount,
      },
      last30Days: {
        subscribed: newSubscribedCount,
        unsubscribed: newUnsubscribedCount,
        pending: newPendingCount,
      },
      activeSubscribers: subscribedCount,
    };
  } catch (error) {
    console.error("Error fetching comprehensive stats:", error);
    return {
      total: 0,
      byStatus: {
        subscribed: 0,
        unsubscribed: 0,
        pending: 0,
        test: 0,
      },
      last30Days: {
        subscribed: 0,
        unsubscribed: 0,
        pending: 0,
      },
      activeSubscribers: 0,
    };
  }
}
