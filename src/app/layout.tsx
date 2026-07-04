import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SmoothScroll from "@/components/SmoothScroll";
import ExitFades from "@/components/ExitFades";

// Premium-sans system: Instrument Sans (variable) everywhere — chosen for its
// sheared "scalpel" terminals (the t especially) — with Geist Mono for the
// engineered accents (overlines, index numbers, stats). Hierarchy comes from
// weight and size, not font pairing.
//
// Aeonik Pro trial was evaluated (2026-06) and parked — files remain in
// src/fonts/. To re-trial, swap this loader for:
//   import localFont from "next/font/local";
//   const sans = localFont({
//     src: [
//       { path: "../fonts/AeonikProTRIAL-Light.otf", weight: "300", style: "normal" },
//       { path: "../fonts/AeonikProTRIAL-Regular.otf", weight: "400", style: "normal" },
//       { path: "../fonts/AeonikProTRIAL-RegularItalic.otf", weight: "400", style: "italic" },
//       { path: "../fonts/AeonikProTRIAL-Medium.otf", weight: "500", style: "normal" },
//       { path: "../fonts/AeonikProTRIAL-MediumItalic.otf", weight: "500", style: "italic" },
//       { path: "../fonts/AeonikProTRIAL-SemiBold.otf", weight: "600", style: "normal" },
//     ],
//     variable: "--font-sans",
//     display: "swap",
//   });
// (Trial licence = evaluation only; buy from CoType before shipping it.)
const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
};

export const viewport = {
  themeColor: "#0C0C0D",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${geistMono.variable}`}>
      <body id="top">
        {/* Site-wide structured data: the studio + the website node. */}
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SmoothScroll />
        <ExitFades />
        <Reveal />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
