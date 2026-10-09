import Image from "next/image";
import type { Metadata } from "next";
import HeroNav from "@/components/HeroNav";
import SiteFooter from "@/components/SiteFooter";
import FadeContent from "@/components/FadeContent";
import {
  mindTheNoiseGap,
  mindTheNoiseNotes,
  mindTheNoisePapers,
  mindTheNoisePivots,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Mind the Noise | CSAI Research",
  description:
    "Artifact detection and clean-data retention in Muse 2 EEG. Research led by Zach Goldwyn.",
};

export default function MindTheNoisePage() {
  return (
    <>
      <main className="bg-black text-white">
        {/* White masthead. The nav flips to black ink to sit on it; the title
            runs in the wordmark face at the same scale as the project rows on
            the homepage. */}
        <header className="bg-white text-black">
          <HeroNav tone="light" />

          <div className="mx-auto w-full max-w-[1200px] px-5 pb-14 pt-12 sm:pb-20 sm:pt-16">
            <FadeContent delay={60}>
              <h1 className="font-wordmark text-[clamp(2.5rem,9.5vw,7rem)] uppercase leading-[0.9] tracking-[-0.035em]">
                Mind the Noise
              </h1>
              <p className="mt-6 text-[11px] uppercase tracking-[0.1em] text-black/45">
                Research led by Zach Goldwyn &middot; 2026&ndash;2027
              </p>
            </FadeContent>
          </div>
        </header>

        {/* MARKET GAP */}
        <section
          aria-labelledby="market-gap"
          className="mx-auto w-full max-w-[1200px] px-5 pb-24 pt-20 sm:pt-28"
        >
          <FadeContent delay={80}>
            <h2
              id="market-gap"
              className="font-wordmark text-[clamp(1.9rem,5.4vw,3.75rem)] uppercase leading-[0.95] tracking-[-0.03em] text-white"
            >
              Market Gap
            </h2>
          </FadeContent>

          <FadeContent delay={200}>
            <p className="mt-8 max-w-[52ch] text-[15px] leading-[1.75] text-white/80">
              {mindTheNoiseGap}
            </p>
          </FadeContent>

          {/* The three papers the gap rests on, page one of each. */}
          <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-3">
            {mindTheNoisePapers.map((paper, i) => (
              <FadeContent as="li" key={paper.slug} delay={320 + i * 130}>
                <a
                  href={`/papers/${paper.slug}.pdf`}
                  target="_blank"
                  rel="noopener"
                  className="group block focus-visible:outline-none"
                >
                  {/* Crop to a consistent sheet so three different page
                      geometries still line up across the row. */}
                  <div className="relative aspect-[8.5/11] w-full overflow-hidden bg-white">
                    <Image
                      src={`/papers/${paper.slug}.png`}
                      alt={`First page of “${paper.title}”`}
                      width={paper.width}
                      height={paper.height}
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                    />
                  </div>

                  <h3 className="mt-5 text-[13px] font-bold leading-[1.45] text-white transition-colors duration-300 group-hover:text-white/55">
                    {paper.title}
                  </h3>
                  <p className="mt-2 text-[12px] leading-[1.5] text-white/45">
                    {paper.authors}
                  </p>
                  <p className="mt-1.5 text-[11px] uppercase tracking-[0.1em] text-white/35">
                    {paper.venue}
                  </p>
                </a>
              </FadeContent>
            ))}
          </ul>

          {/* Reading notes, one per paper above. Same column geometry as the
              paper grid, so each note's edges sit flush with the edges of the
              sheet it belongs to — and all three start on one baseline, which
              they would not if they hung off titles of differing depth. */}
          <ul className="mt-16 grid grid-cols-1 gap-x-8 gap-y-10 font-inter sm:grid-cols-3">
            {mindTheNoiseNotes.map((note, i) => (
              <FadeContent as="li" key={i} delay={200 + i * 150}>
                <p className="text-[13px] leading-[1.85] text-white/75">
                  {note}
                </p>
              </FadeContent>
            ))}
          </ul>
        </section>

        {/* MARKET OPPORTUNITIES — inverted panel, three wide. */}
        <section aria-labelledby="market-opportunities" className="bg-white">
          <div className="mx-auto w-full max-w-[1200px] px-5 pb-28 pt-20 sm:pt-24">
            <FadeContent delay={80}>
              <h2
                id="market-opportunities"
                className="font-wordmark text-[clamp(1.9rem,5.4vw,3.75rem)] uppercase leading-[0.95] tracking-[-0.03em] text-black"
              >
                Market Opportunities
              </h2>
            </FadeContent>

            <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-3">
              {mindTheNoisePivots.map((pivot, i) => (
                <FadeContent as="li" key={pivot.label} delay={200 + i * 140}>
                  <h3 className="font-wordmark text-[clamp(1.5rem,2.6vw,2.25rem)] uppercase leading-[0.95] tracking-[-0.02em] text-black">
                    {pivot.label}
                  </h3>
                  <p className="mt-4 text-[14px] leading-[1.7] text-black/70">
                    {pivot.body}
                  </p>
                  <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-black/40">
                    {pivot.grade}
                  </p>
                </FadeContent>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
