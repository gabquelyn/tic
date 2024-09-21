import React from "react";
import Cross from "./Cross";
import Circle from "./Circle";

export default function Button({
  string,
  onClick,
  index,
}: {
  string: playChar | undefined | null;
  onClick: (postion: number) => void;
  index: number;
}) {
  return (
    <button
      value={index}
      onClick={(e) => onClick(+e.currentTarget.value)}
      disabled={string ? true : false}
    >
      {string === "x" ? <Cross /> : string === "o" ? <Circle /> : null}
    </button>
  );
}
