import { NextResponse } from 'next/server';
// Correct the function name here
import { getSubscribersPaginated } from '@/lib/subscriber.service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'subscribed' | 'unsubscribed' | undefined;

    // And call the correct function here
    // Note: The API route does not handle pagination cursors itself,
    // so it will only fetch the first page. This is expected as the
    // pagination logic is now fully client-side.
    const { subscribers } = await getSubscribersPaginated(status);

    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ message: 'Failed to fetch subscribers' }, { status: 500 });
  }
}