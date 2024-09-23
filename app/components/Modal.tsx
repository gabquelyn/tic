import React from "react";
import { Pixelify_Sans } from "next/font/google";
import Image from "next/image";
import { VscDebugRestart } from "react-icons/vsc";
const handjet = Pixelify_Sans({ subsets: ["latin"], weight: "400" });
export default function Modal({
  status,
  restart,
}: {
  status: Status;
  restart: () => void;
}) {
  return (
    <div className="inset-0 fixed dark:bg-[rgba(0,0,0,0.5)] bg-[rgba(225,225,225,0.4)] z-10">
      <div
        className={`${handjet.className} capitalize text-[1.6rem] flex flex-col items-center justify-center h-full`}
      >
        <div className="relative md:h-[12rem] md:w-[18rem] h-[7rem] w-[7rem]">
          <Image
            src="/assets/char.png"
            fill
            unoptimized
            alt="char"
            className={`object-contain`}
          />
        </div>
        <p
          className={`${
            status === "lose"
              ? "text-red-500"
              : status === "win"
              ? "text-green-500"
              : ""
          }`}
        >
          {status === "lose"
            ? "You lose!"
            : status === "win"
            ? "You win!"
            : "It is a draw, lets go again."}
        </p>
        <button
          className="bg-[#dbe9f4] text-black dark:text-white dark:bg-[#252931] p-3 px-7 rounded-md mt-9"
          onClick={restart}
        >
          <VscDebugRestart />
        </button>
      </div>
    </div>
  );
}
