// src/components/MotherboardCity.tsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { useGame } from '../context/GameContext';

function Building3D({ id, x, y }: { id: string; x: number; y: number }) {
  // Simple colored box for now, can expand per building type
  return (
    <mesh position={[x * 1.2, 0, y * 1.2]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={id === 'cpu' ? '#eab308' : id === 'ram' ? '#38bdf8' : '#a21caf'} />
    </mesh>
  );
}

export function MotherboardCity() {
  const { state } = useGame();
  const gridSize = state.gridSize;

  return (
    <div className="w-full h-96 border-2 border-accent-primary rounded-lg bg-background shadow-neon">
      <Canvas camera={{ position: [gridSize, 8, gridSize], fov: 50 }} shadows>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} castShadow />
        {/* Render grid floor with neon traces */}
        <mesh receiveShadow position={[gridSize / 2 - 0.5, -0.51, gridSize / 2 - 0.5]}>
          <boxGeometry args={[gridSize, 0.1, gridSize]} />
          <meshStandardMaterial color="#18181b" />
        </mesh>
        {/* Render grid lines */}
        {[...Array(gridSize + 1)].map((_, i) => (
          <>
            {/* Vertical lines */}
            <mesh key={`v-${i}`} position={[i - 0.5, -0.45, gridSize / 2 - 0.5]}>
              <boxGeometry args={[0.05, 0.05, gridSize]} />
              <meshStandardMaterial color="#2dd4bf" emissive="#00ffe7" emissiveIntensity={0.5} />
            </mesh>
            {/* Horizontal lines */}
            <mesh key={`h-${i}`} position={[gridSize / 2 - 0.5, -0.45, i - 0.5]}>
              <boxGeometry args={[gridSize, 0.05, 0.05]} />
              <meshStandardMaterial color="#2dd4bf" emissive="#00ffe7" emissiveIntensity={0.5} />
            </mesh>
          </>
        ))}
        {/* Render buildings with neon glow */}
        {state.buildings.map((b: any, i: number) => (
          <Building3D key={i} {...b} />
        ))}
      </Canvas>
    </div>
  );
}
