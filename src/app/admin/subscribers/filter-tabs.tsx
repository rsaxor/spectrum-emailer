'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function FilterTabs() {
  const searchParams = useSearchParams();
  const currentStatus = searchParams.get('status') || 'all';

  return (
    <div className="flex gap-2 mb-4">
      <Link href="/admin/subscribers">
        <Button variant={currentStatus === 'all' ? 'default' : 'outline'}>
          All
        </Button>
      </Link>
      <Link href="/admin/subscribers?status=subscribed">
        <Button variant={currentStatus === 'subscribed' ? 'default' : 'outline'}>
          Subscribed
        </Button>
      </Link>
      <Link href="/admin/subscribers?status=unsubscribed">
        <Button variant={currentStatus === 'unsubscribed' ? 'default' : 'outline'}>
          Unsubscribed
        </Button>
      </Link>
    </div>
  );
}