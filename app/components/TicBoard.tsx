"use client";
import React, { useState, useEffect, useContext, useRef } from "react";
import Row from "./Row";
import wins from "@/wins.json";
import Modal from "./Modal";
import Character from "./Character";
import { WinnerContext } from "../store/winnerContext";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
export default function TicBoard() {
  const [computer, setComputer] = useState(true);
  const [plays, setPlays] = useState<playChar[]>([]);
  const [stroke, setStroke] = useState("");
  const [jest, setJest] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  const [comOp, setComOp] = useState(wins);
  const [playerOp, setPlayerOp] = useState(wins);
  const clickRef = useRef<HTMLAudioElement | null>(null);
  const winRef = useRef<HTMLAudioElement | null>(null);
  const { winner, setWinner } = useContext(WinnerContext);

  const findCloseCall = (
    char: playChar,
    chances: number[][]
  ): number | void => {
    const playerCloseWins = chances.filter((arr) => {
      for (let i = 0; i < plays.length; i++) {
        if (plays[i] === char && arr.includes(i)) {
          return arr;
        }
      }
    });
    for (const arr of playerCloseWins) {
      if (
        (plays[arr[0]] && plays[arr[1]]) ||
        (plays[arr[0]] && plays[arr[2]]) ||
        (plays[arr[1]] && plays[arr[2]])
      ) {
        const nextPlay = arr.find((i) => !plays[i]);
        return nextPlay;
      }
    }
  };

  const calOptions = (index: number) => {
    // calculating win opportunities
    if (computer) {
      const filteredPlayerOpp = playerOp.filter((arr) => !arr.includes(index));
      setPlayerOp(filteredPlayerOpp);
    } else {
      const filteredCompOp = comOp.filter((arr) => !arr.includes(index));
      setComOp(filteredCompOp);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (jest) setJest((prev) => !prev);
    }, 3000);
    return () => clearTimeout(timeout);
  }, [jest]);

  useEffect(() => {
    // check if it is a draw
    if (comOp.length === 0) {
      return setStatus("draw");
    }

    let play: number = 0;

    // to defend an track the opponent almost completed step.
    const defencePlay = findCloseCall("o", playerOp);
    // should check for an almost completed step for a computer first.
    const winChance = findCloseCall("x", comOp);
    if (winChance) {
      setJest(true);
      play = winChance;
      console.log("Computer can win here!", winChance);
    } else if (defencePlay) {
      setJest(true);
      play = defencePlay;
      console.log("Computer should defend!", defencePlay);
    } else {
      // Find the other best options
      const selectedCombo =
        comOp[Math.floor(Math.random() * (comOp.length - 1))];
      for (const index of selectedCombo) {
        if (!plays[index]) {
          play = index;
          console.log("Computer should play", index);
          break;
        }
      }
    }
    if (!computer) {
      enqueueSnackbar({ message: "You go first", variant: "info", });
      return console.log("Not computer time to play");
    }

    console.log(play);
    const computerPlayTimer = setTimeout(() => {
      const updatedPlays = [...plays];
      updatedPlays[play] = "x";
      calOptions(play);
      setPlays(updatedPlays);
      setComputer(false);
    }, 2000);
    return () => {
      clearTimeout(computerPlayTimer);
    };
  }, [comOp]);

  const click = (index: number) => {
    if (plays[index]) return;
    if (winner) return;
    if (computer) return;
    clickRef.current?.play();
    if (playerOp.length === 0) {
      return setStatus("draw");
    }
    const updatedPlays = [...plays];
    updatedPlays[index] = computer ? "x" : "o";
    calOptions(index);
    setPlays(updatedPlays);
    setComputer(true);
  };

  const resetGame = () => {
    setPlays([]);
    setWinner(null);
    setStroke("");
    setComOp(wins);
    setPlayerOp(wins);
    setStatus(null);
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
        setStatus(plays[win[0]] === "o" ? "win" : "lose");
      }
    }
  }, [plays]);

  return (
    <>
      <SnackbarProvider />
      <div
        className={`flex relative flex-col gap-1 fade-pop-in before:bg-yellow-500 ${stroke}`}
      >
        <audio src={`/assets/beep.mp3`} ref={clickRef}></audio>
        <audio src={`/assets/win.mp3`} ref={winRef}></audio>
        {status && <Modal status={status} restart={resetGame} />}
        {jest && <Character display={jest} />}
        <Row row={1} click={click} plays={plays} />
        <Row row={2} click={click} plays={plays} />
        <Row row={3} click={click} plays={plays} />
      </div>
    </>
  );
}
