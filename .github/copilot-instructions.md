# Spectrum Emailer - AI Coding Agent Instructions

## Project Overview

**Spectrum Multi-Entity Emailer** is a Next.js 16 + Firebase Firestore + Resend email management system for sending newsletters to multiple business entities (Spectrum, TCC, HOS) with subscriber management, dynamic personalization, and bulk operations.

**Stack:** Next.js (App Router), TypeScript, Tailwind CSS, shadcn/ui, Firebase Firestore, Resend email service, pnpm

---

## Architecture & Data Flow

### Multi-Entity Context Pattern
- **Location:** `src/context/EntityContext.tsx`
- The app uses React Context to manage selected entity (`'All' | 'Spectrum' | 'TCC' | 'HOS'`)
- Entity is persisted to localStorage and controls which subscribers are targeted
- All admin features must respect the current entity selection

### Authentication & Middleware
- **Location:** `src/middleware.ts`
- Server-side cookie-based auth (`isLoggedIn` cookie)
- Logged-out users redirect from `/admin/*` to login at `/`
- Logged-in users redirect from `/` to `/admin/dashboard`

### Subscriber Data Model
- **Collection:** `subscribers` in Firestore
- **Fields:** `id`, `fullName`, `email`, `status` (`'subscribed' | 'unsubscribed' | 'pending' | 'test'`), `createdAt` (Timestamp)
- **Key Operations:** `src/lib/subscriber.service.ts` provides paginated queries, sorting, and counts by status

### Email Personalization Pipeline
1. **Template Storage:** HTML files in `netlify/functions/send-newsletters-batch/emails/` (e.g., `spec0001.html`)
2. **Placeholder Tokens:** `{{fullName}}`, `{{unsubscribeLink}}`, `{{resubscribe}}`, `{{host}}`
3. **Personalization in `src/app/api/send/route.ts`:**
   - Development mode: Sends 1 test email after simulating 5 sends with progress streaming
   - Production mode: Iterates subscribers, replaces placeholders per subscriber, batches via Resend
4. **Streaming Response:** API uses ReadableStream to send real-time progress updates

### Batch Email Sending
- **Location:** `src/app/api/send/route.ts` (POST)
- **Input:** `{ templateName, subject, entity, sendStatus }`
- **Filtering:** Fetches subscribers matching entity and status from Firestore
- **Rate Limiting:** 500ms sleep between sends to respect Resend's API
- **Output:** JSON stream with progress messages for UI consumption

---

## Critical Developer Workflows

### Development Server
```bash
pnpm install        # Install dependencies
pnpm dev            # Start dev server (--turbopack enabled)
NODE_ENV=development  # Sends test emails only
```

### Build Process
```bash
pnpm build          # Runs script/bundle-emails.mjs, then next build --turbopack
```
**Important:** `script/bundle-emails.mjs` must run before Next.js build to generate `netlify/functions/send-newsletters-batch/generated-emails.ts` from HTML template files. If new templates are added, this script auto-discovers them.

### Adding Email Templates
1. Create `.html` file in `netlify/functions/send-newsletters-batch/emails/`
2. Run `pnpm build` (auto-discovered by bundler)
3. Template filename becomes the `templateName` parameter in send API

### Environment Variables Required
- **Firebase:** `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY`
- **Resend:** `RESEND_API_KEY`, `RESEND_EMAIL_ACCT`
- **URLs:** `NEXT_PUBLIC_BASE_URL` (dev: `http://localhost:3000`), `NEWSLETTER_EMAIL`
- **Security:** `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` (Cloudflare bot protection)
- **Mode:** `NODE_ENV` (`development` = test sends, `production` = live sends)

### Database Admin Access
- Firebase Firestore admin initialized in `src/lib/firebase-admin.ts`
- Uses Firebase Admin SDK (service account credentials)
- Server-side API routes access via `getDbAdmin()` function

---

## Project-Specific Patterns & Conventions

### CSV Import/Export Pattern
- **Import:** `src/app/api/subscribers/import/route.ts` uses PapaParse to validate CSV
- **Export:** `src/app/api/subscribers/export/route.ts` builds CSV from Firestore query
- **Deduplication:** Import checks if email exists via Firestore query before adding
- **Transactional Updates:** Count increments use Firestore transactions

### Cursor-Based Pagination
- **Not offset-based** — uses Firestore cursor (last visible document) for scalability
- **Service method:** `getSubscribersPaginated(status, lastVisible, limitSize, sortBy, orderDir)`
- **UI:** `src/components/ui/pagination.tsx` navigates via cursor, not page numbers
- **Sorting:** Dynamic sort column support — not limited to `createdAt`

### Table Management with Sorting & Filtering
- **Component:** `src/app/admin/subscribers/subscribers-table.tsx`
- **State:** Manages `sortBy`, `order`, `status` filter, pagination cursor
- **UI Pattern:** Click column header to toggle sort; dropdown to filter by status

### Form Patterns with Zod Validation
- Most forms use Zod schemas for client/server validation
- Example: subscriber creation/edit forms validate `fullName`, `email`, `status`

### Client-Side vs. Server-Side
- **Server Components** (RSC): Data fetching (dashboard stats, initial table loads)
- **Client Components** (`'use client'`): Interactive forms, sorting, selection, real-time updates
- **API Routes:** All Firestore/Resend logic happens server-side in route handlers

---

## Key Files by Responsibility

| File | Purpose |
|------|---------|
| `src/middleware.ts` | Auth guard for `/admin/*` and login redirect |
| `src/context/EntityContext.tsx` | Global entity selection state |
| `src/lib/subscriber.service.ts` | Firestore subscriber queries (paginate, count, stats) |
| `src/lib/firebase-admin.ts` | Firestore admin SDK initialization |
| `src/app/api/send/route.ts` | Email sending (dev/prod modes, streaming progress) |
| `src/app/api/subscribers/import/route.ts` | CSV bulk import with deduplication |
| `src/app/api/subscribers/export/route.ts` | CSV download of all subscribers |
| `src/app/admin/subscribers/subscribers-table.tsx` | Sortable, paginated table with bulk select |
| `script/bundle-emails.mjs` | Build-time email template discovery |
| `netlify/functions/send-newsletters-batch/emails/` | HTML email templates (discovered by bundle script) |

---

## Common Tasks & Implementation Patterns

### Adding a New Admin Page
1. Create folder under `src/app/admin/[feature]/`
2. Add `page.tsx` (server component for initial load) and client components as needed
3. Use `useEntity()` hook to filter data by selected entity
4. Protect via middleware (already covers `/admin/*`)

### Sending Emails with Personalization
- Call `POST /api/send` with `{ templateName, subject, entity, sendStatus }`
- API streams progress; connect EventSource client to consume `data:` messages
- Each message is JSON: `{ message: "Sending X of Y...", count, total }`

### Bulk Operations (Delete, Status Change)
- Batch writes use Firestore `writeBatch()` to atomically update multiple docs
- Transactional counts use `runTransaction()` to keep `subscribers` count in sync
- Example: `src/app/api/subscribers/[id]/route.ts` (PUT method)

### Accessing Firestore in API Routes
```ts
import { getDbAdmin } from '@/lib/firebase-admin';
const db = getDbAdmin();
const ref = db.collection('subscribers');
```

---

## Debugging & Testing

### Test Emails
- Set `NODE_ENV=development` to send only 1 test email (simulates 5 for UX)
- Test email sent to admin's Resend account
- Useful for validating template personalization before live sends

### Common Issues
- **Middleware redirect loops:** Check `isLoggedIn` cookie presence and routing logic
- **Missing templates:** Verify template `.html` files exist in `netlify/functions/send-newsletters-batch/emails/` and `pnpm build` was run
- **Firebase permission errors:** Verify `FIREBASE_CLIENT_EMAIL` and `FIREBASE_PRIVATE_KEY` are set correctly
- **CSV import fails:** Check CSV headers match expected fields (`fullName`, `email`, `status`)

### Logging
- API routes use `console.error()` for exceptions
- Frontend uses `sonner` toast library for user feedback
- Check browser console and server logs for debugging

---

## Integration Points

- **Firebase Firestore:** Subscriber data, counts, and transactional operations
- **Resend:** Email delivery via API (batched, rate-limited)
- **Cloudflare Turnstile:** Bot protection on public subscribe/unsubscribe pages
- **CSV with PapaParse:** Client-side parsing for import previews

---

## Notes for AI Agents

- **Always respect entity selection:** Filter queries and UI by the context entity
- **Streaming is important:** Email send API returns streaming responses for UX feedback
- **No database migrations:** Changes to Firestore schema require manual collection/field additions
- **Template discovery is build-time:** New email templates require `pnpm build` to be discovered
- **Cursor-based pagination is non-trivial:** Don't assume offset-based pagination; use Firestore cursor APIs
- **Personalization is string replacement:** Template system is simple but powerful — document new tokens clearly
