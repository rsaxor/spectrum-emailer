'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SideNav() {
  const router = useRouter();

  const handleSignOut = async () => {
    // Call the logout API to clear the secure cookie
    await fetch('/api/auth/logout', { method: 'POST' });
    // Redirect to the login page
    router.push('/');
  };

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-50 border-r">
      <div className="flex-grow">
        <nav className="flex flex-col space-y-2">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-gray-200"
          >
            <LayoutDashboard className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/admin/subscribers"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-gray-200"
          >
            <Users className="h-4 w-4" />
            Subscribers
          </Link>
        </nav>
      </div>
      <div>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-gray-200"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}