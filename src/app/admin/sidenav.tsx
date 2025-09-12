'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function SideNav() {
  const router = useRouter();
  const pathname = usePathname();

  const handleSignOut = async () => {
    // Call the logout API to clear the secure cookie
    await fetch('/api/auth/logout', { method: 'POST' });
    // Redirect to the login page
    router.push('/');
  };

  const navLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
  ];

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-50 border-r">
      <div className="flex-grow">
        <nav className="flex flex-col space-y-2">
          {navLinks.map((link) => {
            // Check if the current path starts with the link's href
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-gray-200 dark:text-gray-50 dark:hover:bg-gray-800',
                  isActive && 'bg-gray-200 dark:bg-gray-800' // Apply highlight class if active
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
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