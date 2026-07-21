import type { Metadata } from "next";
import Link from "next/link";
import BrowserMockup from "@/components/BrowserMockup";

// DIRECTION PROOF — THREE-SECTION HERO (2026-07-14, client ref: the ThinkWise
// template). The print masthead holds the left; the right becomes a COMPOSED
// set of three: (1) the work as a browser window, (2) a dosed-gradient "craft"
// card, (3) a proof stat. This is how the modern/gradient energy enters —
// composed sections, not one plate. Adapted to OUR system, not cloned: Saol +
// ink + straight-corner .card-glass (device keeps its radius), and the gradient
// stays DOSED + in-family (the vivid multi-hue "gradient-border" graphic style
// is a separate, site-wide decision — see the gradient-border memory). Routed
// off the "print-hero" prefix so it uses the standard .shell rail (contained,
// like the reference), nav aligned. Internal only; /mockups is robots-disallowed.
export const metadata: Metadata = {
  title: "Hero — three sections",
  robots: { index: false, follow: false },
};

export default function HeroThreePage() {
  return (
    <main className="bg-ink text-bone">
      <section className="relative grain scene-ink overflow-hidden">
        <div className="shell relative z-10 py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
            {/* LEFT — the print masthead, undiluted */}
            <div className="lg:col-span-5">
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
                className="lede body-lg max-w-[40ch] text-bone-dim opacity-0 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                We design the brand, build the website and earn the search
                rankings for medical aesthetic and cosmetic surgery practices.
              </p>
              <div
                className="mt-9 flex flex-wrap items-center gap-4 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.35s" }}
              >
                <Link href="/contact" className="btn btn-primary-dark btn-arrow">
                  Start a project
                  <span className="btn-arrow-chip" aria-hidden>
                    ↗
                  </span>
                </Link>
                <Link href="/work" className="btn btn-secondary-dark">
                  See the work
                </Link>
              </div>
              {/* Trust row — ⚠ PLACEHOLDER: real review data / client locations
                  before launch (the checklist forbids drafting review claims). */}
              <div
                className="mt-10 flex items-center gap-4 opacity-0 animate-fade-in"
                style={{ animationDelay: "0.45s" }}
              >
                <div className="flex -space-x-2">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="portrait-fill h-9 w-9 rounded-full ring-2 ring-ink"
                    />
                  ))}
                </div>
                <p className="body-sm text-bone-dim">
                  Trusted by practices in London, Sydney &amp; Dubai
                </p>
              </div>
            </div>

            {/* RIGHT — three composed sections */}
            <div className="lg:col-span-7">
              <div
                className="grid gap-4 opacity-0 animate-fade-in-slow"
                style={{ animationDelay: "0.3s" }}
              >
                {/* 1 — THE WORK (browser window, hardware radius) */}
                <BrowserMockup
                  screenshot="/assets/desktops/selv.jpg"
                  screenshotAlt="A dermatology practice website designed by North & Refine"
                  domain="selv.com"
                />

                {/* 2 + 3 — the craft card and the proof stat */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
                  {/* 2 — CRAFT CARD: the dosed, in-family gradient lives here */}
                  <div className="card-glass relative overflow-hidden p-6 sm:col-span-3 lg:p-7">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-8 -top-10 h-56 w-56 rounded-full blur-[70px]"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(216,198,164,0.45) 0%, transparent 70%)",
                      }}
                    />
                    <div className="relative">
                      <p className="overline">Our craft</p>
                      <p className="body-lg mt-3 max-w-[26ch] text-bone">
                        Brand, website and search — built as one considered
                        system.
                      </p>
                      <Link
                        href="/work"
                        className="btn-ghost mt-5 inline-flex text-bone"
                      >
                        Explore the work <span aria-hidden>→</span>
                      </Link>
                    </div>
                  </div>

                  {/* 3 — PROOF STAT (Saol Display number; * = illustrative) */}
                  <div className="card-glass flex flex-col justify-center p-6 sm:col-span-2 lg:p-7">
                    <p className="stat text-bone">156%</p>
                    <p className="body-sm mt-2 text-bone-dim">
                      average lift in organic enquiries*
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
