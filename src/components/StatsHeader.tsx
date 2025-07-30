// src/components/StatsHeader.tsx
import React from 'react';
import { useGame } from '../context/GameContext';
import { formatNumber } from '../utils/gameUtils';

export function StatsHeader() {
  const { state } = useGame();
  return (
    <header className="flex items-center justify-between p-4 bg-surface rounded-t-lg shadow-neon border-b-2 border-accent-primary">
      <div className="text-digicoins font-bold drop-shadow-glow">DigiCoins: <span className="font-bold">{formatNumber(state.digicoins)}</span></div>
      <div className="text-programs font-bold">Programs: <span className="font-bold">{formatNumber(state.programs)}</span></div>
      <div className="text-accent-primary font-bold">Prestige: <span>{state.prestigeLevel || 0}</span></div>
    </header>
  );
}
