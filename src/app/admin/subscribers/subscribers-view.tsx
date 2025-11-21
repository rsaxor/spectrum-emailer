"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDataTable } from "@/hooks/use-data-table";
import { toast } from "sonner";
import { PageHeader } from "./page-header";
import { FilterTabs } from "../filter-tabs";
import { SubscribersTable } from "./subscribers-table";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { getSubscriberCounts, Subscriber } from "@/lib/subscriber.service";

export function SubscribersView() {
	const [counts, setCounts] = useState({
		subscribedCount: 0,
		unsubscribedCount: 0,
		pendingCount: 0,
		testCount: 0,
	});
	const [isSelectMode, setIsSelectMode] = useState(false);
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

	const router = useRouter();

	const {
		subscribers,
		isLoading,
		setIsLoading,
		isCountLoading,
		pageCount,
		currentPage,
		sortBy,
		order,
		isClient,
		handlePageChange,
		handleSortChange,
        handleSuccess: handleSuccessFromHook,
	} = useDataTable();

	const handleSelect = (id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id)
				? prev.filter((subId) => subId !== id)
				: [...prev, id]
		);
	};

	const onSelectAll = (isChecked: boolean) => {
		if (isChecked) {
			const pageIds = subscribers.map((s) => s.id);
			setSelectedIds((prev) => [...new Set([...prev, ...pageIds])]);
		} else {
			const pageIds = subscribers.map((s) => s.id);
			setSelectedIds((prev) =>
				prev.filter((id) => !pageIds.includes(id))
			);
		}
	};

	const handleSuccess = (newSubscriber: Subscriber) => {
        handleSuccessFromHook(newSubscriber);
		getSubscriberCounts().then(setCounts);
        router.refresh();
    };

	const performDelete = async (ids: string[]) => {
		const deletePromise = fetch("/api/subscribers", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ids }),
		}).then((res) => {
			if (!res.ok) throw new Error("Failed to delete.");
			return res.json();
		});

		toast.promise(deletePromise, {
			loading: "Deleting...",
			success: () => {
                handlePageChange(1); 
				getSubscriberCounts().then(setCounts);
				setIsSelectMode(false);
				setSelectedIds([]);
				return `${ids.length} subscriber(s) deleted.`;
			},
			error: (err) => {
				setIsLoading(false);
				return "Failed to delete subscribers.";
			},
		});
	};

	const handleProceedDelete = () => performDelete(selectedIds);

	const handleDeleteAll = async () => {
		const deleteAllPromise = fetch("/api/subscribers/all", {
			method: "DELETE",
		}).then((res) => {
			if (!res.ok) throw new Error("Failed to delete all subscribers.");
			return res.json();
		});

		toast.promise(deleteAllPromise, {
			loading: "Deleting all subscribers...",
			success: () => {
                handlePageChange(1);
				getSubscriberCounts().then(setCounts);
				return "All subscribers have been deleted.";
			},
			error: "An error occurred while deleting all subscribers.",
		});
		setIsAlertDialogOpen(false);
	};

	const handleEdit = (id: string) => router.push(`/admin/subscribers/${id}`);
	const handleDelete = (id: string) => {
		setIsSelectMode(true);
		setSelectedIds([id]);
	};

	useEffect(() => {
		if (!isClient) return;
		// Fetch the counts when the component mounts or filters change
		getSubscriberCounts().then(setCounts);
	}, [isClient, subscribers]); // Re-fetch counts if the filter status / subscribers changes

	if (!isClient) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<PageHeader
				onSuccess={handleSuccess}
				onEnterSelectMode={() => setIsSelectMode(true)}
				onOpenDeleteAllDialog={() => setIsAlertDialogOpen(true)}
				isSelectMode={isSelectMode}
				onCancelSelectMode={() => {
					setIsSelectMode(false);
					setSelectedIds([]);
				}}
				onProceedDelete={handleProceedDelete}
				isDeleting={isLoading}
			/>
			<FilterTabs counts={counts} />
			<SubscribersTable
				subscribers={subscribers}
				isLoading={isLoading}
				isCountLoading={isCountLoading}
				pageCount={pageCount}
				currentPage={currentPage}
				handlePageChange={handlePageChange}
				isSelectMode={isSelectMode}
				selectedIds={selectedIds}
				handleSelect={handleSelect}
				handleSortChange={handleSortChange}
				sortBy={sortBy}
				order={order}
				onEdit={handleEdit}
				onDelete={handleDelete}
				onSelectAll={onSelectAll}
			/>
			<AlertDialog
				open={isAlertDialogOpen}
				onOpenChange={setIsAlertDialogOpen}
			>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you absolutely sure?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This action cannot be undone. This will permanently
							delete all subscribers.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
						<AlertDialogAction
							onClick={handleDeleteAll}
							className="bg-destructive hover:bg-destructive/90"
						>
							{isLoading ? (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							) : (
								"Continue"
							)}
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
