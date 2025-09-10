import { Suspense } from 'react';
import { SubscribersTable, TableSkeleton } from './subscribers-table';
import { PageClientContent } from './page-client';
import { FilterTabs } from './filter-tabs';

// No dynamic export needed here
export default function SubscribersPage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  return (
    <div>
      <PageClientContent />
      <FilterTabs />
      
      <Suspense fallback={<TableSkeleton />}>
        <SubscribersTable searchParams={searchParams} />
      </Suspense>
    </div>
  );
}