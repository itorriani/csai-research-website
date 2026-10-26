"use client";

import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

// Washes of ink spreading over the cover. Not a texture laid on top of the
// painting but a slow continuation of it: a handful of blooms that swell,
// darken and thin again on their own long cycles, so the field behind the
// mark is never quite the same twice.
//
// Two things make it read as paint rather than as a fading circle:
//
//   1. The edge is torn, not drawn. Each bloom is a soft disc pushed through
//      a displacement map driven by fractal noise, which is what gives the
//      ragged, feathered boundary a wash leaves when it runs out into dry
//      paper. A blurred circle alone reads as a glow; this reads as a stain.
//   2. Nothing is in step. The cycles are long and deliberately coprime-ish,
//      so the blooms drift in and out of each other instead of pulsing
//      together, and the composite never settles into a visible beat.
//
// It is also built so the expensive part happens once. The displacement
// filter is the costly operation here, and it is applied to the static svg
// *inside* each bloom; the animation rides a plain transform and opacity on
// the wrapper outside it. That way the browser filters each bloom once, keeps
// the result as a layer, and the long cycles are pure compositing — rather
// than re-running the turbulence on every frame, over a full screen, forever.

type Bloom = {
  /** Centre, in percent of the still. */
  x: number;
  y: number;
  /** Diameter, in vmax. */
  size: number;
  /** Paper or ink: the wash either lifts the field or sinks it. */
  tone: "light" | "dark";
  peak: number;
  /** Seconds. Long, and all different. */
  duration: number;
  delay: number;
  /** Which slice of the noise this bloom is torn against. */
  seed: number;
};

// Placed by hand rather than hashed: the middle is left comparatively open
// because the mark stands there, and the heavier washes are pushed out to
// the corners where they can spread without crowding it.
const BLOOMS: Bloom[] = [
  {
    x: 22,
    y: 30,
    size: 58,
    tone: "dark",
    peak: 0.42,
    duration: 34,
    delay: 0,
    seed: 2,
  },
  {
    x: 78,
    y: 26,
    size: 50,
    tone: "light",
    peak: 0.24,
    duration: 41,
    delay: -7,
    seed: 5,
  },
  {
    x: 68,
    y: 74,
    size: 62,
    tone: "dark",
    peak: 0.38,
    duration: 47,
    delay: -19,
    seed: 11,
  },
  {
    x: 30,
    y: 78,
    size: 46,
    tone: "light",
    peak: 0.2,
    duration: 29,
    delay: -13,
    seed: 17,
  },
  {
    x: 50,
    y: 52,
    size: 40,
    tone: "dark",
    peak: 0.28,
    duration: 53,
    delay: -31,
    seed: 23,
  },
];

export default function InkBloom({ className = "" }: { className?: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* One filter per bloom, because each has to be torn against a
          different part of the noise — sharing a single filter would stamp
          the same silhouette five times and the eye would catch it. */}
      <svg aria-hidden="true" className="absolute h-0 w-0">
        <defs>
          {BLOOMS.map((b) => (
            <filter
              key={b.seed}
              id={`ink-${b.seed}`}
              // Room for the displacement to push the edge well outside the
              // disc it started from; at the default the wash would be
              // clipped back to a circle, which is the one shape it must not
              // resolve into.
              x="-45%"
              y="-45%"
              width="190%"
              height="190%"
              colorInterpolationFilters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                // Low frequency so the distortion is a few big lobes rather
                // than a fizz of small ones — the difference between paint
                // running and paper grain.
                baseFrequency="0.009 0.013"
                numOctaves={4}
                seed={b.seed}
                result="noise"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale={150}
                xChannelSelector="R"
                yChannelSelector="G"
                result="torn"
              />
              {/* Softens what the displacement roughened, so the boundary is
                  feathered like a wet edge instead of visibly pixel-pushed. */}
              <feGaussianBlur in="torn" stdDeviation={18} />
            </filter>
          ))}
        </defs>
      </svg>

      {BLOOMS.map((b) => (
        <div
          key={b.seed}
          className="absolute"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            width: `${b.size}vmax`,
            height: `${b.size}vmax`,
            marginLeft: `-${b.size / 2}vmax`,
            marginTop: `-${b.size / 2}vmax`,
            // Reduced motion keeps the washes — they are most of what makes
            // the cover feel painted — but holds them still at a middling
            // opacity rather than breathing.
            opacity: reduced ? b.peak * 0.7 : undefined,
            animation: reduced
              ? undefined
              : `ink-bloom ${b.duration}s ease-in-out ${b.delay}s infinite alternate`,
            // The wrapper is the only thing that moves, and both properties
            // it animates are ones the compositor can take on its own.
            willChange: reduced ? undefined : "transform, opacity",
            ["--ink-peak" as string]: b.peak,
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="h-full w-full"
            style={{ filter: `url(#ink-${b.seed})` }}
          >
            {/* A disc with no hard edge of its own: the stop at 62% is what
                keeps the displacement from having a rim to tear into a
                visible ring. */}
            <defs>
              <radialGradient id={`ink-fill-${b.seed}`}>
                <stop
                  offset="0%"
                  stopColor={b.tone === "light" ? "#ffffff" : "#050509"}
                  stopOpacity="1"
                />
                <stop
                  offset="62%"
                  stopColor={b.tone === "light" ? "#ffffff" : "#050509"}
                  stopOpacity="0.55"
                />
                <stop
                  offset="100%"
                  stopColor={b.tone === "light" ? "#ffffff" : "#050509"}
                  stopOpacity="0"
                />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill={`url(#ink-fill-${b.seed})`} />
          </svg>
        </div>
      ))}

      <style>{`
        @keyframes ink-bloom {
          0%   { transform: scale(0.82) rotate(0deg);   opacity: calc(var(--ink-peak) * 0.25); }
          50%  { transform: scale(1.0) rotate(3deg);    opacity: var(--ink-peak); }
          100% { transform: scale(1.14) rotate(-2deg);  opacity: calc(var(--ink-peak) * 0.45); }
        }
      `}</style>
    </div>
  );
}
