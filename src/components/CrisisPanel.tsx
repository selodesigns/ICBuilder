// src/components/CrisisPanel.tsx
import React from 'react';

export function CrisisPanel() {
  // Placeholder for crisis events
  return (
    <div className="bg-surface text-text-primary rounded-lg p-4 mt-4 shadow-neon border-l-4 border-error">
      <h2 className="text-lg font-bold mb-2 text-error">Crisis Events</h2>
      <div className="text-text-secondary">No active crises.</div>
    </div>
  );
}
