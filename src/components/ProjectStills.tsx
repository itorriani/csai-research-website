"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import InkBloom from "@/components/InkBloom";
import StillsChrome from "@/components/StillsChrome";
import type { Project } from "@/lib/content";

// The research run set as full-bleed stills: one photograph per project,
// each a screen tall, with the project's name set across the whole measure
// along the bottom edge.
//
// Two things make it read the way a film index reads rather than a list of
// banners:
//
//   1. The bands stack. Every still is `position: sticky` at the top of the
//      viewport, so a still does not leave — the next one rises over it and
//      covers it. Scrolling is a sequence of cuts rather than a pan down a
//      column, and the run is exactly as tall as its stills because each one
//      still takes its own screen in the flow.
//   2. The name is fitted, not sized. Every title is scaled until it spans
//      the full measure, so SOCIAL SIMULATION and CANARY end up at very
//      different point sizes and identical width. Nothing is set to a fixed
//      size, because a fixed size would leave the short names stranded short
//      of the right edge and break the only alignment the run has.
//
// The type is Naval, which the rest of the site reserves for the lockup —
// that restriction is deliberately lifted here, at the project's request, so
// the index speaks in the house face at display size.

const PAD = 24; // the side margin the still is set to, in px

// What the top of a still has to leave for the pinned nav. The bar is fixed
// over the whole run, so a still's own link cannot start at the side margin
// the way the rest of the frame does — it would be set straight through the
// nav links on the other side of the bar.
const NAV_CLEAR = 92;

// The white the stills are mounted on. Every card is inset by this much on
// all four sides and the page shows through around it, so a still reads as a
// plate laid on paper rather than as a screen the picture has been poured
// into — and the join between two of them is a white rule rather than one
// photograph butting straight onto the next.
const FRAME = 7;

// What the fitted title is measured at. Any size works — it is only the
// reference the real size is scaled from — but measuring at a large size
// keeps the ratio away from the rounding error a tiny measurement carries.
const REF_SIZE = 200;

// How far above the line the name sits relative to its own size. Display
// setting wants the lines closer than their bodies, and at these sizes 0.82
// is about where the caps of a second line clear the descenders of the
// first without touching.
const LEADING = 0.82;

// The measurement every fitted line shares. Set the line at the reference
// size, read the width its glyphs actually occupy there, and return the size
// that would make them span the measure exactly. It is a plain function
// rather than a hook because the two titles differ in what they do with the
// answer — one line, or one line and a companion held at the same size.
function sizeToFit(lead: HTMLElement, available: number) {
  lead.style.fontSize = `${REF_SIZE}px`;
  const natural = lead.getBoundingClientRect().width;
  return natural ? (available / natural) * REF_SIZE : 0;
}

function setLine(el: HTMLElement, size: number, leading = LEADING) {
  el.style.fontSize = `${size}px`;
  el.style.lineHeight = `${size * leading}px`;
}

// The fit has to be taken again on three occasions, and all three matter: the
// element's own width changing, the font landing — measured against the
// fallback serif the ratio is wrong — and the viewport changing in a way that
// does not resize the element itself, such as a scrollbar appearing.
function watchFit(lead: HTMLElement, fit: () => void) {
  fit();
  const observer = new ResizeObserver(fit);
  observer.observe(lead.parentElement!);
  if (document.fonts) document.fonts.ready.then(fit, () => {});
  return () => observer.disconnect();
}

// The name is a link where the project has a page and plain type where it
// does not, but either way it has to be a block of the full measure, because
// the fit is taken against it.
function Wrap({ href, children }: { href?: string; children: ReactNode }) {
  return href ? (
    <Link href={href} className="block">
      {children}
    </Link>
  ) : (
    <span className="block">{children}</span>
  );
}

function Still({
  project,
  image,
  index,
  priority,
}: {
  project: Project;
  image: string;
  index: number;
  priority: boolean;
}) {
  const titleRef = useRef<HTMLSpanElement>(null);

  // Fit the name to the measure. The span is inline-block, so its own width
  // is the width the glyphs actually occupy at the size it is currently set
  // in; the ratio between that and the space available is the factor the
  // reference size is multiplied by.
  useEffect(() => {
    const span = titleRef.current;
    if (!span) return;

    return watchFit(span, () => {
      const available = span.parentElement?.clientWidth;
      if (!available) return;
      const size = sizeToFit(span, available);
      if (size) setLine(span, size);
    });
  }, [project.name]);

  return (
    <article
      className="bg-page sticky top-0 h-screen"
      // The stills must paint in source order — a later one covering an
      // earlier one — which is what the stacking context gives them anyway,
      // but saying it outright keeps a stray z-index elsewhere on the page
      // from reordering the run.
      style={{ zIndex: index + 1, padding: FRAME }}
    >
      {/* The plate. It clips rather than the article, so the white inset
          survives: were the article doing the clipping, the picture would be
          cut at the page edge and the frame would have nothing to sit in. */}
      <div className="relative h-full w-full overflow-hidden bg-[#050509]">
        {/* `fill` measures itself against the nearest positioned ancestor, and
          it will not accept a sticky one — so the photograph gets its own
          absolute frame inside the plate rather than filling the still
          itself. */}
        <div className="absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            // The first still is above the fold on every screen, so it is the
            // page's largest contentful paint and is worth the preload. The
            // rest are a screen or more down and load as they come.
            priority={priority}
            quality={90}
            className="object-cover"
          />
        </div>

        {/* Holds the white type off the photograph. Weighted to the bottom,
          where the name is, and thinned to almost nothing across the middle
          so the picture is not flattened by a scrim it does not need. It
          lifts a little at the very top for the link, which is the only
          other thing set over the frame — enough to keep its hairline rule
          off a bright crowd, not enough to read as a bar. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,5,9,0.82)_0%,rgba(5,5,9,0.58)_16%,rgba(5,5,9,0.28)_34%,rgba(5,5,9,0.06)_55%,rgba(5,5,9,0.06)_80%,rgba(5,5,9,0.38)_100%)]" />

        <div
          className="absolute inset-0 flex flex-col justify-between"
          style={{ padding: `${NAV_CLEAR}px ${PAD}px 48px` }}
        >
          {/* Nothing along the top but the way in. The still says what the
            work is with its own picture and its own name; the summary and
            the credit line belong on the project's page, not over the
            photograph.

            A project without a page gets no link at all, here or on the
            name — the index says a row is inert by not offering a way in,
            rather than by offering one that goes nowhere. */}
          <div className="flex items-start justify-end">
            {project.href && (
              <Link
                href={project.href}
                className="font-sans shrink-0 border border-white/60 px-4 py-2.5 text-[11px] uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:bg-white hover:text-[#050509]"
              >
                Read the work <span aria-hidden="true">&rarr;</span>
              </Link>
            )}
          </div>

          <div>
            {/* The fitted name. The negative margin pulls the first glyph's
              left sidebearing out past the padding so the stem of the cap
              lands on the same vertical as the rules and type above it —
              set flush, the letter would sit a hair inside them. */}
            <h3
              className="w-full"
              style={{
                marginLeft: `-${PAD}px`,
                width: `calc(100% + ${PAD}px)`,
              }}
            >
              {/* The wrapper is a block either way — the fit measures against
                the width of whatever the name is sitting in, and a link that
                shrank to its content would hand back the glyph width it is
                supposed to be the yardstick for. */}
              <Wrap href={project.href}>
                <span
                  ref={titleRef}
                  // Inline-block, and deliberately so: the fit works by
                  // measuring the glyphs, and a block span would simply report
                  // the width of the line it fills, which makes the ratio 1
                  // and leaves every name stranded at the reference size.
                  className="font-naval inline-block whitespace-nowrap uppercase text-white"
                  style={{
                    fontSize: `${REF_SIZE}px`,
                    lineHeight: `${REF_SIZE * LEADING}px`,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {project.name}
                </span>
              </Wrap>
            </h3>
          </div>
        </div>
      </div>
    </article>
  );
}
// The opening still. Same frame as the project stills and part of the same
// stack — it is the sheet the rest of the run is dealt onto. The mark that
// appears to stand on it belongs to the chrome above the run, which is what
// lets it travel off this still and into the nav without ever changing
// hands; the season below is the still's own.
function CoverStill({ image }: { image: string }) {
  return (
    <article
      className="bg-page sticky top-0 h-screen"
      style={{ zIndex: 0, padding: FRAME }}
    >
      {/* Same plate the project stills are mounted on, so the run opens on
          the frame it goes on keeping. */}
      <div className="relative h-full w-full overflow-hidden bg-[#050509]">
        <div className="absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            // The cover opens the page, so this is the largest contentful
            // paint and the one image on the run worth preloading.
            priority
            quality={90}
            className="object-cover"
          />
        </div>

        {/* The washes sit on the painting and under the scrims — they are part
          of the picture, not an overlay on the finished cover, and putting
          them beneath means the scrims go on reading them and the mark
          together rather than fighting whichever bloom happens to be
          swelling behind it. */}
        <InkBloom />

        {/* Two scrims, and the round one is doing more than contrast. The mark
          punches its open discs out in the field colour rather than in
          transparency, so over a photograph those discs are flat dark coins
          wherever the picture behind them is not dark already. Sinking the
          ground the mark stands on toward the same ink is what lets them read
          as holes instead.

          How tight it can be drawn depends on the picture under it. Over a
          detailed photograph a small, strong pool disappears into the detail;
          over something smooth and even — fog, cloud, a flat wall — the same
          pool reads as a dark oval painted on the sky, and it has to be
          spread wide and shallow instead to pass for light. This is set for a
          photograph with detail in it, and is worth re-checking whenever the
          cover changes to something flatter. */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(5,5,9,0.62)_0%,rgba(5,5,9,0.26)_24%,rgba(5,5,9,0.26)_58%,rgba(5,5,9,0.72)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_34%_26%_at_50%_22%,rgba(5,5,9,0.86)_0%,rgba(5,5,9,0.62)_38%,rgba(5,5,9,0.26)_72%,rgba(5,5,9,0)_100%)]" />

        {/* The season is set under the mark rather than down here. A project
            still carries its name in the corner because the name is the
            thing; the cover carries a date, and a date set at the height of a
            project's name would be the loudest word on a page it is only
            dating. It belongs to the mark it follows, which is where the
            chrome puts it. */}
      </div>
    </article>
  );
}

export default function ProjectStills({
  id,
  projects,
  images,
  cover,
}: {
  id?: string;
  projects: Project[];
  /** Keyed by project id, so the run cannot drift if the order changes. */
  images: Record<string, string>;
  /** The opening still, stacked under the run. */
  cover?: { image: string };
}) {
  // The chrome needs to know where the run ends so the bar can go when the
  // run does, and the run is this section.
  const runRef = useRef<HTMLElement>(null);

  return (
    <section id={id} ref={runRef} className="relative">
      {cover && (
        <>
          <CoverStill image={cover.image} />
          {/* Outside every still, so no card can cover it. */}
          <StillsChrome runRef={runRef} />
        </>
      )}

      {projects.map((project, i) => (
        <Still
          key={project.id}
          project={project}
          image={images[project.id]}
          index={i}
          // The cover is the page's opening image; when there is one, it is
          // the preload that matters and the first project still is a screen
          // further down like the rest.
          priority={!cover && i === 0}
        />
      ))}
    </section>
  );
}
