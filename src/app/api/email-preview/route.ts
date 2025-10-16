import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const templateName = searchParams.get('name');

  if (!templateName) return NextResponse.json({ error: 'Missing template name' }, { status: 400 });

  const filePath = path.join(process.cwd(), 'emails', templateName);

  try {
    const html = await fs.readFile(filePath, 'utf-8');
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }
}
