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

// The read-more strip under the detail title. The left pad cancels the
// trailing letter-space so the tracked caps sit optically centred.
const STRIP_CLASS =
  "font-sans mt-7 flex h-12 w-full items-center justify-center bg-white pl-[0.18em] text-center text-[12px] font-bold uppercase tracking-[0.18em] text-black transition-colors duration-300 hover:bg-white/80";

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
  const [order, setOrder] = useState<string[]>(() => projects.map((p) => p.id));
  const [cardW, setCardW] = useState(0);
  const [demoing, setDemoing] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
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

  // Both ends of the move must share a unit or the browser cannot
  // interpolate them: a calc() carrying a percentage against flat px snaps.
  // The calc fallback resolves to the same place, so the first measure
  // moves nothing.
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      setCardW((w - (projects.length - 1) * GAP) / projects.length);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, [projects.length]);

  // The same demonstration the papers run: every ten seconds the row folds
  // and releases, so the interaction is shown rather than stumbled on. Only
  // while on screen with nothing open, and never under reduced motion.
  useEffect(() => {
    if (reduced || !revealed || selected) return;

    let release = 0;
    const tick = window.setInterval(() => {
      setDemoing(true);
      release = window.setTimeout(() => setDemoing(false), 1150);
    }, 10000);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(release);
      setDemoing(false);
    };
  }, [reduced, revealed, selected]);

  const selectedProject = projects.find((p) => p.id === selected) ?? null;

  // Position in the running order drives the slot, the depth in the pile and
  // the stacking context alike. It only changes when a card is raised, so
  // nothing re-orders mid-flight — z-index cannot be animated, and changing
  // it while the sheets travel is what popped them over one another.
  const posOf = (id: string) => order.indexOf(id);

  const raise = (id: string) => {
    setOrder((prev) => [id, ...prev.filter((x) => x !== id)]);
    setSelected(id);
  };

  const n = projects.length;
  const cardWidth = `calc((100% - ${(n - 1) * GAP}px) / ${n})`;

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={headingId}
      className={`w-full bg-[#050509] pb-24 sm:pb-32 ${
        tightTop ? "-mt-16 pt-0 sm:-mt-24" : "pt-10 sm:pt-14"
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
          <div ref={rowRef} className="relative">
            {/* In-flow spacer: fixes the row's height so the cards can be
                absolutely positioned and animate on transform alone. */}
            <div
              aria-hidden="true"
              className="invisible aspect-[8.5/11]"
              style={{ width: cardWidth }}
            />

            {projects.map((project, i) => {
              const pos = posOf(project.id);
              const isOpen = selectedProject !== null;
              const stacked = isOpen || demoing;
              const isTop = project.id === selected;

              // Closed: laid out across the row, in the running order. Open:
              // gathered into a squared pile on the left, each sheet offset
              // by a consistent step. Releasing re-forms the row in the new
              // order rather than unwinding, so nothing travels backwards.
              const transform = stacked
                ? `translate3d(${pos * 4}px, ${pos * 4}px, 0)`
                : cardW
                  ? `translate3d(${pos * (cardW + GAP)}px, 0, 0)`
                  : `translate3d(calc(${pos} * (100% + ${GAP}px)), 0, 0)`;

              return (
                <div
                  key={project.id}
                  className="absolute left-0 top-0"
                  style={{
                    width: cardWidth,
                    zIndex: n - pos,
                    transform,
                    opacity: revealed || reduced ? 1 : 0,
                    transition: reduced
                      ? undefined
                      : `transform 900ms ${EASE}, opacity 700ms ${EASE}`,
                    transitionDelay:
                      revealed && !stacked ? `${i * 110}ms` : "0ms",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => (isTop ? setSelected(null) : raise(project.id))}
                    aria-expanded={isTop}
                    aria-controls={`${id}-detail`}
                    className={`${CARD_CLASS} text-left transition-transform duration-500 ease-out ${
                      stacked ? "" : "hover:-translate-y-1.5"
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
                  {/* The technical title carries the panel, set upright to
                      match the strip below; the short name trails it in the
                      italic face, dimmed so it reads as a signature. */}
                  <h3 className="text-[clamp(1.6rem,3vw,2.6rem)] font-bold uppercase leading-[1.1] tracking-[0.01em]">
                    {selectedProject.summary}{" "}
                    <span className="font-ysl font-normal text-white/40">
                      {selectedProject.name}
                    </span>
                  </h3>

                  {/* A plain white strip stands in for the abstract: the
                      one way on from the open stack into the project page. */}
                  {selectedProject.href ? (
                    <Link href={selectedProject.href} className={STRIP_CLASS}>
                      Read more
                    </Link>
                  ) : (
                    <div className={STRIP_CLASS} aria-hidden="true">
                      Read more
                    </div>
                  )}

                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
