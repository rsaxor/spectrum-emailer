'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface FilterTabsProps {
  counts: {
    subscribedCount: number;
    unsubscribedCount: number;
    pendingCount: number;
    testCount: number;
  };
}

export function FilterTabs({ counts }: FilterTabsProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentStatus = searchParams.get('status') || 'all';

  const handleFilterClick = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    if (status === 'all') {
      params.delete('status');
    } else {
      params.set('status', status);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const totalCount = counts.subscribedCount + counts.unsubscribedCount + counts.pendingCount + (counts.testCount || 0);

  return (
    <div className="flex gap-2 mb-4">
      <Button variant={currentStatus === 'all' ? 'default' : 'outline'} onClick={() => handleFilterClick('all')}>
        All <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">{totalCount}</span>
      </Button>
      <Button variant={currentStatus === 'subscribed' ? 'default' : 'outline'} onClick={() => handleFilterClick('subscribed')}>
        Subscribed <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">{counts.subscribedCount}</span>
      </Button>
      <Button variant={currentStatus === 'unsubscribed' ? 'default' : 'outline'} onClick={() => handleFilterClick('unsubscribed')}>
        Unsubscribed <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">{counts.unsubscribedCount}</span>
      </Button>
      <Button variant={currentStatus === 'pending' ? 'default' : 'outline'} onClick={() => handleFilterClick('pending')}>
        Pending <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">{counts.pendingCount}</span>
      </Button>
      <Button variant={currentStatus === 'test' ? 'default' : 'outline'} onClick={() => handleFilterClick('test')}>
        Test <span className="ml-2 bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs">{counts.testCount || 0}</span>
      </Button>
    </div>
  );
}