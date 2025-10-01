import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, writeBatch, Timestamp, query, where, getDocs, doc } from 'firebase/firestore';
import Papa from 'papaparse';
import { z } from 'zod';

const subscriberSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email format."),
  status: z.enum(["subscribed", "unsubscribed", "pending"]),
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

    const fileText = await file.text();

    const parseResult = Papa.parse(fileText, {
      header: true,
      skipEmptyLines: true,
    });

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
          const existingSubscribers = new Map<string, { id: string, data: any }>();
          for (const chunk of emailChunks) {
              if (chunk.length === 0) continue;
              const q = query(subscribersRef, where('email', 'in', chunk));
              const snapshot = await getDocs(q);
              snapshot.docs.forEach(doc => existingSubscribers.set(doc.data().email, { id: doc.id, data: doc.data() }));
          }

          let batch = writeBatch(db);
          let successCount = 0;
          let updatedCount = 0;
          let skippedCount = 0;
          let batchCounter = 0;

          for (let i = 0; i < totalRows; i++) {
            const subscriber = subscribersFromCsv[i];
            
            const progressMessage = `data: {"message": "Processing ${i + 1} of ${totalRows}..."}\n\n`;
            controller.enqueue(encoder.encode(progressMessage));

            const existing = existingSubscribers.get(subscriber.email);

            if (existing) {
              if (existing.data.fullName !== subscriber.fullName || existing.data.status !== subscriber.status) {
                const docRef = doc(db, 'subscribers', existing.id);
                batch.update(docRef, { 
                    fullName: subscriber.fullName, 
                    status: subscriber.status,
                    updatedAt: Timestamp.now()
                });
                updatedCount++;
                batchCounter++;
              } else {
                skippedCount++; // Increment skipped if no update is needed
              }
            } else {
              const docRef = doc(subscribersRef);
              batch.set(docRef, {
                ...subscriber,
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
              });
              successCount++;
              batchCounter++;
            }

            if (batchCounter >= 499) {
              await batch.commit();
              batch = writeBatch(db);
              batchCounter = 0;
            }
          }
          
          if (batchCounter > 0) {
            await batch.commit();
          }

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