import { Entity, ENTITIES } from '@/types';

export interface EntityImageConfig {
  alt: string;
  img: string;
  width: number;
  height: number;
}

export interface EntityDisplayConfig {
  text: string;
  img: string;
}

/**
 * Entity image configuration for UI display
 */
export const entityImageMap: Record<Entity, EntityImageConfig> = {
  [ENTITIES.ALL]: {
    alt: 'Spectrum Sustainable Print',
    img: '/all.png',
    width: 250,
    height: 150,
  },
  [ENTITIES.SPECTRUM]: {
    alt: 'Spectrum Sustainable Print',
    img: '/spectrum.png',
    width: 80,
    height: 32,
  },
  [ENTITIES.TCC]: {
    alt: 'The Card Co.',
    img: '/tcc.png',
    width: 80,
    height: 32,
  },
  [ENTITIES.HOS]: {
    alt: 'House of Spectrum',
    img: '/hos.png',
    width: 80,
    height: 32,
  },
} as const;

/**
 * Entity display text configuration
 */
export const entityDisplayMap: Record<Entity, EntityDisplayConfig> = {
  [ENTITIES.ALL]: {
    text: 'Spectrum Sustainable Print',
    img: 'all.png',
  },
  [ENTITIES.SPECTRUM]: {
    text: 'Spectrum Sustainable Print',
    img: 'spectrum.png',
  },
  [ENTITIES.TCC]: {
    text: 'The Card Co.',
    img: 'tcc.png',
  },
  [ENTITIES.HOS]: {
    text: 'House of Spectrum',
    img: 'hos.png',
  },
} as const;

/**
 * Get entity image configuration with fallback
 */
export function getEntityImage(entity?: Entity): EntityImageConfig {
  if (!entity || !(entity in entityImageMap)) {
    return entityImageMap[ENTITIES.SPECTRUM];
  }
  return entityImageMap[entity];
}

/**
 * Get entity display configuration with fallback
 */
export function getEntityDisplay(entity?: Entity): EntityDisplayConfig {
  if (!entity || !(entity in entityDisplayMap)) {
    return entityDisplayMap[ENTITIES.SPECTRUM];
  }
  return entityDisplayMap[entity];
}
