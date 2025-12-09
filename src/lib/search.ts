/**
 * Debounce function to delay execution until user stops typing
 * @param func - Function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

/**
 * Normalize search query for better matching
 * @param query - Search query
 * @returns Normalized query
 */
export function normalizeSearchQuery(query: string): string {
  return query.trim().toLowerCase();
}

/**
 * Check if text matches search query
 * Supports partial matching
 * @param text - Text to search in
 * @param query - Search query
 * @returns True if text matches query
 */
export function matchesQuery(text: string, query: string): boolean {
  if (!query) return true;
  const normalizedText = normalizeSearchQuery(text);
  const normalizedQuery = normalizeSearchQuery(query);
  return normalizedText.includes(normalizedQuery);
}
