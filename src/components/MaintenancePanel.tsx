// src/components/MaintenancePanel.tsx
import React from 'react';
import { useGame } from '../context/GameContext';
import { BUILDINGS } from '../constants/gameConstants';

export function MaintenancePanel() {
  const { state } = useGame();
  let total = 0;
  for (const b of state.buildings) {
    const building = BUILDINGS.find(x => x.id === b.id);
    if (building) total += building.maintenance;
  }
  return (
    <div className="bg-surface text-text-primary rounded-lg p-4 mt-4 shadow-neon border-l-4 border-accent-secondary">
      <h2 className="text-lg font-bold mb-2 text-accent-primary">Maintenance</h2>
      <div className="flex items-center gap-2">
        <span className="text-error font-bold">Upkeep:</span>
        <span className="text-digicoins font-bold">-{total} DC / min</span>
      </div>
    </div>
  );
}
