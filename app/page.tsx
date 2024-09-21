"use client"
import React, { useState } from "react";
import TicBoard from "./components/TicBoard";
import { WinnerContext } from "./store/winnerContext";


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
