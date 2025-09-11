'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
} from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { getSubscribersPaginated, getSubscribersCount, Subscriber } from '@/lib/subscriber.service';
import { format } from 'date-fns';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

const PAGE_SIZE = 10;

function TableSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead><Skeleton className="h-5 bg-gray-500 w-24 animate-pulse" /></TableHead>
            <TableHead><Skeleton className="h-5 bg-gray-500 w-40 animate-pulse" /></TableHead>
            <TableHead><Skeleton className="h-5 bg-gray-500 w-20 animate-pulse" /></TableHead>
            <TableHead><Skeleton className="h-5 bg-gray-500 w-32 animate-pulse" /></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(PAGE_SIZE)].map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-5 bg-gray-500 w-32 animate-pulse" /></TableCell>
              <TableCell><Skeleton className="h-5 bg-gray-500 w-48 animate-pulse" /></TableCell>
              <TableCell><Skeleton className="h-5 bg-gray-500 w-24 animate-pulse" /></TableCell>
              <TableCell><Skeleton className="h-5 bg-gray-500 w-40 animate-pulse" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function SubscribersTable() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const status = searchParams.get('status') as 'subscribed' | 'unsubscribed' | undefined;
  const currentPage = Number(searchParams.get('page')) || 1;
  
  const pageCursors = useMemo(() => new Map<number, QueryDocumentSnapshot<DocumentData> | null>([[1, null]]), []);

  const fetchData = useCallback(async (page: number, currentStatus?: typeof status) => {
    setIsLoading(true);
    const lastVisible = pageCursors.get(page) || undefined;
    const { subscribers: newSubscribers, lastVisible: newLastVisible } = await getSubscribersPaginated(currentStatus, lastVisible, PAGE_SIZE);
    
    setSubscribers(newSubscribers);
    if (newLastVisible) {
        pageCursors.set(page + 1, newLastVisible);
    }
    setIsLoading(false);
  }, [pageCursors]);

  // Effect for setting total page count when filter changes
  useEffect(() => {
    getSubscribersCount(status).then(count => {
      setPageCount(Math.ceil(count / PAGE_SIZE));
    });
  }, [status]);

  // Effect to fetch page data when currentPage or status changes
  useEffect(() => {
    // Reset cursors and fetch from page 1 when filter changes
    if (currentPage === 1) {
      pageCursors.clear();
      pageCursors.set(1, null);
    }
    fetchData(currentPage, status);
  }, [currentPage, status, fetchData, pageCursors]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  const renderPaginationItems = () => {
    if (pageCount <= 1) return null;

    if (pageCount <= 7) {
      return [...Array(pageCount)].map((_, i) => (
        <PaginationItem key={i}>
          <PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }} isActive={currentPage === i + 1}>{i + 1}</PaginationLink>
        </PaginationItem>
      ));
    }

    const pages = [];
    pages.push(<PaginationItem key={1}><PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(1); }} isActive={currentPage === 1}>1</PaginationLink></PaginationItem>);
    
    if (currentPage > 3) {
      pages.push(<PaginationEllipsis key="start-ellipsis" />);
    }

    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < pageCount) {
        pages.push(<PaginationItem key={i}><PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i); }} isActive={currentPage === i}>{i}</PaginationLink></PaginationItem>);
      }
    }

    if (currentPage < pageCount - 2) {
      pages.push(<PaginationEllipsis key="end-ellipsis" />);
    }

    pages.push(<PaginationItem key={pageCount}><PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(pageCount); }} isActive={currentPage === pageCount}>{pageCount}</PaginationLink></PaginationItem>);
    
    return pages;
  };
  
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Subscription Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map((subscriber) => (
              <TableRow key={subscriber.id}>
                <TableCell className="font-medium">{subscriber.fullName}</TableCell>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>{subscriber.status}</TableCell>
                <TableCell>{format(new Date(subscriber.createdAt), 'PPp')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); if (currentPage > 1) handlePageChange(currentPage - 1); }} className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''} />
          </PaginationItem>
          {renderPaginationItems()}
          <PaginationItem>
            <PaginationNext href="#" onClick={(e) => { e.preventDefault(); if (currentPage < pageCount) handlePageChange(currentPage + 1); }} className={currentPage === pageCount ? 'pointer-events-none opacity-50' : ''} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}