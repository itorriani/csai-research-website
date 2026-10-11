import CsaiLockup from "@/components/CsaiLockup";

// Scratch route used only to rasterise the lockup for export. Not linked
// from anywhere; delete once you have the PNG you need.
export default function LogoExport() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white">
      <div id="export-target" className="p-10 text-ink">
        <CsaiLockup marks={3} className="text-[150px]" />
      </div>
    </main>
  );
}
