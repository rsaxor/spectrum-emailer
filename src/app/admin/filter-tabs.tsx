'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function FilterTabs() {
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

  return (
    <div className="flex gap-2 mb-4">
      <Button variant={currentStatus === 'all' ? 'default' : 'outline'} onClick={() => handleFilterClick('all')}>All</Button>
      <Button variant={currentStatus === 'subscribed' ? 'default' : 'outline'} onClick={() => handleFilterClick('subscribed')}>Subscribed</Button>
      <Button variant={currentStatus === 'unsubscribed' ? 'default' : 'outline'} onClick={() => handleFilterClick('unsubscribed')}>Unsubscribed</Button>
    </div>
  );
}