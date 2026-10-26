"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import BrainMark from "@/components/BrainMark";
import DrawRule from "@/components/DrawRule";
import type { Project } from "@/lib/content";

// Concluded work, shown as a single poster under its own heading.
//
// It is deliberately not the deck the current run uses, and not the stacking
// stills either. A deck wants several cards to fan between, and there is one
// project here; stacked stills want a screen each, and a season that is over
// does not need three screens of the reader's attention. A poster is the
// right size for one finished thing: the picture, the name, and the way in.
//
// The heading keeps the small tracked caps and the hairline the panels above
// it are set with, so the change of form does not read as a change of voice.

// Set to the left edge, not centred. Centred, a lone sheet reads as the
// whole of the section and leaves the heading floating above nothing;
// against the left margin it sits under the heading and the rule as one
// column, and the white to its right is margin rather than a gap.
const FRAME_CLASS = "group mr-auto block w-full max-w-[430px]";

// A finished project usually has a page; where it has none the poster is
// simply not a link, rather than a link that goes nowhere. It is written as a
// wrapper rather than a swapped element with a spread href, because Link's
// href is not optional and the polymorphic version only typechecks by
// claiming it might be.
function Frame({ href, children }: { href?: string; children: ReactNode }) {
  return href ? (
    <Link href={href} className={FRAME_CLASS}>
      {children}
    </Link>
  ) : (
    <div className={FRAME_CLASS}>{children}</div>
  );
}

export default function ResearchPoster({
  id,
  heading,
  project,
  poster,
}: {
  /** Anchors the section's aria-labelledby, so it must be unique. */
  id: string;
  heading: ReactNode;
  project: Project;
  /** The poster art. Portrait — it is a poster, not a still. */
  poster: string;
}) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      // Paper, not ink. The run above it is a sequence of lit photographs on
      // black; the season that is finished is a printed page, and the change
      // of ground is what says the reader has come out of the run.
      //
      // Its own top padding rather than the deck's negative pull. The panel
      // used to be dragged up under the run above it, which is what left the
      // card entering the screen already cropped.
      className="bg-page w-full pb-24 pt-20 sm:pb-32 sm:pt-28"
    >
      <div className="mx-auto w-full max-w-[1200px] px-5">
        {/* The house mark, standing at the head of the sheet the way it
            stands on a title page — drawn in ink here, because the ground is
            paper. It is the static logo rather than the drawing that opens
            the site: this one is a mark on a page, and nothing is served by
            it assembling itself a second time halfway down. */}
        <BrainMark
          variant="light"
          title="CSAI Research"
          className="text-ink mb-9 h-auto w-11"
        />

        <div className="mb-12 flex items-center gap-5">
          <h2
            id={headingId}
            className="text-ink/55 shrink-0 text-[13px] font-bold uppercase tracking-[0.14em]"
          >
            {heading}
          </h2>

          <DrawRule className="bg-ink/25 h-px flex-1" />
        </div>

        <Frame href={project.href}>
          {/* The sheet. Two to three, the proportion a printed poster is
              trimmed to — the art is cropped to it rather than the frame
              being fitted to whatever the art happened to be. */}
          <div className="relative aspect-[2/3] overflow-hidden bg-[#0b0b12]">
            <Image
              src={poster}
              alt=""
              fill
              sizes="(max-width: 640px) 90vw, 430px"
              className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />

            {/* Just enough at the foot to carry the name. */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(to_top,rgba(5,5,9,0.85)_0%,rgba(5,5,9,0.45)_45%,rgba(5,5,9,0)_100%)]" />

            <h3 className="font-naval absolute inset-x-0 bottom-0 px-6 pb-6 text-[clamp(2rem,6vw,2.75rem)] uppercase leading-none tracking-[-0.01em] text-white">
              {project.name}
            </h3>
          </div>

          {/* The credit, and only the credit. What the work was and when it
              ran are the project page's job; under the sheet they turned the
              poster into an index entry with a picture on it. */}
          <p className="font-sans text-ink/55 mt-5 text-[11px] uppercase leading-[1.6] tracking-[0.16em]">
            {project.pi}
          </p>
        </Frame>
      </div>
    </section>
  );
}
