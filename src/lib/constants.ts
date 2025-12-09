/**
 * Application-wide constants for configuration, timeouts, and limits.
 */

// Request timeouts (in milliseconds)
export const REQUEST_TIMEOUTS = {
  SHORT: 5000,      // 5 seconds for quick operations
  MEDIUM: 30000,    // 30 seconds for normal API calls
  LONG: 120000,     // 2 minutes for batch operations
  POLL: 300000,     // 5 minutes for job polling
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  MAX_CACHED_PAGES: 5,
} as const;

// Batch operations
export const BATCH_OPERATIONS = {
  IMPORT_BATCH_SIZE: 499,
  FIRESTORE_QUERY_CHUNK_SIZE: 30,
  EMAIL_BATCH_SIZE: 100,
  DELETE_BATCH_SIZE: 450,
} as const;

// Email sending
export const EMAIL_CONFIG = {
  RATE_LIMIT_MS: 1000,
  RESEND_MAX_BATCH: 100,
  DEV_MODE_SIMULATED_SENDS: 5,
} as const;

// Entity configuration
export const ENTITIES = {
  ALL: 'All',
  SPECTRUM: 'Spectrum',
  TCC: 'TCC',
  HOS: 'HOS',
} as const;

export type Entity = typeof ENTITIES[keyof typeof ENTITIES];

// Subscriber statuses
export const SUBSCRIBER_STATUS = {
  SUBSCRIBED: 'subscribed',
  UNSUBSCRIBED: 'unsubscribed',
  PENDING: 'pending',
  TEST: 'test',
} as const;

export type SubscriberStatus = typeof SUBSCRIBER_STATUS[keyof typeof SUBSCRIBER_STATUS];

// Job statuses
export const JOB_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export type JobStatus = typeof JOB_STATUS[keyof typeof JOB_STATUS];
