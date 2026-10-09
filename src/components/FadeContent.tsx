"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import usePrefersReducedMotion from "@/lib/usePrefersReducedMotion";

// Port of React Bits' FadeContent: an IntersectionObserver fires a CSS
// opacity/blur transition the first time the element scrolls into view.
// Dependency-free, so nothing extra lands in the bundle.
type FadeContentProps = {
  children: React.ReactNode;
  as?: ElementType;
  blur?: boolean;
  duration?: number;
  easing?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
};

export default function FadeContent({
  children,
  as: Tag = "div",
  blur = true,
  duration = 900,
  easing = "cubic-bezier(0.22, 1, 0.36, 1)",
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  className = "",
}: FadeContentProps) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => window.setTimeout(() => setInView(true), delay);

    // IntersectionObserver callbacks never fire while the tab is hidden, which
    // would leave above-the-fold content stuck at opacity 0. Layout is still
    // computed, so measure directly first and only observe what starts offscreen.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(el);
        reveal();
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  const shown = inView || reduced;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : initialOpacity,
        filter: blur ? (shown ? "blur(0px)" : "blur(6px)") : undefined,
        transform: shown ? "translateY(0)" : "translateY(10px)",
        transition: reduced
          ? undefined
          : `opacity ${duration}ms ${easing}, filter ${duration}ms ${easing}, transform ${duration}ms ${easing}`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Tag>
  );
}
