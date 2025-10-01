'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Upload, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function ExportImportPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleExport = () => {
    window.location.href = '/api/subscribers/export';
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast.error('Please select a file to import.');
      return;
    }

    setIsImporting(true);
    const formData = new FormData();
    formData.append('file', file);
    
    const toastId = toast.loading("Starting import...");

    fetch('/api/subscribers/import', {
      method: 'POST',
      body: formData,
    }).then(response => {
      if (!response.ok || !response.body) {
        throw new Error("Import failed to start.");
      }
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      function processStream() {
        reader.read().then(({ done, value }) => {
          if (done) {
            setIsImporting(false);
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
                    toast.error(json.message, { id: toastId, duration: 10000 });
                } else if (json.done) {
                  toast.success(`Added: ${json.success} | Updated: ${json.updated} | Skipped: ${json.skipped}`, {
                    id: toastId,
                    duration: 10000,
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
    }).catch(err => {
        toast.error("Import failed.", { id: toastId });
        setIsImporting(false);
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Export / Import Subscribers</h1>
      <div className="grid gap-3 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Export Subscribers</CardTitle>
            <CardDescription>
              Download a CSV file of all your current subscribers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export to CSV
            </Button>
          </CardContent>
        </Card>
        <Card className="gap-3">
          <CardHeader>
            <CardTitle>Import Subscribers</CardTitle>
            <CardDescription>
              Upload a CSV file with `fullName`, `email`, and `status` columns.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="csv-file">CSV File</Label>
              <Input id="csv-file" type="file" accept=".csv" onChange={handleFileChange} />
            </div>
            <Button onClick={handleImport} disabled={!file || isImporting}>
              {isImporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              Import from CSV
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}