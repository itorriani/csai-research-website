import { isValidElement } from "react";
import Image from "next/image";

export type Credit = { role: string; name: string };

// The measure the display line is held to, and how wide a character of the
// display face runs at that size — 0.438em, measured off the rendered mark
// rather than guessed from the metrics. Together they say how large the
// longest word may be set before it breaks the measure.
const DISPLAY_MEASURE = 430;
const DISPLAY_CHAR_EM = 0.438;

// The words are nodes, not strings — a sheet may close up a letter pair
// inside one — so their length has to be read back out of the tree. Without
// this the display size is one number for every sheet, and "SIMULATION" runs
// a hundred pixels past the paper while "ADUA" sits in the middle of it.
function textOf(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean") {
    return "";
  }
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(textOf).join("");
  }
  if (isValidElement(node)) {
    return textOf((node.props as { children?: React.ReactNode }).children);
  }
  return "";
}

export type MastheadArtwork = {
  src: string;
  /** Natural size, for next/image. */
  width: number;
  height: number;
};

// The opening of a feature, as the printed reference sets it: a display line
// stacked word by word, a standfirst under it, and a credit line closing the
// block. Shared by the About sheet and every project document, so the four
// of them cannot drift apart.
//
// Four things carry it:
//
//   1. The display line is stacked one word to a line and centred, in a
//      super-condensed grotesque at leading well under 1. The words have to
//      touch for the lines to read as one mark rather than as a heading that
//      wrapped.
//   2. The standfirst is a narrow centred block, set noticeably smaller than
//      the display line and noticeably larger than the body. It is a caption
//      to the mark above it, not the first paragraph of the prose.
//   3. A credit line closes the masthead, labels marked by stroke alone.
//   4. Optionally a drawing stands behind the mark, multiplied into the sheet
//      and faded far enough that the type never has to fight it.
export default function FeatureMasthead({
  words,
  standfirst,
  credits,
  artwork,
  deck = "narrow",
}: {
  /** One entry per line of the display stack. Nodes rather than strings so a
      sheet can close up a letter pair inside a word — see the About sheet. */
  words: React.ReactNode[];
  standfirst: React.ReactNode;
  credits: Credit[];
  /** Omit and the mark stands on bare paper. */
  artwork?: MastheadArtwork;
  /** How wide the standfirst runs. `narrow` for a sentence, `wide` for a
      paragraph — a long standfirst in the narrow measure comes out as a
      column of type taller than the mark it is meant to caption. */
  deck?: "narrow" | "wide";
}) {
  const longest = Math.max(1, ...words.map((word) => textOf(word).length));
  const fitted = DISPLAY_MEASURE / (DISPLAY_CHAR_EM * longest);

  return (
    <header className="mt-16 text-center sm:mt-24">
      {/* The display line and the plate it stands on, as one block. */}
      <div className="relative">
        {artwork && (
          /* The drawing, dropped behind the mark. Three things keep it from
             reading as a background image:

               - It is multiplied into the sheet rather than laid on it, so
                 its own near-white ground drops out and only the ink stays.
               - It is masked to an ellipse rather than feathered to a
                 rectangle, so there is no edge for the eye to find.
               - It is faded far enough that the type never has to fight it.
                 The mark is the thing being read; this is the paper it is
                 printed over.

             Nothing between this and the sheet may open a stacking context,
             or the multiply would blend against a transparent backdrop
             instead and the white ground would come back. That rules out a
             transform for the centring — hence the flex — and it is why the
             wrapper carries no z-index. The heading is positioned instead,
             which puts it above this in paint order on tree order alone.

             The centring box is dropped below the heading's own, not centred
             on it: the drawing is a portrait and the mark is a few short
             lines, so centring the two exactly floats the plate up past the
             rule at the head of the sheet and bleeds it onto the ground
             outside the paper. The offsets move the box rather than the
             image, for the same stacking-context reason. */
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -bottom-20 top-10 flex items-center justify-center"
          >
            <Image
              src={artwork.src}
              alt=""
              width={artwork.width}
              height={artwork.height}
              sizes="(max-width: 768px) 70vw, 400px"
              className="plate-vignette h-auto w-[clamp(270px,36vw,400px)] max-w-none opacity-[0.3] mix-blend-multiply"
              priority
            />
          </div>
        )}

        <h1
          className="feature-display relative mx-auto max-w-[430px]"
          // The ceiling is the smaller of the house display size and whatever
          // size the longest word fits the measure at, so a long name is set
          // smaller rather than hung off both edges of the sheet. The floor
          // stays a floor: below it the stack stops reading as a mark at all,
          // and by then the sheet is narrow enough that the word fits anyway.
          style={{
            fontSize: `clamp(3.6rem, 13vw, min(7.4rem, ${fitted.toFixed(1)}px))`,
          }}
        >
          {/* Set as blocks rather than broken with <br> so the stack holds at
              every width. */}
          {words.map((word, i) => (
            <span key={i} className="block">
              {word}
            </span>
          ))}
        </h1>
      </div>

      {/* The standfirst, inset inside the display line — it never runs as
          wide as the mark above it. */}
      <p
        className={`feature-standfirst mx-auto mt-7 text-[clamp(1rem,2.4vw,1.2rem)] leading-[1.3] ${
          deck === "wide" ? "max-w-[430px]" : "max-w-[310px]"
        }`}
      >
        {standfirst}
      </p>

      {/* The credit line runs the full measure rather than the masthead's, so
          it stays on one line under a standfirst far narrower than it. The
          credits are divided by space alone — no rule, no bullet — so the gap
          has to be set rather than typed, since a run of spaces in markup
          collapses to one. */}
      <div className="mt-9 flex flex-wrap items-baseline justify-center gap-x-8 gap-y-1 text-[12.5px] leading-[1.6] text-black/80">
        {credits.map((credit) => (
          <span key={credit.role} className="max-w-full">
            <span className="feature-credit-label">{credit.role}</span>{" "}
            {credit.name}
          </span>
        ))}
      </div>
    </header>
  );
}
