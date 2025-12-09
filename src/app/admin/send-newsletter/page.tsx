'use client';

import { Suspense } from 'react';
import SendNewsletterContent from './send-newsletter-content';

export default function SendNewsletterPage() {
  return (
    <Suspense fallback={<div className="text-center py-10">Loading...</div>}>
      <SendNewsletterContent />
    </Suspense>
  );
}