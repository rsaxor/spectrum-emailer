'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Eye, Send, ArrowUpDown, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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
import { useEntity } from '@/context/EntityContext';
import { fetchWithTimeout } from '@/lib/fetch-with-timeout';
import { REQUEST_TIMEOUTS } from '@/lib/constants';

type Template = {
  name: string;
  createdAt: string;
};

function SortableHeader({
  label,
  value,
  sortBy,
  order,
  onClick,
}: {
  label: string;
  value: string;
  sortBy: string;
  order: string;
  onClick: (sortBy: string) => void;
}) {
  const isSorting = sortBy === value;
  return (
    <TableHead
      onClick={() => onClick(value)}
      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      <div className="flex items-center gap-2">
        {label}
        <ArrowUpDown
          className={`h-4 w-4 text-muted-foreground ${
            isSorting ? "text-foreground" : ""
          }`}
        />
      </div>
    </TableHead>
  );
}

export default function SendNewsletterContent() {
  const [data, setData] = useState<{ templates: Template[]; total: number }>({
    templates: [],
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(
    null
  );
  const [subject, setSubject] = useState("");
  const [sendStatus, setSendStatus] = useState("subscribed");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { entity } = useEntity();

  const page = Number(searchParams.get("page")) || 1;
  const limit = 10;
  const sortBy = searchParams.get("sortBy") || "createdAt";
  const order = searchParams.get("order") || "desc";

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sortBy,
      order,
    });
    try {
      const response = await fetchWithTimeout(
        `/api/emails?${params.toString()}`,
        { timeout: REQUEST_TIMEOUTS.SHORT }
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Failed to fetch templates:", error);
      const message = error instanceof Error ? error.message : "Failed to load email templates.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [page, sortBy, order]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSortChange = (newSortBy: string) => {
    const newOrder =
      sortBy === newSortBy && order === "desc" ? "asc" : "desc";
    const params = new URLSearchParams(searchParams.toString());
    params.set("sortBy", newSortBy);
    params.set("order", newOrder);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(newPage));
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSendClick = (templateName: string) => {
    setSelectedTemplate(templateName);
    setIsAlertOpen(true);
  };

  const handleProceedSend = async () => {
    if (!subject.trim() || !selectedTemplate) {
      return toast.error("Missing subject/template");
    }

    setIsSending(true);
    setIsAlertOpen(false);
    const toastId = toast.loading("Starting newsletter send...");

    try {
      const res = await fetchWithTimeout("/api/bulksend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateName: selectedTemplate,
          subject,
          entity,
          sendStatus,
        }),
        timeout: REQUEST_TIMEOUTS.MEDIUM,
      });

      const data = await res.json();
      const jobId = data.jobId;
      const totalSubscribers = data.totalSubscribers; // Get total from response

      // FIX STEP 2: Start with faster initial poll
      const pollJobStatus = async (jobId: string) => {
        let interval = 100; // START FAST: 100ms instead of 2000ms
        const minInterval = 100;
        const maxInterval = 10000;
        let done = false;
        const maxPollTime = REQUEST_TIMEOUTS.LONG; // 2 minutes max
        const startTime = Date.now();
        let consecutiveNoChange = 0; // Track if progress is stalling

        while (!done) {
          // Check if polling has exceeded max time
          if (Date.now() - startTime > maxPollTime) {
            toast.warning(
              "Poll timeout: Job is still processing. Check status manually.",
              { id: toastId }
            );
            done = true;
            break;
          }

          try {
            const res = await fetchWithTimeout(
              `/api/job-status?id=${jobId}`,
              { timeout: REQUEST_TIMEOUTS.SHORT }
            );
            const statusData = await res.json();

            // FIX STEP 3: Early exit when sent count matches total
            if (
              statusData.sentCount >= statusData.totalSubscribers ||
              statusData.status === "completed"
            ) {
              toast.success(
                `Sent ${statusData.sentCount}/${statusData.totalSubscribers}!`,
                { id: toastId }
              );
              done = true;
            } else if (statusData.status === "failed") {
              toast.error(`Job failed: ${statusData.error || "Unknown error"}`, {
                id: toastId,
              });
              done = true;
            } else {
              // Show progress
              toast.loading(
                `Sending... ${statusData.sentCount}/${statusData.totalSubscribers}`,
                { id: toastId }
              );

              // FIX STEP 4: Dynamic backoff based on progress
              // If progress is being made, poll faster
              if (statusData.sentCount > 0) {
                consecutiveNoChange = 0;
                // Progress detected: increase poll frequency slightly
                interval = Math.max(minInterval, interval * 0.9);
              } else {
                // No progress yet: back off slowly
                consecutiveNoChange++;
                if (consecutiveNoChange > 3) {
                  interval = Math.min(interval * 1.5, maxInterval);
                }
              }
            }

            // Clamp interval within bounds
            interval = Math.max(minInterval, Math.min(interval, maxInterval));
            
            await new Promise(r => setTimeout(r, interval));
          } catch (err) {
            console.error("Poll error:", err);
            // On error, back off more aggressively
            interval = Math.min(interval * 2, maxInterval);
            await new Promise(r => setTimeout(r, interval));
          }
        }

        setIsSending(false);
        setSelectedTemplate(null);
        setSubject("");
      };

      pollJobStatus(jobId);
    } catch (error) {
      console.error("Send error:", error);
      const message = error instanceof Error ? error.message : "Failed to send newsletter.";
      toast.error(message, { id: toastId });
      setIsSending(false);
    }
  };

  const totalPages = Math.ceil(data.total / limit);

  return (
    <TooltipProvider>
      <div>
        <h1 className="text-2xl font-bold mb-6">Send Newsletter</h1>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <SortableHeader
                  label="Template Name"
                  value="name"
                  sortBy={sortBy}
                  order={order}
                  onClick={handleSortChange}
                />
                <SortableHeader
                  label="Date Created"
                  value="createdAt"
                  sortBy={sortBy}
                  order={order}
                  onClick={handleSortChange}
                />
                <TableHead className="text-right w-[100px]">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="h-24 text-center">
                    <Skeleton className="h-full w-full" />
                  </TableCell>
                </TableRow>
              ) : (
                data.templates.map((template) => (
                  <TableRow key={template.name}>
                    <TableCell className="font-medium">
                      {template.name}
                    </TableCell>
                    <TableCell>
                      {format(new Date(template.createdAt), "PPp")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" asChild>
                            <a
                              href={`/api/email-preview?name=${template.name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Eye className="h-4 w-4" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View Template</p>
                        </TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleSendClick(template.name)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Send Newsletter</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1 || isLoading}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(page + 1)}
            disabled={page >= totalPages || isLoading}
          >
            Next
          </Button>
        </div>

        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Newsletter Send</AlertDialogTitle>
              <AlertDialogDescription>
                You are about to send{" "}
                <strong className="text-black">{selectedTemplate}</strong>. Please
                enter a subject line.
              </AlertDialogDescription>
              <AlertDialogDescription>
                Selected entity: <strong className="text-black">{entity}</strong>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid gap-2 pb-4">
              <Label htmlFor="status">Send to:</Label>
              <Select value={sendStatus} onValueChange={setSendStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="subscribed">Subscribed list</SelectItem>
                  <SelectItem value="unsubscribed">Unsubscribed list</SelectItem>
                  <SelectItem value="pending">Pending list</SelectItem>
                  <SelectItem value="test">Test list</SelectItem>
                </SelectContent>
              </Select>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Your amazing newsletter subject"
              />
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleProceedSend} disabled={isSending}>
                {isSending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Send
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
}
