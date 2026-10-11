import Image from "next/image";
import type { Metadata } from "next";
import BrainMark from "@/components/BrainMark";
import HeroNav from "@/components/HeroNav";
import SiteFooter from "@/components/SiteFooter";
import {
  mindTheNoiseCitations,
  mindTheNoisePapers,
  mindTheNoiseSections,
  mindTheNoiseTeam,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Mind the Noise | CSAI Research",
  description:
    "Artifact detection and clean-data retention in Muse 2 EEG. Research led by Zach Goldwyn.",
};

export default function MindTheNoisePage() {
  return (
    <>
      {/* Set as a document rather than a web page: the house lockup centred
          at the head (it already sits in the nav), a rule under it, and a
          single measure of Venetian running the length of the sheet. */}
      <main className="font-venetian subpixel-antialiased bg-white text-black">
        <HeroNav tone="light" />

        <article className="mx-auto w-full max-w-[860px] px-10 pb-32 sm:px-16 sm:pb-40">
          {/* The rule that opens the sheet. Full black and hairline — it
              reads as a ruled page, not as a UI divider. */}
          <div className="mt-6 border-t border-black" />

          {/* Title and lead researcher share a baseline; the name trails to
              the right of the title rather than sitting under it. */}
          <div className="mt-12 flex flex-wrap items-baseline gap-x-5 gap-y-1">
            <h1 className="doc-ink flex items-center gap-[0.42em] text-[clamp(2.1rem,4.4vw,3.1rem)] leading-[1.1]">
              {/* House mark leading the title. Sized in em off the heading
                  so it tracks the type at every breakpoint, and it takes
                  its colour from the text rather than carrying its own. */}
              <BrainMark className="h-[0.72em] w-auto shrink-0" />
              Mind the Noise
            </h1>
            <span className="antialiased text-[clamp(1.1rem,1.9vw,1.4rem)] leading-[1.1] text-black/65">
              Zach Goldwyn
            </span>
          </div>

          <p className="antialiased mt-5 text-[15px] leading-[1.6] text-black/65">
            Artifact detection and clean-data retention in Muse 2 EEG
            &middot; 2026&ndash;2027
            <br />
            With {mindTheNoiseTeam.slice(0, -1).join(", ")}, and{" "}
            {mindTheNoiseTeam[mindTheNoiseTeam.length - 1]}
          </p>

          {mindTheNoiseSections.map((section, i) => (
            <section key={section.label} className="mt-12">
              <p className="doc-ink text-[17px] leading-[1.45]">{section.body}</p>

              {section.points && (
                // Hanging hairline rules rather than bullet glyphs — see
                // .rule-list in globals.css for the draw-in.
                <ul className="rule-list mt-7 space-y-6">
                  {section.points.map((point) => (
                    <li key={point} className="doc-ink text-[17px] leading-[1.45]">
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {/* The three papers the gap rests on, dropped to greyscale so
                  the plate sits inside the document rather than on top of
                  it. Sits between the opening and what the project does. */}
              {i === 0 && (
                <ul className="mt-12 grid grid-cols-3 gap-5">
                  {mindTheNoisePapers.map((paper) => (
                    <li key={paper.slug}>
                      <a
                        href={`/papers/${paper.slug}.pdf`}
                        target="_blank"
                        rel="noopener"
                        className="group block focus-visible:outline-none"
                      >
                        {/* Crop to one sheet so three different page
                            geometries still line up across the row. */}
                        <div className="relative aspect-[8.5/11] w-full overflow-hidden border border-black/15 bg-white">
                          <Image
                            src={`/papers/${paper.slug}.png`}
                            alt={`First page of “${paper.title}”`}
                            width={paper.width}
                            height={paper.height}
                            sizes="(min-width: 640px) 33vw, 100vw"
                            className="h-full w-full object-cover object-top grayscale transition-opacity duration-500 group-hover:opacity-80"
                          />
                        </div>

                        <p className="antialiased mt-3 font-sans text-[10px] uppercase leading-[1.5] tracking-[0.08em] text-black/55">
                          {paper.venue}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Sources, closing the sheet. Numbered in the order the evidence
              appears above; the three papers are the same ones plated in
              the body, and link to the PDFs already on the site. */}
          <section className="mt-20 border-t border-black pt-10">
            <h2 className="antialiased font-sans text-[10px] uppercase tracking-[0.18em] text-black/55">
              Works Cited
            </h2>

            {/* MLA 9: alphabetised by author, hanging indent, locator last. */}
            <ul className="mt-6 space-y-4">
              {mindTheNoiseCitations.map((c) => (
                <li
                  key={c.mla}
                  className="antialiased pl-8 -indent-8 text-[14px] leading-[1.55] text-black/75"
                >
                  {c.mla}
                  {c.locator && c.href && (
                    <>
                      {" "}
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener"
                        className="text-black underline decoration-black/25 underline-offset-[3px] transition-colors duration-300 hover:decoration-black"
                      >
                        {c.locator}
                      </a>
                      .
                    </>
                  )}
                  {!c.locator && c.href && (
                    <>
                      {" "}
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener"
                        className="text-black underline decoration-black/25 underline-offset-[3px] transition-colors duration-300 hover:decoration-black"
                      >
                        PDF
                      </a>
                      .
                    </>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
