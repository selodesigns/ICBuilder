// src/utils/gameUtils.ts
import { BUILDINGS, SYNERGY_BONUS } from '../constants/gameConstants';

export function getBuildingById(id: string) {
  return BUILDINGS.find(b => b.id === id);
}

export function calculateIncome(buildings: any[], grid: any[][]) {
  let total = 0;
  for (const placed of buildings) {
    const building = getBuildingById(placed.id);
    if (!building) continue;
    let income = building.baseIncome;
    // Synergy bonus
    if (placed.synergyBonus) {
      income += income * SYNERGY_BONUS;
    }
    total += income;
  }
  return total;
}

export function formatNumber(num: number): string {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toString();
}
