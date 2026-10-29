import type { Metadata } from "next";
import { Big_Shoulders, Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

// Big Shoulders, carried for one job only: the display line that opens the
// About feature. The reference sets that masthead in a super-condensed
// grotesque — stems nearly touching, counters down to slits — and none of
// the house faces have a cut anywhere near it. Squeezing Inter horizontally
// was the alternative and is not one: at this size it thins the horizontals
// against the stems and reads as distorted type immediately.
//
// Loaded variable on the optical-size axis as well as weight. The family's
// display cut is the condensed one; at its text opsz the letters open up
// and the stack stops reading as a single mark.
//
// `block` rather than `swap`, which is the rest of the site's setting. Next
// has no override metrics for this family — the build says so — so it cannot
// size-adjust the fallback, and swapping a super-condensed face in over
// Arial Narrow at masthead size would reflow the whole stack in view. The
// file is preloaded with the page, so the block period is almost never
// reached; where it is, a beat of nothing is better than the mark arriving
// in the wrong face and then jumping.
const bigShoulders = Big_Shoulders({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  display: "block",
});

// Saint Laurent wordmark face (Mytupi Bold), used for the CSAI logotype only.
const wordmark = localFont({
  src: "./fonts/SaintLaurent-Bold.ttf",
  variable: "--font-wordmark-face",
  display: "swap",
});

// YSL-alike face (Vera Humana 95), used for the RESEARCH half of the logotype.
const ysl = localFont({
  src: "./fonts/VeraHumana95.ttf",
  variable: "--font-ysl-face",
  display: "swap",
});

// OPTI Naval, the house face for the CSAI Research lockup.
const naval = localFont({
  src: [
    { path: "./fonts/OPTINaval.otf", weight: "400", style: "normal" },
    { path: "./fonts/OPTINaval-Black.otf", weight: "900", style: "normal" },
  ],
  variable: "--font-naval-face",
  display: "swap",
});

// HK Venetian, the reading face for the project documents.
const venetian = localFont({
  src: "./fonts/HKVenetian-Regular.otf",
  variable: "--font-venetian-face",
  display: "swap",
});

// Inter, scoped to the About document rather than applied site-wide.
const inter = localFont({
  src: "./fonts/InterVariable.woff2",
  variable: "--font-inter-face",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CSAI | Journal of Computer Science",
  description: "Placeholder description for the CSAI journal homepage.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${wordmark.variable} ${ysl.variable} ${naval.variable} ${venetian.variable} ${inter.variable} ${bigShoulders.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
