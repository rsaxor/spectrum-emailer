import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const order = searchParams.get('order') || 'desc';

    const emailsDirectory = path.join(process.cwd(), 'netlify', 'functions', 'send-newsletters-batch', 'emails');
    const filenames = await fs.readdir(emailsDirectory);
    const htmlFiles = filenames.filter(file => file.endsWith('.html'));

    // FIX: Use consistent build timestamp instead of mtime
    // All templates use the same "created" date when bundled
    const buildTime = new Date(2025, 0, 1); // Jan 1, 2025

    const templatesWithDetails = htmlFiles.map((file) => ({
      name: file,
      createdAt: buildTime, // Use consistent timestamp
    }));

    // Sort the templates
    templatesWithDetails.sort((a, b) => {
      if (sortBy === 'name') {
        return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      return order === 'asc' 
        ? a.createdAt.getTime() - b.createdAt.getTime() 
        : b.createdAt.getTime() - a.createdAt.getTime();
    });

    // Paginate the results
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTemplates = templatesWithDetails.slice(startIndex, endIndex);
    const total = templatesWithDetails.length;

    return NextResponse.json({
      templates: paginatedTemplates,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error('Failed to read email templates:', error);
    return NextResponse.json({ message: 'Failed to read email templates.' }, { status: 500 });
  }
}