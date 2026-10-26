"use client";

import { useEffect, useRef, type RefObject } from "react";
import HeroNav from "@/components/HeroNav";
import NeuronBloom from "@/components/NeuronBloom";

// The furniture that sits over the whole stills run: one nav bar, pinned, and
// the house mark travelling up into the middle of it.
//
// The trick is that the mark is never moved anywhere. It is rendered in the
// nav's centre cell, where it finally comes to rest, and the cover state is
// the transform — scrolled to the top it is pushed down to the middle of the
// screen and scaled up, and scrolling simply releases it back to the identity
// transform it already has. Nothing is measured against the cover, nothing is
// handed from one element to another at the seam, and there is no frame on
// which two copies of the mark could both be visible or both be missing.
//
// The nav is fixed rather than sticky because the stills are sticky
// themselves: each one covers the screen, so a nav inside the cover would be
// buried by the first card that rose over it. Fixed, at a z-index above the
// run, it stays for the whole sequence and then fades as the run ends.

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

// The mark's resting size, in the nav, and what it reads as on the cover.
const NAV_W = 38;
const COVER_W = 104;

// The mark is drawn at its *cover* size and shrunk into the bar, never the
// other way round. An svg scaled up by a transform is not re-drawn at the new
// size: the element is a composited layer, the browser rasterises it once at
// the size it was laid out — 38px — and then stretches that bitmap by 2.7,
// which is where the furred, soft edges came from. Rasterised at 104 and
// scaled down, every state of the journey is sampled from more pixels than it
// needs rather than fewer.
const REST = NAV_W / COVER_W;

// How much of the first screen the journey takes. Short of a full screen on
// purpose: the mark should be seated in the bar a moment before the first
// card finishes covering the cover, not still arriving as it lands.
const TRAVEL = 0.85;

// Where the mark stands on the cover, as a fraction of the screen. High, in
// the band above where a table and the people around it sit in frame: at the
// middle of the picture the mark lands on whoever is nearest the camera and
// reads as something balanced on their head.
const COVER_Y = 0.22;

export default function StillsChrome({
  runRef,
}: {
  /** The stills run, so the chrome knows when it is over. */
  runRef: RefObject<HTMLElement | null>;
}) {
  const chromeRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;

    const apply = () => {
      raf = 0;
      const vh = window.innerHeight;
      const p = clamp01(window.scrollY / (vh * TRAVEL));
      const out = 1 - p; // how much of the cover state is still in force

      const slot = slotRef.current;
      const mark = markRef.current;
      if (slot && mark) {
        // Measured every pass rather than cached: the bar's height moves with
        // the viewport — the links wrap at narrow widths — and a cached
        // centre would leave the mark landing above or below the slot it is
        // supposed to settle into.
        const r = slot.getBoundingClientRect();
        const dy = vh * COVER_Y - (r.top + r.height / 2);
        // Centred on the slot by the first translate, then moved and sized by
        // the rest of the chain. The percentages are of the mark's own box, so
        // they are unaffected by the scale that follows them.
        mark.style.transform = `translate(-50%, -50%) translateY(${(
          dy * out
        ).toFixed(2)}px) scale(${(REST + (1 - REST) * out).toFixed(4)})`;
        // The season line belongs to the cover. It is faded out well before
        // the mark is seated, so nothing is hanging under the bar.
        mark.style.setProperty("--nb-caption-fade", `${clamp01(out * 2 - 0.6)}`);
      }

      // Fade as the last still leaves. The run is the only thing this bar
      // belongs to; over the white footer below it would be white on white.
      const chrome = chromeRef.current;
      const run = runRef.current;
      if (chrome && run) {
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
      className="fixed inset-x-0 top-0 z-50"
      // The bar is only ever a bar; the enlarged mark hanging out of it must
      // not take the clicks that belong to the still behind it.
      style={{ pointerEvents: "none" }}
    >
      <div style={{ pointerEvents: "auto" }}>
        <HeroNav
          tone="dark"
          centre={
            <div
              ref={slotRef}
              className="relative"
              // The bar is still laid out around a 38px mark — the drawing
              // itself is taken out of flow so its true size never widens the
              // nav, and only the transform decides what it reads as.
              style={{ width: NAV_W, aspectRatio: "117 / 98" }}
            >
              <div
                ref={markRef}
                // The width lives here rather than on the mark so NAV_W is
                // the single place the resting size is stated — the scale
                // above is derived from the same number.
                //
                // The origin is the centre, so the scale grows the mark about
                // its own middle and the translate alone decides where that
                // middle is.
                className="absolute left-1/2 top-1/2"
                style={{
                  width: COVER_W,
                  transformOrigin: "center center",
                  willChange: "transform",
                }}
              >
                <NeuronBloom
                  className="block w-full"
                  captionSize={16}
                  tone="dark"
                />
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}
