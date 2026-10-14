import BrainMark from "@/components/BrainMark";
import HeroNav from "@/components/HeroNav";
import SiteFooter from "@/components/SiteFooter";

// Mirrors the Mind the Noise / Canary project documents exactly — those are
// the reference and are not changed to suit this component. Set as a
// document rather than a web page: the house lockup centred at the head (it
// already sits in the nav), a rule under it, and a single measure of
// Venetian running the length of the sheet.
export default function DocumentPage({
  title,
  byline,
  meta,
  children,
}: {
  /** Omit on a sheet that carries its own masthead, and the title block —
      house mark included — is not rendered at all. */
  title?: React.ReactNode;
  /** Sits to the right of the title, on its baseline. */
  byline?: React.ReactNode;
  /** The credit line under the title. */
  meta?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <>
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

          {title && (
            <div className="mt-12 flex flex-wrap items-baseline gap-x-5 gap-y-1">
              <h1 className="doc-ink flex items-center gap-[0.42em] text-[clamp(2.1rem,4.4vw,3.1rem)] leading-[1.1]">
                {/* House mark leading the title. Sized in em off the heading
                    so it tracks the type at every breakpoint, and it takes
                    its colour from the text rather than carrying its own. */}
                <BrainMark className="h-[0.72em] w-auto shrink-0" />
                {title}
              </h1>

              {byline && (
                <span className="doc-ink text-[clamp(1.1rem,1.9vw,1.4rem)] leading-[1.1] text-black">
                  {byline}
                </span>
              )}
            </div>
          )}

          {meta && (
            <p className="doc-ink mt-5 text-[15px] leading-[1.6] text-black">
              {meta}
            </p>
          )}

          {children}
        </article>
      </main>

      <SiteFooter surface="bg-[#fefefe]" />
    </>
  );
}
