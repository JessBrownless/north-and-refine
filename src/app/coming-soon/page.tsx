import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import ContactForm from "@/components/ContactForm";

// The pre-launch holding page — live at the domain while the full site is
// finished, so client-footer credits ("Site by North & Refine") resolve to
// something worth arriving at. Served on EVERY route when HOLDING_PAGE=true
// (see src/middleware.ts); reachable at /coming-soon otherwise.
//
// Renders as a fixed full-screen layer ABOVE the site chrome: the root
// layout's Navbar/Footer would otherwise show a full nav on a page whose
// whole point is that the site isn't ready yet.
export const metadata: Metadata = {
  title: "Coming soon",
  description: SITE.description,
  alternates: { canonical: "/coming-soon" },
};

export default function ComingSoonPage() {
  return (
    <main className="fixed inset-0 z-50 overflow-y-auto bg-ink text-bone">
      <div className="scene-ink grain relative min-h-full overflow-hidden">
        {/* Ambient champagne pool — one quiet light source, ink first */}
        <div
          aria-hidden
          className="absolute right-[-12%] top-[30%] h-[60vh] w-[46vw] animate-float-slower"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--champagne) 8%, transparent) 0%, transparent 100%)",
          }}
        />

        <div className="shell relative z-10 flex min-h-screen flex-col pb-10 pt-12 md:pt-16">
          {/* Monogram — the page's only chrome. Jessica's NR lockup with the
              Saol glyphs converted to outlines (public/nr-monogram-white.svg,
              generated from the licensed TTF 2026-07-05) — renders identically
              everywhere, no live text, no font dependency. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/nr-monogram-white.svg?v=3"
            alt="North & Refine"
            className="h-6 w-auto self-start md:h-8"
          />

          {/* One composed unit, vertically centred between monogram and
              fineprint: columns TOP-ALIGNED (kicker and card start on the
              same line), an even 50/50 split with a gap between pitch and form */}
          <div className="flex flex-1 items-center py-12 md:py-14">
          <div className="grid w-full grid-cols-1 gap-y-14 md:grid-cols-12 md:items-start md:gap-x-8">
            {/* The pitch — who we are, for the visitor arriving from a
                client site's footer credit */}
            <div className="md:col-span-6">
              <p className="overline opacity-0 animate-track-in">
                Coming soon
              </p>
              <h1
                className="heading-xl from-overline max-w-3xl text-balance opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.5s" }}
              >
                Building websites that patients <em className="italic">trust</em>.
              </h1>
              <p
                className="lede body-lg max-w-2xl text-bone-dim opacity-0 animate-fade-in-up"
                style={{ animationDelay: "0.7s" }}
              >
                {SITE.tagline}.
              </p>
            </div>

            {/* The form — the right half of the 50/50 split; email line sits
                OUTSIDE the frosted glass, close in; the card is purely the
                form. Same Netlify form as /contact, minimal fields */}
            <div
              className="md:col-span-6 opacity-0 animate-fade-in-up"
              style={{ animationDelay: "1.1s" }}
            >
              <p className="overline">
                Enquire <span aria-hidden>↓</span>
              </p>
              <div className="card-glass mt-4 rounded-2xl px-8 py-5 md:px-9 md:py-6">
                <ContactForm variant="minimal" />
              </div>
              <p className="body mt-4 text-bone-dim">
                Prefer email?{" "}
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-champagne underline underline-offset-4"
                >
                  {SITE.email}
                </a>
              </p>
            </div>
          </div>
          </div>

          <p className="fineprint text-clay">
            © 2026 {SITE.legalName}. {SITE.tagline}. ·{" "}
            <a href="/privacy" className="underline underline-offset-2 hover:text-bone transition-colors">
              Privacy
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
