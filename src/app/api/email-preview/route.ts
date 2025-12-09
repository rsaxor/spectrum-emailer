import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const templateName = searchParams.get('name');

  if (!templateName) {
    return NextResponse.json({ error: 'Missing template name' }, { status: 400 });
  }

  try {
    // Read HTML template from disk
    const filePath = path.join(process.cwd(), 'netlify', 'functions', 'send-newsletters-batch', 'emails', templateName);
    let htmlBody = await fs.readFile(filePath, 'utf-8');

    // FIX: Determine image URL based on environment
    let imageBaseUrl: string;
    
    if (process.env.NODE_ENV === 'development') {
      // LOCAL: Use public folder path
      imageBaseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    } else {
      // LIVE: Use live URL for images
      imageBaseUrl = process.env.LIVE_URL || 'https://emailer.spectrumdubai.com';
    }

    // Replace {{host}} with proper image URL
    let previewHtml = htmlBody.replace(/{{host}}/g, imageBaseUrl);

    // Replace other placeholders with safe defaults
    previewHtml = previewHtml
      .replace(/{{fullName}}/g, 'Preview Name')
      .replace(/{{entity}}/g, 'Spectrum')
      .replace(/{{entityImg}}/g, 'spectrum.png')
      .replace(/{{unsubscribeLink}}/g, '#')
      .replace(/{{resubscribe}}/g, '#');

    // FIX: Add CSS to handle missing images gracefully
    const cssOverride = `
      <style>
        img { 
          max-width: 100%; 
          height: auto; 
          display: block;
        }
        /* Placeholder styling for newsletter images */
        img[src*="/newsletter/"] {}
      </style>
    `;

    // Insert CSS before closing </head> tag
    previewHtml = previewHtml.replace('</head>', `${cssOverride}</head>`);

    return new Response(previewHtml, {
      headers: { 'Content-Type': 'text/html' },
    });
  } catch (err) {
    console.error('Preview error:', err);
    return NextResponse.json({ error: 'Template not found' }, { status: 404 });
  }
}
