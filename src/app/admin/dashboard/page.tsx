import { Suspense } from 'react';
import { DashboardDataPage, DashboardSkeleton } from './dashboard-page';

export default async function DashboardPage() {
  // Call the service function to get the data

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <Suspense fallback={<DashboardSkeleton/>}>
            <DashboardDataPage/>
        </Suspense>
    </div>
  );
}