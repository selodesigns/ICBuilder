// src/utils/placementLogic.ts
import { BUILDINGS } from '../constants/gameConstants';
import { ComponentPlacement } from '../types/gameTypes';

export function getAdjacentCoords(x: number, y: number, gridSize: number) {
  const coords = [];
  if (x > 0) coords.push([x - 1, y]);
  if (x < gridSize - 1) coords.push([x + 1, y]);
  if (y > 0) coords.push([x, y - 1]);
  if (y < gridSize - 1) coords.push([x, y + 1]);
  return coords;
}

export function calculateSynergyBonus(buildingId: string, x: number, y: number, grid: any[][]) {
  const building = BUILDINGS.find(b => b.id === buildingId);
  if (!building) return false;
  const adj = getAdjacentCoords(x, y, grid.length);
  let synergy = false;
  for (const [ax, ay] of adj) {
    const adjBuilding = grid[ax][ay];
    if (adjBuilding && building.synergy.includes(adjBuilding.id)) {
      synergy = true;
      break;
    }
  }
  return synergy;
}

// New: Evaluate if a building can be placed at (x, y)
export function evaluatePlacement(
  buildingId: string,
  x: number,
  y: number,
  placements: ComponentPlacement[],
  buildings: any[]
): { canPlace: boolean; efficiency?: number; powerLevel?: number } {
  // Check if already occupied
  if (placements.some(p => p.x === x && p.y === y)) {
    return { canPlace: false };
  }
  // Example: check adjacency for synergy
  // (You can expand this logic for real adjacency, power, etc.)
  let efficiency = 1;
  let powerLevel = 1;
  // ...add more logic as desired
  return { canPlace: true, efficiency, powerLevel };
}
