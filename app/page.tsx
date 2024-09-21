"use client"
import React, { createContext, useState } from "react";
import TicBoard from "./components/TicBoard";

type WinnerContextType = {
  winner: playChar | null;
  setWinner: React.Dispatch<React.SetStateAction<playChar | null>>;
};

const initialContextValue: WinnerContextType = {
  winner: null,
  setWinner: () => {},
};


export const WinnerContext = createContext(initialContextValue);
export default function HomePage() {
  const [winner, setWinner] = useState<playChar | null>(null);
  return (
    <div className="flex flex-col items-center justify-center h-[100svh]">
      <WinnerContext.Provider value={{ winner, setWinner }}>
        <TicBoard />
      </WinnerContext.Provider>
    </div>
  );
}
