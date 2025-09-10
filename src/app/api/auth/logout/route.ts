import { NextResponse } from 'next/server';

export async function POST() {
  // Create a response and clear the session cookie
  const response = NextResponse.json({ message: 'Logout successful!' });
  response.cookies.set('isLoggedIn', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0), // Set expiration to the past
    path: '/',
  });
  return response;
}