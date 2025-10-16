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

    const emailsDirectory = path.join(process.cwd(), 'emails');
    const filenames = await fs.readdir(emailsDirectory);
    const htmlFiles = filenames.filter(file => file.endsWith('.html'));

    const templatesWithDetails = await Promise.all(
      htmlFiles.map(async (file) => {
        const filePath = path.join(emailsDirectory, file);
        const stats = await fs.stat(filePath);
        return {
          name: file,
          createdAt: stats.mtime, // Use mtime for modification date
        };
      })
    );

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