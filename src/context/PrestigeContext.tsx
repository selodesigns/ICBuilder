// src/context/PrestigeContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { PRESTIGE_THRESHOLDS } from '../constants/gameConstants';
import { useGame } from './GameContext';

const PrestigeContext = createContext<any>(null);

export function PrestigeProvider({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useGame();
  const PRESTIGE_KEY = 'idle-city-builder-prestige';
  const [prestigeLevel, setPrestigeLevel] = React.useState(() => {
    const raw = localStorage.getItem(PRESTIGE_KEY);
    return raw ? parseInt(raw) : 0;
  });
  React.useEffect(() => {
    localStorage.setItem(PRESTIGE_KEY, String(prestigeLevel));
  }, [prestigeLevel]);

  function canPrestige() {
    return state.digicoins >= PRESTIGE_THRESHOLDS[prestigeLevel];
  }

  function prestige() {
    if (!canPrestige()) return;
    setPrestigeLevel(pl => pl + 1);
    dispatch({ type: 'RESET_FOR_PRESTIGE', payload: { prestigeLevel: prestigeLevel + 1 } });
  }

  return (
    <PrestigeContext.Provider value={{ prestigeLevel, canPrestige, prestige }}>
      {children}
    </PrestigeContext.Provider>
  );
}

export function usePrestige() {
  return useContext(PrestigeContext);
}
