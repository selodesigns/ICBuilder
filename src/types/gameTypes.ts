export interface Building {
  id: string;
  name: string;
  cost: number;
  baseIncome: number;
  basePrograms: number;
  maintenance: number;
  synergy: string[];
  unlockAt?: number;
  icon?: React.ReactNode;
  unlocked?: boolean;
  baseCost?: number;
}

export interface ComponentPlacement {
  buildingId: string;
  x: number;
  y: number;
}

