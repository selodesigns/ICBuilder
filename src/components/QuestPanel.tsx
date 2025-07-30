// src/components/QuestPanel.tsx
import React from 'react';

export function QuestPanel() {
  // Placeholder for quest progress
  return (
    <div className="bg-surface text-text-primary rounded-lg p-4 mt-4 shadow-neon border-l-4 border-accent-secondary">
      <h2 className="text-lg font-bold mb-2 text-accent-primary">Side Quests</h2>
      <div className="text-text-secondary">Complete more objectives to unlock quests.</div>
    </div>
  );
}
