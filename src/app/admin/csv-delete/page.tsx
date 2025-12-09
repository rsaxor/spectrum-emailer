'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function CsvDeletePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleInitialClick = () => {
    if (!file) {
      toast.error('Please select a file first.');
      return;
    }
    setIsConfirmOpen(true);
  };

  const handleProceedDelete = async () => {
    setIsConfirmOpen(false);
    if (!file) return;

    setIsProcessing(true);
    const formData = new FormData();
    formData.append('file', file);
    
    const toastId = toast.loading("Analyzing file...");

    fetch('/api/subscribers/delete-csv', {
      method: 'POST',
      body: formData,
    }).then(response => {
      if (!response.ok || !response.body) {
        throw new Error("Process failed to start.");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      function processStream() {
        reader.read().then(({ done, value }) => {
          if (done) {
            setIsProcessing(false);
            setFile(null);
            const fileInput = document.getElementById('csv-file') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
            return;
          }
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n\n');
          
          lines.forEach(line => {
            if (line.startsWith('data:')) {
              try {
                const json = JSON.parse(line.substring(5));

                if (json.error) {
                    toast.error(json.message, { id: toastId, duration: 5000 });
                } else if (json.done) {
                  toast.success(`Deleted: ${json.deleted} | Not Found: ${json.notFound}`, {
                    id: toastId,
                    duration: 10000,
                    icon: <Trash2 className="h-4 w-4" />,
                  });
                } else {
                  toast.loading(json.message, { id: toastId });
                }
              } catch (e) {
                console.error("Failed to parse SSE chunk", e);
              }
            }
          });

          processStream();
        });
      }
      processStream();
    }).catch(() => { // FIX 3: Removed unused 'err' variable
        toast.error("Process failed.", { id: toastId });
        setIsProcessing(false);
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-red-600 flex items-center gap-2">
        <Trash2 /> Bulk Delete by CSV
      </h1>
      
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Danger Zone: Bulk Delete</CardTitle>
          <CardDescription>
            {/* FIX: Escaped single quotes */}
            Upload a CSV file containing an <strong>email</strong> column. Any email in the file that matches a subscriber in the database will be <strong>permanently deleted</strong>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            {/* FIX: Escaped single quotes in JSX attribute */}
            <Label htmlFor="csv-file">CSV File (must have &apos;email&apos; header)</Label>
            <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} />
          </div>
          <Button 
            onClick={handleInitialClick} 
            disabled={!file || isProcessing}
            variant="destructive"
          >
            {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Trash2 className="mr-2 h-4 w-4" />}
            Delete Matching Subscribers
          </Button>
        </CardContent>
      </Card>

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
                <AlertTriangle className="h-5 w-5" /> Warning: Irreversible Action
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all subscribers found in your CSV file from the database.
              <br /><br />
              This action cannot be undone. Are you absolutely sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleProceedDelete} className="bg-red-600 hover:bg-red-700">
              Yes, Delete Them
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}