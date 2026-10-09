"use client";

import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

// A hairline that draws itself left-to-right the first time it scrolls into
// view. Animating scaleX rather than width keeps the whole thing on the
// compositor, so the line stays smooth while the cards above are still
// fading in.
export default function DrawRule({
  className = "",
  duration = 1400,
  delay = 150,
}: {
  className?: string;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [drawn, setDrawn] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const draw = () => window.setTimeout(() => setDrawn(true), delay);

    // Same guard the other reveal components use: an IntersectionObserver
    // never fires in a background tab, so measure directly first and only
    // observe what genuinely starts offscreen.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      draw();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);
        draw();
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const shown = drawn || reduced;

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{
        display: "block",
        transformOrigin: "left center",
        transform: shown ? "scaleX(1)" : "scaleX(0)",
        transition: reduced
          ? undefined
          : `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        willChange: "transform",
      }}
    />
  );
}
