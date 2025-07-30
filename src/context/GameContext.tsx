// src/context/GameContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { INITIAL_STATE, INCOME_INTERVAL, MAINTENANCE_INTERVAL } from '../constants/gameConstants';
import { calculateIncome } from '../utils/gameUtils';

const GameContext = createContext<any>(null);

const PERSIST_KEY = 'idle-city-builder-save';

function loadPersistedState() {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

const initialState =
  loadPersistedState() || {
    ...INITIAL_STATE,
    buildings: [], // {id, x, y, synergyBonus}
    grid: Array(INITIAL_STATE.gridSize).fill(null).map(() => Array(INITIAL_STATE.gridSize).fill(null)),
    lastTick: Date.now(),
  };

function gameReducer(state: any, action: any) {
  switch (action.type) {
    case 'TICK': {
      const income = calculateIncome(state.buildings, state.grid);
      return {
        ...state,
        digicoins: state.digicoins + income,
        lastTick: Date.now(),
      };
    }
    case 'PLACE_BUILDING': {
      const { id, x, y, synergyBonus } = action.payload;
      const newBuilding = { id, x, y, synergyBonus };
      const newBuildings = [...state.buildings, newBuilding];
      const newGrid = state.grid.map((row: any[], i: number) =>
        row.map((cell, j) => (i === x && j === y ? newBuilding : cell))
      );
      return {
        ...state,
        buildings: newBuildings,
        grid: newGrid,
        digicoins: state.digicoins - action.payload.cost,
      };
    }
    case 'DEDUCT_MAINTENANCE': {
      // Maintenance cost logic to be handled in MaintenanceContext
      return state;
    }
    case 'RESET': {
      return { ...initialState, lastTick: Date.now() };
    }
    default:
      return state;
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Save to localStorage on state change
  useEffect(() => {
    localStorage.setItem(PERSIST_KEY, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'TICK' });
    }, INCOME_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  return useContext(GameContext);
}
