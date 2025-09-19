'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { useEntity } from '@/context/EntityContext';
import { LayoutDashboard, Users, LogOut, ChevronsUpDown, Link as LinkIcon, Send, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

export default function SideNav() {
  const router = useRouter();
  const pathname = usePathname();
  const { entity, setEntity } = useEntity();

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
  };

  const handleCopyLink = () => {
    const subscribeUrl = `${window.location.origin}/subscribe?entity=${entity}`;
    navigator.clipboard.writeText(subscribeUrl);
    toast.success(`${entity} subscriber link copied!`);
  };

  const navLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/subscribers', label: 'Subscribers', icon: Users },
    { href: '/admin/send-newsletter', label: 'Send Newsletter', icon: Send },
    { href: '/admin/export-import', label: 'Export/Import', icon: UploadCloud }
  ];

  const imageWidth = entity === 'All' ? 250 : 150;
  const imageHeight = entity === 'All' ? 80 : 50;
  const imageSrc = entity === 'All' ? '/all.png' : `/${entity.toLowerCase()}.png`;
  const maxWidthClass = entity === 'All' ? 'max-w-[250px]' : 'max-w-[120px]';

  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-gray-50 border-r dark:bg-gray-900 dark:border-gray-800">
      <div className="mb-4 mt-3 flex items-center justify-center">
        <Image
          src={imageSrc}
          alt={`${entity} Logo`}
          width={imageWidth}
          height={imageHeight}
          className={`h-auto w-full ${maxWidthClass} object-contain`}
          priority
        />
      </div>
      <div className="flex-grow">
        <nav className="flex flex-col space-y-2">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-gray-200 dark:text-gray-50 dark:hover:bg-gray-800',
                  isActive && 'bg-gray-200 dark:bg-gray-800'
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:bg-gray-200 dark:text-gray-50 dark:hover:bg-gray-800 text-left"
          >
            <LinkIcon className="h-4 w-4" />
            Copy Subscribe Link
          </button>
        </nav>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-between mb-2 text-sm hover:bg-gray-200 dark:hover:bg-gray-800">
              Switch Company
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem onSelect={() => setEntity('All')}>All Entities</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setEntity('Spectrum')}>Spectrum</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setEntity('TCC')}>The Card Co.</DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setEntity('HOS')}>House of Spectrum</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-gray-200 dark:hover:bg-gray-800"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}