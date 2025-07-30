// src/context/MaintenanceContext.tsx
import React, { createContext, useContext, useEffect } from 'react';
import { MAINTENANCE_INTERVAL, BUILDINGS } from '../constants/gameConstants';
import { useGame } from './GameContext';

const MaintenanceContext = createContext<any>(null);

export function MaintenanceProvider({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useGame();

  useEffect(() => {
    const interval = setInterval(() => {
      let totalMaintenance = 0;
      for (const b of state.buildings) {
        const building = BUILDINGS.find(x => x.id === b.id);
        if (building) totalMaintenance += building.maintenance;
      }
      dispatch({ type: 'DEDUCT_MAINTENANCE', payload: { cost: totalMaintenance } });
    }, MAINTENANCE_INTERVAL);
    return () => clearInterval(interval);
  }, [state.buildings, dispatch]);

  return <MaintenanceContext.Provider value={null}>{children}</MaintenanceContext.Provider>;
}

export function useMaintenance() {
  return useContext(MaintenanceContext);
}
