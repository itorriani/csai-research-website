import Image from "next/image";
import type { Metadata } from "next";
import DocumentPage from "@/components/DocumentPage";
import { aboutIntro, aboutLead, coreValues } from "@/lib/content";

export const metadata: Metadata = {
  title: "About | CSAI Research",
  description:
    "CSAI Research gives undergraduates at Cal Poly San Luis Obispo a professional research experience, driven by impact, rigor and aesthetics.",
};

// The About sheet, set on the same paper and in the same Venetian as every
// other document — only the arrangement changes. It is laid out as a typed
// page rather than a single measure: two columns that do not start together,
// with the plate carried in the right one.
//
// Three things make it read as one composition rather than as a column of
// text beside a picture:
//
//   1. The measures overlap. The left column runs a track into the plate's
//      own column, so the ends of its lines cross the drawing instead of
//      stopping politely short of it.
//   2. The drawing is multiplied into the sheet, so it has no white ground
//      of its own to cut a hole in the paper with — ink on the page, which
//      is what lets type cross it at all.
//   3. The columns are placed, not flowed. The right measure is held to the
//      second row so it picks up under the plate, which leaves the foot of
//      the left one open — the reference's own silence, not an accident of
//      text length.

export default function AboutPage() {
  return (
    <DocumentPage
      // Under trial on this sheet only: the homepage's own printed ground for
      // the table, and the vanilla cream for the paper lying on it. No colour
      // overrides — the surface comes out in the poster's blue, which is the
      // point of using it.
      surface="printed-ground"
      sheet="bg-vanilla"
      // The bar stands on the indigo, so it has to be the white cut.
      tone="dark"
      // The footer prints its own type in black and would be unreadable on
      // the indigo, so the paper carries on under it.
      footerSurface="bg-vanilla"
    >
      <div className="mt-12 grid grid-cols-12 gap-x-7 gap-y-10">
        {/* The left measure, and the one that crosses the plate — so it is
            the layer that has to sit above it. */}
        <div className="relative z-10 order-1 col-span-12 md:order-none md:col-start-1 md:col-end-9 md:row-start-1">
          <p className="doc-ink doc-justify text-[15px] leading-[1.5]">
            {aboutIntro}
          </p>
          <p className="doc-ink doc-justify mt-6 text-[15px] leading-[1.5]">
            {aboutLead}
          </p>

          {/* The first value is set on this side of the gutter so the head of
              the sheet carries text against the plate rather than leaving
              this measure short beside it. */}
          <p className="doc-ink doc-justify mt-6 text-[15px] leading-[1.5]">
            <span className="doc-heading">{coreValues[0].term}.</span>{" "}
            {coreValues[0].body}
          </p>

          {/* The byline. Venetian ships one cut, so the weight the reference
              sets this in comes from the document's own heavier stroke. */}
          <p className="doc-heading mt-8 text-[14px] leading-[1.5]">
            Ivan Torriani, Trace Macias, Marek Seablom-Michel
          </p>
          <p className="mt-1 text-[14px] leading-[1.5] text-black/55 antialiased">
            Director and Associate Directors of Research
          </p>
        </div>

        {/* The plate. Multiplied rather than laid on the paper: the drawing
            is ink, and a white ground behind it would read as a card resting
            on the sheet — and would knock a hole in the type that crosses
            it. Behind the left measure, deliberately. */}
        {/* No z-index here, deliberately. `z-0` with a position is still a
            stacking context, and a stacking context isolates the blend — the
            drawing would multiply against a transparent backdrop instead of
            against the sheet, and its white ground would never drop out. The
            measure opposite carries z-10, which is enough to keep the type
            above this without the plate having to be positioned at all. */}
        <div className="order-2 col-span-12 md:order-none md:col-start-7 md:col-end-13 md:row-start-1">
          <Image
            src="/about/figure-ink.png"
            alt="Brush drawing of a face, in a few unbroken strokes."
            width={560}
            height={782}
            sizes="(max-width: 768px) 100vw, 380px"
            className="plate-feather mx-auto w-full max-w-[380px] mix-blend-multiply md:mx-0"
            priority
          />
        </div>

        {/* The right measure, picked up under the plate. Inset on the right
            so it runs narrower than the picture above it, as the reference
            sets it. */}
        <div className="order-3 col-span-12 space-y-6 md:order-none md:col-start-7 md:col-end-13 md:row-start-2 md:pr-[8%]">
          {coreValues.slice(1).map((value) => (
            <p
              key={value.term}
              className="doc-ink doc-justify text-[15px] leading-[1.5]"
            >
              <span className="doc-heading">{value.term}.</span> {value.body}
            </p>
          ))}
        </div>

      </div>
    </DocumentPage>
  );
}
