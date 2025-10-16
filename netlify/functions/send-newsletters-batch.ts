import { getDbAdmin } from '../../src/lib/firebase-admin';
import { Resend } from 'resend';
import fs from 'fs/promises';
import path from 'path';

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

export const handler = async () => {
  const dbAdmin = getDbAdmin();

  console.log('✅ Running newsletter batch sender...');

  try {
    // 1️⃣ Fetch pending newsletter job
    const jobsRef = dbAdmin.collection('newsletterJobs');
    const snapshot = await jobsRef.where('status', '==', 'pending').limit(1).get();

    if (snapshot.empty) {
      console.log('No pending newsletter jobs.');
      return { statusCode: 200, body: 'No jobs to process.' };
    }

    const jobDoc = snapshot.docs[0];
    const jobId = jobDoc.id;
    const job = jobDoc.data() as NewsletterJob;

    // 2️⃣ Load subscribers for this job
    const subsRef = dbAdmin.collection('subscribers');
    const subsSnap = await subsRef.where('status', '==', job.sendStatus).get();
    const subscribers: Subscriber[] = subsSnap.docs.map(doc => ({
      id: doc.id,
      fullName: doc.data().fullName,
      email: doc.data().email,
    }));

    const total = subscribers.length;
    if (total === 0) {
      console.log('No subscribers for this job.');
      await jobsRef.doc(jobId).update({
        status: 'completed',
        sentCount: 0,
        totalSubscribers: 0,
      });
      return { statusCode: 200, body: 'No subscribers to send.' };
    }

    // 3️⃣ Prepare batch sending
    const batchSize = 500; // safe for Netlify functions
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const liveUrl = baseUrl === 'https://emailer.spectrumdubai.com' ? baseUrl : process.env.LIVE_URL!;
    const resubscribeLink = `${baseUrl}/subscribe`;
    const senderName = job.entity === 'All' ? 'Spectrum' : job.entity;
    const fromAddress = `${senderName} Newsletter <${newsletterEmailAdrs}>`;

    // 4️⃣ Load email template
    const templatePath = path.join(__dirname, '../../public/emails', job.templateName);
    const htmlBody = await fs.readFile(templatePath, 'utf8');

    // 5️⃣ Start from previous sent count
    let sentCount = job.sentCount || 0;

    for (let i = sentCount; i < total; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);

      const emailBatch = batch.map(sub => {
        const unsubscribeLink = `${liveUrl}/unsubscribe?id=${sub.id}`;
        const personalizedHtml = htmlBody
          .replace(/{{fullName}}/g, sub.fullName)
          .replace(/{{unsubscribeLink}}/g, unsubscribeLink)
          .replace(/{{resubscribe}}/g, resubscribeLink)
          .replace(/{{host}}/g, liveUrl);

        return {
          from: fromAddress,
          to: sub.email,
          subject: job.subject,
          html: personalizedHtml,
        };
      });

      try {
        await resend.batch.send(emailBatch);
        sentCount += batch.length;

        console.log(`Sent ${sentCount}/${total} emails for job ${jobId}`);

        // 6️⃣ Update progress in Firestore
        await jobsRef.doc(jobId).update({
          sentCount,
          totalSubscribers: total,
        });

        // 1-second pause to avoid API rate limits
        await new Promise(res => setTimeout(res, 1000));

      } catch (err) {
        console.error('Error sending batch:', err);
        break;
      }

      // Stop early if approaching Netlify 26s execution limit
      if ((i - sentCount) > 400) break;
    }

    // 7️⃣ Mark job completed if all done
    if (sentCount >= total) {
      await jobsRef.doc(jobId).update({
        status: 'completed',
        sentCount,
        totalSubscribers: total,
      });
      console.log(`✅ Job ${jobId} completed!`);
    }

    return { statusCode: 200, body: `Processed job ${jobId}, sent ${sentCount}/${total}` };

  } catch (error) {
    console.error('Newsletter batch sender error:', error);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};
