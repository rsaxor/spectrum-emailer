import fs from 'fs/promises';
import path from 'path';

const emailsDir = path.join(process.cwd(), 'netlify', 'functions', 'send-newsletters-batch', 'emails');
const outputFile = path.join(process.cwd(), 'netlify', 'functions', 'send-newsletters-batch', 'generated-emails.ts');

async function bundleEmails() {
  try {
    const files = await fs.readdir(emailsDir);
    const htmlFiles = files.filter(file => file.endsWith('.html'));

    let outputContent = 'export const emailTemplates = new Map<string, string>();\n\n';

    for (const file of htmlFiles) {
      const filePath = path.join(emailsDir, file);
      const content = await fs.readFile(filePath, 'utf8');
      // Store content in a Map, using the filename as the key
      outputContent += `emailTemplates.set('${file}', \`${content.replace(/`/g, '\\`')}\`);\n`;
    }

    await fs.writeFile(outputFile, outputContent);
    console.log(`✅ Successfully bundled ${htmlFiles.length} email templates.`);
  } catch (error) {
    console.error('❌ Error bundling email templates:', error);
    process.exit(1);
  }
}

bundleEmails();