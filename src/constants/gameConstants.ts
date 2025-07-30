// src/constants/gameConstants.ts
// All static values for Idle City Builder

export const BUILDINGS = [
  {
    id: 'cpu',
    name: 'CPU Core',
    cost: 100,
    baseIncome: 1,
    basePrograms: 1,
    maintenance: 1,
    synergy: ['ram', 'gpu'],
    unlockAt: 0,
  },
  {
    id: 'ram',
    name: 'RAM Module',
    cost: 250,
    baseIncome: 2,
    basePrograms: 2,
    maintenance: 2,
    synergy: ['cpu', 'gpu'],
    unlockAt: 1,
  },
  {
    id: 'gpu',
    name: 'GPU Cluster',
    cost: 500,
    baseIncome: 5,
    basePrograms: 4,
    maintenance: 5,
    synergy: ['cpu', 'ram'],
    unlockAt: 2,
  },
  // ... more buildings
];

export const INITIAL_STATE = {
  digicoins: 500,
  programs: 0,
  gridSize: 8,
  unlockedBuildings: ['cpu'],
};

export const MAINTENANCE_INTERVAL = 60000; // ms
export const INCOME_INTERVAL = 1000; // ms
export const SYNERGY_BONUS = 0.2; // 20% bonus
export const MILESTONES = [
  { id: 'first_cpu', name: 'Boot Up', requirement: { cpu: 1 } },
  { id: 'first_ram', name: 'Memory Online', requirement: { ram: 1 } },
  // ... more milestones
];

export const PRESTIGE_THRESHOLDS = [10000, 100000, 1000000];
