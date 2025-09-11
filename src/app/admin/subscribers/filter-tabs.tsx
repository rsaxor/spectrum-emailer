'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';

export function FilterTabs() {
  const pathname = usePathname();
  return (
    <div className="flex gap-2 mb-4">
      <Link href="/admin/subscribers">
        <Button variant={pathname === '/admin/subscribers' ? 'default' : 'outline'}>All</Button>
      </Link>
      <Link href="/admin/subscribers/subscribed">
        <Button variant={pathname === '/admin/subscribers/subscribed' ? 'default' : 'outline'}>Subscribed</Button>
      </Link>
      <Link href="/admin/subscribers/unsubscribed">
        <Button variant={pathname === '/admin/subscribers/unsubscribed' ? 'default' : 'outline'}>Unsubscribed</Button>
      </Link>
    </div>
  );
}