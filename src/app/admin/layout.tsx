import React from 'react';
import SideNav from './sidenav';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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