import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const emailsDirectory = path.join(process.cwd(), 'public', 'emails');
    const filenames = await fs.readdir(emailsDirectory);
    
    const htmlFiles = filenames.filter(file => file.endsWith('.html'));

    return NextResponse.json(htmlFiles);
  } catch (error) {
    console.error('Failed to read email templates:', error);
    return NextResponse.json({ message: 'Failed to read email templates.' }, { status: 500 });
  }
}