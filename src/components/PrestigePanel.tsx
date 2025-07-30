// src/components/PrestigePanel.tsx
import React from 'react';
import { usePrestige } from '../context/PrestigeContext';

export function PrestigePanel() {
  const { prestigeLevel, canPrestige, prestige } = usePrestige();
  return (
    <div className="bg-surface text-text-primary rounded-lg p-4 mt-4 shadow-neon border-l-4 border-accent-primary">
      <h2 className="text-lg font-bold mb-2 text-accent-secondary">Digital Ascension</h2>
      <div className="flex items-center gap-2">
        <span className="text-accent-primary font-bold">Prestige Level:</span>
        <span className="text-success font-bold">{prestigeLevel}</span>
        <button
          className="ml-4 px-3 py-1 bg-accent-primary text-background rounded shadow-neon border border-accent-primary hover:bg-accent-secondary hover:text-background disabled:bg-surface disabled:text-text-disabled disabled:border-text-disabled disabled:shadow-none transition"
          disabled={!canPrestige()}
          onClick={prestige}
        >
          Ascend
        </button>
      </div>
    </div>
  );
}
