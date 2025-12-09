import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, writeBatch, Timestamp, query, where, getDocs, doc, runTransaction, increment, DocumentData } from 'firebase/firestore';
import Papa from 'papaparse';
import { z } from 'zod';
import { sanitizeInput, sanitizeEmail } from '@/lib/sanitize';
import { BATCH_OPERATIONS } from '@/lib/constants';

type ExistingSubscriber = { id: string; data: DocumentData };

const subscriberSchema = z.object({
  fullName: z.string().min(1, "Name must be at least 1 characters."),
  email: z.string().refine((val) => val.includes('@') && val.includes('.'), {
    message: "Email must be a valid format",
  }),
  status: z.enum(["subscribed", "unsubscribed", "pending", "test"]),
});

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded.' }, { status: 400 });
    }

    // FIX: Check file size before processing
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB limit
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: 'File size exceeds 5MB limit. Please upload a smaller file.' },
        { status: 413 }
      );
    }

    const fileText = await file.text();

    const parseResult = Papa.parse(fileText, {
      header: true,
      skipEmptyLines: true,
      transform: (value) => value.trim(),
    });

    // FIX: Limit number of rows
    const MAX_ROWS = 10000;
    if (parseResult.data.length > MAX_ROWS) {
      return NextResponse.json(
        { message: `CSV exceeds maximum of ${MAX_ROWS} rows. Please split your file.` },
        { status: 400 }
      );
    }

    const validation = z.array(subscriberSchema).safeParse(parseResult.data);
    if (!validation.success) {
      console.error("Zod Validation Error:", validation.error.issues);
      return NextResponse.json({ message: validation.error.issues[0].message }, { status: 400 });
    }
    
    const subscribersFromCsv = validation.data;
    const totalRows = subscribersFromCsv.length;

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const subscribersRef = collection(db, 'subscribers');
          
          const emailChunks = chunkArray(subscribersFromCsv.map(s => s.email), 30);
          const existingSubscribers = new Map<string, ExistingSubscriber>();
          for (const chunk of emailChunks) {
              if (chunk.length === 0) continue;
              const q = query(subscribersRef, where('email', 'in', chunk));
              const snapshot = await getDocs(q);
              snapshot.docs.forEach(doc => existingSubscribers.set(doc.data().email, { id: doc.id, data: doc.data() }));
          }

          let successCount = 0;
          let updatedCount = 0;
          let skippedCount = 0;

          // Track counter changes BEFORE any writes
          let subscribedDelta = 0;
          let unsubscribedDelta = 0;
          let pendingDelta = 0;
          let testDelta = 0;
          const opsToPerform: Array<{ type: 'set' | 'update'; ref: string; data: any }> = [];

          for (let i = 0; i < totalRows; i++) {
            const subscriber = subscribersFromCsv[i];
            
            const progressMessage = `data: {"message": "Processing ${i + 1} of ${totalRows}..."}\n\n`;
            controller.enqueue(encoder.encode(progressMessage));

            // FIX: Sanitize input before processing
            const sanitizedEmail = sanitizeEmail(subscriber.email);
            const sanitizedName = sanitizeInput(subscriber.fullName);

            if (!sanitizedEmail) {
              skippedCount++;
              continue;
            }

            const existing = existingSubscribers.get(sanitizedEmail);

            if (existing) {
              if (existing.data.status !== subscriber.status) {
                opsToPerform.push({
                  type: 'update',
                  ref: existing.id,
                  data: { 
                    fullName: sanitizedName, 
                    status: subscriber.status,
                    updatedAt: Timestamp.now()
                  }
                });
                updatedCount++;
                
                // Update deltas
                if(subscriber.status === 'subscribed') subscribedDelta++;
                if(subscriber.status === 'unsubscribed') unsubscribedDelta++;
                if(subscriber.status === 'pending') pendingDelta++;
                if(subscriber.status === 'test') testDelta++;
                
                if(existing.data.status === 'subscribed') subscribedDelta--;
                if(existing.data.status === 'unsubscribed') unsubscribedDelta--;
                if(existing.data.status === 'pending') pendingDelta--;
                if(existing.data.status === 'test') testDelta--;
              } else {
                skippedCount++;
              }
            } else {
              opsToPerform.push({
                type: 'set',
                ref: doc(subscribersRef).id, // Get ref before batch
                data: {
                  email: sanitizedEmail,
                  fullName: sanitizedName,
                  status: subscriber.status,
                  createdAt: Timestamp.now(),
                  updatedAt: Timestamp.now()
                }
              });
              successCount++;

              if(subscriber.status === 'subscribed') subscribedDelta++;
              if(subscriber.status === 'unsubscribed') unsubscribedDelta++;
              if(subscriber.status === 'pending') pendingDelta++;
              if(subscriber.status === 'test') testDelta++;
            }
          }

          // FIX: Use transaction to atomically write all changes + update metadata
          await runTransaction(db, async (transaction) => {
            // Execute all pending operations
            for (const op of opsToPerform) {
              const docRef = doc(subscribersRef, op.ref);
              if (op.type === 'set') {
                transaction.set(docRef, op.data);
              } else {
                transaction.update(docRef, op.data);
              }
            }

            // Update metadata in same transaction
            const metadataRef = doc(db, 'metadata', 'subscribers');
            transaction.update(metadataRef, {
                subscribedCount: increment(subscribedDelta),
                unsubscribedCount: increment(unsubscribedDelta),
                pendingCount: increment(pendingDelta),
                testCount: increment(testDelta)
            });
          });

          const finalMessage = `data: {"message": "Import complete!", "success": ${successCount}, "updated": ${updatedCount}, "skipped": ${skippedCount}, "done": true}\n\n`;
          controller.enqueue(encoder.encode(finalMessage));
          controller.close();
        } catch (streamError) {
            console.error('Stream Error:', streamError);
            const errorMessage = `data: {"message": "An error occurred during import.", "error": true, "done": true}\n\n`;
            controller.enqueue(encoder.encode(errorMessage));
            controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
    });
  } catch (error) {
    console.error('Import API Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}