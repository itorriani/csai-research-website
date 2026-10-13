import Link from "next/link";
import CsaiLockup from "@/components/CsaiLockup";
import { heroNavLeft, heroNavRight } from "@/lib/content";

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4.5 4.5" />
    </svg>
  );
}

const LINK =
  "text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-60";

// On a white band the links carry full black and the document's own
// stroke: Venetian ships a single Regular cut, so at 12px tracked caps the
// ink has to come from the stroke rather than from a weight that is not
// there. The lockup is left on the nav's own tone, a shade off black, so
// the house mark stays the quieter mark of the two.
const LINK_LIGHT = `${LINK} doc-ink text-black`;

// `tone` only flips the ink: "dark" is the nav over the black pages, "light"
// is the nav on a white band. The light nav additionally carries the hover
// treatment — a faint grey pane washes across the whole bar. The ink stays
// dark: at this tint there is nowhere near enough contrast to carry white
// type, so inverting the links would make them unreadable.
export default function HeroNav({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  const link = light ? LINK_LIGHT : LINK;
  return (
    <div className="group relative">
      {light && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black opacity-0 transition-opacity duration-300 group-hover:opacity-[0.08]"
        />
      )}

      <nav
        className={`relative grid grid-cols-[1fr_auto_1fr] items-center gap-6 px-8 pb-5 pt-3 transition-colors duration-300 ${
          light ? "text-ink" : "text-white"
        }`}
      >
        <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
          {heroNavLeft.map((item) => (
            <li key={item.label}>
              <a href={item.href} className={link}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="flex items-center justify-center"
          aria-label="CSAI Research, California"
        >
          <CsaiLockup marks={3} className="text-[20px]" />
        </Link>

        <ul className="flex flex-wrap items-center justify-end gap-x-7 gap-y-2">
          {heroNavRight.map((item) => (
            <li key={item.label}>
              <a href={item.href} className={link}>
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#"
              aria-label="Search"
              className={`block transition-opacity hover:opacity-60 ${
                light ? "text-black" : ""
              }`}
            >
              <SearchIcon />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
