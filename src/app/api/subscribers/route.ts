import { NextResponse } from 'next/server';
import { getSubscribersByStatus } from '@/lib/subscriber.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'subscribed' | 'unsubscribed' | undefined;

    const subscribers = await getSubscribersByStatus(status);

    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Failed to fetch subscribers' }, { status: 500 });
  }
}