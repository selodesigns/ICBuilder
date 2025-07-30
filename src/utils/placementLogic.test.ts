import { evaluatePlacement, getAdjacentCoords, calculateSynergyBonus } from './placementLogic';

describe('placementLogic', () => {
  describe('getAdjacentCoords', () => {
    it('returns correct adjacent coordinates in the middle of grid', () => {
      expect(getAdjacentCoords(2, 2, 5)).toEqual([
        [1, 2], [3, 2], [2, 1], [2, 3]
      ]);
    });
    it('returns correct adjacent coordinates at edge', () => {
      expect(getAdjacentCoords(0, 0, 3)).toEqual([[1, 0], [0, 1]]);
    });
  });

  describe('evaluatePlacement', () => {
    const placements = [
      { buildingId: 'A', x: 1, y: 1 },
    ];
    const buildings = [
      { id: 'A', name: 'Alpha', synergy: [] },
      { id: 'B', name: 'Beta', synergy: [] },
    ];

    it('prevents placement if cell is occupied', () => {
      const result = evaluatePlacement('B', 1, 1, placements, buildings);
      expect(result.canPlace).toBe(false);
    });
    it('allows placement if cell is empty', () => {
      const result = evaluatePlacement('B', 2, 2, placements, buildings);
      expect(result.canPlace).toBe(true);
    });
  });

  describe('calculateSynergyBonus', () => {
    // Use real building ids and synergy from gameConstants
    const grid = [
      [{ id: 'cpu', synergy: ['ram', 'gpu'] }, { id: 'ram', synergy: ['cpu', 'gpu'] }],
      [null, null],
    ];
    it('returns true if adjacent synergy exists', () => {
      expect(calculateSynergyBonus('cpu', 0, 0, grid)).toBe(true); // cpu next to ram
    });
    it('returns false if no adjacent synergy', () => {
      expect(calculateSynergyBonus('ram', 1, 1, grid)).toBe(false); // empty cell
    });
  });
});
