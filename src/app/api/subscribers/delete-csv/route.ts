import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { 
  collection, 
  writeBatch, 
  query, 
  where, 
  getDocs, 
  runTransaction, 
  increment, 
  doc, 
  DocumentReference, // Import this type
  DocumentData 
} from 'firebase/firestore';
import Papa from 'papaparse';
import { z } from 'zod';

const csvSchema = z.object({
  email: z.string().email("Invalid email format."),
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
      transform: (value) => value.trim(),
    });

    const validation = z.array(csvSchema.passthrough()).safeParse(parseResult.data);
    if (!validation.success) {
      console.error("Zod Validation Error:", validation.error.issues);
      return NextResponse.json({ message: "Invalid CSV format. Ensure you have an 'email' column." }, { status: 400 });
    }
    
    const rows = validation.data;
    const totalRows = rows.length;

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const subscribersRef = collection(db, 'subscribers');
          
          let deletedCount = 0;
          let notFoundCount = 0;
          let subscribedRemoved = 0;
          let unsubscribedRemoved = 0;
          let pendingRemoved = 0;
          let testRemoved = 0;

          const emailChunks = chunkArray(rows.map(r => r.email), 30);
          
          // FIX 1 & 2: Use 'const' and explicit types instead of 'any'
          const docsToDelete: { ref: DocumentReference<DocumentData>; status: string }[] = [];
          let processedCount = 0;

          for (const chunk of emailChunks) {
            if (chunk.length === 0) continue;
            
            const q = query(subscribersRef, where('email', 'in', chunk));
            const snapshot = await getDocs(q);
            
            const foundEmails = new Set();
            
            snapshot.docs.forEach(doc => {
                const data = doc.data();
                foundEmails.add(data.email);
                docsToDelete.push({ ref: doc.ref, status: data.status });
            });

            chunk.forEach(email => {
                if (!foundEmails.has(email)) notFoundCount++;
            });

            processedCount += chunk.length;
            const progressMessage = `data: {"message": "Analyzing ${processedCount} of ${totalRows}..."}\n\n`;
            controller.enqueue(encoder.encode(progressMessage));
          }

          const deleteChunks = chunkArray(docsToDelete, 450);

          for (const chunk of deleteChunks) {
             const batch = writeBatch(db);
             
             chunk.forEach(item => {
                 batch.delete(item.ref);
                 if (item.status === 'subscribed') subscribedRemoved++;
                 if (item.status === 'unsubscribed') unsubscribedRemoved++;
                 if (item.status === 'pending') pendingRemoved++;
                 if (item.status === 'test') testRemoved++;
             });

             await batch.commit();
             
             deletedCount += chunk.length;
             const deleteMsg = `data: {"message": "Deleting... (${deletedCount} done)"}\n\n`;
             controller.enqueue(encoder.encode(deleteMsg));
          }

          if (deletedCount > 0) {
            await runTransaction(db, async (transaction) => {
                const metadataRef = doc(db, 'metadata', 'subscribers');
                transaction.update(metadataRef, {
                    subscribedCount: increment(-subscribedRemoved),
                    unsubscribedCount: increment(-unsubscribedRemoved),
                    pendingCount: increment(-pendingRemoved),
                    testCount: increment(-testRemoved)
                });
            });
          }

          const finalMessage = `data: {"message": "Complete!", "deleted": ${deletedCount}, "notFound": ${notFoundCount}, "done": true}\n\n`;
          controller.enqueue(encoder.encode(finalMessage));
          controller.close();

        } catch (streamError) {
            console.error('Stream Error:', streamError);
            const errorMessage = `data: {"message": "An error occurred.", "error": true, "done": true}\n\n`;
            controller.enqueue(encoder.encode(errorMessage));
            controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache' },
    });
  } catch (error) {
    console.error('CSV Delete API Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}