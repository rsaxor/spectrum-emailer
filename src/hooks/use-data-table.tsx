'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { getSubscribersPaginated, getSubscribersCount, Subscriber, searchSubscribers } from '@/lib/subscriber.service';

const PAGE_SIZE = 10;

type SubscriberStatus = 'subscribed' | 'unsubscribed' | 'pending';

export function useDataTable() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCountLoading, setIsCountLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = searchParams.get('status') as SubscriberStatus | undefined;
  const currentPage = Math.max(Number(searchParams.get('page')) || 1, 1);
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const order = searchParams.get('order') === 'asc' ? 'asc' : 'desc';

  const fetchData = useCallback(
    async (
      page: number,
      currentStatus: SubscriberStatus | undefined,
      currentSortBy: string,
      currentOrder: 'asc' | 'desc',
      currentSearchQuery: string
    ) => {
      setIsLoading(true);
      setIsSearching(!!currentSearchQuery);

      try {
        // Calculate offset for pagination
        const offset = (page - 1) * PAGE_SIZE;

        let subscribers: Subscriber[];
        
        if (currentSearchQuery) {
          // Search mode: fetch ALL matching results from database and paginate client-side
          // FIX: Removed artificial limit - now searches entire database
          const { subscribers: allResults } = await searchSubscribers(
            currentSearchQuery,
            currentStatus,
            PAGE_SIZE, // This is the page size we'll display
            currentSortBy,
            currentOrder
          );
          
          // Client-side pagination of ALL search results
          subscribers = allResults.slice(offset, offset + PAGE_SIZE);
        } else {
          // Normal mode: use server-side pagination
          const { subscribers: results } = await getSubscribersPaginated(
            currentStatus,
            undefined,
            PAGE_SIZE,
            currentSortBy,
            currentOrder
          );
          subscribers = results;
        }

        setSubscribers(subscribers);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching subscribers:', error);
        setSubscribers([]);
        setIsLoading(false);
      }
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
        const count = await getSubscribersCount(status);
        if (!isCancelled) {
          setTotalCount(count);

          // FIX: Simple page validation
          const maxPages = Math.ceil(count / PAGE_SIZE);
          if (currentPage > maxPages && maxPages > 0) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('page', String(maxPages));
            router.replace(`${pathname}?${params.toString()}`);
            return;
          }

          await fetchData(currentPage, status, sortBy, order, searchQuery);
        }
      } catch (error) {
        console.error('Failed to fetch subscribers:', error);
      } finally {
        if (!isCancelled) {
          setIsCountLoading(false);
        }
      }
    };

    execute();

    return () => {
      isCancelled = true;
    };
  }, [searchParams, isClient, fetchData, currentPage, status, sortBy, order, pathname, router, searchQuery]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (newSortBy: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentOrder = params.get('order') === 'asc' ? 'asc' : 'desc';

    if (params.get('sortBy') === newSortBy) {
      params.set('order', currentOrder === 'asc' ? 'desc' : 'asc');
    } else {
      params.set('sortBy', newSortBy);
      params.set('order', 'desc');
    }

    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSuccess = (newSubscriber: Subscriber) => {
    setSubscribers(prev => {
      const newList = [newSubscriber, ...prev];
      if (newList.length > PAGE_SIZE) {
        newList.pop();
      }
      return newList;
    });

    getSubscribersCount(status).then(count => {
      setTotalCount(count);
    });
  };

  const pageCount = Math.ceil(totalCount / PAGE_SIZE);
  const hasNextPage = currentPage < pageCount;
  const hasPrevPage = currentPage > 1;

  return {
    subscribers,
    isLoading,
    isCountLoading,
    isSearching,
    pageCount,
    currentPage,
    hasNextPage,
    hasPrevPage,
    sortBy,
    order,
    status,
    searchQuery,
    isClient,
    setIsLoading,
    handlePageChange,
    handleSortChange,
    handleSearchChange,
    handleSuccess,
  };
}
