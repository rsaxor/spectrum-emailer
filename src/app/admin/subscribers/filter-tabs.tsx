'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Accept searchParams as a prop
export function FilterTabs({ searchParams }: { searchParams?: { status?: 'subscribed' | 'unsubscribed' } }) {
  const currentStatus = searchParams?.status || 'all';

  return (
    <div className="flex gap-2 mb-4">
      <Link href="/admin/subscribers">
        <Button variant={currentStatus === 'all' ? 'default' : 'outline'}>All</Button>
      </Link>
      <Link href="/admin/subscribers?status=subscribed">
        <Button variant={currentStatus === 'subscribed' ? 'default' : 'outline'}>Subscribed</Button>
      </Link>
      <Link href="/admin/subscribers?status=unsubscribed">
        <Button variant={currentStatus === 'unsubscribed' ? 'default' : 'outline'}>Unsubscribed</Button>
      </Link>
    </div>
  );
}