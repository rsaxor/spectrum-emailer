'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Add "All" to the Entity type
type Entity = 'All' | 'Spectrum' | 'TCC' | 'HOS';

interface EntityContextType {
  entity: Entity;
  setEntity: (entity: Entity) => void;
}

const EntityContext = createContext<EntityContextType | null>(null);

export function EntityProvider({ children }: { children: React.ReactNode }) {
  const [entity, setEntityState] = useState<Entity>('All'); // Default to "All"
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const savedEntity = localStorage.getItem('selectedEntity') as Entity;
    if (savedEntity) {
      setEntityState(savedEntity);
    }
    setIsClient(true);
  }, []);

  const setEntity = (newEntity: Entity) => {
    setEntityState(newEntity);
    localStorage.setItem('selectedEntity', newEntity);
  };

  if (!isClient) {
    return null;
  }

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