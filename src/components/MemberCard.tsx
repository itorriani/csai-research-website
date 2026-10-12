import BrainMark from "@/components/BrainMark";

// A member, set on a card run longer than it is tall. Mark in the upper
// left, name centred in the house face, title beneath it.
export default function MemberCard({
  name,
  title,
}: {
  name: string;
  title: string;
}) {
  return (
    <div className="relative flex aspect-[2.2/1] w-full flex-col items-center justify-center border border-black bg-white px-5 shadow-[0_6px_14px_-8px_rgba(0,0,0,0.55)]">
      <BrainMark className="absolute left-4 top-4 h-[20px] w-auto" />

      <p className="font-naval text-center text-[19px] leading-[1.2] tracking-[0.01em]">
        {name}
      </p>
      <p className="doc-ink mt-2 text-center text-[13px] leading-[1.4] text-black/60">
        {title}
      </p>
    </div>
  );
}
