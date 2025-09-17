import { Subscriber, getSubscriberById } from '@/lib/subscriber.service';
import { EditSubscriberForm } from './edit-form';

// The type for params is a Promise
export default async function SubscriberEditPage({ params }: { params: Promise<{ id: string }> }) {
    // You MUST await the params object to get its content
    const { id } = await params;
    
    // Then use the resolved 'id' to fetch the data
    const subscriber = await getSubscriberById(id);

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