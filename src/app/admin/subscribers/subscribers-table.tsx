'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Subscriber } from '@/lib/subscriber.service';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ArrowUpDown, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';

const PAGE_SIZE = 10;

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
  isSelectMode: boolean;
}) {
  const isSorting = sortBy === value;
  return (
    <TableHead 
      onClick={() => !isSelectMode && onClick(value)}
      className={!isSelectMode ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800' : ''}
    >
      <div className="flex items-center gap-2">
        {label}
        {!isSelectMode && (
          <ArrowUpDown className={`h-4 w-4 text-muted-foreground ${isSorting ? 'text-foreground' : ''}`} />
        )}
      </div>
    </TableHead>
  );
}

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
  );
}

interface SubscribersTableProps {
  subscribers: Subscriber[];
  isLoading: boolean;
  isCountLoading: boolean;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
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
  isCountLoading,
  currentPage,
  hasNextPage,
  hasPrevPage,
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
  
  // FIX: Show pagination if there are results or navigation possible
  const showPagination = hasNextPage || hasPrevPage;

  return (
    <div>
      {isLoading ? <TableSkeleton /> : (
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
              {subscribers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={isSelectMode ? 6 : 5} className="text-center py-8 text-muted-foreground">
                    No subscribers found
                  </TableCell>
                </TableRow>
              ) : (
                subscribers.map((subscriber: Subscriber) => (
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
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* FIX: Show pagination only when there are multiple pages */}
      {!isCountLoading && showPagination && (
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Page <span className="font-semibold">{currentPage}</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={!hasPrevPage || isLoading}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={!hasNextPage || isLoading}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}