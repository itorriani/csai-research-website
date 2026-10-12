"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Paper } from "@/lib/content";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const GAP = 20;
const MOVE = 800;

// The read-more strip, inverted from the research index because this page is
// white. The left pad cancels the trailing letter-space so the tracked caps
// sit optically centred.
const STRIP_CLASS =
  "font-sans mt-7 flex h-12 w-full items-center justify-center bg-black pl-[0.18em] text-center text-[12px] font-bold uppercase tracking-[0.18em] text-white antialiased transition-colors duration-300 hover:bg-black/80";

// The papers a project rests on. Closed, they sit in a row; opened, they
// gather into a stack and the chosen one's description takes the space they
// vacate — the same fold the research index uses.
//
// The plates keep a running order rather than fixed slots. Opening one moves
// it to the front of that order and it stays there, so closing re-forms the
// row in the new order instead of unwinding to where things began. Nothing
// has to travel backwards, which is what made the revert read as a glitch.
export default function PaperPlates({ papers }: { papers: Paper[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<string[]>(() => papers.map((p) => p.slug));
  const [selected, setSelected] = useState<string | null>(null);
  const [demoing, setDemoing] = useState(false);
  const [inView, setInView] = useState(false);
  const [plateW, setPlateW] = useState(0);
  const reduced = usePrefersReducedMotion();

  // Both ends of the move have to be in the same unit or the browser cannot
  // interpolate them: a calc() carrying a percentage against a flat px value
  // snaps instead of animating. The calc fallback below resolves to exactly
  // the same place, so the swap on first measure moves nothing.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      setPlateW((w - (papers.length - 1) * GAP) / papers.length);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, [papers.length]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.4,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  // Every ten seconds the plates perform the fold and release it, so the
  // interaction is demonstrated rather than waiting to be stumbled on. It
  // runs only while the row is on screen with nothing open — which also
  // means it costs nothing in a background tab — and is skipped entirely
  // for readers who have asked for less motion.
  useEffect(() => {
    if (reduced || !inView || selected) return;

    let release = 0;
    const tick = window.setInterval(() => {
      setDemoing(true);
      release = window.setTimeout(() => setDemoing(false), MOVE + 250);
    }, 10000);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(release);
      setDemoing(false);
    };
  }, [reduced, inView, selected]);

  const selectedPaper = papers.find((p) => p.slug === selected) ?? null;
  const stacked = selectedPaper !== null || demoing;

  // Position in the running order drives everything: the slot in the row,
  // the depth in the pile, and the stacking context. Because it only changes
  // when a plate is raised, nothing re-orders mid-flight.
  const posOf = (slug: string) => order.indexOf(slug);

  const raise = (slug: string) => {
    setOrder((prev) => [slug, ...prev.filter((s) => s !== slug)]);
    setSelected(slug);
  };

  const n = papers.length;
  const plateWidth = `calc((100% - ${(n - 1) * GAP}px) / ${n})`;

  return (
    <div ref={ref} className="relative mt-12">
      {/* In-flow spacer: fixes the row's height so the plates can be
          absolutely positioned and animate on transform alone. */}
      <div
        aria-hidden="true"
        className="invisible aspect-[8.5/11]"
        style={{ width: plateWidth }}
      />

      {papers.map((paper) => {
        const pos = posOf(paper.slug);
        const isTop = paper.slug === selected;

        const transform = stacked
          ? `translate3d(${pos * 5}px, ${pos * 5}px, 0)`
          : plateW
            ? `translate3d(${pos * (plateW + GAP)}px, 0, 0)`
            : `translate3d(calc(${pos} * (100% + ${GAP}px)), 0, 0)`;

        return (
          <div
            key={paper.slug}
            className="absolute left-0 top-0"
            style={{
              width: plateWidth,
              zIndex: n - pos,
              transform,
              transition: reduced ? undefined : `transform ${MOVE}ms ${EASE}`,
            }}
          >
            <button
              type="button"
              onClick={() => (isTop ? setSelected(null) : raise(paper.slug))}
              aria-expanded={isTop}
              className={`group block w-full text-left focus-visible:outline-none ${
                stacked ? "" : "hover:-translate-y-1"
              } transition-transform duration-500 ease-out`}
            >
              <div className="relative aspect-[8.5/11] w-full overflow-hidden border border-black/15 bg-white shadow-[0_2px_10px_-6px_rgba(0,0,0,0.5)]">
                <Image
                  src={`/papers/${paper.slug}.png`}
                  alt={`First page of “${paper.title}”`}
                  width={paper.width}
                  height={paper.height}
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="h-full w-full object-cover object-top grayscale"
                />
              </div>
            </button>
          </div>
        );
      })}

      {/* The description fills the space the plates vacate. */}
      <div
        aria-hidden={!selectedPaper}
        className="absolute top-0 flex h-full flex-col justify-center"
        style={{
          left: `calc(${plateWidth} + ${GAP * 3}px)`,
          right: 0,
          opacity: selectedPaper ? 1 : 0,
          transform: selectedPaper
            ? "translate3d(0,0,0)"
            : "translate3d(20px,0,0)",
          pointerEvents: selectedPaper ? "auto" : "none",
          transition: reduced
            ? undefined
            : `opacity 600ms ${EASE} 180ms, transform ${MOVE}ms ${EASE} 140ms`,
        }}
      >
        {selectedPaper && (
          <>
            <h3 className="doc-ink text-[17px] leading-[1.35]">
              {selectedPaper.title}
            </h3>

            <p className="doc-ink doc-justify mt-5 text-[15px] leading-[1.5]">
              {selectedPaper.blurb}
            </p>

            <a
              href={`/papers/${selectedPaper.slug}.pdf`}
              target="_blank"
              rel="noopener"
              className={STRIP_CLASS}
            >
              Read the paper
            </a>
          </>
        )}
      </div>
    </div>
  );
}
