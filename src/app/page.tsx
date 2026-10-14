import Image from "next/image";
import FadeContent from "@/components/FadeContent";
import HeroNav from "@/components/HeroNav";
import NeuronBloom from "@/components/NeuronBloom";
import SiteFooter from "@/components/SiteFooter";
import ProjectPostcards from "@/components/ProjectPostcards";
import ResearchBackdrop from "@/components/ResearchBackdrop";
import { projects, previousProjects } from "@/lib/content";

export default function Home() {
  return (
    <>
      {/* The first screenful is white and quiet but for the nav and the mark
          drawing itself in the middle of it, and the cover plate closes the
          white band underneath — the research index below keeps the tones it
          always had. */}
      {/* A touch taller than the screen, which is what sits the drawing a
          little low: it is pinned to the foot of this band, so the band
          growing past the fold slides the whole plate down with it rather
          than opening white underneath it. */}
      <header className="flex min-h-[calc(100vh+120px)] flex-col bg-white">
        <HeroNav tone="light" />

        {/* The masthead for the issue, held in the white above the drawing
            and ranged to the drawing's own left edge rather than the page's.
            The mark draws itself; the date arrives after it, which is why
            the fade is delayed rather than running with the page.

            The year is set in Open Sans Bold, the face the research
            headings below it use, rather than in Naval: Naval ships only
            oldstyle figures, which sit at x-height and read a size down
            beside the caps. */}
        <div className="flex flex-1 -translate-x-[1.5%] items-center justify-center gap-6 px-8">
          <NeuronBloom className="w-[min(22vw,104px)]" caption={false} />

          <FadeContent
            as="span"
            blur={false}
            delay={700}
            duration={2600}
            className="font-naval whitespace-nowrap uppercase leading-none text-ink"
          >
            <span
              className="flex items-baseline"
              style={{
                fontSize: "clamp(22px,3vw,44px)",
                // Naval's Regular cut, not the Black: at this size the
                // heavy one sits too close to the nav's lockup above it.
                fontWeight: 400,
                letterSpacing: "0.07em",
                marginRight: "-0.07em",
              }}
            >
              Winter&nbsp;
              {/* Outlined rather than solid: the fill is dropped and the
                  letterform is carried by its own stroke, so the year reads
                  as drawn next to the solid caps instead of competing
                  with them, and gives the wipe something to lay down. The
                  stroke is set in em so it tracks the clamp rather than
                  going spindly on a wide screen. */}
              <span
                className="year-draw font-sans font-bold"
                style={{
                  fontSize: "0.9em",
                  letterSpacing: "0.04em",
                  color: "transparent",
                  WebkitTextStroke: "0.04em #1a1a2e",
                }}
              >
                2026
              </span>
            </span>
          </FadeContent>
        </div>

        {/* The cover drawing. It is pushed to the foot of a screen-high
            band rather than following the nav, so the whole sheet is on the
            first screen with the white opening up above it and its base
            landing on the fold — which is where the dark pages take over.

            The file is used whole and unaltered; the frame sits it low and
            clips the blank paper above the figures, so what the drawing
            gives up to the page is empty sheet rather than any of itself.

            Its base is solid ink edge to edge, and the dark research pages
            begin immediately under it with no padding of their own — the
            two blacks are the same black, so the sections join inside the
            drawing rather than at a line beside it. */}
        {/* Brought up with the mark rather than simply being there: the
            drawing arrives while the dots are still finding each other, so
            the two read as one opening. */}
        <FadeContent
          as="div"
          blur={false}
          delay={700}
          duration={2600}
          className="relative mt-auto w-full"
        >
          {/* The sheet is pulled in off the page edges, and these carry its
              ink the rest of the way out — left box to the left margin,
              right box to the right.

              The two sides are deliberately uneven, because each is set to
              the drawing rather than to the other: the left starts where
              the coat meets that edge, 501px up from the bottom of a
              1631px frame, and the right at 9%, which is as
              high as that edge goes: above it the sheet is white paper
              out to the margin, so a taller box would stand off the
              drawing instead of joining it. Both measured off the file. They run a point wide
              under the sheet so no sliver of white survives rounding, and
              they are the same black as the research pages they stand on,
              so the three read as one mass. */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[29.1%] w-[16%] bg-[#050509]"
          />
          {/* The scan carries a black border about fourteen pixels deep on
              every side. The top is already above the crop; this trims the
              two verticals, which would otherwise draw a hairline frame up
              the sides of the sheet and give the boxes something to look
              bolted to. */}
          <div className="relative mx-auto aspect-[3456/1631] w-[70%] overflow-hidden">
            <Image
              src="/cover.png"
              alt="Ink drawing of three figures in profile"
              width={3456}
              height={2234}
              priority
              sizes="70vw"
              className="absolute -bottom-[1.6%] left-[-0.46%] w-[100.93%] max-w-none select-none"
            />
          </div>
          {/* The right-hand one is drawn over the sheet rather than behind
              it, and reaches in past its edge to her shoulder: the sheet's
              own right margin is white below the shoulder line, so a box
              stopped at the edge would hang beside a white notch. Taken in
              to x=3341 of the file it lands on ink, and the notch closes. */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 h-[29.1%] w-[17.4%] bg-[#050509]"
          />
        </FadeContent>
      </header>

      {/* Current and previous research share one surface: the field is
          painted once here so the gradient runs through both panels instead
          of stopping at the seam between them. The headroom that used to sit
          here was for the hero's white fade; the drawing above now lands on
          this surface directly, so the panels carry their own padding and
          nothing is added before them: any headroom here would uncover a
          band of the backdrop between the drawing's base and the first
          panel, and the field is lighter than the ink — the one thing that
          would put a line back across the join. */}
      <div className="relative isolate overflow-hidden bg-[#050509]">
        <ResearchBackdrop />

        <ProjectPostcards
          id="projects"
          heading={<>2026&ndash;2027 Research</>}
          projects={projects}
        />

        <ProjectPostcards
          id="previous-projects"
          heading="Previous Research"
          projects={previousProjects}
          tightTop
          rule
        />
      </div>

      <SiteFooter />
    </>
  );
}
