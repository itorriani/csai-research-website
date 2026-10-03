import Image from "next/image";
import type { Metadata } from "next";
import HeroNav from "@/components/HeroNav";
import SiteFooter from "@/components/SiteFooter";
import FadeContent from "@/components/FadeContent";
import { projects, previousProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Collections | CSAI Research",
  description:
    "Every CSAI Research paper, shown as its cover sheet: MIND THE NOISE, CANARY, SOCIAL SIMULATION and ADUA.",
};

// The cover sheet from template.pdf, rebuilt rather than rasterised so it stays
// crisp at any tile size. Everything inside is measured in `cqw` against the
// sheet itself, so the whole composition scales with the grid instead of
// needing a breakpoint per column count.
//
// One liberty: the type runs a little larger than a true 1:1 reduction of the
// letter page, where "CSAI Research" would land near 5px in a tile this wide
// and read as a smudge.
function CoverSheet() {
  return (
    <div className="@container relative aspect-[8.5/11] w-full overflow-hidden bg-white">
      <div className="absolute left-[13%] top-[10%] font-inter">
        <Image
          src="/csai-logo.png"
          alt=""
          width={1254}
          height={1254}
          className="h-[10cqw] w-[10cqw] object-contain"
        />
        <p className="mt-[3.2cqw] text-[5.2cqw] font-bold leading-none tracking-[-0.01em] text-black">
          CSAI Research
        </p>
        <p className="mt-[2.4cqw] text-[3.5cqw] leading-none text-black/75">
          2026&ndash;2027
        </p>
      </div>
    </div>
  );
}

// The live marker: the mark itself, pulsing. Decorative on its own — the key
// below the heading names it, and each title carries an sr-only label.
function LiveMark() {
  return (
    <Image
      src="/csai-logo.png"
      alt=""
      width={1254}
      height={1254}
      className="h-[11px] w-[11px] shrink-0 animate-pulse object-contain invert motion-reduce:animate-none"
    />
  );
}

export default function CollectionsPage() {
  // Current work first, then concluded — the same order the homepage reads in.
  // Only the 2026–2027 set is still running, so only it gets the live marker.
  const papers = [
    ...projects.map((p) => ({ ...p, inProgress: true })),
    ...previousProjects.map((p) => ({ ...p, inProgress: false })),
  ];

  return (
    <main className="min-h-screen bg-black text-white">
      <HeroNav />

      <div className="mx-auto w-full max-w-[1200px] px-5 pb-28 pt-20">
        <FadeContent delay={80}>
          <h1 className="font-wordmark text-[clamp(3rem,9vw,6.5rem)] uppercase leading-[0.95] tracking-[-0.03em] text-white">
            Collections
          </h1>

          {/* Key for the marker riding beside the in-progress titles below. */}
          <p className="mb-16 mt-5 flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-white/35">
            <LiveMark />
            In-progress research
          </p>
        </FadeContent>

        <ul className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {papers.map((paper, i) => (
            <FadeContent as="li" key={paper.id} delay={220 + i * 130}>
              <a href="#" className="group block focus-visible:outline-none">
                <div className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1.5">
                  <CoverSheet />
                </div>

                <h2 className="mt-5 flex items-center gap-2 font-wordmark text-[22px] leading-[1.1] tracking-[-0.02em] text-white transition-colors duration-300 group-hover:text-white/55">
                  {paper.name}
                  {paper.inProgress && (
                    <>
                      <LiveMark />
                      <span className="sr-only">In progress</span>
                    </>
                  )}
                </h2>
                <p className="mt-2 text-[12px] uppercase italic leading-[1.5] tracking-[0.03em] text-white/45">
                  &ldquo;{paper.summary}&rdquo;
                </p>
                <p className="mt-2.5 text-[11px] uppercase tracking-[0.1em] text-white/35">
                  {paper.pi}
                </p>
              </a>
            </FadeContent>
          ))}
        </ul>
      </div>

      <SiteFooter />
    </main>
  );
}
