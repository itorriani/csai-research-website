"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import CsaiLockup from "@/components/CsaiLockup";
import DrawRule from "@/components/DrawRule";
import type { Project } from "@/lib/content";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const GAP = 24;

// The face of a single card: lockup along the top, name centred, and a
// justified caption block along the bottom edge.
function CardFace({ project }: { project: Project }) {
  return (
    <>
      <div className="flex justify-center">
        <CsaiLockup marks={3} className="text-[11px]" />
      </div>

      <h3 className="font-naval flex flex-1 items-center justify-center px-2 text-center text-[clamp(1.4rem,2.2vw,2rem)] uppercase leading-[1.05] tracking-[0.01em]">
        {project.name}
      </h3>

      <Image
        src="/csai-logo.png"
        alt=""
        width={1254}
        height={1254}
        className="mx-auto mb-1.5 h-2 w-2 object-contain"
      />

      <p className="font-naval w-full text-justify text-[5.5px] uppercase leading-[1.25] tracking-[0.27em] text-black [text-align-last:justify]">
        {project.summary} &middot; Research led by {project.pi}
        {project.lab ? <> &middot; {project.lab}</> : null}
        {project.location ? <> &middot; {project.location}</> : null}
        {project.term ? <> &middot; {project.term}</> : null} &middot; Made by
        CSAI Research Division
      </p>
    </>
  );
}

const CARD_CLASS =
  "flex aspect-[8.5/11] w-full flex-col bg-white p-7 text-black shadow-[0_18px_45px_-20px_rgba(0,0,0,0.9)]";

export default function ProjectPostcards({
  id,
  heading,
  projects,
  tightTop = false,
  rule = false,
}: {
  /** Must be unique per panel — it anchors the section's aria-labelledby. */
  id: string;
  heading: React.ReactNode;
  projects: Project[];
  /** Pulls the panel up under the one above instead of opening a full gap. */
  tightTop?: boolean;
  /** Draws a hairline from the heading out to the right edge on first view. */
  rule?: boolean;
}) {
  const headingId = `${id}-heading`;
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();

  // Below two cards there is nothing to stack, so the panel stays a plain
  // centred card and keeps its link straight through to the project page.
  const interactive = projects.length > 1;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);
        setRevealed(true);
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Escape backs out of the stack.
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const selectedIndex = projects.findIndex((p) => p.id === selected);
  const selectedProject = selectedIndex >= 0 ? projects[selectedIndex] : null;

  // Depth within the pile: the chosen card rises to 0, the rest keep their
  // reading order underneath it.
  const rankOf = (i: number) => {
    if (selectedIndex < 0) return i;
    if (i === selectedIndex) return 0;
    return i < selectedIndex ? i + 1 : i;
  };

  const n = projects.length;
  const cardWidth = `calc((100% - ${(n - 1) * GAP}px) / ${n})`;

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={headingId}
      className={`w-full bg-[#050509] pb-24 sm:pb-32 ${
        tightTop ? "-mt-16 pt-0 sm:-mt-24" : "pt-24 sm:pt-32"
      }`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-5">
        <div className="mb-10 flex items-center gap-5">
          <h2
            id={headingId}
            className="inline-flex shrink-0 items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-white/55"
          >
            {heading}
            <Image
              src="/csai-logo.png"
              alt=""
              width={1254}
              height={1254}
              className="h-3 w-3 shrink-0 object-contain invert"
            />
          </h2>

          {rule && <DrawRule className="h-px flex-1 bg-white/45" />}
        </div>

        {!interactive ? (
          // A lone card centres at a single column's width.
          <div className="mx-auto max-w-[371px]">
            {projects.map((project) => {
              const Card = project.href ? Link : "a";
              return (
                <Card
                  key={project.id}
                  href={project.href ?? "#"}
                  className={CARD_CLASS}
                  style={{
                    opacity: revealed || reduced ? 1 : 0,
                    transition: reduced ? undefined : `opacity 900ms ${EASE}`,
                  }}
                >
                  <CardFace project={project} />
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="relative">
            {/* In-flow spacer: fixes the row's height so the cards can be
                absolutely positioned and animate on transform alone. */}
            <div
              aria-hidden="true"
              className="invisible aspect-[8.5/11]"
              style={{ width: cardWidth }}
            />

            {projects.map((project, i) => {
              const rank = rankOf(i);
              const isOpen = selectedIndex >= 0;
              const isTop = project.id === selected;

              // Closed: laid out across the row. Open: gathered into a squared
              // pile on the left, each sheet offset by a consistent step so
              // the edges below the top card read as a clean stack.
              const transform = isOpen
                ? `translate3d(${rank * 4}px, ${rank * 4}px, 0)`
                : `translate3d(calc(${i} * (100% + ${GAP}px)), 0, 0)`;

              return (
                <div
                  key={project.id}
                  className="absolute left-0 top-0"
                  style={{
                    width: cardWidth,
                    zIndex: n - rank,
                    transform,
                    opacity: revealed || reduced ? 1 : 0,
                    transition: reduced
                      ? undefined
                      : `transform 900ms ${EASE}, opacity 700ms ${EASE}`,
                    transitionDelay:
                      revealed && !isOpen && selectedIndex < 0
                        ? `${i * 110}ms`
                        : "0ms",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setSelected(isTop ? null : project.id)}
                    aria-expanded={isTop}
                    aria-controls={`${id}-detail`}
                    className={`${CARD_CLASS} text-left transition-transform duration-500 ease-out ${
                      isOpen ? "" : "hover:-translate-y-1.5"
                    } focus-visible:outline-none`}
                  >
                    <CardFace project={project} />
                  </button>
                </div>
              );
            })}

            {/* Detail panel fills the space the cards vacate. */}
            <div
              id={`${id}-detail`}
              aria-hidden={!selectedProject}
              className="absolute top-0 flex h-full flex-col justify-center text-white"
              style={{
                left: `calc(${cardWidth} + ${GAP * 3}px)`,
                right: 0,
                opacity: selectedProject ? 1 : 0,
                transform: selectedProject
                  ? "translate3d(0,0,0)"
                  : "translate3d(24px,0,0)",
                pointerEvents: selectedProject ? "auto" : "none",
                transition: reduced
                  ? undefined
                  : `opacity 700ms ${EASE} 200ms, transform 900ms ${EASE} 150ms`,
              }}
            >
              {selectedProject && (
                <>
                  {/* The technical title carries the panel; the project's
                      short name stays on the card itself. */}
                  <h3 className="font-ysl text-[clamp(1.6rem,3vw,2.6rem)] uppercase leading-[1.1] tracking-[0.01em]">
                    {selectedProject.summary}
                  </h3>

                  <p className="mt-5 max-w-[52ch] text-[14px] leading-[1.7] text-white/70">
                    Placeholder abstract — this is where the standfirst for the
                    project would sit, two or three sentences describing the
                    question, the method, and what the group expects to
                    publish.
                  </p>

                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
