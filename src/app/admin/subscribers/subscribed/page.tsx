import { Suspense } from 'react';
import { SubscribersTable, TableSkeleton } from '../subscribers-table';
import { PageClientContent } from '../page-client';
import { FilterTabs } from '../filter-tabs';

export default function SubscribedPage() {
  return (
    <div>
      <PageClientContent />
      <FilterTabs />
      <Suspense fallback={<TableSkeleton />}>
        {/* We'll pass a prop to tell the table which data to fetch */}
        <SubscribersTable status="subscribed" />
      </Suspense>
    </div>
  );
}