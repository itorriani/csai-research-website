import Image from "next/image";
import type { Metadata } from "next";
import HeroNav from "@/components/HeroNav";
import FadeContent from "@/components/FadeContent";
import { aboutIntro, aboutLead, coreValues } from "@/lib/content";

export const metadata: Metadata = {
  title: "About | CSAI Research",
  description:
    "CSAI Research gives undergraduates at Cal Poly San Luis Obispo a professional research experience, driven by impact, rigor and aesthetics.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen flex-1 bg-black text-white">
      <HeroNav />

      {/* Document column mirrors the PDF: ~1.5in side margins on a letter page.
          Inter is scoped here rather than applied site-wide. */}
      <article className="mx-auto w-full max-w-[680px] px-6 pb-24 pt-20 font-inter">
        <FadeContent delay={100}>
          <h1 className="font-wordmark text-[clamp(3rem,9vw,6.5rem)] uppercase leading-[0.95] tracking-[-0.03em] text-white">
            About
          </h1>
        </FadeContent>

        <FadeContent delay={250}>
          <p className="mt-10 text-[15px] leading-[1.8] text-white/80">
            {aboutIntro}
          </p>
        </FadeContent>

        <FadeContent delay={400}>
          <p className="mt-10 text-[15px] leading-[1.8] text-white/80">
            {aboutLead}
          </p>
        </FadeContent>

        <ul className="mt-10 space-y-10">
          {coreValues.map((value, i) => (
            <FadeContent
              key={value.term}
              as="li"
              delay={550 + i * 150}
              className="group grid grid-cols-[1.25rem_1fr] items-start gap-x-4"
            >
              {/* Double-chevron marker stands in for the old 01/02/03 numerals. */}
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-[6px] h-3 w-3 text-white/35 transition-colors duration-300 group-hover:text-white"
              >
                <path d="M5 5l7 7-7 7" />
                <path d="M12 5l7 7-7 7" />
              </svg>

              <div>
                <h2 className="mb-2 text-[15px] font-bold tracking-tight text-white">
                  {value.term}
                </h2>
                <p className="text-[15px] leading-[1.8] text-white">
                  {value.body}
                </p>
              </div>
            </FadeContent>
          ))}
        </ul>

        <FadeContent delay={200}>
          <div className="mt-20 flex flex-col items-end gap-4">
            <Image
              src="/csai-logo.png"
              alt=""
              width={1254}
              height={1254}
              className="h-6 w-6 object-contain opacity-40 invert"
            />

            <div className="text-right text-[13px] leading-relaxed">
              <p className="text-white">
                Ivan Torriani, Trace Macias, Marek Seablom-Michel
              </p>
              <p className="text-white/45">
                Director and Associate Directors of Research
              </p>
            </div>
          </div>
        </FadeContent>
      </article>
    </main>
  );
}
