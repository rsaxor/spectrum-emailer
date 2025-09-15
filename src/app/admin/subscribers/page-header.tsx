'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { CreateSubscriberForm } from './create-subscriber-form';
import { Subscriber } from '@/lib/subscriber.service';
import { Loader2 } from 'lucide-react';

interface PageHeaderProps {
  onSuccess: (newSubscriber: Subscriber) => void;
  onEnterSelectMode: () => void;
  onOpenDeleteAllDialog: () => void;
  isSelectMode: boolean;
  onCancelSelectMode: () => void;
  onProceedDelete: () => void;
  isDeleting: boolean;
}

export function PageHeader({ 
  onSuccess, 
  onEnterSelectMode, 
  onOpenDeleteAllDialog, 
  isSelectMode, 
  onCancelSelectMode, 
  onProceedDelete, 
  isDeleting 
}: PageHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Subscribers</h1>
      <div className="flex gap-2">
        {!isSelectMode && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild><Button variant="outline">Delete</Button></DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={onEnterSelectMode}>Delete Selected</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-500" onClick={onOpenDeleteAllDialog}>Delete All</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild><Button>New Subscriber</Button></DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Subscriber</DialogTitle>
                  <DialogDescription>Add a new person to your mailing list here.</DialogDescription>
                </DialogHeader>
                <CreateSubscriberForm setOpen={setOpen} onSuccess={onSuccess} />
              </DialogContent>
            </Dialog>
          </>
        )}
        {isSelectMode && (
          <>
            <Button variant="ghost" onClick={onCancelSelectMode}>Cancel</Button>
            <Button variant="destructive" onClick={onProceedDelete} disabled={isDeleting}>
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Proceed Delete
            </Button>
          </>
        )}
      </div>
    </div>
  );
}