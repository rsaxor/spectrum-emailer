import fs from 'fs/promises';
import path from 'path';

export const handler = async () => {
  try {
    const functionDir = __dirname;
    const taskDir = '/var/task/';

    console.log('--- Debugging File Paths ---');
    console.log('Current directory (__dirname):', functionDir);
    
    // List all files and folders in the current directory
    const filesInCurrentDir = await fs.readdir(functionDir, { withFileTypes: true });
    console.log('Files in __dirname:', filesInCurrentDir.map(f => f.name));

    // Also list all files and folders in the root /var/task/ directory
    const filesInTaskDir = await fs.readdir(taskDir, { withFileTypes: true });
    console.log('Files in /var/task/:', filesInTaskDir.map(f => f.name));
    
    return { statusCode: 200, body: 'Debug check complete. Check the function logs.' };

  } catch (error: any) {
    console.error('Debug error:', error.message);
    return { statusCode: 500, body: `Error during debug check: ${error.message}` };
  }
};