'use client';
import { TableHead } from '@/components/ui/table';
import { ArrowUpDown } from 'lucide-react';


export function SortableHeader({ label, value, sortBy, order, onClick }: { label: string; value: string; sortBy: string; order: string; onClick: (sortBy: string) => void; }) {
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