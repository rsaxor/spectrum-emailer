import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { getSubscribersByStatus, Subscriber } from '@/lib/subscriber.service';
import { format } from 'date-fns';

// This is the skeleton component that will be shown during loading.
export function TableSkeleton() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="h-5 w-24 bg-gray-500" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-40 bg-gray-500" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-20 bg-gray-500" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-5 w-32 bg-gray-500" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-5 w-32 bg-gray-500" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-48 bg-gray-500" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-24 bg-gray-500" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-40 bg-gray-500" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}


// The component now accepts an optional status prop
export async function SubscribersTable({ status }: { status?: string }) {
  const subscribers = await getSubscribersByStatus(status);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Subscription Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscribers.map((subscriber) => (
            <TableRow key={subscriber.id}>
              <TableCell className="font-medium">{subscriber.fullName}</TableCell>
              <TableCell>{subscriber.email}</TableCell>
              <TableCell>{subscriber.status}</TableCell>
              <TableCell>{format(subscriber.createdAt, 'PPp')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}