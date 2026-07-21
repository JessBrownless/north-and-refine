import type { Metadata } from "next";
import Link from "next/link";

// DIRECTION PROOF — wow variant B: "FULL-HEIGHT COLUMN". Same language again
// (print masthead + tech-on-screen + one dosed grainy champagne gradient), but
// the drama is IMMERSION: the client site runs the full height of the hero as
// a right-hand column, bleeding top/bottom/right and dissolving into the ink on
// its inner edge, with the big Saol masthead holding the left. The work becomes
// a co-star at architectural scale — still sorted (each world owns its column;
// the dissolve is a mask, not type-on-image). Internal only; robots-disallowed.
export const metadata: Metadata = {
  title: "Print hero — full-height column",
  robots: { index: false, follow: false },
};

export default function PrintHeroColumnPage() {
  return (
    <main className="bg-ink text-bone">
      <section className="relative grain scene-ink min-h-[92vh] overflow-hidden">
        {/* THE PLATE (desktop) — a full-height right column. Bleeds to the top,
            bottom and right edges; its inner (left) edge dissolves into the ink
            via a mask so it reads as the work EMERGING from the dark, not a
            pasted rectangle. */}
        <div className="absolute inset-y-0 right-0 z-[5] hidden w-[46vw] opacity-0 animate-fade-in-slow md:block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/desktops/selv.jpg"
            alt="A dermatology practice website designed by North & Refine — dark editorial layout with a modern glass treatment-plan card"
            className="h-full w-full object-cover"
          />
          {/* Inner-edge dissolve into ink (a mask, not decoration). */}
          <div
            aria-hidden
            className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-ink via-ink/60 to-transparent"
          />
        </div>

        {/* The one dosed, grainy, in-family champagne glow — at the seam, where
            the type meets the emerging column. */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[38%] top-1/2 z-0 h-[720px] w-[720px] -translate-y-1/2 rounded-full blur-[130px]"
          style={{
            background:
              "radial-gradient(circle, rgba(216,198,164,0.30) 0%, rgba(216,198,164,0.10) 44%, transparent 70%)",
          }}
        />

        <div className="shell relative z-10 flex min-h-[92vh] items-center py-20 md:py-28">
          <div className="w-full md:max-w-[52%]">
            <p className="overline opacity-0 animate-fade-in">
              Brand, web &amp; SEO — aesthetic medicine
            </p>
            <h1
              className="display from-overline text-balance opacity-0 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              Practices that patients <em>trust</em>.
            </h1>
            <p
              className="lede body-xl max-w-[40ch] text-bone-dim opacity-0 animate-fade-in"
              style={{ animationDelay: "0.25s" }}
            >
              We design the brand, build the website and earn the search
              rankings for medical aesthetic and cosmetic surgery practices.
            </p>
            <div
              className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-5 opacity-0 animate-fade-in md:mt-12"
              style={{ animationDelay: "0.45s" }}
            >
              <Link href="/contact" className="btn btn-primary-dark btn-arrow">
                Start a project
                <span className="btn-arrow-chip" aria-hidden>
                  ↗
                </span>
              </Link>
              <Link href="/work" className="btn-ghost text-bone">
                See the work <span aria-hidden>→</span>
              </Link>
            </div>

            {/* Mobile plate — in flow (the desktop column is hidden below md). */}
            <div className="mt-12 md:hidden">
              <div className="frame aspect-[16/10] ring-1 ring-bone/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/desktops/selv.jpg"
                  alt="A dermatology practice website designed by North & Refine"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
