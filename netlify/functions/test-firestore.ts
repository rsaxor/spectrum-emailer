import { getDbAdmin } from '../../src/lib/firebase-admin';

export const handler = async () => {
  const dbAdmin = getDbAdmin();
  try {
    const snapshot = await dbAdmin.collection('subscribers').limit(1).get();
    const data = snapshot.docs.map(d => d.data());
    console.log('Fetched subscribers:', data);
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    console.error('Firestore read error:', err);
    return { statusCode: 500, body: 'Firestore read failed' };
  }
};
