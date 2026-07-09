import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SITE } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import SmoothScroll from "@/components/SmoothScroll";
import ExitFades from "@/components/ExitFades";

// Type system: a TWO-FONT house (decided 2026-07-09). Saol Display carries
// every display/heading tier; the sans (--font-sans) carries EVERYTHING
// else — body, UI, and the meta voice (overlines, index numbers, stats)
// that Geist Mono used to carry. The mono is retired: it was the
// "engineered accent" of the old tech-luxury direction, and in the flat
// editorial system the meta voice comes from the same family as the body.
// The `font-mono` utility falls back to the system mono stack, which only
// device-chrome depictions (BrowserMockup's address bar) still use.
//
// ⚠ PRODUCTION FALLBACK LOADER. The CHOSEN body face is Dia (Schick
// Toikka) — but Dia is a TRIAL licence whose OTFs are gitignored and MUST
// NOT ship, so its loader lives ONLY as an uncommitted working-tree change
// in the dev worktrees (see CLAUDE.md → Fonts). This committed file ships
// Instrument Sans until Dia is bought; buy Dia → commit licensed webfonts
// → retire this loader.
//
// (Aeonik Pro trial evaluated 2026-06 and parked — files in src/fonts/.)
const sans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Saol Display — the wordmark/logo face (decided 2026-07-04): a sharp luxury
// serif carrying every `font-display` usage (Navbar/Footer wordmarks, the
// giant NORTH, the coming-soon page, mockup mini-site wordmarks). Body and
// headings stay Instrument Sans. Licensed webfonts in src/fonts/ (not a
// trial — confirm the webfont licence covers the live domain).
const saol = localFont({
  src: [
    { path: "../fonts/SaolDisplay-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/SaolDisplay-LightItalic.woff", weight: "300", style: "italic" },
  ],
  variable: "--font-display",
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
  themeColor: "#1C1710",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${saol.variable}`}>
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
