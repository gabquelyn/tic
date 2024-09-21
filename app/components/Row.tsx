"use client";
import React from "react";
import Button from "./Button";
export default function Row({
  row,
  click,
  plays,
}: {
  row: 1 | 2 | 3;
  click: (postion: number) => void;
  plays: playChar[];
}) {
  const valBox1 = row === 1 ? 0 : row === 2 ? 3 : 6;
  const valBox2 = row === 1 ? 1 : row === 2 ? 4 : 7;
  const valBox3 = row === 1 ? 2 : row === 2 ? 5 : 8;
  return (
    <div className="row flex gap-1">
      <Button onClick={click} index={valBox1} string={plays[valBox1]} />
      <Button onClick={click} index={valBox2} string={plays[valBox2]} />
      <Button onClick={click} index={valBox3} string={plays[valBox3]} />
    </div>
  );
}
