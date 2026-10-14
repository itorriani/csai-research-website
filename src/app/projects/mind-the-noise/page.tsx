import type { Metadata } from "next";
import BrainMark from "@/components/BrainMark";
import HeroNav from "@/components/HeroNav";
import PaperPlates from "@/components/PaperPlates";
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
      {/* The page tone carries on below the sheet, so the paper ends on a
          visible edge instead of running into the footer rule. Deeper than
          the sheet's own `mt-6` at the head — a document wants more room
          trailing it than leading it, and the shadow needs somewhere to
          fall. */}
      <main className="font-venetian subpixel-antialiased bg-[#fefefe] pb-16 text-black sm:pb-20">
        <HeroNav tone="light" />

        {/* The sheet. Pure white on the off-white page, so the paper is
            the lighter of the two surfaces. The two tones sit a single
            step apart, far too close to carry the edge, so a shadow
            does it — soft and tight enough that it lifts the sheet without
            ever reading as a raised UI card. The horizontal padding is the
            paper margin, not a layout inset: the white carries past the
            measure on both sides before the page tone resumes. */}
        <article className="mx-auto mt-6 w-full max-w-[860px] bg-white px-10 pb-32 pt-8 shadow-[0_2px_16px_-10px_rgba(0,0,0,0.18)] sm:px-16 sm:pb-40 sm:pt-10">
          {/* The rule that opens the sheet. Full black and hairline — it
              reads as a ruled page, not as a UI divider. */}
          <div className="border-t border-black" />

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
            <span className="doc-ink text-[clamp(1.1rem,1.9vw,1.4rem)] leading-[1.1] text-black">
              Zach Goldwyn
            </span>
          </div>

          <p className="doc-ink mt-5 text-[15px] leading-[1.6] text-black">
            Artifact detection and clean-data retention in Muse 2 EEG
            &middot; 2026&ndash;2027
            <br />
            With {mindTheNoiseTeam.slice(0, -1).join(", ")}, and{" "}
            {mindTheNoiseTeam[mindTheNoiseTeam.length - 1]}
          </p>

          {mindTheNoiseSections.map((section, i) => (
            <section key={section.label} className="mt-12">
              <p className="doc-ink doc-justify text-[17px] leading-[1.45]">{section.body}</p>

              {section.points && (
                // Hanging hairline rules rather than bullet glyphs — see
                // .rule-list in globals.css for the draw-in.
                <ul className="rule-list mt-7 space-y-6">
                  {section.points.map((point) => (
                    <li key={point} className="doc-ink doc-justify text-[17px] leading-[1.45]">
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {/* The papers the project rests on. Opening one folds the
                  rest into a stack — see PaperPlates. */}
              {i === 0 && (
                <h2 className="doc-heading mt-14 text-[20px] leading-[1.3] text-black">
                  Literature Review
                </h2>
              )}
              {i === 0 && <PaperPlates papers={mindTheNoisePapers} />}
            </section>
          ))}

          {/* Sources, closing the sheet. Numbered in the order the evidence
              appears above; the three papers are the same ones plated in
              the body, and link to the PDFs already on the site. */}
          <section className="mt-20 border-t border-black pt-10">
            <h2 className="doc-heading text-[20px] leading-[1.3] text-black">
              Works Cited
            </h2>

            {/* MLA 9: alphabetised by author, hanging indent, locator last. */}
            <ul className="mt-6 space-y-4">
              {mindTheNoiseCitations.map((c) => (
                <li
                  key={c.mla}
                  className="antialiased doc-justify pl-8 -indent-8 text-[14px] leading-[1.55] text-black/75"
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

      <SiteFooter surface="bg-[#fefefe]" />
    </>
  );
}
