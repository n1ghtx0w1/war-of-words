import React, { createContext, useContext, useState, ReactNode } from "react";

// 🧬 Define the structure of a Hero
export interface Hero {
  id: string;
  name: string;
  class: string;
  strength: number;
  dexterity: number;
  hp: number;
  intelligence: number;
}

// 🧱 Define the context structure
interface HeroContextType {
  hero: Hero | null;
  setHero: (hero: Hero | null) => void;
}

// 📦 Create context with default values
const HeroContext = createContext<HeroContextType>({
  hero: null,
  setHero: () => {},
});

// 🧠 Provider component to wrap your app
export const HeroProvider = ({ children }: { children: ReactNode }) => {
  const [hero, setHero] = useState<Hero | null>(null);

  return (
    <HeroContext.Provider value={{ hero, setHero }}>
      {children}
    </HeroContext.Provider>
  );
};

// 🪄 Custom hook to access the hero context
export const useHero = () => useContext(HeroContext);
