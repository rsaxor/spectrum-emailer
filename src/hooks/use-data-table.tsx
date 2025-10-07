'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { getSubscribersPaginated, getSubscribersCount, Subscriber } from '@/lib/subscriber.service';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

const PAGE_SIZE = 10;

type SubscriberStatus = 'subscribed' | 'unsubscribed' | 'pending';

export function useDataTable() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCountLoading, setIsCountLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = searchParams.get('status') as SubscriberStatus | undefined;
  const currentPage = Math.max(Number(searchParams.get('page')) || 1, 1);
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const order = searchParams.get('order') === 'asc' ? 'asc' : 'desc';

  // Use a ref to persist page cursors across renders and avoid re-initialization
  const pageCursorsRef = useRef(new Map<number, QueryDocumentSnapshot<DocumentData> | null>([[1, null]]));

  const fetchDataForPage = useCallback(
    async (
      page: number,
      currentStatus: SubscriberStatus | undefined,
      currentSortBy: string,
      currentOrder: 'asc' | 'desc'
    ) => {
      setIsLoading(true);

      const pageCursors = pageCursorsRef.current;

      // Build cursors for all intermediate pages if not already present
      if (page > 1 && !pageCursors.has(page)) {
        for (let i = 2; i <= page; i++) {
          if (!pageCursors.has(i)) {
            const prevCursor = pageCursors.get(i - 1);
            const { lastVisible } = await getSubscribersPaginated(
              currentStatus,
              prevCursor || undefined,
              PAGE_SIZE,
              currentSortBy,
              currentOrder
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
        currentStatus,
        lastVisible,
        PAGE_SIZE,
        currentSortBy,
        currentOrder
      );

      setSubscribers(newSubscribers);

      if (newLastVisible) {
        pageCursors.set(page + 1, newLastVisible);
      }

      setIsLoading(false);
    },
    []
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    let isCancelled = false;

    const execute = async () => {
      setIsCountLoading(true);
      setIsLoading(true);

      try {
        const totalCount = await getSubscribersCount(status);
        if (!isCancelled) {
          const totalPages = Math.ceil(totalCount / PAGE_SIZE);
          setPageCount(totalPages);

          // Prevent navigating to pages beyond the max
          if (currentPage > totalPages && totalPages > 0) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', String(totalPages));
            router.replace(`${pathname}?${params.toString()}`);
            return;
          }

          await fetchDataForPage(currentPage, status, sortBy, order);
        }
      } catch (error) {
        console.error('Failed to fetch subscribers:', error);
      } finally {
        if (!isCancelled) {
          setIsCountLoading(false);
          setIsLoading(false);
        }
      }
    };

    execute();

    return () => {
      isCancelled = true;
    };
  }, [searchParams, isClient, fetchDataForPage, currentPage, status, sortBy, order, pathname, router]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (newSortBy: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentOrder = params.get('order') === 'asc' ? 'asc' : 'desc';

    if (params.get('sortBy') === newSortBy) {
      // Toggle order
      params.set('order', currentOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // New sort field, reset to descending
      params.set('sortBy', newSortBy);
      params.set('order', 'desc');
    }

    // Reset to page 1
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSuccess = (newSubscriber: Subscriber) => {
    // Optimistically add to UI
    setSubscribers(prev => {
      const newList = [newSubscriber, ...prev];
      if (newList.length > PAGE_SIZE) {
        newList.pop(); // Keep page size consistent
      }
      return newList;
    });

    // Update total count
    getSubscribersCount(status).then(count => {
      setPageCount(Math.ceil(count / PAGE_SIZE));
    });
  };

  return {
    subscribers,
    isLoading,
    isCountLoading,
    pageCount,
    currentPage,
    sortBy,
    order,
    status,
    isClient,
    setIsLoading,
    handlePageChange,
    handleSortChange,
    handleSuccess,
  };
}
