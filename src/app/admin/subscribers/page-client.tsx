'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { CreateSubscriberForm } from './create-subscriber-form';
import { FilterTabs } from './filter-tabs'; // Ensure this is imported

export function PageClientContent() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Subscribers</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>New Subscriber</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Subscriber</DialogTitle>
              <DialogDescription>
                Add a new person to your mailing list here.
              </DialogDescription>
            </DialogHeader>
            <CreateSubscriberForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Add the filter tabs back here */}
      <FilterTabs />
    </div>
  );
}