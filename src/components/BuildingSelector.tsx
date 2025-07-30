// src/components/BuildingSelector.tsx
import React from 'react';
import { BUILDINGS } from '../constants/gameConstants';
import { useGame } from '../context/GameContext';
import { calculateSynergyBonus } from '../utils/placementLogic';

export function BuildingSelector() {
  const { state, dispatch } = useGame();
  const unlocked = state.unlockedBuildings;

  function handleSelect(id: string) {
    // For now, place at first empty tile (0,0)
    const building = BUILDINGS.find(b => b.id === id);
    if (!building || state.digicoins < building.cost) return;
    // Find first empty spot
    for (let x = 0; x < state.gridSize; x++) {
      for (let y = 0; y < state.gridSize; y++) {
        if (!state.grid[x][y]) {
          const synergyBonus = calculateSynergyBonus(id, x, y, state.grid);
          dispatch({ type: 'PLACE_BUILDING', payload: { id, x, y, cost: building.cost, synergyBonus } });
          return;
        }
      }
    }
  }

  return (
    <div className="flex gap-4 p-4 bg-surface rounded-b-lg shadow-neon border-t-2 border-accent-primary">
      {BUILDINGS.filter(b => unlocked.includes(b.id)).map(b => (
        <button
          key={b.id}
          className="bg-background text-accent-primary px-4 py-2 rounded shadow-neon border-2 border-accent-primary hover:bg-accent-primary hover:text-background transition disabled:text-text-disabled disabled:bg-surface disabled:border-text-disabled disabled:shadow-none"
          disabled={state.digicoins < b.cost}
          onClick={() => handleSelect(b.id)}
        >
          {b.name} <span className="text-xs text-digicoins">({b.cost} DC)</span>
        </button>
      ))}
    </div>
  );
}
