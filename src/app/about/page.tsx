import type { Metadata } from "next";
import DocumentPage from "@/components/DocumentPage";
import FeatureMasthead from "@/components/FeatureMasthead";
import { aboutCredits, aboutIntro, aboutLead, coreValues } from "@/lib/content";

export const metadata: Metadata = {
  title: "The Culture Doc | CSAI Research",
  description:
    "CSAI Research gives undergraduates at Cal Poly San Luis Obispo a professional research experience, driven by impact, rigor and aesthetics.",
};

// The About sheet, set as a magazine feature rather than as a document. Same
// paper and same reading face as every other sheet on the site — what changes
// is that the page opens the way a printed feature opens: the masthead above,
// then a drop of white, then the text falling into two justified columns with
// a drop cap. See FeatureMasthead for the opening, which the project
// documents share.

export default function AboutPage() {
  return (
    <DocumentPage>
      <FeatureMasthead
        words={[
          "The",
          // The L and the T interlock. Pulling the pair together works
          // because the two glyphs are empty where the other is not — the L
          // has nothing in its top right, the T nothing in its bottom left —
          // so the L's foot runs under the T's arm until it meets the stem,
          // and the join happens at the baseline rather than reading as two
          // letters that collided. Set on the L, since letter-spacing acts on
          // the gap after the character it is applied to.
          <>
            Cu<span className="feature-ligature">l</span>ture
          </>,
          "Doc",
        ]}
        // The standfirst carries the opening sentence itself rather than a
        // summary of it, so the prose below picks up from the values rather
        // than repeating the introduction.
        standfirst={aboutIntro}
        credits={aboutCredits}
        artwork={{ src: "/about/figure-ink.png", width: 560, height: 782 }}
      />

      {/* The drop of white between the masthead and the text. It is the
          largest single interval on the sheet, and deliberately: it is what
          makes the opening read as a feature rather than as a heading with a
          paragraph under it. */}
      <div className="feature-columns doc-ink doc-justify mt-24 text-[14.5px] leading-[1.52] sm:mt-32">
        <p className="feature-dropcap">{aboutLead}</p>
        {coreValues.map((value) => (
          <p key={value.term}>
            <span className="doc-heading">{value.term}.</span> {value.body}
          </p>
        ))}
      </div>
    </DocumentPage>
  );
}
