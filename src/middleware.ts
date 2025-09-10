import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the session cookie. In production, this will be a secure cookie.
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true';
  const { pathname } = request.nextUrl;

  // If a logged-in user tries to visit the login page, redirect them to the dashboard.
  if (isLoggedIn && pathname === '/') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  // If a logged-out user tries to visit any page under /admin, redirect them to the login page.
  if (!isLoggedIn && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // If the request is valid, allow it to continue.
  return NextResponse.next();
}

// This config specifies which routes the middleware should run on.
export const config = {
  matcher: ['/', '/admin/:path*'],
};