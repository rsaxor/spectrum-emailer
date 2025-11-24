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
  status: 'pending' | 'completed';
  sentCount?: number;
  totalSubscribers?: number;
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

  try {
    // 1. Fetch a pending newsletter job
    const jobsRef = dbAdmin.collection('newsletterJobs');
    const snapshot = await jobsRef.where('status', '==', 'pending').limit(1).get();

    if (snapshot.empty) {
      console.log('No pending newsletter jobs.');
      return { statusCode: 200, body: 'No jobs to process.' };
    }

    const jobDoc = snapshot.docs[0];
    const jobId = jobDoc.id;
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
      await jobsRef.doc(jobId).update({ status: 'completed', sentCount: 0, totalSubscribers: 0 });
      return { statusCode: 200, body: 'No subscribers to send.' };
    }

    // 3. Load email template from the bundled code (no more filesystem access)
    const htmlBody = emailTemplates.get(job.templateName);

    if (!htmlBody) {
      throw new Error(`Template "${job.templateName}" not found in bundle.`);
    }

    // 4. Prepare batch sending details
    const batchSize = 100; // Resend's max batch size
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const resubscribeLink = `${baseUrl}/subscribe`;
    const senderName = job.entity === 'All' ? 'Spectrum' : job.entity;
    const fromAddress = `${senderName} Team <${newsletterEmailAdrs}>`;
    
    // 5. Start from previous sent count
    let sentCount = job.sentCount || 0;
    const subscriberChunks = chunkArray(subscribers.slice(sentCount), batchSize);

    for (const chunk of subscriberChunks) {
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

        console.log(`Sent ${sentCount}/${total} emails for job ${jobId}`);

        // 6. Update progress in Firestore
        await jobsRef.doc(jobId).update({ sentCount });

        // Pause to avoid API rate limits
        await new Promise(res => setTimeout(res, 1000));
      } catch (err) {
        console.error('Error sending batch:', err);
        throw err; // Stop the function if a batch fails
      }
    }

    // 7. Mark job as completed
    if (sentCount >= total) {
      await jobsRef.doc(jobId).update({ status: 'completed', totalSubscribers: total });
      console.log(`✅ Job ${jobId} completed!`);
    }

    return { statusCode: 200, body: `Processed job ${jobId}, sent ${sentCount}/${total}` };

  } catch (error) {
    console.error('Newsletter batch sender error:', error);
    // You can also update the job in Firestore to 'failed' here if you get the jobId
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};