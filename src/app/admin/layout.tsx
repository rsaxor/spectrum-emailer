'use client';

import React, { useEffect } from 'react';
import SideNav from './sidenav';
import { ensureMetadataExists } from '@/lib/firestore-init';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // FIX: Ensure metadata document exists when admin layout mounts
    ensureMetadataExists();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-64 flex-shrink-0">
        <SideNav />
      </div>
      <main className="flex-grow p-8 bg-gray-100 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}