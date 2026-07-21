import type { Metadata } from "next";
import Link from "next/link";

// DIRECTION PROOF — "sorted, not layered" (2026-07-13). The client is in love
// with BOTH the print/editorial world (Saol, ink, air, Moyo imagery) and the
// modern tech-agency world (gradient blobs, glassy UI). Layering them on one
// surface makes each element read as out of place. This proves the resolution:
// the STUDIO's own skin is pure print; the modern/tech energy lives ON THE
// SCREEN (the client's site, where it belongs); and the beloved gradient is
// reclassified from "banned" to ONE dosed, grainy, in-family accent that
// speaks the print dialect. Internal only; /mockups is robots-disallowed.
export const metadata: Metadata = {
  title: "Print hero — direction proof",
  robots: { index: false, follow: false },
};

export default function PrintHeroProofPage() {
  return (
    <main className="bg-ink text-bone">
      <section className="relative grain scene-ink overflow-hidden">
        {/* THE ONE DOSED GRADIENT — the reclassified "gradient blob". It speaks
            PRINT, not SaaS, by three moves: (1) champagne-soft, IN THE BRAND
            FAMILY, not saturated tech-purple; (2) low opacity + huge soft blur,
            an atmosphere not an object; (3) GRAINY — the section's .grain
            ::before (z-1) sits over it, turning the wash into an editorial
            print-texture rather than a glossy orb. Placed ONCE, behind the
            plate, bleeding up toward the masthead. This is the whole "have
            both" bet in one element. */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[2%] top-[14%] z-0 h-[820px] w-[820px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(216,198,164,0.34) 0%, rgba(216,198,164,0.13) 42%, transparent 68%)",
          }}
        />

        <div className="shell relative z-10 flex min-h-[78vh] items-center py-20 md:py-28">
          <div className="grid w-full grid-cols-1 gap-14 md:grid-cols-12 md:items-end md:gap-8">
            {/* MASTHEAD — the print world, undiluted: Saol, ink, air, and the
                one-italic-accent-word device on "trust" (the emotional core of
                this market). Nothing tech here. */}
            <div className="md:col-span-6">
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
                className="lede body-xl max-w-[42ch] text-bone-dim opacity-0 animate-fade-in"
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
            </div>

            {/* THE PLATE — the tech world, contained on the screen where it
                belongs. A modern client site (glassy treatment-plan card,
                gradient ground of its own) glowing out of the print-dark. The
                editorial frame + the grainy champagne wash behind it are the
                quiet "gallery wall"; the site is the loud "painting". One
                plate, dosed — the same grammar as the work cards on /work, so
                it reads as the site's own language, not a bolted-on showreel.
                16:10 per the ratio canon; no hover motion (a plate, not a
                card). */}
            <div
              className="opacity-0 animate-fade-in-slow md:col-span-6 md:col-start-7"
              style={{ animationDelay: "0.35s" }}
            >
              <div className="frame aspect-[16/10] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.7)] ring-1 ring-bone/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/assets/desktops/selv.jpg"
                  alt="A dermatology practice website designed by North & Refine — a dark editorial layout with a modern glass treatment-plan card"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <p className="label mt-4 text-clay">Selv — dermatology, delivered</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
