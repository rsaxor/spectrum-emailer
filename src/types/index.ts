/**
 * Shared type definitions for the application
 */

export const ENTITIES = {
  ALL: 'All',
  SPECTRUM: 'Spectrum',
  TCC: 'TCC',
  HOS: 'HOS',
} as const;

export type Entity = typeof ENTITIES[keyof typeof ENTITIES];

export const SUBSCRIBER_STATUSES = {
  SUBSCRIBED: 'subscribed',
  UNSUBSCRIBED: 'unsubscribed',
  PENDING: 'pending',
  TEST: 'test',
} as const;

export type SubscriberStatus = typeof SUBSCRIBER_STATUSES[keyof typeof SUBSCRIBER_STATUSES];

export const JOB_STATUSES = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
} as const;

export type JobStatus = typeof JOB_STATUSES[keyof typeof JOB_STATUSES];
