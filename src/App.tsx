import React from 'react';
import './App.css';
import { IntegratedGameProvider } from './context/IntegratedGameContext';
import { StatsHeader } from './components/StatsHeader';
import IsometricMotherboardCity from './components/IsometricMotherboardCity';
import { BuildingSelector } from './components/BuildingSelector';
import { Tutorial } from './components/Tutorial';
import { MilestonesPanel } from './components/MilestonesPanel';
import { PrestigePanel } from './components/PrestigePanel';
import { MaintenancePanel } from './components/MaintenancePanel';
import { CrisisPanel } from './components/CrisisPanel';
import { QuestPanel } from './components/QuestPanel';
import { MissionControlPanel } from './components/MissionControlPanel';

function ShowTutorialButton() {
  const [show, setShow] = React.useState(false);
  if (show) return <Tutorial forceShow={true} />;
  return (
    <button
      onClick={() => setShow(true)}
      className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 z-50"
      title="Show Tutorial / Help"
    >
      ?
    </button>
  );
}

function App() {
  // Reset Progress handler
  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <IntegratedGameProvider>
      <div className="min-h-screen bg-background flex flex-col items-center justify-start">
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 z-50"
          title="Reset all progress (irreversible)">
          Reset Progress
        </button>
        <Tutorial />
        <ShowTutorialButton />
        <div className="w-full max-w-3xl">
          <StatsHeader />
          <MissionControlPanel />
          <IsometricMotherboardCity />
          <BuildingSelector />
          <MilestonesPanel />
          <PrestigePanel />
          <MaintenancePanel />
          <CrisisPanel />
          <QuestPanel />
        </div>
      </div>
    </IntegratedGameProvider>
  );
}

export default App;
