'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function FilterTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status') || 'all';

  const handleFilterClick = (status: string) => {
    const newPath = status === 'all' 
      ? '/admin/subscribers' 
      : `/admin/subscribers?status=${status}`;
    
    // Change the URL
    router.push(newPath);
    // Force a server data refresh
    router.refresh(); 
  };

  return (
    <div className="flex gap-2 mb-4">
      <Button
        variant={currentStatus === 'all' ? 'default' : 'outline'}
        onClick={() => handleFilterClick('all')}
      >
        All
      </Button>
      <Button
        variant={currentStatus === 'subscribed' ? 'default' : 'outline'}
        onClick={() => handleFilterClick('subscribed')}
      >
        Subscribed
      </Button>
      <Button
        variant={currentStatus === 'unsubscribed' ? 'default' : 'outline'}
        onClick={() => handleFilterClick('unsubscribed')}
      >
        Unsubscribed
      </Button>
    </div>
  );
}