import React from "react";
import Image from "next/image";
import { Pixelify_Sans } from "next/font/google";
const handjet = Pixelify_Sans({ subsets: ["latin"], weight: "400" });
const jestMessages = [
  "Gotcha! 😝",
  "Ooops, saw it coming! 😜",
  "Nope, I am not easy! 😂",
  "Can't beat me! 😈",
];
export default function Character({
  display,
  start,
}: {
  display: boolean;
  start?: boolean;
}) {
  return (
    <div className="fixed bottom-0 left-5">
      <div>
        <div className="flex justify-end">
          <p
            className={`message text-[.9rem] p-1 italic px-2 rounded-sm ${handjet.className}`}
          >
            {start
              ? "Your turn"
              : jestMessages[
                  Math.floor(Math.random() * (jestMessages.length - 1))
                ]}
          </p>
        </div>
        <div className="relative md:h-[12rem] md:w-[18rem] h-[7rem] w-[7rem]">
          <Image
            src="/assets/char.png"
            fill
            alt="char"
            className={`object-contain ${display && "fade-pop-in"}`}
          />
        </div>
      </div>
    </div>
  );
}
