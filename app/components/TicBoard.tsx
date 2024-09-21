"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import Row from "./Row";
import { VscDebugRestart } from "react-icons/vsc";
import { WinnerContext } from "../store/winnerContext";
export default function TicBoard() {
  const [toggle, setToggle] = useState(false);
  const [plays, setPlays] = useState<playChar[]>([]);
  const [stroke, setStroke] = useState("");
  const clickRef = useRef<HTMLAudioElement | null>(null);
  const winRef = useRef<HTMLAudioElement | null>(null);
  const { winner, setWinner } = useContext(WinnerContext);
  const click = (index: number) => {
    if (plays[index]) return;
    if (winner) return;
    clickRef.current?.play();
    const updatedPlays = [...plays];
    updatedPlays[index] = toggle ? "x" : "o";
    setPlays(updatedPlays);
    setToggle((prev) => !prev);
  };

  const resetGame = () => {
    setPlays([]);
    setToggle(false);
    setWinner(null);
    setStroke("");
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
      if (
        plays[win[0]] === plays[win[1]] &&
        plays[win[1]] === plays[win[2]] &&
        plays[win[0]]
      ) {
        setWinner(plays[win[0]]);
        if (win.every((val, i) => val === [0, 1, 2][i])) {
          setStroke("cross-top");
        }
        if (win.every((val, i) => val === [3, 4, 5][i])) {
          setStroke("cross-center");
        }
        if (win.every((val, i) => val === [6, 7, 8][i])) {
          setStroke("cross-bottom");
        }
        if (win.every((val, i) => val === [0, 3, 6][i])) {
          setStroke("cross-left");
        }
        if (win.every((val, i) => val === [1, 4, 7][i])) {
          setStroke("cross-middle");
        }
        if (win.every((val, i) => val === [2, 5, 8][i])) {
          setStroke("cross-right");
        }
        if (win.every((val, i) => val === [2, 4, 6][i])) {
          setStroke("cross-l");
        }
        if (win.every((val, i) => val === [0, 4, 8][i])) {
          setStroke("cross-r");
        }
        winRef.current?.play();
      }
    }
  }, [plays]);

  return (
    <>
      <div
        className={`flex relative flex-col gap-1 fade-pop-in before:bg-yellow-500 ${stroke}`}
      >
        <audio src={`/assets/beep.mp3`} ref={clickRef}></audio>
        <audio src={`/assets/win.mp3`} ref={winRef}></audio>
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
