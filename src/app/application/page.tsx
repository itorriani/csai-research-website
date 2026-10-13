import type { Metadata } from "next";
import BrainMark from "@/components/BrainMark";
import DocumentPage from "@/components/DocumentPage";

export const metadata: Metadata = {
  title: "Application | CSAI Research",
  description:
    "Applications to the CSAI Research Division for 2026–2027 are closed.",
};

export default function ApplicationPage() {
  return (
    // Same sheet as the contact page: a shade off pure white, so the card
    // reads as the lighter of the two surfaces.
    <DocumentPage surface="bg-[#f7f7f5]">
      {/* The contact card's plate, to the line — 3.5 × 2 inches from sm up,
          growing to its content on phones. */}
      <div className="card-grain relative mx-auto mt-10 w-full max-w-[680px] border border-black/15 bg-white p-7 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.18)] sm:aspect-[3.5/2] sm:p-8">
        {/* The house mark in the corner, as it is printed on the contact
            card. Out of flow, so the notice sits dead centre of the plate
            rather than centring on what is left under the mark. */}
        <BrainMark
          variant="heavy"
          className="absolute left-7 top-7 h-6 w-auto sm:left-8 sm:top-8"
        />

        {/* Set at the sheet's own reading size and stroke — the same ink as
            the contact card's labels, not a heading. */}
        <p className="doc-ink flex h-full min-h-[8rem] items-center justify-center text-center text-[15px] leading-[1.45] text-black">
          We are no longer accepting applications for 2026&ndash;2027.
        </p>
      </div>
    </DocumentPage>
  );
}
