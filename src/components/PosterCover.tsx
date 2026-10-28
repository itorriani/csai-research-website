"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "./PosterCover.css";

// The homepage cover, after a screen-printed match poster: a flat blue
// ground, three characters of the season across the top, and a sparse grid of
// photographs reduced to a concentric line screen.
//
// The tiles are baked by `scripts/poster-tiles.py` — the halftone is not
// something CSS can do, and even if it could it would be doing it to a
// photograph the browser had already resampled. The grid they sit in is in
// PosterCover.css.

// Where the photographs go in the three-by-four grid. The first is the head
// tile, which carries a character punched out of it; the three rows under it
// are the reference's own arrangement — full, then missing its first cell,
// then missing its last.
const CELLS = [
  { col: 1, row: 1 },
  { col: 1, row: 2 },
  { col: 2, row: 2 },
  { col: 3, row: 2 },
  { col: 2, row: 3 },
  { col: 3, row: 3 },
  { col: 1, row: 4 },
  { col: 2, row: 4 },
];

// Twice as many tiles are baked as there are cells, and a cell is given the
// pair that sits this far apart in the set. Two things follow from that: no
// photograph can ever appear in two cells at once, and a cell's other feed is
// already on the page, so a change cannot be caught half-loaded.
const SPAN = CELLS.length;

const SEASON = ["W", "2", "6"];

// A tile is about 17.7% of the sheet's height, and the sheet is capped by its
// height until the screen is narrower than the sheet is.
const SIZES = "(min-aspect-ratio: 1200/1785) 18vh, 26vw";

const between = (lo: number, hi: number) => lo + Math.random() * (hi - lo);

function Tile({
  index,
  col,
  row,
  children,
}: {
  index: number;
  col: number;
  row: number;
  children?: React.ReactNode;
}) {
  const [feed, setFeed] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let stopped = false;
    let timer = 0;
    const turn = () => {
      if (stopped) return;
      setFeed((f) => 1 - f);
      timer = window.setTimeout(turn, between(7000, 17000));
    };
    // Staggered, and widely: eight tiles changing on the same beat is a
    // slideshow, eight tiles changing on their own is a poster that happens
    // to be alive.
    timer = window.setTimeout(turn, between(2000, 14000));
    return () => {
      stopped = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      className="poster-tile"
      style={
        {
          gridArea: `${row} / ${col}`,
          "--tile-index": index,
        } as React.CSSProperties
      }
    >
      {[index, index + SPAN].map((n, i) => (
        <Image
          key={n}
          src={`/projects/poster/${String(n + 1).padStart(2, "0")}.png`}
          alt=""
          fill
          sizes={SIZES}
          // These are two-tone at a fine pitch; 75 puts a grey wash into
          // every ring of them.
          quality={90}
          loading="eager"
          className="poster-shot"
          style={{ opacity: feed === i ? 1 : 0 }}
        />
      ))}
      {children}
    </div>
  );
}

export default function PosterCover() {
  return (
    <div className="poster">
      {/* The roughener the characters are drawn through. Zero-sized and
          hidden, because it is a definition rather than a picture — but it
          cannot be `display: none`, which would take the filter with it. */}
      <svg aria-hidden className="absolute h-0 w-0" focusable="false">
        <filter id="poster-rough" x="-12%" y="-12%" width="124%" height="124%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.86"
            numOctaves="2"
            seed="7"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            // Just enough to take the mechanical edge off. Any more and the
            // characters stop reading as printed type and start reading as
            // type with an effect on it.
            scale="1.3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div className="poster-sheet">
        <div className="poster-grid">
          {CELLS.map(({ col, row }, i) => (
            <Tile key={`${row}-${col}`} index={i} col={col} row={row}>
              {/* The first character is set over the head tile in the ground
                  colour, so the halftone reads through its counters rather
                  than sitting behind a white slab. */}
              {i === 0 && (
                <span className="poster-glyph poster-glyph--punched">{SEASON[0]}</span>
              )}
            </Tile>
          ))}

          {/* The other two stand on the blue with no tile behind them at all,
              exactly as the reference sets its own second and third. */}
          {SEASON.slice(1).map((char, i) => (
            <span key={char} className="poster-glyph" style={{ gridArea: `1 / ${i + 2}` }}>
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
