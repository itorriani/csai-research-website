import type { Metadata } from "next";
import CsaiLockup from "@/components/CsaiLockup";

export const metadata: Metadata = {
  title: "CSAI Research — lockup comparison",
  description: "Side-by-side of the two brain-mark fills, on white and dark.",
};

function Panel({
  label,
  dark = false,
  children,
}: {
  label: string;
  dark?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-meta">
        {label}
      </span>
      <div
        className={`flex min-h-[320px] items-center justify-center rounded-sm px-8 py-14 ${
          dark ? "bg-[#151515] text-white" : "bg-white text-ink"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function LockupComparison() {
  return (
    <main className="mx-auto w-full max-w-6xl px-8 py-20">
      <h1 className="font-sans text-[13px] uppercase tracking-[0.18em] text-meta">
        Mark comparison
      </h1>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <Panel label="A — open nodes">
          <CsaiLockup variant="light" className="text-[42px]" />
        </Panel>
        <Panel label="B — solid nodes">
          <CsaiLockup variant="heavy" className="text-[42px]" />
        </Panel>

        <Panel label="A — three up">
          <CsaiLockup variant="light" marks={3} className="text-[42px]" />
        </Panel>
        <Panel label="B — three up">
          <CsaiLockup variant="heavy" marks={3} className="text-[42px]" />
        </Panel>

        <Panel label="A — three up, whited out" dark>
          <CsaiLockup variant="light" marks={3} className="text-[42px]" />
        </Panel>
        <Panel label="B — three up, whited out" dark>
          <CsaiLockup variant="heavy" marks={3} className="text-[42px]" />
        </Panel>

        <Panel label="A — whited out" dark>
          <CsaiLockup variant="light" className="text-[42px]" />
        </Panel>
        <Panel label="B — whited out" dark>
          <CsaiLockup variant="heavy" className="text-[42px]" />
        </Panel>

        <Panel label="A — at nav scale" dark>
          <CsaiLockup variant="light" className="text-[22px]" />
        </Panel>
        <Panel label="B — at nav scale" dark>
          <CsaiLockup variant="heavy" className="text-[22px]" />
        </Panel>
      </div>
    </main>
  );
}
