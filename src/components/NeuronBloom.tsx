"use client";

import { useEffect, useRef, useState } from "react";
import { NODES, EDGES, SOLID_LIGHT, byId } from "@/components/BrainMark";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

// The house mark, drawn rather than placed: the same graph BrainMark renders,
// animated slowly in the middle of the white hero.
//
//   1. The mark grows out of its middle. A line leaves a dot that is already
//      there, takes its own time to cross, and the dot at its far end comes
//      into being as the line lands on it — so the wiring is not a second
//      movement after the dots but the thing that puts them there.
//   2. Every line out of a dot leaves on its own delay, so the growth forks:
//      several lines are crossing and several dots blooming at any moment,
//      in different corners of the mark, rather than one at a time along a
//      single front. The delays are hashed from the edge, not random, so it
//      is the same piece on every load and between server and client.
//   3. The mark settles, slides up, and the season line fades in under it.
//   4. From then on the dots twinkle: the mark itself never moves, but each
//      disc blinks between solid and open on its own rhythm — every one of
//      them at least once every three seconds — so the balance of filled and
//      hollow nodes keeps changing. Every dot is on a different period, and
//      no two are in step, which is what keeps it from reading as a pulse.
//
// The geometry is imported from BrainMark, not copied, so the piece can never
// drift from the logo in the nav above it.
//
// The draw and the twinkle run off one rAF loop writing styles straight to the
// DOM — React renders the graph once. The slide and the caption are the single
// exception: they are one state flip and plain CSS transitions, because they
// happen once and nothing is served by driving them per frame.
//
// It is also written to be cheap, because it opens the page and anything it
// costs is paid while the browser is still laying the page out and loading
// its fonts: the loop writes a property only when the
// value it would write has actually changed, holds no mask over anything it
// animates, and does not begin at all until the fonts have landed and the
// first frames are the browser's own again.

const SEED = "h"; // the big node at the middle of the mark

/* ---------------------------------------------------------------- geometry */

// Per-edge and per-dot rhythm, from a fixed hash rather than Math.random, so
// the piece is identical on every load and between server and client.
const frac = (v: number) => {
  const x = Math.sin(v) * 43758.5453;
  return x - Math.floor(x);
};

const adjacency = new Map<string, { to: string; edge: number; len: number }[]>(
  NODES.map((n) => [n.id, []]),
);
EDGES.forEach(([a, b], i) => {
  const p = byId.get(a)!;
  const q = byId.get(b)!;
  const len = Math.hypot(q.x - p.x, q.y - p.y);
  adjacency.get(a)!.push({ to: b, edge: i, len });
  adjacency.get(b)!.push({ to: a, edge: i, len });
});

/* ---------------------------------------------------------------- timeline */

const DRAW_BASE = 190;
const DRAW_PER_UNIT = 5; // ms per unit of length — every edge draws at one speed
// How far along a line is when the dot at its far end blooms. Under 1, so the
// dot is already there to be arrived at rather than appearing after a pause.
const LAND = 0.7;
// What makes the growth fork instead of marching: each line sits on its own
// delay before leaving, so sibling branches out of the same dot set off at
// noticeably different moments and the mark fills in from several places.
const LAUNCH_SPREAD = 260;
const DOT_POP = 380;

const draw = (len: number) => DRAW_BASE + len * DRAW_PER_UNIT;
const launch = (edge: number) => frac(edge * 24.7 + 2.3) * LAUNCH_SPREAD;

// When each dot comes into being: the earliest any line can reach it. Shortest
// paths from the seed, with an edge costing its own delay plus the part of its
// crossing that happens before the far dot blooms. Thirteen nodes, so the
// plain quadratic scan is the whole of it.
const ARRIVE = new Map<string, number>([[SEED, 0]]);
{
  const settled = new Set<string>();
  for (;;) {
    let cur: string | null = null;
    for (const [id, t] of ARRIVE) {
      if (!settled.has(id) && (cur === null || t < ARRIVE.get(cur)!)) cur = id;
    }
    if (cur === null) break;
    settled.add(cur);
    for (const e of adjacency.get(cur)!) {
      const t = ARRIVE.get(cur)! + launch(e.edge) + draw(e.len) * LAND;
      if (!ARRIVE.has(e.to) || t < ARRIVE.get(e.to)!) ARRIVE.set(e.to, t);
    }
  }
}

type Wire = { d: string; len: number; start: number; end: number };

const WIRES: Wire[] = EDGES.map(([a, b]) => {
  const p = byId.get(a)!;
  const q = byId.get(b)!;
  const len = Math.hypot(q.x - p.x, q.y - p.y);
  const dur = draw(len);

  // Drawn from whichever end is there first, and timed to land as the other
  // end blooms. One rule covers both kinds of edge: the ones that put a new
  // dot on the mark land exactly on it, and the ones that close a loop back
  // into a dot some other line already reached simply wait for it, which is
  // why the start is held at the earlier end rather than running before it.
  const ta = ARRIVE.get(a)!;
  const tb = ARRIVE.get(b)!;
  const [from, to] = ta <= tb ? [p, q] : [q, p];
  const start = Math.max(Math.min(ta, tb), Math.max(ta, tb) - dur * LAND);

  return {
    d: `M${from.x} ${from.y}L${to.x} ${to.y}`,
    len,
    start,
    end: start + dur,
  };
});

const DRAWN = Math.max(
  ...WIRES.map((w) => w.end),
  ...[...ARRIVE.values()].map((t) => t + DOT_POP),
);
const REVEAL_AT = DRAWN + 350; // the mark lifts and the season line arrives
const TWINKLE_AT = REVEAL_AT + 600;
const TWINKLE_RAMP = 900; // one dot's hand-off from its fixed fill to its wave
const TWINKLE_SPACING = 140; // and the gap between one dot's hand-off and the next

/* ---------------------------------------------------------------- twinkling */

// Which dot starts twinkling when. Sorted by a hash rather than by index so
// the onsets jump around the mark instead of sweeping across it.
const ONSET_ORDER = NODES.map((_, i) => i).sort(
  (a, b) => frac(a * 31.7 + 9.3) - frac(b * 31.7 + 9.3),
);

const TWINKLE = NODES.map((_, i) => {
  const a = frac(i * 12.9898 + 4.1);
  const b = frac(i * 78.233 + 1.7);
  return {
    // Short, and all different: a dot fades up and back down once a period,
    // and the thirteen of them together read as a field of breathing cells.
    // The ceiling is set so that even with the phase drift below — which can
    // stretch a cycle by about a tenth — the slowest disc on the mark still
    // comes round every 3s. Most of a cycle is spent in the fade rather than
    // at either end, so this is as long a fade as that ceiling allows.
    period: 2000 + a * 750, // 2s to 2.75s
    phase: b * Math.PI * 2,
    // Nothing starts at once. Each disc leaves its fixed fill on its own
    // schedule, a third of a second after the one before it.
    onset: TWINKLE_AT + ONSET_ORDER.indexOf(i) * TWINKLE_SPACING,
  };
});

const TAU = Math.PI * 2;

// One sine, not a sum of two. A sum spends most of its time near the middle
// of its range, which is precisely the half-grey a disc must not sit in;
// a single sine does the opposite and dwells at its extremes. The
// irregularity comes from modulating its phase instead, which leaves that
// distribution intact.
function wave(t: number, i: number) {
  const { period, phase } = TWINKLE[i];
  const drift = 0.25 * Math.sin((TAU * t) / (period * 2.7) + phase);
  return 0.5 + 0.5 * Math.sin((TAU * t) / period + phase + drift);
}

/* ------------------------------------------------------------------ easing */

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const easeOutCubic = (p: number) => 1 - (1 - p) ** 3;
const easeInOutCubic = (p: number) =>
  p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2;
const easeOutBack = (p: number) => 1 + 1.9 * (p - 1) ** 3 + 1.1 * (p - 1) ** 2;

// The wave only decides how far up or down; this is the band it crosses in
// between, about a third of a second of fade each way at these periods, so
// a disc visibly swells to solid and ebbs back rather than switching. It is
// wide enough that the fade is most of the journey and a dot only rests at
// full ink briefly at the top. The band is centred above the middle on
// purpose: it holds roughly five of the thirteen discs solid at any moment,
// which is the balance the static mark is drawn with.
const gate = (v: number) => {
  const p = clamp01((v - 0.38) / 0.56);
  return p * p * (3 - 2 * p);
};

const SLIDE = "cubic-bezier(0.22, 1, 0.36, 1)";

/* --------------------------------------------------------------- component */

export default function NeuronBloom({
  className = "",
  caption = true,
  captionSize = 26,
  captionText = "Winter 2026",
  tone = "light",
  field,
  weight = 1.7,
}: {
  className?: string;
  // Which band the mark is standing on, named the way HeroNav names it:
  // "light" is the white page and draws the mark in ink, "dark" is a black
  // bar and draws it in paper. The open discs have to follow — they are
  // holes punched in the strokes, so the field has to be whatever is
  // actually behind the mark or they read as white dots on black.
  tone?: "light" | "dark";
  // What is actually behind the mark, where that is not simply the black bar
  // or the white page `tone` assumes. The open discs are filled with it, so
  // on any other ground — the homepage poster's blue, say — they come out as
  // dark coins unless the caller says so.
  field?: string;
  // The weight of every stroke in the mark, in the units of its own viewBox
  // — which is 117 wide, so at the sizes this is drawn in a nav bar a stroke
  // of 1.7 lands at about half a pixel. Worth raising wherever the mark is
  // small and has to hold its own against type beside it.
  weight?: number;
  // The season line is part of the piece, but where the page sets its own
  // date beside the mark it would be said twice. Dropping it also drops the
  // lift, which only existed to make room for it.
  caption?: boolean;
  // Set in px, and worth passing wherever the mark is not at its usual size:
  // the line is the mark's companion, not a fixed piece of furniture, and at
  // 26px beside a small mark it stops reading as a caption and starts
  // reading as a headline the mark is sitting on.
  captionSize?: number;
  // What the line actually says. Kept separate from whether it is shown at
  // all, because a caller that wants "Winter 2026–2027" rather than the
  // house default should not have to repeat the whole component to get it.
  captionText?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const [lifted, setLifted] = useState(false);
  // Reduced motion gets the finished state outright rather than a flag the
  // effect has to set — setting state from an effect body is the one thing
  // that would make this render twice on mount.
  const revealed = lifted || reduced;

  // The observer watches the host element, not the <g> inside the svg: an
  // SVG group is not a reliable IntersectionObserver target, and when it
  // reports nothing the draw never starts and the mark sits on its first
  // dot forever.
  const hostRef = useRef<HTMLDivElement>(null);
  const wireRefs = useRef<(SVGPathElement | null)[]>([]);
  const dotRefs = useRef<(SVGGElement | null)[]>([]);
  const fillRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const wires = wireRefs.current;
    const dots = dotRefs.current;
    const fills = fillRefs.current;

    // The resting state: the mark exactly as the logo draws it, caption out.
    // Reduced motion stops here and never animates.
    if (reduced) {
      WIRES.forEach((_, i) => {
        const el = wires[i];
        if (el) el.style.strokeDashoffset = "0";
      });
      NODES.forEach((n, i) => {
        const el = dots[i];
        if (el) {
          el.style.opacity = "1";
          el.style.transform = "scale(1)";
        }
        const fill = fills[i];
        if (fill) fill.style.opacity = SOLID_LIGHT.has(n.id) ? "1" : "0";
      });
      return;
    }

    let raf = 0;
    let origin = 0;
    let running = false;
    let lift = 0;

    // What was last written to each element. Assigning a style property the
    // browser already holds still costs a style invalidation, and most of
    // these are unchanged on most frames — the wires once they are drawn,
    // and every disc sitting at full ink or none between its fades.
    const wroteWire = new Float32Array(WIRES.length).fill(-1);
    const wroteFill = new Float32Array(NODES.length).fill(-1);

    const frame = (now: number) => {
      if (!origin) origin = now;
      const t = now - origin; // runs on, no loop: it draws once and then breathes

      for (let i = 0; i < WIRES.length; i++) {
        if (wroteWire[i] === 0) continue; // drawn, and it stays drawn
        const el = wires[i];
        if (!el) continue;
        const w = WIRES[i];
        // One dash the length of the stroke: the offset is the drawing.
        const p = easeInOutCubic(seg(t, w.start, w.end));
        const off = t > w.end ? 0 : Math.round(w.len * (1 - p) * 100) / 100;
        if (off === wroteWire[i]) continue;
        wroteWire[i] = off;
        el.style.strokeDashoffset = `${off}`;
      }

      for (let i = 0; i < NODES.length; i++) {
        const n = NODES[i];
        const at = ARRIVE.get(n.id)!;
        const p = seg(t, at, at + DOT_POP);

        const el = dots[i];
        if (el) {
          if (p < 1) {
            el.style.opacity = easeOutCubic(p).toFixed(3);
            el.style.transform = `scale(${easeOutBack(p).toFixed(3)})`;
          } else if (el.style.transform !== "scale(1)") {
            el.style.opacity = "1";
            el.style.transform = "scale(1)";
          }
        }

        const fill = fills[i];
        if (!fill) continue;
        // Cross-fades out of the mark's own light/heavy fill rather than
        // cutting to the wave, so there is no jump when the twinkle starts.
        const base = SOLID_LIGHT.has(n.id) ? 1 : 0;
        // How far this one dot has handed its fill over to its own wave.
        const mixIn = easeInOutCubic(
          seg(t, TWINKLE[i].onset, TWINKLE[i].onset + TWINKLE_RAMP),
        );
        const value =
          Math.round((base * (1 - mixIn) + gate(wave(t, i)) * mixIn) * 1000) /
          1000;
        if (value === wroteFill[i]) continue;
        wroteFill[i] = value;
        fill.style.opacity = `${value}`;
      }

      // Without a caption there is nothing to lift for, and the re-render
      // would land in the middle of the twinkle for no visible gain.
      if (!lift && caption && t >= REVEAL_AT) {
        lift = t;
        setLifted(true);
      }

      raf = requestAnimationFrame(frame);
    };

    // Two gates, and the loop runs only with both open: the mark has to be
    // on screen, and the page has to be past its own opening. This piece is
    // the first thing on the site, so it would otherwise start drawing into
    // the middle of the browser's busiest moment — fonts swapping, the page
    // laying itself out — and lose frames out of the arrival, which is the
    // one part of it that cannot afford them.
    let onScreen = false;
    let settled = false;
    let dropped = false;

    const start = () => {
      if (running || !onScreen || !settled) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // One frame after the fonts land, so the clock does not start on the
    // frame that re-laid the page out around them — and never later than a
    // second and a half, so a font that is slow to arrive cannot hold the
    // opening of the page hostage.
    const settle = () => {
      if (settled || dropped) return;
      window.clearTimeout(latest);
      requestAnimationFrame(() => {
        if (dropped) return;
        settled = true;
        start();
      });
    };
    const latest = window.setTimeout(settle, 1500);
    if (document.fonts) document.fonts.ready.then(settle, settle);
    else settle();

    // Offscreen it is just work the compositor doesn't need to do. The clock
    // is not reset on the way back: once the mark has been drawn, returning to
    // it should find it drawn, not replaying.
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { threshold: 0.01 },
    );
    observer.observe(host);

    return () => {
      dropped = true;
      window.clearTimeout(latest);
      observer.disconnect();
      stop();
    };
  }, [reduced, caption]);

  return (
    <div
      ref={hostRef}
      className={`relative flex flex-col items-center ${className}`}
    >
      {/* The lift that makes room for the season line. Half the caption's
          height, so the pair ends up optically centred where the mark alone
          had been. It is taken on a plain div around the svg rather than on
          the svg itself: a transform on an element the loop is also writing
          into makes the browser re-rasterise the whole mark on every frame
          of the slide, and the slide lands exactly where the dots are taking
          up their own rhythm. */}
      <div
        className="w-full"
        style={{
          // Half the caption's own height, so the pair ends up optically
          // centred where the mark alone had been — derived from the size
          // rather than fixed, or a smaller line would leave the mark
          // lifting further than there is now anything to make room for.
          transform:
            revealed && caption
              ? `translateY(-${Math.round(captionSize * 0.65)}px)`
              : "translateY(0)",
          transition: reduced ? undefined : `transform 1700ms ${SLIDE}`,
        }}
      >
        <svg
          viewBox="-8 -8 117 98"
          className="block w-full"
          role="img"
          aria-label="The CSAI mark drawing itself: the nodes arrive and connect"
          shapeRendering="geometricPrecision"
          style={
            {
              "--nb-ink": tone === "dark" ? "#ffffff" : "#1a1a2e",
              "--nb-field": field ?? (tone === "dark" ? "#050509" : "#ffffff"),
              "--nb-weight": weight,
              overflow: "visible",
            } as React.CSSProperties
          }
        >
          {/* The static mark punches every edge out at every node with a mask,
            so an open disc is a real hole. Here the discs are drawn after the
            edges and filled with the field, which covers the strokes just as
            well — and costs nothing, where a mask over the one group the loop
            is animating would have the browser re-compositing it every frame
            of the wiring. */}
          <g>
            <g
              fill="none"
              stroke="var(--nb-ink)"
              strokeWidth="var(--nb-weight)"
              strokeLinecap="round"
            >
              {WIRES.map((w, i) => (
                <path
                  key={i}
                  ref={(el) => {
                    wireRefs.current[i] = el;
                  }}
                  d={w.d}
                  style={{
                    strokeDasharray: `${w.len.toFixed(2)} ${w.len.toFixed(2)}`,
                    strokeDashoffset: w.len.toFixed(2),
                  }}
                />
              ))}
            </g>

            {NODES.map((n, i) => (
              <g
                key={n.id}
                ref={(el) => {
                  dotRefs.current[i] = el;
                }}
                style={{
                  opacity: 0,
                  transformOrigin: `${n.x}px ${n.y}px`,
                }}
              >
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={n.r}
                  fill="var(--nb-field)"
                  stroke="var(--nb-ink)"
                  strokeWidth="var(--nb-weight)"
                />
                {/* The ink that turns a hollow disc solid. Fading this rather
                  than swapping the fill attribute is what makes a dot come on
                  like a star instead of flicking like a switch. */}
                <circle
                  ref={(el) => {
                    fillRefs.current[i] = el;
                  }}
                  cx={n.x}
                  cy={n.y}
                  r={n.r}
                  fill="var(--nb-ink)"
                  style={{ opacity: SOLID_LIGHT.has(n.id) ? 1 : 0 }}
                />
              </g>
            ))}
          </g>
        </svg>
      </div>

      {/* Sits outside the flow so the mark is centred on its own until the
          line arrives — otherwise the space is reserved from the start and
          there is nothing to slide up out of. */}
      {caption && (
        <span
          // The season follows the tone for the same reason the mark does:
          // on the dark band it is set in paper, not ink, or it goes
          // invisible against the field it is standing on.
          className={`font-venetian pointer-events-none absolute top-full mt-2 whitespace-nowrap leading-none ${
            tone === "dark" ? "text-white" : "text-ink"
          }`}
          style={{
            // The season is simply set, in the reading face the documents
            // use: no caps, no tracking, no second cut for the figures — the
            // mark is the only drawn thing on the cover and the line under it
            // says the date and nothing else.
            fontSize: `${captionSize}px`,
            // The reveal is this component's own; the variable is whoever is
            // carrying the mark. On the cover the chrome winds it down to 0 as
            // the mark is drawn up into the nav bar, where a season line
            // hanging underneath would be nonsense. Unset, it is simply 1.
            opacity: revealed ? "var(--nb-caption-fade, 1)" : 0,
            transform: revealed ? "translateY(0)" : "translateY(12px)",
            transition: reduced
              ? undefined
              : `opacity 2400ms ease-out, transform 2400ms ${SLIDE}`,
          }}
        >
          {captionText}
        </span>
      )}
    </div>
  );
}
