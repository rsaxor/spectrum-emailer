'use client';

import Cookies from 'js-cookie';

const SESSION_KEY = 'isLoggedIn';

// This function will now always use cookies.
export function createSession() {
  Cookies.set(SESSION_KEY, 'true', { 
    expires: 7, // 7 days
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict' 
  });
}

// This function is no longer needed in our components, but we'll leave it for now.
export function getSessionStatus(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return Cookies.get(SESSION_KEY) === 'true';
}

// This function will now always use cookies.
export function clearSession() {
  Cookies.remove(SESSION_KEY);
}