'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Entity, ENTITIES } from '@/types';

interface EntityContextType {
  entity: Entity;
  setEntity: (entity: Entity) => void;
}

const EntityContext = createContext<EntityContextType | null>(null);

// FIX: Use shared constant
const DEFAULT_ENTITY: Entity = ENTITIES.ALL;

export function EntityProvider({ children }: { children: React.ReactNode }) {
  const [entity, setEntityState] = useState<Entity>(DEFAULT_ENTITY);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const savedEntity = localStorage.getItem('selectedEntity') as Entity | null;
    // FIX: Use ENTITIES constant for validation
    if (savedEntity && Object.values(ENTITIES).includes(savedEntity)) {
      setEntityState(savedEntity);
    }
    setIsHydrated(true);
  }, []);

  const setEntity = (newEntity: Entity) => {
    setEntityState(newEntity);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedEntity', newEntity);
    }
  };

  return (
    <EntityContext.Provider value={{ entity, setEntity }}>
      {children}
    </EntityContext.Provider>
  );
}

export const useEntity = () => {
  const context = useContext(EntityContext);
  if (!context) {
    throw new Error('useEntity must be used within an EntityProvider');
  }
  return context;
};