import type { Metadata } from "next";
import Link from "next/link";
import BrowserMockup from "@/components/BrowserMockup";

// DIRECTION PROOF — wow variant A, refined: IMMERSIVE 50/50 (2026-07-14). The
// client liked A's scale but the plate OVERLAPPED the type (crowded, not
// luxury) and the centred 1520 shell stranded the content too far in on wide
// screens. Fix: the whole hero sits on a near-full-bleed rail (matched by the
// nav, scoped in Navbar) so the type starts ~80px from the edge; the type owns
// the left, the plate owns the right and bleeds off the screen edge — a clean
// seam between them, no overlap. Big scale + edge-to-edge image + air = the
// wow, kept luxurious. Internal only; /mockups is robots-disallowed.
export const metadata: Metadata = {
  title: "Print hero — immersive",
  robots: { index: false, follow: false },
};

// The hero rail — MUST match Navbar's `rail` for the print-hero routes so the
// nav logo lines up with the hero's left edge. Brought IN from near-full-bleed
// to a proper column margin (2026-07-14, client's call: full-bleed read
// unstructured; the type wants a column to sit in). The PLATE ignores this rail
// — it stays anchored to the viewport edge so it still bleeds off-screen.
const RAIL = "mx-auto w-full px-6 md:px-12 lg:px-40";

export default function PrintHeroPosterPage() {
  return (
    <main className="bg-ink text-bone">
      <section className="relative grain scene-ink overflow-hidden">
        {/* The one dosed, grainy, in-family champagne glow — behind the plate,
            bleeding toward the type across the seam. */}
        <div
          aria-hidden
          className="pointer-events-none absolute right-[3%] top-1/2 z-0 h-[920px] w-[920px] -translate-y-1/2 rounded-full blur-[140px]"
          style={{
            background:
              "radial-gradient(circle, rgba(216,198,164,0.30) 0%, rgba(216,198,164,0.10) 44%, transparent 70%)",
          }}
        />

        {/* THE PLATE (desktop) — the client site shown as a BROWSER WINDOW, not
            a bare screenshot. The hard-cornered bare plate read as a rectangle
            pasted on the ink (the frame cut straight through the site's own
            photo); the fix that keeps the straight-corner PRINT canon intact is
            the device-hardware exception — a screen shown as a device keeps its
            radii (2026-07-14, client felt the hard edge). The window (12px
            macOS radius + quiet chrome) frames the work, gives the curve
            honestly, and reads unmistakably as "a website". Owns the right and
            runs OFF the screen edge (~25% cropped by the viewport, so the eye +
            "Skin, understood" read and the right quarter bleeds away). */}
        <div
          className="pointer-events-none absolute right-0 top-1/2 z-[5] hidden w-[56vw] max-w-[1200px] -translate-y-1/2 translate-x-[25%] opacity-0 animate-fade-in-slow lg:block"
          style={{ animationDelay: "0.35s" }}
        >
          <BrowserMockup
            screenshot="/assets/desktops/selv.jpg"
            screenshotAlt="A dermatology practice website designed by North & Refine — dark editorial layout with a modern glass treatment-plan card"
            domain="selv.com"
            className="shadow-[0_60px_160px_-50px_rgba(0,0,0,0.85)]"
          />
        </div>

        <div className={`${RAIL} relative z-10 flex min-h-[90vh] items-center py-20 lg:py-28`}>
          <div className="w-full lg:w-[48%]">
            <p className="overline opacity-0 animate-fade-in">
              Brand, web &amp; SEO — aesthetic medicine
            </p>
            <h1
              className="display-mega from-overline text-balance opacity-0 animate-fade-in"
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
              className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-5 opacity-0 animate-fade-in lg:mt-12"
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

            {/* Mobile plate — in flow (the desktop plate is absolute + hidden
                below lg). Same browser-window treatment. */}
            <div className="mt-12 lg:hidden">
              <BrowserMockup
                screenshot="/assets/desktops/selv.jpg"
                screenshotAlt="A dermatology practice website designed by North & Refine"
                domain="selv.com"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
