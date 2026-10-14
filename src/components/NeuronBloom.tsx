"use client";

import { useEffect, useRef, useState } from "react";
import { NODES, EDGES, SOLID_LIGHT, byId } from "@/components/BrainMark";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

// The house mark, drawn rather than placed: the same graph BrainMark renders,
// animated slowly in the middle of the white hero.
//
//   1. The dots arrive one at a time, outward from the centre.
//   2. Once they are all there, the edges wire them together — one stroke at
//      a time, each drawn by its own dash offset.
//   3. The mark settles, slides up, and the season line fades in under it.
//   4. From then on the dots twinkle: the mark itself never moves, but each
//      disc drifts between solid and open on its own slow rhythm, so the
//      balance of filled and hollow nodes keeps changing. Every dot is on a
//      different period, which is what keeps it from reading as a pulse.
//
// The geometry is imported from BrainMark, not copied, so the piece can never
// drift from the logo in the nav above it.
//
// The draw and the twinkle run off one rAF loop writing styles straight to the
// DOM — React renders the graph once. The slide and the caption are the single
// exception: they are one state flip and plain CSS transitions, because they
// happen once and nothing is served by driving them per frame.

const SEED = "h"; // the big node at the middle of the mark

/* ---------------------------------------------------------------- geometry */

const adjacency = new Map<string, string[]>(NODES.map((n) => [n.id, []]));
for (const [a, b] of EDGES) {
  adjacency.get(a)!.push(b);
  adjacency.get(b)!.push(a);
}

// Breadth-first from the centre. Both movements use this order, so the dots
// arrive outward and the wiring then follows the same path back out.
const depth = new Map<string, number>([[SEED, 0]]);
const ORDER: string[] = [SEED];
for (let i = 0; i < ORDER.length; i++) {
  for (const m of adjacency.get(ORDER[i])!) {
    if (depth.has(m)) continue;
    depth.set(m, depth.get(ORDER[i])! + 1);
    ORDER.push(m);
  }
}
const RANK = new Map(ORDER.map((id, i) => [id, i]));

/* ---------------------------------------------------------------- timeline */

const DOT_STAGGER = 260; // between one dot and the next
const DOT_POP = 720;
const DOTS_END = (NODES.length - 1) * DOT_STAGGER + DOT_POP;

const WIRE_AT = DOTS_END + 800; // a beat with the dots alone
const WIRE_STAGGER = 190;
const WIRE_BASE = 500;
const WIRE_PER_UNIT = 11; // ms per unit of length — every edge draws at one speed

type Wire = { d: string; len: number; start: number; end: number };

// Wire outward too: an edge is ready as soon as the node nearer the centre is.
const WIRES: Wire[] = EDGES.map(([a, b]) => {
  const [from, to] = RANK.get(a)! <= RANK.get(b)! ? [a, b] : [b, a];
  const p = byId.get(from)!;
  const q = byId.get(to)!;
  return {
    d: `M${p.x} ${p.y}L${q.x} ${q.y}`,
    len: Math.hypot(q.x - p.x, q.y - p.y),
    to,
  };
})
  .sort((x, y) => RANK.get(x.to)! - RANK.get(y.to)!)
  .map((w, i) => {
    const start = WIRE_AT + i * WIRE_STAGGER;
    return {
      d: w.d,
      len: w.len,
      start,
      end: start + WIRE_BASE + w.len * WIRE_PER_UNIT,
    };
  });

const WIRE_END = Math.max(...WIRES.map((w) => w.end));
const REVEAL_AT = WIRE_END + 550; // the mark lifts and the season line arrives
const TWINKLE_AT = REVEAL_AT + 1200;
const TWINKLE_RAMP = 3000; // one dot's hand-off from its fixed fill to its wave
const TWINKLE_SPACING = 1500; // and the gap between one dot's hand-off and the next

/* ---------------------------------------------------------------- twinkling */

// Per-dot rhythm, from a fixed hash of the index rather than Math.random, so
// the piece is identical on every load and between server and client.
const frac = (v: number) => {
  const x = Math.sin(v) * 43758.5453;
  return x - Math.floor(x);
};

// Which dot starts twinkling when. Sorted by a hash rather than by index so
// the onsets jump around the mark instead of sweeping across it.
const ONSET_ORDER = NODES.map((_, i) => i).sort(
  (a, b) => frac(a * 31.7 + 9.3) - frac(b * 31.7 + 9.3),
);

const TWINKLE = NODES.map((_, i) => {
  const a = frac(i * 12.9898 + 4.1);
  const b = frac(i * 78.233 + 1.7);
  return {
    // Very long, and all different: a dot turns over twice a period, so at
    // these lengths the thirteen of them produce about one soft change a
    // second across the whole mark — a drift rather than an event.
    period: 22000 + a * 20000, // 22s to 42s
    phase: b * Math.PI * 2,
    // Nothing starts at once. Each disc leaves its fixed fill on its own
    // schedule, a second and a half after the one before it.
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
  const drift = 0.4 * Math.sin((TAU * t) / (period * 2.7) + phase);
  return 0.5 + 0.5 * Math.sin((TAU * t) / period + phase + drift);
}

/* ------------------------------------------------------------------ easing */

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const easeOutCubic = (p: number) => 1 - (1 - p) ** 3;
const easeInOutCubic = (p: number) =>
  p < 0.5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2;
const easeOutBack = (p: number) => 1 + 1.9 * (p - 1) ** 3 + 1.1 * (p - 1) ** 2;

// The wave only decides on or off; this is the narrow band it crosses in
// between, about a second and a half of soft fade at these periods. The
// threshold sits well above the middle on purpose: it holds roughly five of
// the thirteen discs solid at any moment, which is the balance the static
// mark is drawn with.
const gate = (v: number) => {
  const p = clamp01((v - 0.59) / 0.14);
  return p * p * (3 - 2 * p);
};

const SLIDE = "cubic-bezier(0.22, 1, 0.36, 1)";

/* --------------------------------------------------------------- component */

export default function NeuronBloom({
  className = "",
  caption = true,
}: {
  className?: string;
  // The season line is part of the piece, but where the page sets its own
  // date beside the mark it would be said twice. Dropping it also drops the
  // lift, which only existed to make room for it.
  caption?: boolean;
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
  const rootRef = useRef<SVGGElement>(null);
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

    const frame = (now: number) => {
      if (!origin) origin = now;
      const t = now - origin; // runs on, no loop: it draws once and then breathes

      for (let i = 0; i < WIRES.length; i++) {
        const el = wires[i];
        if (!el) continue;
        const w = WIRES[i];
        if (t > w.end + 60) {
          el.style.strokeDashoffset = "0";
          continue;
        }
        // One dash the length of the stroke: the offset is the drawing.
        const p = easeInOutCubic(seg(t, w.start, w.end));
        el.style.strokeDashoffset = (w.len * (1 - p)).toFixed(2);
      }

      for (let i = 0; i < NODES.length; i++) {
        const n = NODES[i];
        const at = RANK.get(n.id)! * DOT_STAGGER;
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
        const value = base * (1 - mixIn) + gate(wave(t, i)) * mixIn;
        fill.style.opacity = value.toFixed(3);
      }

      if (!lift && t >= REVEAL_AT) {
        lift = t;
        setLifted(true);
      }

      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // Offscreen it is just work the compositor doesn't need to do. The clock
    // is not reset on the way back: once the mark has been drawn, returning to
    // it should find it drawn, not replaying.
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.01 },
    );
    observer.observe(host);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [reduced]);

  return (
    <div
      ref={hostRef}
      className={`relative flex flex-col items-center ${className}`}
    >
      <svg
        viewBox="-8 -8 117 98"
        className="w-full"
        role="img"
        aria-label="The CSAI mark drawing itself: the nodes arrive and connect"
        shapeRendering="geometricPrecision"
        style={
          {
            "--nb-ink": "#1a1a2e",
            "--nb-field": "#ffffff",
            overflow: "visible",
            // The lift that makes room for the season line. Half the caption's
            // height, so the pair ends up optically centred where the mark
            // alone had been.
            transform:
              revealed && caption ? "translateY(-22px)" : "translateY(0)",
            transition: reduced ? undefined : `transform 1700ms ${SLIDE}`,
          } as React.CSSProperties
        }
      >
        <defs>
          {/* Same trick the static mark uses: every edge is punched out at
              every node, so an open disc is a real hole and the strokes never
              show through it. */}
          <mask id="nb-holes">
            <rect x="-8" y="-8" width="117" height="98" fill="white" />
            {NODES.map((n) => (
              <circle key={n.id} cx={n.x} cy={n.y} r={n.r} fill="black" />
            ))}
          </mask>
        </defs>

        <g ref={rootRef}>
          <g
            mask="url(#nb-holes)"
            fill="none"
            stroke="var(--nb-ink)"
            strokeWidth="1.7"
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
                strokeWidth="1.7"
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

      {/* Sits outside the flow so the mark is centred on its own until the
          line arrives — otherwise the space is reserved from the start and
          there is nothing to slide up out of. */}
      {caption && (
      <span
        className="font-naval pointer-events-none absolute top-full mt-1 flex items-baseline whitespace-nowrap uppercase leading-none text-ink"
        style={{
          fontSize: "30px",
          fontWeight: 900,
          letterSpacing: "0.07em",
          marginRight: "-0.07em",
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(12px)",
          transition: reduced
            ? undefined
            : `opacity 2400ms ease-out, transform 2400ms ${SLIDE}`,
        }}
      >
        Fall Winter&nbsp;
        {/* Naval only ships oldstyle figures, which sit at x-height and read
            as a different size next to the caps, and the Vera Humana cut is
            drawn oblique — there is no upright in the file, so font-style
            cannot stand it back up. The years go in the Saint Laurent cut,
            which is upright and lining. */}
        <span
          className="font-wordmark"
          style={{ fontStyle: "normal", fontSize: "0.86em" }}
        >
          2026-2027
        </span>
      </span>
      )}
    </div>
  );
}
