'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Entity = 'Spectrum' | 'TCC' | 'HOS';

interface EntityContextType {
  entity: Entity;
  setEntity: (entity: Entity) => void;
}

const EntityContext = createContext<EntityContextType | null>(null);

export function EntityProvider({ children }: { children: React.ReactNode }) {
  const [entity, setEntityState] = useState<Entity>('Spectrum'); // Default entity
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Read the saved entity from localStorage on initial load
    const savedEntity = localStorage.getItem('selectedEntity') as Entity;
    if (savedEntity) {
      setEntityState(savedEntity);
    }
    setIsClient(true);
  }, []);

  const setEntity = (newEntity: Entity) => {
    setEntityState(newEntity);
    // Save the selected entity to localStorage to persist it
    localStorage.setItem('selectedEntity', newEntity);
  };

  if (!isClient) {
    return null; // Render nothing on the server to prevent hydration mismatch
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