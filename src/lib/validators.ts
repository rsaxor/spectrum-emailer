/**
 * Comprehensive input validation utilities.
 */

/**
 * RFC 5322 simplified regex for email validation.
 * Allows most valid email formats without being overly strict.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates email format.
 */
export function isValidEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim().toLowerCase();
  return trimmed.length > 0 && trimmed.length <= 254 && EMAIL_REGEX.test(trimmed);
}

/**
 * Validates full name (minimum 2 characters, max 100).
 */
export function isValidFullName(name: string): boolean {
  if (typeof name !== 'string') return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
}

/**
 * Validates subscriber status.
 */
export function isValidStatus(status: string): status is 'subscribed' | 'unsubscribed' | 'pending' | 'test' {
  return ['subscribed', 'unsubscribed', 'pending', 'test'].includes(status);
}

/**
 * Validates CSV row data.
 */
export interface CsvRow {
  fullName: string;
  email: string;
  status: string;
}

export function isValidCsvRow(row: CsvRow): {
  valid: boolean;
  error?: string;
} {
  if (!isValidFullName(row.fullName)) {
    return { valid: false, error: 'Invalid full name (2-100 characters required)' };
  }
  if (!isValidEmail(row.email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  if (!isValidStatus(row.status)) {
    return { valid: false, error: `Invalid status. Must be one of: subscribed, unsubscribed, pending, test` };
  }
  return { valid: true };
}

/**
 * Validates page number.
 */
export function isValidPageNumber(page: unknown): boolean {
  if (typeof page !== 'number') return false;
  return Number.isInteger(page) && page >= 1;
}

/**
 * Validates batch size.
 */
export function isValidBatchSize(size: unknown): boolean {
  if (typeof size !== 'number') return false;
  return Number.isInteger(size) && size > 0 && size <= 500;
}
