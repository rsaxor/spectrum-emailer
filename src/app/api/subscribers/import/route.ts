import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, writeBatch, Timestamp, query, where, getDocs, doc } from 'firebase/firestore';
import Papa from 'papaparse';
import { z } from 'zod';

const subscriberSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email format."),
});

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
    
    const newSubscribers = validation.data;
    const totalRows = newSubscribers.length;

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const subscribersRef = collection(db, 'subscribers');
          const batch = writeBatch(db);
          let successCount = 0;
          let skippedCount = 0;

          for (let i = 0; i < totalRows; i++) {
            const subscriber = newSubscribers[i];
            
            const progressMessage = `data: {"message": "Processing ${i + 1} of ${totalRows}..."}\n\n`;
            controller.enqueue(encoder.encode(progressMessage));

            const q = query(subscribersRef, where('email', '==', subscriber.email));
            const existing = await getDocs(q);

            if (existing.empty) {
              const docRef = doc(subscribersRef);
              batch.set(docRef, {
                ...subscriber,
                status: 'subscribed',
                createdAt: Timestamp.now(),
                updatedAt: Timestamp.now()
              });
              successCount++;
            } else {
              skippedCount++;
            }
          }
          
          await batch.commit();

          const finalMessage = `data: {"message": "Import complete!", "success": ${successCount}, "skipped": ${skippedCount}, "done": true}\n\n`;
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