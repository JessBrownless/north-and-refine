import type { Metadata } from "next";
import Link from "next/link";

// Design-exploration sandbox index — internal only (also disallowed in robots.ts).
// The Obsidian direction WON (2026-06) and was promoted to the real homepage;
// its mockup is kept here for reference. Porcelain, Eclipse and Dusk were deleted.
export const metadata: Metadata = {
  title: "Mockups — design explorations",
  robots: { index: false, follow: false },
};

export default function MockupsIndexPage() {
  return (
    <main className="bg-ink text-bone min-h-screen">
      <div className="shell pt-36 pb-24 md:pt-44">
        <p className="overline text-champagne">Internal — design explorations</p>
        <h1 className="heading-xl from-overline">Mockups</h1>
        <p className="lede body-lg text-bone-dim">
          Obsidian won and now lives on the real homepage. The original mockup is kept below
          for reference; the losing directions were deleted.
        </p>

        <div className="mt-14 divide-y rule-dark border-y rule-dark">
          <Link
            href="/mockups/obsidian"
            className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-8"
          >
            <div className="max-w-2xl">
              <p className="overline text-champagne">Winner — promoted to the homepage</p>
              <h2 className="heading-lg mt-2 transition-opacity group-hover:opacity-70">Obsidian</h2>
              <p className="body mt-2 text-bone-dim">
                Dark-led tech luxury — champagne-lit ink scenes, glass cards, devices glowing
                out of the dark.
              </p>
            </div>
            <span className="btn-ghost text-champagne shrink-0">
              View <span aria-hidden>→</span>
            </span>
          </Link>

          <Link
            href="/mockups/showreel"
            className="group flex flex-col md:flex-row md:items-center justify-between gap-4 py-8"
          >
            <div className="max-w-2xl">
              <p className="overline text-champagne">Promoted to the homepage</p>
              <h2 className="heading-lg mt-2 transition-opacity group-hover:opacity-70">
                Showreel deck
              </h2>
              <p className="body mt-2 text-bone-dim">
                A centred type lockup over a fanned, cycling deck of desktop screens — now the
                live homepage hero. Cards are placeholders to be swapped for real screenshots or
                a video showreel.
              </p>
            </div>
            <span className="btn-ghost text-champagne shrink-0">
              View <span aria-hidden>→</span>
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
