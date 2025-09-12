'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { getSubscribersPaginated, getSubscribersCount, Subscriber } from '@/lib/subscriber.service';
import { format } from 'date-fns';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CreateSubscriberForm } from './create-subscriber-form';
import { ArrowUpDown } from 'lucide-react';

const PAGE_SIZE = 10;

function TableSkeleton() {
  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Skeleton className="h-5 w-24 animate-pulse bg-gray-500" /></TableHead>
              <TableHead><Skeleton className="h-5 w-40 animate-pulse bg-gray-500" /></TableHead>
              <TableHead><Skeleton className="h-5 w-20 animate-pulse bg-gray-500" /></TableHead>
              <TableHead><Skeleton className="h-5 w-32 animate-pulse bg-gray-500" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(PAGE_SIZE)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-32 animate-pulse bg-gray-500" /></TableCell>
                <TableCell><Skeleton className="h-5 w-48 animate-pulse bg-gray-500" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24 animate-pulse bg-gray-500" /></TableCell>
                <TableCell><Skeleton className="h-5 w-40 animate-pulse bg-gray-500" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {/* Add a skeleton for the pagination control */}
      <div className="mt-4 flex justify-center">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-20 rounded-md bg-gray-500" />
          <Skeleton className="h-9 w-9 rounded-md bg-gray-500" />
          <Skeleton className="h-9 w-9 rounded-md bg-gray-500" />
          <Skeleton className="h-9 w-20 rounded-md bg-gray-500" />
        </div>
      </div>
    </div>
  );
}

function FilterTabs() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentStatus = searchParams.get('status') || 'all';

  const handleFilterClick = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    if (status === 'all') {
      params.delete('status');
    } else {
      params.set('status', status);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2 mb-4">
      <Button variant={currentStatus === 'all' ? 'default' : 'outline'} onClick={() => handleFilterClick('all')}>All</Button>
      <Button variant={currentStatus === 'subscribed' ? 'default' : 'outline'} onClick={() => handleFilterClick('subscribed')}>Subscribed</Button>
      <Button variant={currentStatus === 'unsubscribed' ? 'default' : 'outline'} onClick={() => handleFilterClick('unsubscribed')}>Unsubscribed</Button>
    </div>
  );
}

function SortableHeader({
  label,
  value,
  sortBy,
  order,
  onClick,
}: {
  label: string;
  value: string;
  sortBy: string;
  order: string;
  onClick: (sortBy: string) => void;
}) {
  const isSorting = sortBy === value;
  return (
    <TableHead onClick={() => onClick(value)} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
      <div className="flex items-center gap-2">
        {label}
        <ArrowUpDown className={`h-4 w-4 text-muted-foreground ${isSorting ? 'text-foreground' : ''}`} />
      </div>
    </TableHead>
  );
}

export function SubscribersView() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCount, setPageCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = searchParams.get('status') as 'subscribed' | 'unsubscribed' | undefined;
  const currentPage = Number(searchParams.get('page')) || 1;
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const order = searchParams.get('order') || 'desc';

  const pageCursors = useMemo(() => new Map<number, QueryDocumentSnapshot<DocumentData> | null>([[1, null]]), []);

  const fetchData = useCallback(async (page: number) => {
    setIsLoading(true);
    const lastVisible = pageCursors.get(page) || undefined;
    const { subscribers: newSubscribers, lastVisible: newLastVisible } = await getSubscribersPaginated(
      status,
      lastVisible,
      PAGE_SIZE,
      sortBy,
      order as 'asc' | 'desc'
    );
    
    setSubscribers(newSubscribers);
    if (newLastVisible) {
        pageCursors.set(page + 1, newLastVisible);
    }
    setIsLoading(false);
  }, [pageCursors, status, sortBy, order]);
  
  const handleSuccess = (newSubscriber: Subscriber) => {
    setSubscribers(prevSubscribers => [newSubscriber, ...prevSubscribers]);
    getSubscribersCount(status).then(count => {
      setPageCount(Math.ceil(count / PAGE_SIZE));
    });
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    getSubscribersCount(status).then(count => {
      setPageCount(Math.ceil(count / PAGE_SIZE));
    });
  }, [status, isClient]);
  
  useEffect(() => {
    if (!isClient) return;
    if (currentPage === 1) {
      pageCursors.clear();
      pageCursors.set(1, null);
    }
    fetchData(currentPage);
  }, [currentPage, status, sortBy, order, isClient, fetchData, pageCursors]);

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

  const renderPaginationItems = () => {
    if (pageCount <= 1) return null;
    if (pageCount <= 7) {
      return [...Array(pageCount)].map((_, i) => (
        <PaginationItem key={i}><PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }} isActive={currentPage === i + 1}>{i + 1}</PaginationLink></PaginationItem>
      ));
    }
    const pages = [];
    pages.push(<PaginationItem key={1}><PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(1); }} isActive={currentPage === 1}>1</PaginationLink></PaginationItem>);
    if (currentPage > 3) pages.push(<PaginationEllipsis key="start-ellipsis" />);
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if (i > 1 && i < pageCount) {
        pages.push(<PaginationItem key={i}><PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(i); }} isActive={currentPage === i}>{i}</PaginationLink></PaginationItem>);
      }
    }
    if (currentPage < pageCount - 2) pages.push(<PaginationEllipsis key="end-ellipsis" />);
    pages.push(<PaginationItem key={pageCount}><PaginationLink href="#" onClick={(e) => { e.preventDefault(); handlePageChange(pageCount); }} isActive={currentPage === pageCount}>{pageCount}</PaginationLink></PaginationItem>);
    return pages;
  };
  
  if (!isClient) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Subscribers</h1>
            <Button>New Subscriber</Button>
        </div>
        <div className="flex gap-2 mb-4">
            <Button variant="default">All</Button>
            <Button variant="outline">Subscribed</Button>
            <Button variant="outline">Unsubscribed</Button>
        </div>
        <TableSkeleton />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subscribers</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button>New Subscriber</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Subscriber</DialogTitle>
              <DialogDescription>Add a new person to your mailing list here.</DialogDescription>
            </DialogHeader>
            <CreateSubscriberForm setOpen={setOpen} onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>
      <FilterTabs />
      {isLoading ? <TableSkeleton /> : (
        <div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <SortableHeader label="Full Name" value="fullName" sortBy={sortBy} order={order} onClick={handleSortChange} />
                  <SortableHeader label="Email" value="email" sortBy={sortBy} order={order} onClick={handleSortChange} />
                  <SortableHeader label="Status" value="status" sortBy={sortBy} order={order} onClick={handleSortChange} />
                  <SortableHeader label="Subscription Date" value="createdAt" sortBy={sortBy} order={order} onClick={handleSortChange} />
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
              <PaginationItem><PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); if (currentPage > 1) handlePageChange(currentPage - 1); }} className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''} /></PaginationItem>
              {renderPaginationItems()}
              <PaginationItem><PaginationNext href="#" onClick={(e) => { e.preventDefault(); if (currentPage < pageCount) handlePageChange(currentPage + 1); }} className={currentPage === pageCount ? 'pointer-events-none opacity-50' : ''} /></PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}