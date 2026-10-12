"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import BrainMark from "@/components/BrainMark";
import type { PolicyDoc } from "@/lib/content";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const GAP = 20;
const MOVE = 800;

const STRIP_CLASS =
  "font-sans mt-7 flex h-12 w-full items-center justify-center bg-black pl-[0.18em] text-center text-[12px] font-bold uppercase tracking-[0.18em] text-white antialiased transition-colors duration-300 hover:bg-black/80";

// A blank sheet standing in for each standards document, in the same form as
// the cover sheets on Collections. Everything is measured in `cqw` against
// the sheet, so the composition scales with the row rather than needing a
// breakpoint per width.
function Sheet({ doc }: { doc: PolicyDoc }) {
  return (
    <div className="@container relative aspect-[8.5/11] w-full overflow-hidden border border-black/15 bg-white">
      <div className="absolute left-[13%] top-[10%]">
        {/* House mark first, the issuing body's mark beside it, divided by
            a hairline — a CSAI sheet about someone else's standard. */}
        <div className="flex items-center gap-[3cqw]">
          <BrainMark className="h-[7cqw] w-auto shrink-0" />
          <span className="h-[6cqw] w-px shrink-0 bg-black/20" />
          <Image
            src={doc.logo}
            alt=""
            width={320}
            height={94}
            className={`${doc.logoHeight} w-auto shrink-0`}
            // Small inline marks, and the sheets can be stacked out of the
            // observer's reach — load them rather than waiting on lazy.
            loading="eager"
            unoptimized
          />
        </div>

        <p className="mt-[3.2cqw] text-[7cqw] leading-none tracking-[-0.01em] text-black">
          {doc.wordmark}
        </p>
        <p className="mt-[3.4cqw] font-sans text-[3.4cqw] font-bold uppercase leading-none tracking-[0.14em] text-black/70 antialiased">
          {doc.label}
        </p>
      </div>
    </div>
  );
}

// The standards the division writes to. Same fold as the papers on a project
// document: the sheets keep a running order, opening one brings it to the
// front and it stays there, so releasing re-forms the row where they are
// rather than unwinding.
export default function PolicyPlates({ docs }: { docs: PolicyDoc[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [order, setOrder] = useState<string[]>(() => docs.map((d) => d.href));
  const [selected, setSelected] = useState<string | null>(null);
  const [demoing, setDemoing] = useState(false);
  const [inView, setInView] = useState(false);
  const [plateW, setPlateW] = useState(0);
  const reduced = usePrefersReducedMotion();

  // Both ends of the move must share a unit, or the browser cannot
  // interpolate them and the sheets snap instead of travelling.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const w = el.getBoundingClientRect().width;
      setPlateW((w - (docs.length - 1) * GAP) / docs.length);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    return () => ro.disconnect();
  }, [docs.length]);

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

  const selectedDoc = docs.find((d) => d.href === selected) ?? null;
  const stacked = selectedDoc !== null || demoing;
  const posOf = (href: string) => order.indexOf(href);

  const raise = (href: string) => {
    setOrder((prev) => [href, ...prev.filter((h) => h !== href)]);
    setSelected(href);
  };

  const n = docs.length;
  const plateWidth = `calc((100% - ${(n - 1) * GAP}px) / ${n})`;

  return (
    <div ref={ref} className="relative mt-10">
      <div
        aria-hidden="true"
        className="invisible aspect-[8.5/11]"
        style={{ width: plateWidth }}
      />

      {docs.map((doc) => {
        const pos = posOf(doc.href);
        const isTop = doc.href === selected;

        const transform = stacked
          ? `translate3d(${pos * 5}px, ${pos * 5}px, 0)`
          : plateW
            ? `translate3d(${pos * (plateW + GAP)}px, 0, 0)`
            : `translate3d(calc(${pos} * (100% + ${GAP}px)), 0, 0)`;

        return (
          <div
            key={doc.href}
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
              onClick={() => (isTop ? setSelected(null) : raise(doc.href))}
              aria-expanded={isTop}
              className={`block w-full text-left focus-visible:outline-none ${
                stacked ? "" : "hover:-translate-y-1"
              } transition-transform duration-500 ease-out`}
            >
              <Sheet doc={doc} />
            </button>
          </div>
        );
      })}

      <div
        aria-hidden={!selectedDoc}
        className="absolute top-0 flex h-full flex-col justify-center"
        style={{
          left: `calc(${plateWidth} + ${GAP * 3}px)`,
          right: 0,
          opacity: selectedDoc ? 1 : 0,
          transform: selectedDoc
            ? "translate3d(0,0,0)"
            : "translate3d(20px,0,0)",
          pointerEvents: selectedDoc ? "auto" : "none",
          transition: reduced
            ? undefined
            : `opacity 600ms ${EASE} 180ms, transform ${MOVE}ms ${EASE} 140ms`,
        }}
      >
        {selectedDoc && (
          <>
            <h3 className="doc-ink text-[17px] leading-[1.35]">
              {selectedDoc.title}
            </h3>

            <p className="doc-ink doc-justify mt-5 text-[15px] leading-[1.5]">
              {selectedDoc.blurb}
            </p>

            <a
              href={selectedDoc.href}
              target="_blank"
              rel="noopener"
              className={STRIP_CLASS}
            >
              Read the document
            </a>
          </>
        )}
      </div>
    </div>
  );
}
