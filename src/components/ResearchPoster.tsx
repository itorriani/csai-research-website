import Link from "next/link";
import type { ReactNode } from "react";
import BrainMark from "@/components/BrainMark";
import CoverSheet from "@/components/CoverSheet";
import DrawRule from "@/components/DrawRule";
import type { Project } from "@/lib/content";

// Concluded work, shown the way the Collections page shows everything: as the
// cover sheet of the document, with the name, the summary and the credit set
// under it.
//
// It used to be a poster — a portrait photograph with the project's name bled
// across the foot of it. That was a second visual language for the same thing
// the rest of the site already had one for, and the art it was carrying was a
// stock photograph standing in for a document that exists. The sheet is the
// document, rebuilt rather than rasterised, so it is both truer and sharper.
//
// Paper, not ink. The run above this is lit photographs on black; the season
// that is finished is a printed page, and the change of ground is what says
// the reader has come out of the run.

export default function ResearchPoster({
  id,
  heading,
  project,
}: {
  /** Anchors the section's aria-labelledby, so it must be unique. */
  id: string;
  heading: ReactNode;
  project: Project;
}) {
  const headingId = `${id}-heading`;
  const Tile = project.href ? Link : "div";

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className="bg-page w-full pb-24 pt-20 sm:pb-32 sm:pt-28"
    >
      {/* Venetian and full black, set the way the document sheets are set —
          this section is a page out of the same stack, and until now it was
          the one place on the site speaking in the nav's sans about work that
          is written in Venetian everywhere else. */}
      <div className="font-venetian mx-auto w-full max-w-[1200px] px-5 text-black subpixel-antialiased">
        {/* The mark leads the heading rather than standing above it, which is
            how DocumentPage sets a title. `doc-ink` is the hairline stroke
            every heading on the document sheets carries — it is what makes
            Venetian hold its weight at display size without a bold cut. */}
        <h2
          id={headingId}
          className="doc-ink flex items-center gap-[0.42em] text-[clamp(1.6rem,3.4vw,2.3rem)] uppercase leading-[1.15]"
        >
          <BrainMark
            variant="light"
            title="CSAI Research"
            className="h-[0.8em] w-auto shrink-0"
          />
          {heading}
        </h2>

        {/* The rule the document sheets head their pages with, in the same
            full black — and drawn rather than simply present, which is the
            house behaviour for every other rule on the site. */}
        <DrawRule className="mt-6 h-px w-full bg-black" />

        {/* The same grid the shelves on Collections are set in, so a single
            finished project reads as one sheet on a shelf rather than as a
            lone object needing its own composition. */}
        <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3">
          <li>
            <Tile
              href={project.href ?? "#"}
              className={`block ${project.href ? "group" : ""}`}
            >
              <div className="transition-opacity duration-500 group-hover:opacity-80">
                <CoverSheet term={project.term ?? ""} name={project.name} />
              </div>

              {/* The name carries the weight; everything under it steps back,
                  the same split the documents use. */}
              <h3 className="doc-ink mt-4 text-[19px] leading-[1.2]">
                {project.name}
              </h3>

              <p className="mt-2 text-[14px] leading-[1.45] text-black/65 antialiased">
                {project.summary}
              </p>
              <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.12em] text-black/45 antialiased">
                {project.pi}
              </p>
            </Tile>
          </li>
        </ul>
      </div>
    </section>
  );
}
