import Image from "next/image";
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
    <footer className={`border-t border-black ${surface}`}>
      <div className="mx-auto w-full max-w-[1200px] px-5 py-12">
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

      <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center gap-4 px-5 pb-6">
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
