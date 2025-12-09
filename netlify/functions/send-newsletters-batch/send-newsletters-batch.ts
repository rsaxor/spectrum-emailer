import { getDbAdmin } from '../../../src/lib/firebase-admin';
import { Resend } from 'resend';
import { emailTemplates } from './generated-emails'; // Import the bundled templates

const resend = new Resend(process.env.RESEND_API_KEY!);
const newsletterEmailAdrs = process.env.NEWSLETTER_EMAIL!;

type Subscriber = {
  id: string;
  fullName: string;
  email: string;
};

type NewsletterJob = {
  templateName: string;
  subject: string;
  entity: string;
  sendStatus: string;
  status: 'pending' | 'completed' | 'failed';
  sentCount?: number;
  totalSubscribers?: number;
  lastProcessedIndex?: number; // NEW: Track position safely
};

// Helper function to split an array into smaller chunks
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export const handler = async () => {
  const dbAdmin = getDbAdmin();
  console.log('✅ Running newsletter batch sender...');

  let jobId: string | null = null;

  try {
    // 1. Fetch a pending newsletter job
    const jobsRef = dbAdmin.collection('newsletterJobs');
    const snapshot = await jobsRef.where('status', '==', 'pending').limit(1).get();

    if (snapshot.empty) {
      console.log('No pending newsletter jobs.');
      return { statusCode: 200, body: 'No jobs to process.' };
    }

    const jobDoc = snapshot.docs[0];
    jobId = jobDoc.id;
    const job = jobDoc.data() as NewsletterJob;

    // 2. Load subscribers for this job
    const subsRef = dbAdmin.collection('subscribers');
    const subsSnap = await subsRef.where('status', '==', job.sendStatus).get();
    const subscribers: Subscriber[] = subsSnap.docs.map(doc => ({
      id: doc.id,
      fullName: doc.data().fullName,
      email: doc.data().email,
    }));

    const total = subscribers.length;
    if (total === 0) {
      console.log('No subscribers for this job, marking as complete.');
      await jobsRef.doc(jobId).update({ 
        status: 'completed', 
        sentCount: 0, 
        totalSubscribers: 0,
        lastProcessedIndex: 0 
      });
      return { statusCode: 200, body: 'No subscribers to send.' };
    }

    // 3. Load email template from the bundled code
    const htmlBody = emailTemplates.get(job.templateName);

    if (!htmlBody) {
      throw new Error(`Template "${job.templateName}" not found in bundle.`);
    }

    // 4. Prepare batch sending details
    const batchSize = 100;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const resubscribeLink = `${baseUrl}/subscribe`;
    const senderName = job.entity === 'All' ? 'Spectrum' : job.entity;
    const fromAddress = `${senderName} Team <${newsletterEmailAdrs}>`;
    
    // 5. Start from safe checkpoint
    const startIndex = job.lastProcessedIndex || 0;
    let sentCount = job.sentCount || 0;
    const subscriberChunks = chunkArray(subscribers.slice(startIndex), batchSize);

    for (let chunkIdx = 0; chunkIdx < subscriberChunks.length; chunkIdx++) {
      const chunk = subscriberChunks[chunkIdx];
      
      const emailBatch = chunk.map(sub => {
        const unsubscribeLink = `${baseUrl}/unsubscribe?id=${sub.id}`;
        const personalizedHtml = htmlBody
          .replace(/{{fullName}}/g, sub.fullName)
          .replace(/{{unsubscribeLink}}/g, unsubscribeLink)
          .replace(/{{resubscribe}}/g, resubscribeLink)
          .replace(/{{host}}/g, baseUrl);

        return { from: fromAddress, to: sub.email, subject: job.subject, html: personalizedHtml };
      });

      try {
        await resend.batch.send(emailBatch);
        sentCount += chunk.length;
        const newLastProcessedIndex = startIndex + sentCount;

        console.log(`Sent ${sentCount}/${total} emails for job ${jobId}`);

        // FIX: Update progress atomically with index checkpoint
        await jobsRef.doc(jobId).update({ 
          sentCount,
          lastProcessedIndex: newLastProcessedIndex
        });

        await new Promise(res => setTimeout(res, 1000));
      } catch (err) {
        console.error('Error sending batch:', err);
        // Update job with failed status but keep progress
        await jobsRef.doc(jobId).update({ 
          status: 'failed',
          sentCount,
          lastProcessedIndex: startIndex + sentCount
        });
        throw err;
      }
    }

    // 7. Mark job as completed
    if (sentCount >= total) {
      await jobsRef.doc(jobId).update({ 
        status: 'completed', 
        totalSubscribers: total,
        lastProcessedIndex: total 
      });
      console.log(`✅ Job ${jobId} completed!`);
    }

    return { statusCode: 200, body: `Processed job ${jobId}, sent ${sentCount}/${total}` };

  } catch (error) {
    console.error('Newsletter batch sender error:', error);
    if (jobId) {
      await dbAdmin.collection('newsletterJobs').doc(jobId).update({ 
        status: 'failed' 
      }).catch(err => console.error('Failed to mark job as failed:', err));
    }
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};