"use client";
import React, { useState, useEffect, useContext } from "react";
import Row from "./Row";
import { VscDebugRestart } from "react-icons/vsc";
import { WinnerContext } from "../page";
export default function TicBoard() {
  const [toggle, setToggle] = useState(false);
  const [plays, setPlays] = useState<playChar[]>([]);
  const { winner, setWinner} = useContext(WinnerContext);
  const click = (index: number) => {
    if (plays[index]) return;
    if (winner) return;
    const updatedPlays = [...plays];
    updatedPlays[index] = toggle ? "x" : "o";
    setPlays(updatedPlays);
    setToggle((prev) => !prev);
  };

  const resetGame = () => {
    setPlays([]);
    setToggle(false);
    setWinner(null);
  };

  useEffect(() => {
    const wins = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [3, 4, 5],
      [1, 4, 7],
      [2, 4, 6],
      [2, 5, 8],
      [6, 7, 8],
    ];
    for (const win of wins) {
      console.log(plays[win[0]], plays[win[1]], plays[win[2]]);
      if (
        plays[win[0]] === plays[win[1]] &&
        plays[win[1]] === plays[win[2]] &&
        plays[win[0]]
      ) {
        setWinner(plays[win[0]]);
      }
    }
  }, [plays]);

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
