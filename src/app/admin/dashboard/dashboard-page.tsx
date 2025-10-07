import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MailPlus } from 'lucide-react';
import { getSubscriberStats } from '@/lib/subscriber.service';

export async function DashboardData() {
    const { totalSubscribers, newSubscribers } = await getSubscriberStats();

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                        Total Subscribers
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalSubscribers}</div>
                    <p className="text-xs text-muted-foreground">
                        Currently active subscribers
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">
                        New This Month
                    </CardTitle>
                    <MailPlus className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+{newSubscribers}</div>
                    <p className="text-xs text-muted-foreground">
                        Subscribers in the last 30 days
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}

export function DashboardSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            Total Subscribers
          </CardTitle>
          <Skeleton className="h-4 w-4 rounded-full bg-gray-500" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-7 w-20 mb-2 bg-gray-500" />
          <Skeleton className="h-4 w-40 bg-gray-500" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">
            New This Month
          </CardTitle>
          <Skeleton className="h-4 w-4 rounded-full bg-gray-500" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-7 w-16 mb-2 bg-gray-500" />
          <Skeleton className="h-4 w-44 bg-gray-500" />
        </CardContent>
      </Card>
    </div>
  );
}