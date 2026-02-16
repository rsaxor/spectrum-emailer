import { getDbAdmin } from '@/lib/firebase-admin';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

interface DuplicateGroup {
  email: string;
  count: number;
  records: {
    id: string;
    fullName: string;
    email: string;
    status: string;
    createdAt: any;
  }[];
  toDelete: string[]; // IDs to delete, keeping the latest one
}

/**
 * GET: Find duplicate emails in the subscribers collection
 * Returns a list of emails that appear more than once, with all their records
 */
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.get('isLoggedIn');
    if (!isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const db = getDbAdmin();
    const subscribersRef = db.collection('subscribers');
    
    // Fetch all subscribers
    const snapshot = await subscribersRef.get();
    
    // Group by email to find duplicates
    const emailMap = new Map<string, any[]>();
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      const email = data.email?.toLowerCase() || '';
      
      if (!emailMap.has(email)) {
        emailMap.set(email, []);
      }
      
      emailMap.get(email)!.push({
        id: doc.id,
        fullName: data.fullName,
        email: data.email,
        status: data.status,
        createdAt: data.createdAt,
      });
    });

    // Filter for duplicates and prepare deletion info
    const duplicates: DuplicateGroup[] = [];
    
    emailMap.forEach((records, email) => {
      if (records.length > 1) {
        // Sort by createdAt ascending to identify which to keep (latest)
        const sorted = records.sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(0);
          const dateB = b.createdAt?.toDate?.() || new Date(0);
          return dateA.getTime() - dateB.getTime();
        });

        // Keep the last one (latest), delete the rest
        const toDelete = sorted.slice(0, -1).map((r) => r.id);

        duplicates.push({
          email,
          count: records.length,
          records: sorted.map((r) => ({
            ...r,
            createdAt: r.createdAt?.toDate?.() || null,
          })),
          toDelete,
        });
      }
    });

    return NextResponse.json({
      duplicateCount: duplicates.length,
      totalDuplicateRecords: duplicates.reduce((sum, d) => sum + d.records.length, 0),
      duplicates,
    });
  } catch (error) {
    console.error('Error finding duplicates:', error);
    return NextResponse.json(
      { error: 'Failed to find duplicates' },
      { status: 500 }
    );
  }
}

/**
 * DELETE: Remove duplicate records, keeping only the latest one for each email
 */
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.get('isLoggedIn');
    if (!isLoggedIn) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { duplicates } = await request.json();

    if (!Array.isArray(duplicates) || duplicates.length === 0) {
      return NextResponse.json(
        { error: 'No duplicates provided' },
        { status: 400 }
      );
    }

    const db = getDbAdmin();
    
    // Flatten all IDs to delete
    const allIdsToDelete: string[] = [];
    duplicates.forEach((duplicate: DuplicateGroup) => {
      allIdsToDelete.push(...duplicate.toDelete);
    });

    if (allIdsToDelete.length === 0) {
      return NextResponse.json({
        deletedCount: 0,
        message: 'No records to delete',
      });
    }

    // Delete in batches (Firestore has a limit of 500 writes per batch)
    const batchSize = 500;
    let deletedCount = 0;

    for (let i = 0; i < allIdsToDelete.length; i += batchSize) {
      const batch = db.batch();
      const batch_slice = allIdsToDelete.slice(i, i + batchSize);

      batch_slice.forEach((docId) => {
        batch.delete(db.collection('subscribers').doc(docId));
      });

      await batch.commit();
      deletedCount += batch_slice.length;
    }

    return NextResponse.json({
      deletedCount,
      message: `Deleted ${deletedCount} duplicate records`,
    });
  } catch (error) {
    console.error('Error deleting duplicates:', error);
    return NextResponse.json(
      { error: 'Failed to delete duplicates' },
      { status: 500 }
    );
  }
}
