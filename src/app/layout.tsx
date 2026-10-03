import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
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
      className={`${openSans.variable} ${wordmark.variable} ${ysl.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
