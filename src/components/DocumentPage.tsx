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
  surface = "bg-white",
  children,
}: {
  /** Omit on a sheet that carries its own masthead, and the title block —
      house mark included — is not rendered at all. */
  title?: React.ReactNode;
  /** Sits to the right of the title, on its baseline. */
  byline?: React.ReactNode;
  /** The credit line under the title. */
  meta?: React.ReactNode;
  /** Tone of the sheet itself. Defaults to pure white; pass a shade off it
      when the page carries a raised card that has to read as the lighter
      surface of the two. */
  surface?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <main className={`font-venetian subpixel-antialiased ${surface} text-black`}>
        <HeroNav tone="light" />

        <article className="mx-auto w-full max-w-[860px] px-10 pb-32 sm:px-16 sm:pb-40">
          {/* The rule that opens the sheet. Full black and hairline — it
              reads as a ruled page, not as a UI divider. */}
          <div className="mt-6 border-t border-black" />

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
                <span className="antialiased text-[clamp(1.1rem,1.9vw,1.4rem)] leading-[1.1] text-black/65">
                  {byline}
                </span>
              )}
            </div>
          )}

          {meta && (
            <p className="antialiased mt-5 text-[15px] leading-[1.6] text-black/65">
              {meta}
            </p>
          )}

          {children}
        </article>
      </main>

      <SiteFooter />
    </>
  );
}
