import { Suspense } from 'react';
import { DashboardData, DashboardSkeleton } from './dashboard-page';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardData />
      </Suspense>
    </div>
  );
}