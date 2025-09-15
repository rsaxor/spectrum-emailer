import { Subscriber, getSubscriberById } from '@/lib/subscriber.service'; // Import the new function
import { EditSubscriberForm } from './edit-form';

export default async function SubscriberEditPage({ params }: { params: { id: string } }) {
    // The page now fetches data directly from the service
    const subscriber = await getSubscriberById(params.id);

    if (!subscriber) {
        return <div>Subscriber not found.</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Edit Subscriber</h1>
            <EditSubscriberForm subscriber={subscriber} />
        </div>
    );
}