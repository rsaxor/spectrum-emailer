# Spectrum Multi-Entity Emailer

A comprehensive, in-house newsletter management system built with Next.js and Firebase. This application provides a secure admin panel for managing subscribers and sending newsletters for multiple business entities.

## Features

-   **Multi-Entity Support:** A global context allows admins to switch between different company entities (Spectrum, TCC, HOS), with the UI and sending logic updating dynamically.
-   **Secure Admin Panel:**
    -   Protected by server-side middleware to prevent unauthorized access.
    -   Secure login with hashed passwords.
-   **Subscriber Management:**
    -   **CRUD Functionality:** Create, read, update, and delete subscribers.
    -   **Advanced Table:** A feature-rich table that includes filtering (by status), sorting (by any column), and efficient cursor-based pagination.
    -   **Bulk Actions:** Select multiple subscribers to delete them in a single, batched operation.
-   **Newsletter Sending:**
    -   **Template Management:** Dynamically lists HTML email templates from the filesystem.
    -   **Dynamic Personalization:** Automatically replaces placeholders like `{{fullName}}` and `{{unsubscribeLink}}` for each subscriber.
-   **Data Management:**
    -   **Export to CSV:** Download the entire subscriber list as a CSV file.
    -   **Import from CSV:** Upload a CSV file to add new subscribers in bulk, with validation and progress tracking.

---

## Technology Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **Database:** [Firebase Firestore](https://firebase.google.com/docs/firestore)
-   **Email Sending:** [Resend](https://resend.com/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Package Manager:** [pnpm](https://pnpm.io/)

---

## Getting Started

### 1. Prerequisites

-   [Node.js](https://nodejs.org/en) (LTS version recommended)
-   [pnpm](https://pnpm.io/installation) installed globally (`npm install -g pnpm`)
-   A Firebase project with Firestore enabled.
-   A Resend account with a verified domain and an API key.

### 2. Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/rsaxor/spectrum-emailer.git](https://github.com/rsaxor/spectrum-emailer.git)
    cd spectrum-emailer
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

### 3. Environment Variables

1.  Create a new file named `.env.local` in the root of the project.
2.  Add the following variables, replacing the placeholder values with your actual credentials.

    ```env
    # Firebase Configuration
    NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
    NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket

    # Firebase ADMIN Configuration
    FIREBASE_CLIENT_EMAIL=your-firebase-admin-client-amail
    FIREBASE_PRIVATE_KEY=your-firebase-admin-private-key

    # base url working locally=http://localhost:3000
    # update with live URL in live env config
    NEXT_PUBLIC_BASE_URL=http://localhost:3000
    NEWSLETTER_EMAIL=email_sender@yourdomain.com

    # Cloudflare Turnstile
    NEXT_PUBLIC_TURNSTILE_SITE_KEY=your-cloudflare-turnstile-site-key
    TURNSTILE_SECRET_KEY=your-cloudflare-turnstile-secret-key

    # Resend
    RESEND_API_KEY=your-api-key
    RESEND_EMAIL_ACCT=your-resend-email-account

    # Node Environment (for local testing)
    # Use 'development' to send test emails, 'production' to send to the live list
    NODE_ENV=development
    ```

### 4. Run the Development Server

```bash
pnpm dev