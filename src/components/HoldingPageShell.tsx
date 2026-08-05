import type { ReactNode } from "react";
import HoldingFineprint from "./HoldingFineprint";

/**
 * THE HOLDING PAGE'S FRAME — the full-screen layer /coming-soon is built on.
 *
 * It renders as a FIXED layer ABOVE the site chrome, because the root
 * layout's Navbar and Footer would otherwise put a full nav on a page whose
 * whole point is that the site isn't ready yet. That is why the `main` is
 * `fixed inset-0 z-50` and scrolls itself rather than the document.
 *
 * ⚠ THE VERTICAL COLUMN IS LOAD-BEARING, so it lives here as one piece: a
 * `min-h-screen flex flex-col` shell with the monogram at the top, the
 * composed unit in a `flex-1 items-center` band, and `HoldingFineprint` at
 * the foot. The middle band is centred BETWEEN the other two; break the trio
 * apart across files and the centring silently becomes top alignment. The
 * 50/50 grid is part of the same recipe: columns TOP-ALIGNED so the kicker
 * and the card start on the same line, with a gap between pitch and form.
 *
 * The ground is `scene-ink grain` — flat ink and the one material. The
 * ambient pool that used to sit here retired with every background gradient
 * (2026-07-09).
 *
 * ⚠ MOST-SEEN PAGE ON THE SITE while HOLDING_PAGE=true: src/middleware.ts
 * serves /coming-soon on EVERY route, so this frame is what the domain is
 * until launch.
 *
 * Extracted from /coming-soon 2026-08-05.
 */
export default function HoldingPageShell({
  children,
}: {
  /** The two columns of the composed unit: the pitch and the enquiry
      column. The shell owns the grid they sit on. */
  children: ReactNode;
}) {
  return (
    <main className="fixed inset-0 z-50 overflow-y-auto bg-ink text-bone">
      <div className="scene-ink grain relative min-h-full overflow-hidden">
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

          <div className="flex flex-1 items-center py-12 md:py-14">
            <div className="grid w-full grid-cols-1 gap-y-14 md:grid-cols-12 md:items-start md:gap-x-8">
              {children}
            </div>
          </div>

          <HoldingFineprint />
        </div>
      </div>
    </main>
  );
}
