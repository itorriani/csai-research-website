import type { Metadata } from "next";
import DocumentPage from "@/components/DocumentPage";
import { aboutIntro, aboutLead, coreValues } from "@/lib/content";

export const metadata: Metadata = {
  title: "About | CSAI Research",
  description:
    "CSAI Research gives undergraduates at Cal Poly San Luis Obispo a professional research experience, driven by impact, rigor and aesthetics.",
};

export default function AboutPage() {
  return (
    <DocumentPage
      title="About"
      meta={<>CSAI Research &middot; Cal Poly, San Luis Obispo, California</>}
    >
      <p className="doc-ink mt-12 text-[17px] leading-[1.45]">{aboutIntro}</p>
      <p className="doc-ink mt-7 text-[17px] leading-[1.45]">{aboutLead}</p>

      {/* The values take the same hanging hairline rules as the lists in the
          project documents, so the two read as one family. */}
      <ul className="rule-list mt-12 space-y-7">
        {coreValues.map((value) => (
          <li key={value.term} className="doc-ink text-[17px] leading-[1.45]">
            <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-black/45 antialiased">
              {value.term}
            </span>
            <span className="mt-2 block">{value.body}</span>
          </li>
        ))}
      </ul>

      {/* Signed off, as the sheet would be. */}
      <div className="mt-20 border-t border-black pt-8 text-right">
        <p className="antialiased text-[14px] leading-[1.55] text-black">
          Ivan Torriani, Trace Macias, Marek Seablom-Michel
        </p>
        <p className="antialiased text-[14px] leading-[1.55] text-black/55">
          Director and Associate Directors of Research
        </p>
      </div>
    </DocumentPage>
  );
}
