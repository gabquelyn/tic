"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import Row from "./Row";
import { VscDebugRestart } from "react-icons/vsc";
import wins from "@/wins.json";
import { WinnerContext } from "../store/winnerContext";
export default function TicBoard() {
  const [computer, setComputer] = useState(true);
  const [plays, setPlays] = useState<playChar[]>([]);
  const [stroke, setStroke] = useState("");

  const [comOp, setComOp] = useState(wins);
  const [playerOp, setPlayerOp] = useState(wins);

  const clickRef = useRef<HTMLAudioElement | null>(null);
  const winRef = useRef<HTMLAudioElement | null>(null);
  const { winner, setWinner } = useContext(WinnerContext);

  // to defend an almost completed step.
  useEffect(() => {
    const playerCloseWins = playerOp.filter((arr) => {
      for (let i = 0; i < plays.length; i++) {
        if (plays[i] === "o" && arr.includes(i)) {
          return arr;
        }
      }
    });
    console.log(playerOp, playerCloseWins);
    for (const arr of playerCloseWins) {
      if (
        (plays[arr[0]] && plays[arr[1]]) ||
        (plays[arr[0]] && plays[arr[2]]) ||
        (plays[arr[1]] && plays[arr[2]])
      ) {
        const nextPlay = arr.find((i) => !plays[i]);
        console.log("close call here!", nextPlay);
      } else {
        console.log("No threat from player yet");
      }
    }
  }, [comOp]);

  const calOptions = (index: number) => {
    // calculating win opportunities
    if (computer) {
      const filteredPlayerOpp = playerOp.filter((arr) => !arr.includes(index));
      setPlayerOp(filteredPlayerOpp);
    } else {
      const filteredCompOp = comOp.filter((arr) => !arr.includes(index));
      setComOp(filteredCompOp);
      // should check for an almost completed step for a computer first.
    }
  };

  const click = (index: number) => {
    if (plays[index]) return;
    if (winner) return;
    clickRef.current?.play();
    const updatedPlays = [...plays];
    updatedPlays[index] = computer ? "x" : "o";
    calOptions(index);
    setPlays(updatedPlays);
    setComputer((prev) => !prev);
  };

  const resetGame = () => {
    setPlays([]);
    setComputer(false);
    setWinner(null);
    setStroke("");
    setComOp([]);
    setPlayerOp([]);
  };

  useEffect(() => {
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
