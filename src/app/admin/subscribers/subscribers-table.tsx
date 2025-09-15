'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Skeleton } from '@/components/ui/skeleton';
import { Subscriber } from '@/lib/subscriber.service';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

const PAGE_SIZE = 10;

// The component now accepts an isSelectMode prop
function SortableHeader({
  label,
  value,
  sortBy,
  order,
  onClick,
  isSelectMode,
}: {
  label: string;
  value: string;
  sortBy: string;
  order: string;
  onClick: (sortBy: string) => void;
  isSelectMode: boolean; // Add this prop
}) {
  const isSorting = sortBy === value;
  return (
    <TableHead 
      onClick={() => !isSelectMode && onClick(value)} // Disable onClick in select mode
      className={!isSelectMode ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800' : ''}
    >
      <div className="flex items-center gap-2">
        {label}
        {/* Conditionally render the icon */}
        {!isSelectMode && (
          <ArrowUpDown className={`h-4 w-4 text-muted-foreground ${isSorting ? 'text-foreground' : ''}`} />
        )}
      </div>
    </TableHead>
  );
}

export function TableSkeleton() {
  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead><Skeleton className="h-5 bg-gray-500 w-24 animate-pulse" /></TableHead>
              <TableHead><Skeleton className="h-5 bg-gray-500 w-40 animate-pulse" /></TableHead>
              <TableHead><Skeleton className="h-5 bg-gray-500 w-20 animate-pulse" /></TableHead>
              <TableHead><Skeleton className="h-5 bg-gray-500 w-32 animate-pulse" /></TableHead>
              <TableHead><Skeleton className="h-5 bg-gray-500 w-16 animate-pulse" /></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(PAGE_SIZE)].map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-5 bg-gray-500 w-32 animate-pulse" /></TableCell>
                <TableCell><Skeleton className="h-5 bg-gray-500 w-48 animate-pulse" /></TableCell>
                <TableCell><Skeleton className="h-5 bg-gray-500 w-24 animate-pulse" /></TableCell>
                <TableCell><Skeleton className="h-5 bg-gray-500 w-40 animate-pulse" /></TableCell>
                <TableCell><Skeleton className="h-8 bg-gray-500 w-8 animate-pulse" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
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

interface SubscribersTableProps {
  subscribers: Subscriber[];
  isLoading: boolean;
  pageCount: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  isSelectMode: boolean;
  selectedIds: string[];
  handleSelect: (id: string) => void;
  handleSortChange: (sortBy: string) => void;
  sortBy: string;
  order: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSelectAll: (isChecked: boolean) => void;
}

export function SubscribersTable({
  subscribers,
  isLoading,
  pageCount,
  currentPage,
  handlePageChange,
  isSelectMode,
  selectedIds,
  handleSelect,
  handleSortChange,
  sortBy,
  order,
  onEdit,
  onDelete,
  onSelectAll,
}: SubscribersTableProps) {
  
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

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {isSelectMode && (
                <TableHead className="w-[40px]">
                  <Checkbox 
                    checked={subscribers.length > 0 && subscribers.every(s => selectedIds.includes(s.id))}
                    onCheckedChange={(checked) => onSelectAll(!!checked)}
                  />
                </TableHead>
              )}
              <SortableHeader label="Full Name" value="fullName" sortBy={sortBy} order={order} onClick={handleSortChange} isSelectMode={isSelectMode} />
              <SortableHeader label="Email" value="email" sortBy={sortBy} order={order} onClick={handleSortChange} isSelectMode={isSelectMode} />
              <SortableHeader label="Status" value="status" sortBy={sortBy} order={order} onClick={handleSortChange} isSelectMode={isSelectMode} />
              <SortableHeader label="Subscription Date" value="createdAt" sortBy={sortBy} order={order} onClick={handleSortChange} isSelectMode={isSelectMode} />
              {!isSelectMode && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {subscribers.map((subscriber: Subscriber) => (
              <TableRow key={subscriber.id}>
                {isSelectMode && <TableCell><Checkbox checked={selectedIds.includes(subscriber.id)} onCheckedChange={() => handleSelect(subscriber.id)} /></TableCell>}
                <TableCell className="font-medium">{subscriber.fullName}</TableCell>
                <TableCell>{subscriber.email}</TableCell>
                <TableCell>{subscriber.status}</TableCell>
                <TableCell>{format(new Date(subscriber.createdAt), 'PPp')}</TableCell>
                {!isSelectMode && (
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" className="h-8 w-8 p-0"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit(subscriber.id)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onClick={() => onDelete(subscriber.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
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