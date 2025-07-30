// src/components/Tutorial.tsx
import React, { useState } from 'react';

const steps = [
  {
    title: 'Welcome to Idle City Builder!',
    desc: 'Build a digital metropolis on a motherboard. Earn DigiCoins, attract Programs, and advance your civilization.',
  },
  {
    title: 'Placing Buildings',
    desc: 'Select a component and place it on the grid. Synergy bonuses apply for smart placement!',
  },
  {
    title: 'Earn & Maintain',
    desc: 'Buildings generate DigiCoins and require maintenance. Watch out for crises!',
  },
  {
    title: 'Progress & Ascend',
    desc: 'Reach milestones, complete missions, and ascend for permanent upgrades!',
  },
];

interface TutorialProps {
  forceShow?: boolean;
}

export function Tutorial({ forceShow = false }: TutorialProps) {
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(() => {
    return !forceShow && localStorage.getItem('idle-city-builder-tutorial-dismissed') === '1';
  });
  const handleClose = () => {
    localStorage.setItem('idle-city-builder-tutorial-dismissed', '1');
    setDismissed(true);
  };
  if (dismissed && !forceShow) return null;
  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-surface text-text-primary rounded-xl shadow-neon border-2 border-accent-primary p-6 z-50 max-w-md">
      <h2 className="text-2xl font-bold mb-2 text-accent-primary drop-shadow-glow">{steps[step].title}</h2>
      <p className="mb-4 text-text-secondary">{steps[step].desc}</p>
      <div className="flex justify-between items-center">
        <button
          className="ml-auto px-2 py-1 rounded bg-gray-700 text-white text-xs hover:bg-gray-800 border border-gray-600"
          onClick={handleClose}
        >
          Close
        </button>
        <button
          className="px-3 py-1 rounded bg-accent-secondary text-background font-bold shadow-neon border border-accent-secondary disabled:opacity-50"
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          Back
        </button>
        <button
          className="px-3 py-1 rounded bg-accent-primary text-background font-bold shadow-neon border border-accent-primary disabled:opacity-50"
          onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
        >
          {step === steps.length - 1 ? 'Done' : 'Next'}
        </button>
      </div>
    </div>
  );
}
