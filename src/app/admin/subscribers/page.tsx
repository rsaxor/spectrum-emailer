import { Suspense } from 'react';
import { SubscribersTable, TableSkeleton } from './subscribers-table';
import { PageClientContent } from './page-client';
import { FilterTabs } from './filter-tabs';

export const dynamic = 'force-dynamic';

export default function SubscribersPage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  return (
    <div>
      <PageClientContent />

      {/* Add Suspense wrapper around FilterTabs */}
      <Suspense fallback={<div>Loading filters...</div>}>
        <FilterTabs />
      </Suspense>
      
      <Suspense fallback={<TableSkeleton />}>
        <SubscribersTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}