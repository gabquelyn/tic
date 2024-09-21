import React, { createContext } from "react";

type WinnerContextType = {
  winner: playChar | null;
  setWinner: React.Dispatch<React.SetStateAction<playChar | null>>;
};

const initialContextValue: WinnerContextType = {
  winner: null,
  setWinner: () => {},
};

export const WinnerContext = createContext(initialContextValue);
