import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * CORS configuration for public endpoints (subscribe, unsubscribe, etc.)
 */
export function addCorsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}

/**
 * Handle CORS preflight requests
 */
export function handleCorsPreFlight(request: NextRequest) {
  if (request.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 204 });
    return addCorsHeaders(response);
  }
  return null;
}
