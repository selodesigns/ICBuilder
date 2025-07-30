// src/context/QuestContext.tsx
import React, { createContext, useContext } from 'react';

const QuestContext = createContext<any>(null);

export function QuestProvider({ children }: { children: React.ReactNode }) {
  // Quest logic placeholder
  return <QuestContext.Provider value={{}}>{children}</QuestContext.Provider>;
}

export function useQuest() {
  return useContext(QuestContext);
}
