"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Project, ProjectEffect } from "@/lib/content";
import Threads from "@/components/backgrounds/Threads";
import LetterGlitch from "@/components/backgrounds/LetterGlitch";
import Particles from "@/components/backgrounds/Particles";
import RippleGrid from "@/components/backgrounds/RippleGrid";

// A24's featured-titles treatment, ported. Two behaviours carry it:
//
//  1. Each row rides up out of an overflow-hidden mask when the section first
//     enters view, staggered down the list.
//  2. Hovering a row DIMS that row to grey and leaves the rest white — the
//     inverse of the usual spotlight, and what a24films.com actually does.
//     The dimmed title reads as "this one is the backdrop now".
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// The light panel is a straight inversion of the dark one: identical alphas,
// black ink instead of white. Each pair is [resting, hovered] — note that the
// title darkens on hover while the supporting copy strengthens, which is what
// produces the "dim the one you're pointing at" read.
type Tone = "dark" | "light";

const TONES: Record<
  Tone,
  {
    section: string;
    heading: string;
    invertMark: boolean;
    title: [string, string];
    summary: [string, string];
    meta: [string, string];
  }
> = {
  dark: {
    section: "bg-[#050509]",
    heading: "text-white/55",
    // Source art is dark, so white requires inverting it.
    invertMark: true,
    title: ["rgba(255,255,255,1)", "rgba(255,255,255,0.42)"],
    summary: ["rgba(255,255,255,0.45)", "rgba(255,255,255,0.9)"],
    meta: ["rgba(255,255,255,0.28)", "rgba(255,255,255,0.6)"],
  },
  light: {
    section: "bg-white",
    heading: "text-black/55",
    invertMark: false,
    title: ["rgba(0,0,0,1)", "rgba(0,0,0,0.42)"],
    summary: ["rgba(0,0,0,0.45)", "rgba(0,0,0,0.9)"],
    meta: ["rgba(0,0,0,0.28)", "rgba(0,0,0,0.6)"],
  },
};

// How long the backdrop takes to cross-fade, and how long a torn-down effect
// stays mounted so it can fade OUT rather than vanish on mouse-leave.
const BACKDROP_MS = 500;

// Each effect is picked to describe its project rather than just decorate it,
// and every one is forced monochrome to sit inside the black-and-white system.
// Only the hovered row's effect is ever mounted — four live WebGL contexts
// animating behind a static list is not a trade worth making.
function Backdrop({ effect, tone }: { effect: ProjectEffect; tone: Tone }) {
  const ink = tone === "dark" ? "#ffffff" : "#000000";

  switch (effect) {
    // Drifting signal traces — EEG channels, and the artifacts riding on them.
    case "threads":
      return (
        <Threads
          color={tone === "dark" ? [1, 1, 1] : [0, 0, 0]}
          amplitude={1.6}
          distance={0.3}
          enableMouseInteraction={false}
        />
      );

    // Characters corrupting in place: a prompt being injected, caught mid-flip.
    case "glitch":
      return (
        <LetterGlitch
          glitchColors={
            tone === "dark"
              ? ["#2a2a2a", "#7a7a7a", "#f2f2f2"]
              : ["#d8d8d8", "#8a8a8a", "#0d0d0d"]
          }
          glitchSpeed={44}
          centerVignette={false}
          outerVignette
          smooth
          backgroundColor="transparent"
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>/\\|=+-_*&^%$#@!?:;0123456789"
        />
      );

    // One mote per agent, drifting in loose formation.
    case "particles":
      return (
        <Particles
          particleColors={[ink, ink]}
          particleCount={320}
          particleSpread={11}
          speed={0.08}
          particleBaseSize={64}
          alphaParticles
          disableRotation={false}
          moveParticlesOnHover={false}
        />
      );

    // An occupancy grid rippling outward — the world model being probed.
    case "ripple":
      return (
        <RippleGrid
          gridColor={ink}
          lightMode={tone === "light"}
          gridSize={11}
          gridThickness={13}
          rippleIntensity={0.06}
          fadeDistance={1.7}
          vignetteStrength={2.2}
          glowIntensity={0.12}
          opacity={1}
          mouseInteraction
          mouseInteractionRadius={1.1}
        />
      );
  }
}

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

// Read through useSyncExternalStore rather than an effect: matchMedia is an
// external store, and this keeps the preference live if the user flips it
// mid-session instead of sampling it once on mount.
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => false,
  );
}

export default function ProjectIndex({
  id,
  heading,
  projects,
  tone = "dark",
}: {
  /** Must be unique per panel — it anchors the section's aria-labelledby. */
  id: string;
  heading: React.ReactNode;
  projects: Project[];
  tone?: Tone;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const palette = TONES[tone];
  const headingId = `${id}-heading`;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);
        setRevealed(true);
      },
      { threshold: 0.15 },
    );
    observer.observe(el);

    // IntersectionObserver callbacks never fire while the tab is hidden, which
    // would leave the section stuck mid-mask if the page loads in a background
    // tab. Layout is still computed, so measure directly as a fallback — on a
    // timeout rather than inline, since a setState in the effect body would
    // cascade a second render before paint.
    const fallback = window.setTimeout(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        observer.unobserve(el);
        setRevealed(true);
      }
    }, 0);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, []);

  const shown = revealed || reduced;

  return (
    <section
      ref={sectionRef}
      aria-labelledby={headingId}
      className={`relative isolate w-full overflow-hidden py-24 sm:py-32 ${palette.section}`}
      onMouseLeave={() => setActive(null)}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5">
        <h2
          id={headingId}
          className={`mb-10 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] ${palette.heading}`}
          style={{
            opacity: shown ? 1 : 0,
            transition: reduced ? undefined : `opacity 700ms ${EASE}`,
          }}
        >
          {heading}
          {/* Mark sits on the baseline of the label; the source art is dark,
              so it needs inverting the same way the nav logotype does. */}
          <Image
            src="/csai-logo.png"
            alt=""
            width={1254}
            height={1254}
            className={`h-3 w-3 shrink-0 object-contain ${
              palette.invertMark ? "invert" : ""
            }`}
          />
        </h2>

        <ul>
          {projects.map((project, i) => {
            const dimmed = active === project.id;
            return (
              <li key={project.id}>
                <a
                  href="#"
                  className="block focus-visible:outline-none"
                  onMouseEnter={() => setActive(project.id)}
                  onFocus={() => setActive(project.id)}
                  onBlur={() => setActive(null)}
                >
                  {/* Mask: the row slides up from under this edge. */}
                  <span className="-my-[0.18em] block overflow-hidden py-[0.18em] text-[clamp(2.5rem,7.2vw,5rem)]">
                    <span
                      className="flex flex-col items-start gap-x-8 gap-y-1 sm:flex-row sm:items-start"
                      style={{
                        transform: shown
                          ? "translateY(0)"
                          : "translateY(135%)",
                        transition: reduced
                          ? undefined
                          : `transform 1000ms ${EASE}`,
                        transitionDelay: shown ? `${i * 110}ms` : "0ms",
                      }}
                    >
                      <span
                        className="font-wordmark text-[1em] leading-[0.98] tracking-[-0.03em]"
                        style={{
                          color: palette.title[dimmed ? 1 : 0],
                          transition: reduced
                            ? undefined
                            : "color 300ms ease-out",
                        }}
                      >
                        {project.name}
                      </span>

                      <span className="flex max-w-[42ch] flex-col gap-[0.55em] text-[12px] uppercase leading-[1.5] tracking-[0.1em] sm:mt-[0.75em]">
                        <span
                          style={{
                            color: palette.summary[dimmed ? 1 : 0],
                            transition: reduced
                              ? undefined
                              : "color 300ms ease-out",
                          }}
                        >
                          {project.summary}
                        </span>
                        <span
                          className="text-[11px] sm:whitespace-nowrap"
                          style={{
                            color: palette.meta[dimmed ? 1 : 0],
                            transition: reduced
                              ? undefined
                              : "color 300ms ease-out",
                          }}
                        >
                          Research led by {project.pi}
                        </span>
                      </span>
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
