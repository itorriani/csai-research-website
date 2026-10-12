import type { Metadata } from "next";
import BrainMark from "@/components/BrainMark";
import HeroNav from "@/components/HeroNav";
import PaperPlates from "@/components/PaperPlates";
import SiteFooter from "@/components/SiteFooter";
import {
  socialSimulationCitations,
  socialSimulationPapers,
  socialSimulationSections,
  socialSimulationTeam,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Social Simulation | CSAI Research",
  description:
    "Agentic orchestration and long-horizon tool-use evaluation. Research led by Namish Mannepalli.",
};

const HEADINGS = ["Introduction", "Solutions", "Future Opportunities"];

const HEADING_CLASS =
  "doc-heading mb-5 text-[20px] leading-[1.3] text-black";

export default function SocialSimulationPage() {
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
              Social Simulation
            </h1>
            <span className="antialiased text-[clamp(1.1rem,1.9vw,1.4rem)] leading-[1.1] text-black/65">
              Namish Mannepalli
            </span>
          </div>

          <p className="antialiased mt-5 text-[15px] leading-[1.6] text-black/65">
            Agentic orchestration and long-horizon tool-use evaluation
            &middot; 2026&ndash;2027
            <br />
            With {socialSimulationTeam.slice(0, -1).join(", ")}, and{" "}
            {socialSimulationTeam[socialSimulationTeam.length - 1]}
          </p>

          {socialSimulationSections.map((section, i) => (
            <section key={section.label} className="mt-14">
              <h2 className={HEADING_CLASS}>{HEADINGS[i]}</h2>

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
                <h2 className={`${HEADING_CLASS} mt-14`}>Literature Review</h2>
              )}
              {i === 0 && <PaperPlates papers={socialSimulationPapers} />}
            </section>
          ))}

          {/* Sources, closing the sheet. Numbered in the order the evidence
              appears above; the three papers are the same ones plated in
              the body, and link to the PDFs already on the site. */}
          <section className="mt-20 border-t border-black pt-10">
            <h2 className={HEADING_CLASS}>Works Cited</h2>

            {/* MLA 9: alphabetised by author, hanging indent, locator last. */}
            <ul className="mt-6 space-y-4">
              {socialSimulationCitations.map((c) => (
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

      <SiteFooter />
    </>
  );
}
