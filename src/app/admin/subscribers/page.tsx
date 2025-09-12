import { Suspense } from 'react';
import { SubscribersTable, TableSkeleton } from './subscribers-table';
import { PageClientContent } from './page-client';
import { FilterTabs } from './filter-tabs';

export default function SubscribersPage() {
  return (
    <div>
      <PageClientContent />
      
      {/* Wrap BOTH components that use useSearchParams */}
      <Suspense fallback={<div>Loading filters...</div>}>
        <FilterTabs />
      </Suspense>

      <Suspense fallback={<TableSkeleton />}>
        <SubscribersTable />
      </Suspense>
    </div>
  );
}