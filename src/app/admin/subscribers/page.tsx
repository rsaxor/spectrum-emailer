import { Suspense } from 'react';
import { SubscribersTable, TableSkeleton } from './subscribers-table';
import { PageClientContent } from './page-client';
import { FilterTabs } from './filter-tabs';

export default function AllSubscribersPage() {
  return (
    <div>
      <PageClientContent />
      <FilterTabs />
      <Suspense fallback={<TableSkeleton />}>
        {/* This page shows all subscribers by default */}
        <SubscribersTable />
      </Suspense>
    </div>
  );
}