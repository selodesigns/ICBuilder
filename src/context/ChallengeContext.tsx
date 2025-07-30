// src/context/ChallengeContext.tsx
import React, { createContext, useContext } from 'react';

const ChallengeContext = createContext<any>(null);

export function ChallengeProvider({ children }: { children: React.ReactNode }) {
  // Challenge logic placeholder
  return <ChallengeContext.Provider value={{}}>{children}</ChallengeContext.Provider>;
}

export function useChallenge() {
  return useContext(ChallengeContext);
}
