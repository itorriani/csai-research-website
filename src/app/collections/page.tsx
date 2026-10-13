import Link from "next/link";
import BrainMark from "@/components/BrainMark";
import type { Metadata } from "next";
import DocumentPage from "@/components/DocumentPage";
import { projects, previousProjects, type Project } from "@/lib/content";

export const metadata: Metadata = {
  title: "Collections | CSAI Research",
  description:
    "Every CSAI Research paper, shown as its cover sheet: MIND THE NOISE, CANARY, SOCIAL SIMULATION and ADUA.",
};

// The cover sheet from template.pdf, rebuilt rather than rasterised so it
// stays crisp at any tile size. Everything inside is measured in `cqw`
// against the sheet itself, so the composition scales with the grid instead
// of needing a breakpoint per column count. On a white page the sheet needs
// a border, or it has no edge; it is ruled in the document's own full black,
// the same edge the member cards and the rules on the sheets carry, rather
// than in a grey that reads as a UI container.
function CoverSheet({ term }: { term: string }) {
  return (
    <div className="@container relative aspect-[8.5/11] w-full overflow-hidden border border-black bg-white">
      <div className="absolute left-[13%] top-[10%]">
        <BrainMark className="h-[7cqw] w-auto" />
        <p className="mt-[3.2cqw] text-[5.2cqw] leading-none tracking-[-0.01em] text-black">
          CSAI Research
        </p>
        <p className="mt-[2.4cqw] text-[3.5cqw] leading-none text-black/70">
          {term}
        </p>
      </div>
    </div>
  );
}

// The live marker: the mark itself, pulsing. Decorative — each title it sits
// beside carries an sr-only label.
function LiveMark() {
  return (
    <BrainMark className="h-[11px] w-auto shrink-0 animate-pulse motion-reduce:animate-none" />
  );
}

function Shelf({
  term,
  papers,
  inProgress,
}: {
  term: string;
  papers: Project[];
  inProgress: boolean;
}) {
  return (
    <section className="mt-14">
      {/* Set at body weight — same Venetian, same ink and stroke as the
          running text on the project documents. */}
      <h2 className="doc-ink text-[17px] leading-[1.45]">{term}</h2>

      <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3">
        {papers.map((paper) => {
          const Tile = paper.href ? Link : "div";
          return (
            <li key={paper.id}>
              <Tile
                href={paper.href ?? "#"}
                className={`block ${paper.href ? "group" : ""}`}
              >
                <div className="transition-opacity duration-500 group-hover:opacity-80">
                  <CoverSheet term={paper.term ?? term} />
                </div>

                {/* The name carries the weight; everything under it steps
                    back, the same split the documents use. */}
                <h3 className="doc-ink mt-4 flex items-center gap-2 text-[19px] leading-[1.2]">
                  {paper.name}
                  {inProgress && (
                    <>
                      <LiveMark />
                      <span className="sr-only">In progress</span>
                    </>
                  )}
                </h3>

                <p className="mt-2 text-[14px] leading-[1.45] text-black/65 antialiased">
                  {paper.summary}
                </p>
                <p className="mt-2 font-sans text-[10px] uppercase tracking-[0.12em] text-black/45 antialiased">
                  {paper.pi}
                </p>
              </Tile>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function CollectionsPage() {
  return (
    <DocumentPage title="Collections">
      <Shelf term="2026–2027" papers={projects} inProgress />
      <Shelf term="2025–2026" papers={previousProjects} inProgress={false} />
    </DocumentPage>
  );
}
