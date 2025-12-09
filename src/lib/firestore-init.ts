import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

/**
 * Ensures the metadata document exists in Firestore.
 * Should be called on first app load or when metadata is missing.
 */
export async function ensureMetadataExists() {
  try {
    const metadataRef = doc(db, 'metadata', 'subscribers');
    const docSnap = await getDoc(metadataRef);

    if (!docSnap.exists()) {
      // Initialize with zeros
      await setDoc(metadataRef, {
        subscribedCount: 0,
        unsubscribedCount: 0,
        pendingCount: 0,
        testCount: 0,
        createdAt: new Date(),
      });
      console.log('✅ Metadata document initialized');
    }
  } catch (error) {
    console.error('Error initializing metadata:', error);
  }
}
