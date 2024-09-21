"use client";
import React, { useContext } from "react";
import Cross from "./Cross";
import Circle from "./Circle";
import { WinnerContext } from "../store/winnerContext";
export default function Button({
  string,
  onClick,
  index,
}: {
  string: playChar | undefined | null;
  onClick: (postion: number) => void;
  index: number;
}) {
  const { winner } = useContext(WinnerContext);
  return (
    <button
      value={index}
      onClick={(e) => onClick(+e.currentTarget.value)}
      disabled={string ? true : false}
      className={`${winner && !string && "blur-sm"}`}
    >
      {string === "x" ? <Cross /> : string === "o" ? <Circle /> : null}
    </button>
  );
}
