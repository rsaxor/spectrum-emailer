export interface NewsletterJob {
  jobId: string;
  totalSubscribers: number;
  sentCount?: number;
  createdAt: number;
}

const STORAGE_KEY = 'activeNewsletterJob';

export function saveNewsletterJob(job: NewsletterJob) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(job));
}

export function getNewsletterJob(): NewsletterJob | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
}

export function clearNewsletterJob() {
  localStorage.removeItem(STORAGE_KEY);
}
