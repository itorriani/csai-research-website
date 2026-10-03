import Image from "next/image";
import Link from "next/link";
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

export default function HeroNav() {
  return (
    <nav className="grid grid-cols-[1fr_auto_1fr] items-center gap-6 px-8 pt-6 text-white">
      <ul className="flex flex-wrap items-center gap-x-7 gap-y-2">
        {heroNavLeft.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-60"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <Link
        href="/"
        className="relative top-1.5 flex items-center justify-center gap-2.5"
      >
        <Image
          src="/csai-logo.png"
          alt=""
          width={1254}
          height={1254}
          priority
          className="relative -top-1 h-8 w-8 object-contain invert"
        />
        <span className="flex items-baseline leading-none">
          <span className="font-wordmark text-[27px] leading-none tracking-tight">
            CSAI
          </span>
          <span className="font-ysl text-[29px] leading-none tracking-tight">
            RESEARCH
          </span>
        </span>
      </Link>

      <ul className="flex flex-wrap items-center justify-end gap-x-7 gap-y-2">
        {heroNavRight.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className="text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-60"
            >
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="#"
            aria-label="Search"
            className="block transition-opacity hover:opacity-60"
          >
            <SearchIcon />
          </a>
        </li>
      </ul>
    </nav>
  );
}
