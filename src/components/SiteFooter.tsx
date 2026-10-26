import Image from "next/image";
import FooterIsometric from "@/components/FooterIsometric";
import { footerColumns } from "@/lib/content";

// `surface` is the tone the footer band carries. It defaults to white, the
// tone of every page that ends on the sheet itself; a page whose sheet is a
// raised white card passes its own page tone so the band below the card
// reads as the page continuing rather than as more paper.
export default function SiteFooter({
  surface = "bg-white",
}: {
  surface?: string;
} = {}) {
  // The band opens on a hairline black rule — the same stroke the document
  // sheets carry, and what parts the footer from the page above it.
  return (
    <footer className={`relative overflow-hidden border-t border-black ${surface}`}>
      {/* Anchored to the bottom right corner and allowed to run under the
          columns, which is where the reference's own lattice goes — it is the
          ground the type sits on rather than a panel beside it. Clipped by
          the footer, so on a narrow screen it simply loses its left side. */}
      <FooterIsometric className="pointer-events-none absolute bottom-0 right-0 h-full w-[min(62%,640px)] select-none" />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 pb-10 pt-14">
        <div className="grid gap-10 md:grid-cols-3">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="mb-3 text-[15px] font-bold text-black">
                {col.heading}
              </h3>
              <ul className="space-y-2 text-[15px] text-black/70">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a
                        href={link.href}
                        className="hover:underline"
                        {...(link.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </a>
                    ) : (
                      link.label
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-4 px-5 pb-16">
        <Image
          src="/csai-logo.png"
          alt=""
          width={1254}
          height={1254}
          className="h-9 w-9 object-contain"
        />
      </div>
    </footer>
  );
}
