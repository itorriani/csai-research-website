import Image from "next/image";
import Link from "next/link";
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
          <Link href="/" className="inline-block">
            <Image
              src="/csai-logo.png"
              alt="CSAI Research"
              width={1254}
              height={1254}
              priority
              className="h-10 w-10 object-contain invert"
            />
          </Link>

          <header className="mt-2 space-y-1 text-[13px] leading-snug text-white">
            <p>2026–2027</p>
            <p>About</p>
          </header>
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

        <ol className="mt-10 space-y-10">
          {coreValues.map((value, i) => (
            <FadeContent
              key={value.term}
              as="li"
              delay={550 + i * 150}
              className="grid grid-cols-[2.25rem_1fr] items-start gap-x-5"
            >
              <span
                aria-hidden="true"
                className="pt-[2px] text-[13px] font-semibold tabular-nums text-white/35"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div>
                <h2 className="mb-2 text-[15px] font-bold tracking-tight text-white">
                  {value.term}
                </h2>
                <p className="text-[15px] leading-[1.8] text-white/80">
                  {value.body}
                </p>
              </div>
            </FadeContent>
          ))}
        </ol>

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
