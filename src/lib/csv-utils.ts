/**
 * Split an array into chunks of specified size.
 * Useful for batch processing and API rate limiting.
 */
export function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/**
 * Escape CSV field values to handle commas, quotes, and newlines.
 */
export function escapeCsvField(field: unknown): string {
  if (field === null || field === undefined) {
    return '';
  }
  const stringField = String(field);
  if (/[",\n\r]/.test(stringField)) {
    return `"${stringField.replace(/"/g, '""')}"`;
  }
  return stringField;
}

/**
 * Convert JSON array to CSV string.
 */
export function jsonToCsv<T extends Record<string, any>>(items: T[]): string {
  if (items.length === 0) return '';
  
  const header = Object.keys(items[0]);
  const csvRows = [
    header.join(','),
    ...items.map(row => 
      header.map(fieldName => escapeCsvField(row[fieldName])).join(',')
    )
  ];
  
  return csvRows.join('\r\n');
}
