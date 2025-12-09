/**
 * Escapes HTML special characters to prevent XSS attacks.
 * Converts: & < > " '
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

/**
 * Sanitizes user input fields before storage/display.
 * Removes any HTML/JS and trims whitespace.
 */
export function sanitizeInput(value: unknown): string {
  if (typeof value !== 'string') return '';
  return escapeHtml(value.trim());
}

/**
 * Validates and sanitizes email addresses.
 * Returns empty string if invalid.
 */
export function sanitizeEmail(email: unknown): string {
  if (typeof email !== 'string') return '';
  const trimmed = email.trim().toLowerCase();
  // RFC 5322 simplified (allows most valid emails)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed) ? trimmed : '';
}
