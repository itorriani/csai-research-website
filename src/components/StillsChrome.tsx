"use client";

import { useEffect, useRef, type RefObject } from "react";
import HeroNav from "@/components/HeroNav";
import NeuronBloom from "@/components/NeuronBloom";

// The furniture that sits over the whole stills run: one nav bar, pinned,
// with the house mark standing in the middle of it.
//
// The mark used to travel. It was rendered in the nav's centre cell and the
// cover state was a transform — pushed down to the middle of the screen and
// scaled up at the top of the page, released back to the identity transform
// as the first card rose. That is gone: the cover is a poster now, composed
// and complete, and a mark swelling in the middle of it was standing on the
// artwork rather than heading it. It sits in the bar from the first frame and
// stays there.
//
// What is left of this component is the bar's own life: it is fixed rather
// than sticky, because the stills are sticky themselves and each one covers
// the screen, so a nav inside the cover would be buried by the first card
// that rose over it. Fixed, at a z-index above the run, it stays for the
// whole sequence and then fades as the run ends.

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

// The mark's size in the bar. Drawn at this size rather than scaled to it —
// an svg stretched by a transform is rasterised once at its laid-out size and
// then blown up, which is where soft edges come from.
const NAV_W = 38;

export default function StillsChrome({
  runRef,
}: {
  /** The stills run, so the chrome knows when it is over. */
  runRef: RefObject<HTMLElement | null>;
}) {
  const chromeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const apply = () => {
      raf = 0;

      // Fade as the last still leaves. The run is the only thing this bar
      // belongs to; over the white footer below it would be white on white.
      const chrome = chromeRef.current;
      const run = runRef.current;
      if (chrome && run) {
        const vh = window.innerHeight;
        const bottom = run.getBoundingClientRect().bottom;
        const o = clamp01((bottom - vh * 0.2) / (vh * 0.4));
        chrome.style.opacity = `${o}`;
        chrome.style.pointerEvents = o < 0.05 ? "none" : "";
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [runRef]);

  return (
    <div
      ref={chromeRef}
      // The padding is the breathing room above the mark. It is set here
      // rather than on the nav, which is shared with every other page on the
      // site and sits tight to the top there by design.
      className="fixed inset-x-0 top-0 z-50 pt-5"
      // The bar is only ever a bar; nothing hanging out of it should take the
      // clicks that belong to the still behind it.
      style={{ pointerEvents: "none" }}
    >
      <div style={{ pointerEvents: "auto" }}>
        <HeroNav
          tone="dark"
          centre={
            // No caption under it. The season is said on the cover itself —
            // "W 2 6" across the head of the poster — and a date hanging off
            // the mark would say it twice, with the second one dangling under
            // the bar where there is nothing to hold it.
            <div style={{ width: NAV_W }}>
              <NeuronBloom
                className="block w-full"
                caption={false}
                tone="dark"
                // Solid white, rather than white strokes with the ground
                // showing through every open disc. At this size those holes
                // are a pixel or two across and read as grit on the mark
                // instead of as drawing.
                field="#ffffff"
                // And heavier, because 1.7 of a 117-unit viewBox drawn at
                // 38px is about half a pixel of stroke.
                weight={2.6}
              />
            </div>
          }
        />
      </div>
    </div>
  );
}
