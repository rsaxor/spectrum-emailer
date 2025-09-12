import { Suspense } from 'react';
import { SubscribersTable, TableSkeleton } from './subscribers-table';
import { PageClientContent } from './page-client';

export default function SubscribersPage() {
  return (
    <div>
      <PageClientContent />
      
      {/* This Suspense wrapper is essential for the build to pass */}
      <Suspense fallback={<TableSkeleton />}>
        <SubscribersTable />
      </Suspense>
    </div>
  );
}