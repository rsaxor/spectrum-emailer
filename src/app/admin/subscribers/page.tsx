import { Suspense } from 'react';
import { SubscribersTable, TableSkeleton } from './subscribers-table';
import { PageClientContent } from './page-client';

export default function SubscribersPage() {
  return (
    <div>
      <PageClientContent />
      
      {/* The SubscribersTable must be wrapped in Suspense */}
      <Suspense fallback={<TableSkeleton />}>
        <SubscribersTable />
      </Suspense>
    </div>
  );
}