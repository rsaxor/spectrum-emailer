'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface SubscriberRecord {
  id: string;
  fullName: string;
  email: string;
  status: string;
  createdAt: string | null;
}

interface DuplicateGroup {
  email: string;
  count: number;
  records: SubscriberRecord[];
  toDelete: string[];
}

export default function CleanupPage() {
  const [duplicates, setDuplicates] = useState<DuplicateGroup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchDuplicates();
  }, []);

  const fetchDuplicates = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/subscribers/cleanup');
      
      if (!response.ok) {
        throw new Error('Failed to fetch duplicates');
      }

      const data = await response.json();
      setDuplicates(data.duplicates || []);

      if (data.duplicates.length === 0) {
        toast.info('No duplicate emails found!');
      }
    } catch (error) {
      console.error('Error fetching duplicates:', error);
      toast.error('Failed to load duplicates');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteDuplicates = async () => {
    try {
      setIsDeleting(true);
      const response = await fetch('/api/subscribers/cleanup', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ duplicates }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete duplicates');
      }

      const data = await response.json();
      toast.success(`${data.deletedCount} duplicate records deleted successfully!`);
      setShowDeleteConfirm(false);
      
      // Refresh duplicates list
      await fetchDuplicates();
    } catch (error) {
      console.error('Error deleting duplicates:', error);
      toast.error('Failed to delete duplicates');
    } finally {
      setIsDeleting(false);
    }
  };

  const totalDuplicatesToDelete = duplicates.reduce(
    (sum, group) => sum + group.toDelete.length,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Cleanup Duplicates</h1>
            <p className="text-sm text-gray-600 mt-1">
              Find and remove duplicate email subscribers, keeping only the latest record
            </p>
          </div>
        </div>
        {duplicates.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isDeleting || totalDuplicatesToDelete === 0}
          >
            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Delete {totalDuplicatesToDelete} Duplicates
          </Button>
        )}
      </div>

      {/* Loading State */}
      {isLoading && (
        <Card className="p-8 flex items-center justify-center gap-3">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Scanning for duplicates...</span>
        </Card>
      )}

      {/* No Duplicates State */}
      {!isLoading && duplicates.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-lg font-medium">✓ No duplicates found</p>
          <p className="text-gray-600 mt-2">Your subscriber list is clean!</p>
        </Card>
      )}

      {/* Duplicates Display */}
      {!isLoading && duplicates.length > 0 && (
        <div className="space-y-4">
          <Card className="p-4 bg-blue-50 border-blue-200">
            <p className="text-sm text-blue-900">
              Found <strong>{duplicates.length}</strong> email(s) with duplicates containing{' '}
              <strong>{duplicates.reduce((sum, d) => sum + d.records.length, 0)}</strong> record(s).
              Will delete <strong>{totalDuplicatesToDelete}</strong> and keep{' '}
              <strong>{duplicates.length}</strong>.
            </p>
          </Card>

          {/* Duplicate Groups */}
          {duplicates.map((group) => (
            <Card key={group.email} className="overflow-hidden">
              <div className="p-4 bg-gray-50 border-b">
                <h3 className="font-semibold text-base">{group.email}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {group.count} record(s) - Will delete {group.toDelete.length}, keep 1
                </p>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Full Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {group.records.map((record, idx) => {
                      const isLatest = idx === group.records.length - 1;
                      const willDelete = group.toDelete.includes(record.id);

                      return (
                        <TableRow
                          key={record.id}
                          className={
                            isLatest
                              ? 'bg-green-50'
                              : willDelete
                                ? 'bg-red-50 opacity-75'
                                : ''
                          }
                        >
                          <TableCell>{record.fullName}</TableCell>
                          <TableCell>
                            <span className="inline-block px-2 py-1 rounded text-xs bg-gray-200">
                              {record.status}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">
                            {record.createdAt
                              ? new Date(record.createdAt).toLocaleDateString()
                              : 'N/A'}
                          </TableCell>
                          <TableCell>
                            {isLatest && (
                              <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded">
                                KEEP (Latest)
                              </span>
                            )}
                            {willDelete && (
                              <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-1 rounded">
                                DELETE
                              </span>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Duplicate Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {totalDuplicatesToDelete} duplicate subscriber record(s),
              keeping only the latest record for each email address. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteDuplicates}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete Duplicates
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
