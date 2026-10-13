"use client";

import { useState } from "react";
import BrainMark from "@/components/BrainMark";
import CsaiLockup from "@/components/CsaiLockup";

// Each name-part gets a taller initial: the first letter is set a shade
// larger, so it grows up off the shared baseline — the same move the house
// lockup makes on CSAI and RESEARCH. Split keeps its delimiters, so
// "Seablom-Michel" raises both halves while "DeMayo" stays one name with
// one tall cap.
function TallCaps({ name }: { name: string }) {
  return (
    <>
      {name.split(/([\s-]+)/).map((part, i) =>
        i % 2 || !part ? (
          part
        ) : (
          <span key={i}>
            <span className="text-[1.18em]">{part[0]}</span>
            {part.slice(1)}
          </span>
        ),
      )}
    </>
  );
}

const FACE =
  "card-grain absolute inset-0 flex flex-col items-center justify-center border border-black bg-white px-5 text-black backface-hidden shadow-[0_6px_14px_-8px_rgba(0,0,0,0.55)]";

// A member, set on a calling card run longer than it is tall. The name is
// the face; the house lockup is printed on the reverse. Clicking turns the
// card over on its horizontal axis — tipped end over end rather than swung
// around — and it stays turned until it is clicked again, so the reverse
// can actually be read.
export default function MemberCard({
  name,
  title,
}: {
  name: string;
  title: string;
}) {
  const [turned, setTurned] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={turned}
      onClick={() => setTurned((t) => !t)}
      className="block aspect-[1.75/1] w-full cursor-pointer perspective-[1400px]"
    >
      <div
        className={`relative h-full w-full transform-3d transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
          turned ? "rotate-x-180" : ""
        }`}
      >
        <div className={FACE}>
          {/* House mark in the corner, its stroke raised so it holds as
              ink at this size. */}
          <BrainMark
            strokeWidth={3.6}
            className="absolute left-4 top-4 h-[20px] w-auto"
          />

          {/* The name is what the card centres on, so the title hangs out
              of a zero-height box: it sets directly beneath the name
              without pulling it off the card's middle. */}
          <p className="doc-heading font-naval text-center text-[19px] leading-[1.2] tracking-[0.01em]">
            <TallCaps name={name} />
          </p>
          <div className="h-0">
            <p className="doc-ink mt-2 text-center text-[13px] leading-[1.4]">
              {title}
            </p>
          </div>
        </div>

        {/* The reverse. House identity only, and the same on every card, so
            it is kept out of the reading order. Set small, with the mark
            stroke raised to keep it reading as ink at this size. */}
        <div className={`${FACE} rotate-x-180`} aria-hidden="true">
          <CsaiLockup marks={3} strokeWidth={3.4} className="text-[15px]" />
        </div>
      </div>
    </button>
  );
}
