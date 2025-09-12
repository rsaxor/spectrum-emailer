import { Suspense } from 'react';
import { SubscribersView } from './subscribers-view';

export default function SubscribersPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading Subscribers...</div>}>
        <SubscribersView />
      </Suspense>
    </div>
  );
}