"use client";
import React, { useState } from "react";
import Row from "./Row";
import { VscDebugRestart } from "react-icons/vsc";
export default function TicBoard() {
  const [toggle, setToggle] = useState(false);
  const [plays, setPlays] = useState<playChar[]>([]);
  const click = (index: number) => {
    if (plays[index]) return;
    const updatedPlays = [...plays];
    updatedPlays[index] = toggle ? "x" : "o";
    setPlays(updatedPlays);
    setToggle((prev) => !prev);
  };

  const resetGame = () => {
    setPlays([]);
    setToggle(false);
  };

  return (
    <>
      <div className="flex flex-col gap-1 fade-pop-in">
        <Row row={1} click={click} plays={plays} />
        <Row row={2} click={click} plays={plays} />
        <Row row={3} click={click} plays={plays} />
      </div>
      <button
        className="bg-[#dbe9f4] text-black dark:text-white dark:bg-[#252931] p-3 px-7 rounded-md mt-9"
        onClick={resetGame}
      >
        <VscDebugRestart />
      </button>
    </>
  );
}
