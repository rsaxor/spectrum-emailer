import { Suspense } from 'react';
import { SubscribersTable } from './subscribers-table';
import { PageClientContent } from './page-client';
import { TableSkeleton } from './subscribers-table'; // Import the skeleton

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