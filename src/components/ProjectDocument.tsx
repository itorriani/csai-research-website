import DocumentPage from "@/components/DocumentPage";
import FeatureMasthead, {
  type Credit,
  type MastheadArtwork,
} from "@/components/FeatureMasthead";
import PaperPlates from "@/components/PaperPlates";
import type { Citation, Paper, Section } from "@/lib/content";

// Every project sheet, set as the same feature as the About page. The four
// documents were copies of one another before this; they are now one layout
// with four sets of copy, so a change to the format reaches all of them.
//
// The sheet runs in four movements, and the order is the reference's:
//
//   1. The masthead — the project name stacked word by word, the one-line
//      thesis as the standfirst, and the credits closing it.
//   2. The running prose in two justified columns with a drop cap. This is
//      the hook and what came of it, which is the part that reads as writing
//      rather than as a record.
//   3. Everything that will not live in a narrow column, full measure: the
//      closing list, the papers the work rests on, and the sources.
//
// The split at (3) is not reluctance. A hanging rule list and a row of paper
// plates both want width; forced into a column they come out as a stack of
// two-word lines, and the plates would have nowhere to open.
export default function ProjectDocument({
  name,
  summary,
  lead,
  team,
  term,
  sections,
  papers,
  citations,
  artwork,
}: {
  /** Stacked one word to a line in the display face. */
  name: string;
  /** The one-line thesis, set as the standfirst. */
  summary: string;
  lead: string;
  team: string[];
  term: string;
  sections: Section[];
  papers: Paper[];
  citations: Citation[];
  /** The drawing standing behind the mark. None yet on these sheets. */
  artwork?: MastheadArtwork;
}) {
  // The closing section is the one that carries a list. It leaves the columns
  // and is set full measure below them, with its own lead-in paragraph, so
  // the colon is never parted from the list it introduces.
  const closing = sections.find((section) => section.points);
  const running = sections.filter((section) => section !== closing);

  // Only drop-cap an opening that starts on a letter. Mind the Noise opens on
  // ".00001%", and ::first-letter takes the leading punctuation with it — the
  // cap comes out as a full stop and a nought three lines high. A numeral is
  // not much better; print does not drop-cap one either.
  const dropCap = /^\p{L}/u.test(running[0]?.body ?? "");

  // The team list is far longer than the other two credits, so it goes last:
  // put it in the middle and it takes a line of its own and strands the term
  // alone on a second one.
  const credits: Credit[] = [
    { role: "Research Lead", name: lead },
    { role: "Term", name: term },
    { role: "Research Team", name: team.join(", ") },
  ];

  return (
    <DocumentPage>
      <FeatureMasthead
        words={name.split(" ")}
        standfirst={summary}
        credits={credits}
        artwork={artwork}
      />

      <div className="feature-columns doc-ink doc-justify mt-24 text-[14.5px] leading-[1.52] sm:mt-32">
        {running.map((section, i) => (
          <p
            key={section.label}
            className={i === 0 && dropCap ? "feature-dropcap" : undefined}
          >
            {section.body}
          </p>
        ))}
      </div>

      {closing && (
        <section className="mt-16">
          <p className="doc-ink doc-justify text-[14.5px] leading-[1.52]">
            {closing.body}
          </p>

          {/* Hanging hairline rules rather than bullet glyphs — see
              .rule-list in globals.css for the draw-in. */}
          <ul className="rule-list mt-7 space-y-6">
            {closing.points?.map((point) => (
              <li
                key={point}
                className="doc-ink doc-justify text-[14.5px] leading-[1.52]"
              >
                {point}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* The papers the project rests on. Opening one folds the rest into a
          stack — see PaperPlates. */}
      <section className="mt-16">
        <h2 className="doc-heading text-[20px] leading-[1.3] text-black">
          Literature Review
        </h2>
        <PaperPlates papers={papers} />
      </section>

      {/* Sources, closing the sheet. The papers plated above are the same
          ones cited here, and link to the PDFs already on the site. */}
      <section className="mt-20 border-t border-black pt-10">
        <h2 className="doc-heading text-[20px] leading-[1.3] text-black">
          Works Cited
        </h2>

        {/* MLA 9: alphabetised by author, hanging indent, locator last. */}
        <ul className="mt-6 space-y-4">
          {citations.map((c) => (
            <li
              key={c.mla}
              className="doc-justify -indent-8 pl-8 text-[14px] leading-[1.55] text-black/75 antialiased"
            >
              {c.mla}
              {c.href && (
                <>
                  {" "}
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener"
                    className="text-black underline decoration-black/25 underline-offset-[3px] transition-colors duration-300 hover:decoration-black"
                  >
                    {c.locator ?? "PDF"}
                  </a>
                  .
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    </DocumentPage>
  );
}
