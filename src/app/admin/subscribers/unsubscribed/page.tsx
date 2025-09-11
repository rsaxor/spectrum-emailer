import { Suspense } from 'react';
import { SubscribersTable, TableSkeleton } from '../subscribers-table';
import { PageClientContent } from '../page-client';
import { FilterTabs } from '../filter-tabs';

export default function UnsubscribedPage() {
  return (
    <div>
      <PageClientContent />
      <FilterTabs />
      <Suspense fallback={<TableSkeleton />}>
        <SubscribersTable status="unsubscribed" />
      </Suspense>
    </div>
  );
}