import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

// Define a specific type for the data being converted to CSV
type CsvSubscriber = {
  id: string;
  fullName: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

function escapeCsvField(field: unknown): string {
  if (field === null || field === undefined) {
    return '';
  }
  const stringField = String(field);
  if (/[",\n\r]/.test(stringField)) {
    return `"${stringField.replace(/"/g, '""')}"`;
  }
  return stringField;
}

// Use the specific CsvSubscriber type here
function jsonToCsv(items: CsvSubscriber[]): string {
  if (items.length === 0) return '';
  
  const header = Object.keys(items[0]);
  const csvRows = [
    header.join(','),
    ...items.map(row => 
      header.map(fieldName => escapeCsvField(row[fieldName as keyof CsvSubscriber])).join(',')
    )
  ];
  
  return csvRows.join('\r\n');
}

export async function GET() {
  try {
    const subscribersRef = collection(db, 'subscribers');
    const q = query(subscribersRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    // Ensure the mapped data conforms to the CsvSubscriber type
    const subscribers: CsvSubscriber[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            fullName: data.fullName,
            email: data.email,
            status: data.status,
            createdAt: data.createdAt.toDate().toISOString(),
            updatedAt: data.updatedAt.toDate().toISOString(),
        };
    });

    if (subscribers.length === 0) {
        return new NextResponse("No subscribers to export.", { status: 200 });
    }

    const csvData = jsonToCsv(subscribers);

    const response = new NextResponse(csvData, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="subscribers_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });

    return response;

  } catch (error) {
    console.error('Export API Error:', error);
    return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
  }
}