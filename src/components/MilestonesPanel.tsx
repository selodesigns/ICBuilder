// src/components/MilestonesPanel.tsx
import React from 'react';
import { MILESTONES } from '../constants/gameConstants';
import { useGame } from '../context/GameContext';

export function MilestonesPanel() {
  const { state } = useGame();
  // For demo, mark first milestone as unlocked if first CPU placed
  const unlocked = state.buildings.some((b: any) => b.id === 'cpu');
  return (
    <div className="bg-surface text-text-primary rounded-lg p-4 mt-4 shadow-neon border-l-4 border-accent-secondary">
      <h2 className="text-lg font-bold mb-2 text-accent-primary">Milestones</h2>
      <ul>
        {MILESTONES.map((m, idx) => (
          <li key={m.id} className={`mb-1 flex items-center gap-2 ${idx === 0 && unlocked ? 'text-success' : 'text-text-secondary'}`}>
            <span className={`inline-block w-3 h-3 rounded-full ${idx === 0 && unlocked ? 'bg-success shadow-neon' : 'bg-text-disabled'}`}></span>
            {m.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
