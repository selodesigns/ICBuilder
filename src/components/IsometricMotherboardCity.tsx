import React, { useState, useRef, useCallback } from 'react';
import { useGame } from '../context/GameContext';
import { usePlacement } from '../context/PlacementContext';
import { useMission } from '../context/MissionContext';
import { Building, ComponentPlacement } from '../types/gameTypes';
import { evaluatePlacement } from '../utils/placementLogic';

interface IsometricCityProps {
  gridSize?: number;
}

const DEFAULT_GRID_SIZE = 12;

const IsometricMotherboardCity: React.FC<IsometricCityProps> = ({ gridSize = DEFAULT_GRID_SIZE }) => {
  const { gameState, dispatch } = useGame();
  const { placements, addPlacement } = usePlacement();
  // placements: ComponentPlacement[]
  // gameState.buildings: Building[]
  const { updateMissionProgress } = useMission();
  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null);
  const [placementPreview, setPlacementPreview] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Convert 2D grid coordinates to flat isometric position
  const gridToIsometric = useCallback((gridX: number, gridY: number) => {
    const cellSize = 32;
    const isoX = (gridX - gridY) * (cellSize * 0.866);
    const isoY = (gridX + gridY) * (cellSize * 0.5);
    return { x: isoX, y: isoY };
  }, []);

  // Convert screen coordinates to grid coordinates
  const screenToGrid = useCallback((screenX: number, screenY: number) => {
    const cellSize = 32;
    const centerX = 300;
    const centerY = 200;
    const relativeX = screenX - centerX;
    const relativeY = screenY - centerY;
    const gridX = Math.floor((relativeX / (cellSize * 0.866) + relativeY / (cellSize * 0.5)) / 2);
    const gridY = Math.floor((relativeY / (cellSize * 0.5) - relativeX / (cellSize * 0.866)) / 2);
    return { x: Math.max(0, Math.min((gridSize ?? DEFAULT_GRID_SIZE) - 1, gridX)), y: Math.max(0, Math.min((gridSize ?? DEFAULT_GRID_SIZE) - 1, gridY)) };
  }, [gridSize]);

  const handleCellClick = useCallback((gridX: number, gridY: number) => {
    if (!selectedBuilding) return;
    const building = gameState.buildings.find((b: Building) => b.id === selectedBuilding);
    if (!building || gameState.digicoins < building.baseCost) return;
    const validation = evaluatePlacement(selectedBuilding, gridX, gridY, placements, gameState.buildings);
    if (validation.canPlace) {
      if (addPlacement(selectedBuilding, gridX, gridY)) {
        dispatch({ type: 'PLACE_BUILDING', payload: { id: selectedBuilding, x: gridX, y: gridY, cost: building.baseCost } });
        setSelectedBuilding(null);
        updateMissionProgress && updateMissionProgress('place_component', 1);
      }
    }
  }, [selectedBuilding, gameState, placements, addPlacement, dispatch, updateMissionProgress]);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const screenX = event.clientX - rect.left;
    const screenY = event.clientY - rect.top;
    const gridPos = screenToGrid(screenX, screenY);
    setHoveredCell(gridPos);
    if (selectedBuilding) {
      const validation = evaluatePlacement(selectedBuilding, gridPos.x, gridPos.y, placements, gameState.buildings);
      setPlacementPreview(validation);
    }
  }, [selectedBuilding, screenToGrid, placements, gameState.buildings]);

  // You can expand this to include more component visuals
  const getComponent3DVisual = (buildingId: string, isPlaced: boolean = true) => {
    const baseStyle = "transition-all duration-300 transform-gpu";
    const hoverStyle = isPlaced ? "hover:scale-110 hover:-translate-y-2" : "";
    switch (buildingId) {
      case 'resistor':
        return (
          <div className={`${baseStyle} ${hoverStyle}`}><div className="relative"><div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-amber-800 rounded-sm transform rotate-45 shadow-lg" style={{ transformStyle: 'preserve-3d' }}><div className="absolute inset-1 bg-gradient-to-br from-amber-400 to-amber-600 rounded-sm"></div></div><div className="absolute -top-2 left-1 w-6 h-4 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full shadow-md"><div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-full opacity-60"></div><div className="absolute top-0.5 left-1 w-1 h-3 bg-black rounded-full opacity-40"></div><div className="absolute top-0.5 right-1 w-1 h-3 bg-black rounded-full opacity-40"></div></div><div className="absolute -inset-2 bg-amber-400 rounded-full opacity-20 blur-sm animate-pulse"></div></div></div>
        );
      case 'capacitor':
        return (
          <div className={`${baseStyle} ${hoverStyle}`}><div className="relative"><div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-sm transform rotate-45 shadow-lg"><div className="absolute inset-1 bg-gradient-to-br from-blue-400 to-blue-600 rounded-sm"></div></div><div className="absolute -top-3 left-0.5 w-3 h-6 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full shadow-md"></div><div className="absolute -top-3 right-0.5 w-3 h-6 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full shadow-md"></div><div className="absolute top-1 left-2 w-4 h-0.5 bg-silver-400"></div><div className="absolute -inset-2 bg-cyan-400 rounded-full opacity-20 blur-sm animate-pulse"></div></div></div>
        );
      case 'transistor':
        return (
          <div className={`${baseStyle} ${hoverStyle}`}><div className="relative"><div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-800 rounded-sm transform rotate-45 shadow-lg"><div className="absolute inset-1 bg-gradient-to-br from-green-400 to-green-600 rounded-sm"></div></div><div className="absolute -top-4 left-1 w-6 h-8 bg-gradient-to-b from-gray-800 to-black rounded-t-lg shadow-lg"><div className="absolute top-1 left-1 w-4 h-2 bg-green-400 rounded opacity-80"></div><div className="absolute bottom-1 left-0.5 w-1 h-3 bg-silver-300 rounded-full"></div><div className="absolute bottom-1 left-2.5 w-1 h-3 bg-silver-300 rounded-full"></div><div className="absolute bottom-1 right-0.5 w-1 h-3 bg-silver-300 rounded-full"></div></div><div className="absolute -inset-2 bg-green-400 rounded-full opacity-20 blur-sm animate-pulse"></div></div></div>
        );
      case 'microchip':
        return (
          <div className={`${baseStyle} ${hoverStyle}`}><div className="relative"><div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-sm transform rotate-45 shadow-xl"><div className="absolute inset-1 bg-gradient-to-br from-purple-400 to-purple-600 rounded-sm"></div></div><div className="absolute -top-3 left-0 w-10 h-6 bg-gradient-to-b from-gray-900 to-black rounded shadow-lg"><div className="absolute inset-1 bg-gradient-to-b from-gray-700 to-gray-900 rounded"><div className="absolute top-1 left-1 w-8 h-2 bg-purple-400 rounded opacity-60"></div><div className="grid grid-cols-4 gap-0.5 absolute bottom-1 left-1 w-8 h-2">{Array.from({ length: 8 }, (_, i) => (<div key={i} className="w-0.5 h-1 bg-silver-300 rounded-full"></div>))}</div></div></div><div className="absolute -bottom-1 left-1 flex space-x-1">{Array.from({ length: 8 }, (_, i) => (<div key={i} className="w-0.5 h-2 bg-silver-400 rounded-full"></div>))}</div><div className="absolute -inset-3 bg-purple-400 rounded-full opacity-20 blur-md animate-pulse"></div></div></div>
        );
      default:
        return (
          <div className={`${baseStyle} ${hoverStyle}`}><div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-700 rounded transform rotate-45 shadow-lg"><div className="absolute inset-1 bg-gradient-to-br from-gray-300 to-gray-500 rounded"></div></div></div>
        );
    }
  };

  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden">
      {/* Component Selector */}
      <div className="p-4 border-b border-gray-700 bg-gray-800">
        <h3 className="text-lg font-bold text-blue-400 mb-3">🔧 3D Component Placement</h3>
        <div className="flex flex-wrap gap-2">
          {gameState.buildings.filter((b: Building) => b.unlocked).map((building: Building) => (
            <button
              key={building.id}
              onClick={() => setSelectedBuilding(building.id)}
              disabled={gameState.digicoins < (building.baseCost ?? 0)}
              className={`px-3 py-2 rounded border transition-all ${
                selectedBuilding === building.id
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : gameState.digicoins >= (building.baseCost ?? 0)
                  ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-800 border-gray-700 text-gray-500 cursor-not-allowed'
              }`}
            >
              <div className="text-sm font-medium">{building.name}</div>
              <div className="text-xs opacity-75">{building.baseCost} DigiCoins</div>
            </button>
          ))}
        </div>
        {selectedBuilding && (
          <div className="mt-2 text-sm text-yellow-400">
            Click on the 3D motherboard to place your {gameState.buildings.find((b: Building) => b.id === selectedBuilding)?.name}
          </div>
        )}
      </div>

      {/* 3D Isometric View */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden cursor-crosshair mx-auto border-2 border-green-600 rounded-lg shadow-2xl"
        style={{ 
          width: '600px',
          height: '500px',
          background: `
            radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
            linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)
          `,
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(34, 197, 94, 0.1) 0px, transparent 1px, transparent 20px, rgba(34, 197, 94, 0.1) 21px),
            repeating-linear-gradient(90deg, rgba(34, 197, 94, 0.1) 0px, transparent 1px, transparent 20px, rgba(34, 197, 94, 0.1) 21px)
          `
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredCell(null)}
      >
        {/* Motherboard Circuit Traces */}
        <svg className="absolute inset-0 w-full h-full opacity-20" style={{ zIndex: 1 }}>
          <defs>
            <pattern id="circuit" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M25,0 L25,50 M0,25 L50,25" stroke="#22c55e" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="25" cy="25" r="2" fill="#22c55e" opacity="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
        {/* Simplified Grid Container */}
        <div className="absolute inset-0 p-4">
          {/* Simple Grid Cells */}
          {Array.from({ length: gridSize }, (_, y) =>
            Array.from({ length: gridSize }, (_, x) => {
              const isHovered = hoveredCell?.x === x && hoveredCell?.y === y;
              const hasComponent = placements.some((p: ComponentPlacement) => p.x === x && p.y === y);
              const cellSize = 40;
              return (
                <div
                  key={`${x}-${y}`}
                  className={`absolute transition-all duration-200 cursor-pointer rounded-md group ${
                    isHovered 
                      ? 'bg-blue-500 bg-opacity-40 border-2 border-blue-400 shadow-lg scale-105' 
                      : hasComponent
                      ? 'bg-green-500 bg-opacity-20 border-green-400 border-2'
                      : 'bg-slate-700 bg-opacity-30 border border-slate-600 group-hover:bg-blue-400 group-hover:bg-opacity-30 group-hover:scale-105 hover:border-blue-400'
                  }`}
                  style={{
                    left: `${20 + x * cellSize}px`,
                    top: `${20 + y * cellSize}px`,
                    width: `${cellSize - 2}px`,
                    height: `${cellSize - 2}px`,
                    zIndex: 2
                  }}
                  onClick={() => handleCellClick(x, y)}
                >
                  {/* Grid coordinates for debugging */}
                  {isHovered && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-blue-300 font-mono">
                      {x},{y}
                    </div>
                  )}
                </div>
              );
            })
          )}

          {/* Placed Components */}
          {placements.map((p: ComponentPlacement, idx: number) => {
            const building = gameState.buildings.find((b: Building) => b.id === p.buildingId);
            if (!building) return null;
            const cellSize = 40;
            return (
              <div
                key={`component-${idx}`}
                className="absolute pointer-events-none flex items-center justify-center animate-pop-in"
                style={{
                  left: `${20 + p.x * cellSize}px`,
                  top: `${20 + p.y * cellSize}px`,
                  width: `${cellSize - 2}px`,
                  height: `${cellSize - 2}px`,
                  zIndex: 10 + p.y
                }}
              >
                <div className="text-2xl filter drop-shadow-lg">
                  {building.icon}
                </div>
                {/* Component glow effect */}
                <div className="absolute inset-0 bg-green-400 opacity-20 rounded-md animate-pulse"></div>
              </div>
            );
          })}

          {/* Placement Preview */}
          {selectedBuilding && hoveredCell && placementPreview && (
            <div
              className="absolute pointer-events-none flex items-center justify-center"
              style={{
                left: `${20 + hoveredCell.x * 40}px`,
                top: `${20 + hoveredCell.y * 40}px`,
                width: `38px`,
                height: `38px`,
                opacity: placementPreview.canPlace ? 0.8 : 0.4,
                zIndex: 100
              }}
            >
              <div className={`text-2xl ${placementPreview.canPlace ? 'filter-none' : 'filter grayscale opacity-50'}`}>
                {gameState.buildings.find((b: Building) => b.id === selectedBuilding)?.icon}
              </div>
              {/* Preview border */}
              <div className={`absolute inset-0 border-2 rounded-md ${
                placementPreview.canPlace ? 'border-green-400 bg-green-400 bg-opacity-20' : 'border-red-400 bg-red-400 bg-opacity-20'
              }`}></div>
            </div>
          )}
        </div>
        {/* Placement feedback */}
        {placementPreview && hoveredCell && (
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 rounded-lg p-3 text-sm animate-fade-in-scale">
            <div className={`font-semibold ${placementPreview.canPlace ? 'text-green-400' : 'text-red-400'}`}>
              {placementPreview.canPlace ? '✅ Valid Placement' : '❌ Invalid Placement'}
            </div>
            {placementPreview.efficiency && (
              <div className="text-blue-400">Efficiency: {Math.round(placementPreview.efficiency * 100)}%</div>
            )}
            {placementPreview.powerLevel && (
              <div className="text-yellow-400">Power: {placementPreview.powerLevel}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default IsometricMotherboardCity;
