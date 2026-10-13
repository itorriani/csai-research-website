import BrainMark, { type BrainVariant } from "@/components/BrainMark";

// The full house lockup: mark(s), rule, wordmark, place name. Everything is
// sized in em off the container's font-size, so `text-[48px]` scales the whole
// stack — and `currentColor` carries through, so it whites out over the hero.
export default function CsaiLockup({
  variant = "light",
  marks = 1,
  markSize = 1.9,
  track = 0.015,
  initialScale = 1.18,
  locale = "93407 California",
  /** 900 pulls in the Naval Black cut; 400 is the regular. */
  localeWeight = 900,
  localeSize = 0.42,
  localeTrack = 0.06,
  strokeWidth,
  className = "",
}: {
  variant?: BrainVariant;
  /** Place line beneath the wordmark. */
  locale?: string;
  /** Weight of the locale line. 900 is the Naval Black cut. */
  localeWeight?: number;
  /** How many marks sit above the rule. */
  marks?: 1 | 3;
  /** Height of each mark, in em. */
  markSize?: number;
  track?: number;
  initialScale?: number;
  localeSize?: number;
  localeTrack?: number;
  /** Edge weight of the marks. Raise it where the lockup is set small and
      the default stroke thins out to grey. */
  strokeWidth?: number;
  className?: string;
}) {
  const words = ["CSAI", "RESEARCH"];

  return (
    <div className={`font-naval inline-flex flex-col items-center ${className}`}>
      <div
        className="flex items-end justify-center"
        style={{ gap: `${markSize * 0.18}em`, marginBottom: "0.54em" }}
      >
        {Array.from({ length: marks }, (_, i) => (
          <BrainMark
            key={i}
            // In the three-up arrangement the centre mark flips to the other
            // fill, the way the reference sheet shows it.
            variant={
              marks === 3 && i === 1
                ? variant === "light"
                  ? "heavy"
                  : "light"
                : variant
            }
            className="w-auto"
            strokeWidth={strokeWidth}
            // The glyph is wider than tall; height drives the size.
            style={{ height: `${marks === 3 ? markSize * 0.62 : markSize}em` }}
          />
        ))}
      </div>

      <div
        className="w-full bg-current"
        style={{ height: "0.05em", minHeight: "2px", marginBottom: "0.18em" }}
      />

      <span
        className="flex items-baseline justify-center uppercase leading-none"
        // Cancels the trailing letter-space so the line stays optically centred
        // over the rule.
        style={{ letterSpacing: `${track}em`, marginRight: `-${track}em` }}
      >
        {words.map((word, i) => (
          <span key={word} className="whitespace-pre">
            {i > 0 && (
              <span
                className="inline-block"
                style={{ width: "0.22em" }}
                aria-hidden="true"
              />
            )}
            <span
              className="inline-block"
              style={{ fontSize: `${initialScale}em` }}
            >
              {word.slice(0, 1)}
            </span>
            {word.slice(1)}
          </span>
        ))}
      </span>

      <span
        className="font-wordmark uppercase leading-none"
        style={{
          fontSize: `${localeSize}em`,
          fontWeight: localeWeight,
          fontStyle: "normal",
          letterSpacing: `${localeTrack}em`,
          marginRight: `-${localeTrack}em`,
          marginTop: "0.46em",
        }}
      >
        {/* Naval ships oldstyle figures only, so numerals sit at x-height.
            Left at their natural size: scaling a digit up to cap height also
            scales its stroke, which makes it read as bold against the caps
            beside it. */}
        {locale}
      </span>
    </div>
  );
}
