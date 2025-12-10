'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { getSubscribersPaginated, getSubscribersCount, Subscriber, searchSubscribers } from '@/lib/subscriber.service';

const PAGE_SIZE = 10;

type SubscriberStatus = 'subscribed' | 'unsubscribed' | 'pending';

// FIX: Cache for count results to avoid repeated queries
const countCache = new Map<string, { value: number; timestamp: number }>();
const CACHE_TTL = 5000; // 5 seconds

export function useDataTable() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCountLoading, setIsCountLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  
  // FIX: Store pagination cursors for each page
  const cursorsRef = useRef<Map<number, any>>(new Map());

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = searchParams.get('status') as SubscriberStatus | undefined;
  const currentPage = Math.max(Number(searchParams.get('page')) || 1, 1);
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const order = searchParams.get('order') === 'asc' ? 'asc' : 'desc';

  // FIX: Cached count fetch with TTL
  const getCachedCount = useCallback(async (filterStatus?: SubscriberStatus): Promise<number> => {
    const cacheKey = filterStatus || 'all';
    const cached = countCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.value;
    }

    const count = await getSubscribersCount(filterStatus);
    countCache.set(cacheKey, { value: count, timestamp: Date.now() });
    return count;
  }, []);

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
        let subscribers: Subscriber[];
        let searchResultCount = 0;
        
        if (currentSearchQuery) {
          // Search mode: fetch ALL matching results
          const { subscribers: allResults } = await searchSubscribers(
            currentSearchQuery,
            currentStatus,
            PAGE_SIZE,
            currentSortBy,
            currentOrder
          );
          
          searchResultCount = allResults.length;
          subscribers = allResults.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
          setTotalCount(searchResultCount);
        } else {
          // FIX: Normal mode - use cursor-based pagination properly
          // Get cursor for previous page
          const previousPageCursor = page > 1 ? cursorsRef.current.get(page - 1) : null;
          
          const { subscribers: results, lastVisible } = await getSubscribersPaginated(
            currentStatus,
            previousPageCursor,
            PAGE_SIZE,
            currentSortBy,
            currentOrder
          );
          
          // FIX: Store cursor for next pagination
          if (lastVisible) {
            cursorsRef.current.set(page, lastVisible);
          }
          
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
        // FIX: Only fetch count for non-search queries
        if (!searchParams.get('q')) {
          const count = await getCachedCount(status);
          
          if (!isCancelled) {
            setTotalCount(count);

            // FIX: Validate page number only when not searching
            const maxPages = Math.ceil(count / PAGE_SIZE);
            if (currentPage > maxPages && maxPages > 0) {
              const params = new URLSearchParams(searchParams.toString());
              params.set('page', String(maxPages));
              router.replace(`${pathname}?${params.toString()}`);
              return;
            }
          }
        }

        await fetchData(currentPage, status, sortBy, order, searchParams.get('q') || '');
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
  }, [searchParams, isClient, fetchData, currentPage, status, sortBy, order, pathname, router, getCachedCount]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSortChange = (newSortBy: string) => {
    // FIX: Clear cursor cache when sorting changes
    cursorsRef.current.clear();
    
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
    // FIX: Clear cursor cache when searching
    cursorsRef.current.clear();
    
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

    // FIX: Invalidate cache on new subscriber
    countCache.clear();
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
