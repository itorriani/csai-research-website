import BrainMark from "@/components/BrainMark";

// The cover sheet from template.pdf, rebuilt rather than rasterised so it
// stays crisp at any tile size. Everything inside is measured in `cqw`
// against the sheet itself, so the composition scales with the grid instead
// of needing a breakpoint per column count. On a white page the sheet needs
// a border, or it has no edge; it is ruled in the document's own full black,
// the same edge the member cards and the rules on the sheets carry, rather
// than in a grey that reads as a UI container.
export default function CoverSheet({
  term,
  name,
}: {
  term: string;
  /** The document's title, printed at the foot of the sheet. Optional, so a
      shelf that already sets the name under every tile can leave it off. */
  name?: string;
}) {
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

      {/* At the foot, and measured in `cqw` like everything else on the
          sheet, so it holds its place whatever size the tile is dealt at. */}
      {name && (
        <p className="absolute bottom-[8.5%] left-[13%] right-[13%] text-[6.4cqw] uppercase leading-[1.05] tracking-[-0.01em] text-black">
          {name}
        </p>
      )}
    </div>
  );
}
