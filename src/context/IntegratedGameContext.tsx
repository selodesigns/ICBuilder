// src/context/IntegratedGameContext.tsx
import React from 'react';
import { GameProvider } from './GameContext';
import { MaintenanceProvider } from './MaintenanceContext';
import { PrestigeProvider } from './PrestigeContext';
import { PlacementProvider } from './PlacementContext';
import { ChallengeProvider } from './ChallengeContext';
import { MissionProvider } from './MissionContext';
import { QuestProvider } from './QuestContext';

export function IntegratedGameProvider({ children }: { children: React.ReactNode }) {
  return (
    <GameProvider>
      <MaintenanceProvider>
        <PrestigeProvider>
          <PlacementProvider>
            <ChallengeProvider>
              <MissionProvider>
                <QuestProvider>
                  {children}
                </QuestProvider>
              </MissionProvider>
            </ChallengeProvider>
          </PlacementProvider>
        </PrestigeProvider>
      </MaintenanceProvider>
    </GameProvider>
  );
}
