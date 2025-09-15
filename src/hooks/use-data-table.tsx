'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { getSubscribersPaginated, getSubscribersCount, Subscriber } from '@/lib/subscriber.service';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

const PAGE_SIZE = 10;

export function useDataTable() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = searchParams.get('status') as 'subscribed' | 'unsubscribed' | undefined;
  const currentPage = Number(searchParams.get('page')) || 1;
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const order = searchParams.get('order') || 'desc';

  const pageCursors = useMemo(() => new Map<number, QueryDocumentSnapshot<DocumentData> | null>([[1, null]]), []);

  const fetchDataForPage = useCallback(async (page: number, currentStatus?: typeof status, currentSortBy?: string, currentOrder?: string) => {
    setIsLoading(true);

    // This block correctly fetches intermediate cursors when jumping pages
    if (page > 1 && !pageCursors.has(page)) {
      for (let i = 2; i <= page; i++) {
        if (!pageCursors.has(i)) {
          const prevPageCursor = pageCursors.get(i - 1);
          const { lastVisible } = await getSubscribersPaginated(
            currentStatus, prevPageCursor || undefined, PAGE_SIZE, currentSortBy, currentOrder as 'asc' | 'desc'
          );
          if (lastVisible) {
            pageCursors.set(i, lastVisible);
          } else {
            break;
          }
        }
      }
    }

    const lastVisible = pageCursors.get(page) || undefined;
    const { subscribers: newSubscribers, lastVisible: newLastVisible } = await getSubscribersPaginated(
      currentStatus, lastVisible, PAGE_SIZE, currentSortBy, currentOrder as 'asc' | 'desc'
    );
    
    setSubscribers(newSubscribers);
    if (newLastVisible) {
      pageCursors.set(page + 1, newLastVisible);
    }
    setIsLoading(false);
  }, [pageCursors]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // This single, robust useEffect handles all data fetching
  useEffect(() => {
    if (!isClient) return;
    
    const execute = async () => {
      await getSubscribersCount(status).then(count => {
        setPageCount(Math.ceil(count / PAGE_SIZE));
      });
      await fetchDataForPage(currentPage, status, sortBy, order);
    };
    
    execute();
    
  }, [searchParams, isClient, fetchDataForPage]); // Depend on searchParams directly

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (newSortBy: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentOrder = params.get('order') || 'desc';
    if (params.get('sortBy') === newSortBy) {
      params.set('order', currentOrder === 'desc' ? 'asc' : 'desc');
    } else {
      params.set('sortBy', newSortBy);
      params.set('order', 'desc');
    }
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  // This function correctly navigates to page 1 to trigger a full refresh
  const handleSuccess = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    // Add a random query param to ensure searchParams changes, forcing the useEffect to run
    params.set('refreshId', Math.random().toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    subscribers,
    isLoading,
    pageCount,
    setPageCount,
    currentPage,
    sortBy,
    order,
    status,
    isClient,
    handlePageChange,
    handleSortChange,
    handleSuccess,
  };
}