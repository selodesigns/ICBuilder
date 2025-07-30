// src/context/MissionContext.tsx
import React, { createContext, useContext } from 'react';

const MissionContext = createContext<any>(null);

export function MissionProvider({ children }: { children: React.ReactNode }) {
  // Mission logic placeholder
  return <MissionContext.Provider value={{}}>{children}</MissionContext.Provider>;
}

export function useMission() {
  return useContext(MissionContext);
}
