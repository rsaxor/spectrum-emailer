'use client';

import { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MailPlus, MailX, Clock, TrendingUp, RotateCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { getComprehensiveStats } from '@/lib/subscriber.service';

export function DashboardData() {
    const [stats, setStats] = useState<Awaited<ReturnType<typeof getComprehensiveStats>> | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const fetchStats = async () => {
        try {
            const data = await getComprehensiveStats();
            setStats(data);
        } catch (error) {
            console.error('Failed to fetch stats:', error);
        }
    };

    // FIX: Ensure we're on client before rendering
    useEffect(() => {
        setIsClient(true);
    }, []);

    // FIX: Auto-refresh every 10 seconds (only after client mount)
    useEffect(() => {
        if (!isClient) return;

        fetchStats();
        setIsLoading(false);

        const interval = setInterval(fetchStats, 10000); // 10 seconds
        return () => clearInterval(interval);
    }, [isClient]);

    const handleManualRefresh = async () => {
        setIsRefreshing(true);
        await fetchStats();
        setIsRefreshing(false);
    };

    // FIX: Show skeleton until client-side hydration is complete
    if (!isClient || isLoading || !stats) {
        return <DashboardSkeleton />;
    }

    const calculatePercentage = (value: number, total: number) => {
        if (total === 0) return '0';
        return ((value / total) * 100).toFixed(1);
    };

    const subscribedPercent = calculatePercentage(stats.byStatus.subscribed, stats.total);
    const unsubscribedPercent = calculatePercentage(stats.byStatus.unsubscribed, stats.total);
    const pendingPercent = calculatePercentage(stats.byStatus.pending, stats.total);

    return (
        <div className="space-y-6">
            {/* FIX: Add manual refresh button */}
            <div className="flex justify-end">
                <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleManualRefresh}
                    disabled={isRefreshing}
                >
                    <RotateCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                    {isRefreshing ? 'Refreshing...' : 'Refresh Stats'}
                </Button>
            </div>

            {/* Top Row: Key Metrics */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Subscribers
                        </CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            All subscribers in database
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Subscribed
                        </CardTitle>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">{stats.byStatus.subscribed}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {subscribedPercent}% of total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Unsubscribed
                        </CardTitle>
                        <MailX className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-600">{stats.byStatus.unsubscribed}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {unsubscribedPercent}% of total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            Pending
                        </CardTitle>
                        <Clock className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-yellow-600">{stats.byStatus.pending}</div>
                        <p className="text-xs text-muted-foreground mt-1">
                            {pendingPercent}% of total
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Middle Row: Status Breakdown */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Subscriber Status Breakdown
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Subscribed */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Subscribed</span>
                                <span className="text-sm font-semibold text-green-600">{stats.byStatus.subscribed}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-green-500 h-2 rounded-full"
                                    style={{ width: `${subscribedPercent}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-muted-foreground">{subscribedPercent}% of total subscribers</p>
                        </div>

                        {/* Unsubscribed */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Unsubscribed</span>
                                <span className="text-sm font-semibold text-red-600">{stats.byStatus.unsubscribed}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-red-500 h-2 rounded-full"
                                    style={{ width: `${unsubscribedPercent}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-muted-foreground">{unsubscribedPercent}% of total subscribers</p>
                        </div>

                        {/* Pending */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-sm font-medium">Pending</span>
                                <span className="text-sm font-semibold text-yellow-600">{stats.byStatus.pending}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-yellow-500 h-2 rounded-full"
                                    style={{ width: `${pendingPercent}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-muted-foreground">{pendingPercent}% of total subscribers</p>
                        </div>

                        {/* Test */}
                        {stats.byStatus.test > 0 && (
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">Test</span>
                                    <span className="text-sm font-semibold text-gray-600">{stats.byStatus.test}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="bg-gray-500 h-2 rounded-full"
                                        style={{ width: `${calculatePercentage(stats.byStatus.test, stats.total)}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-muted-foreground">{calculatePercentage(stats.byStatus.test, stats.total)}% of total subscribers</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Bottom Row: Last 30 Days Activity */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MailPlus className="h-5 w-5" />
                        Last 30 Days Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                <span className="text-sm font-medium">New Subscriptions</span>
                            </div>
                            <div className="text-3xl font-bold text-green-600">{stats.last30Days.subscribed}</div>
                            <p className="text-xs text-muted-foreground">subscribers joined</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <span className="text-sm font-medium">New Unsubscriptions</span>
                            </div>
                            <div className="text-3xl font-bold text-red-600">{stats.last30Days.unsubscribed}</div>
                            <p className="text-xs text-muted-foreground">subscribers left</p>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <span className="text-sm font-medium">Pending Confirmations</span>
                            </div>
                            <div className="text-3xl font-bold text-yellow-600">{stats.last30Days.pending}</div>
                            <p className="text-xs text-muted-foreground">awaiting confirmation</p>
                        </div>
                    </div>

                    {/* Net Growth */}
                    <div className="mt-6 pt-6 border-t">
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold">Net Growth (Last 30 Days)</span>
                            <span className={`text-lg font-bold ${stats.last30Days.subscribed - stats.last30Days.unsubscribed >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {stats.last30Days.subscribed - stats.last30Days.unsubscribed > 0 ? '+' : ''}{stats.last30Days.subscribed - stats.last30Days.unsubscribed}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            {stats.last30Days.subscribed - stats.last30Days.unsubscribed > 0 
                                ? '📈 Growing!' 
                                : stats.last30Days.subscribed - stats.last30Days.unsubscribed < 0 
                                ? '📉 Declining' 
                                : '➡️ Stable'}
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
        {/* Top Row Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                            <Skeleton className="h-4 w-24 bg-gray-500" />
                        </CardTitle>
                        <Skeleton className="h-4 w-4 rounded-full bg-gray-500" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-8 w-16 mb-2 bg-gray-500" />
                        <Skeleton className="h-3 w-32 bg-gray-500" />
                    </CardContent>
                </Card>
            ))}
        </div>

        {/* Breakdown Skeleton */}
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-48 bg-gray-500" />
            </CardHeader>
            <CardContent className="space-y-6">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-32 bg-gray-500" />
                        <Skeleton className="h-2 w-full bg-gray-500 rounded-full" />
                        <Skeleton className="h-3 w-40 bg-gray-500" />
                    </div>
                ))}
            </CardContent>
        </Card>

        {/* Last 30 Days Skeleton */}
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-48 bg-gray-500" />
            </CardHeader>
            <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="space-y-2">
                            <Skeleton className="h-4 w-32 bg-gray-500" />
                            <Skeleton className="h-8 w-16 bg-gray-500" />
                            <Skeleton className="h-3 w-24 bg-gray-500" />
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    </div>
  );
}