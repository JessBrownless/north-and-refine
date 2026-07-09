import type { Metadata } from "next";
import Link from "next/link";
import Deck from "@/components/Deck";

// Design exploration — a centred type lockup over a fanned, cycling deck of
// "desktop screen" cards (the OmenFlex hero shape). Internal only; the cards are
// placeholders to be swapped for real screenshots / a video showreel later.
// Robots-disallowed via /mockups prefix in robots.ts; noindexed here too.
export const metadata: Metadata = {
  title: "Showreel deck — design exploration",
  robots: { index: false, follow: false },
};

export default function ShowreelMockupPage() {
  return (
    <main className="bg-ink text-bone min-h-screen">
      <section className="scene-ink grain relative overflow-hidden">
        {/* Ambient champagne orb */}
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-champagne/12 blur-3xl animate-float-slower"
        />

        <div className="shell-wide relative z-10 pt-40 pb-24 text-center md:pt-48 md:pb-28">
          {/* Type lockup — overline + huge headline + a corner label */}
          <div className="relative mx-auto max-w-5xl">
            <p
              className="overline opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Selected work
            </p>
            <h1
              className="display-mega from-overline opacity-0 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              Practices, refined.
            </h1>
            <span className="overline absolute right-0 top-10 hidden text-bone-dim md:block lg:top-14">
              Cosmetic &amp; aesthetic
            </span>
          </div>

          {/* The deck tucks just under the headline */}
          <div
            className="relative z-10 -mt-2 opacity-0 animate-fade-in md:-mt-6"
            style={{ animationDelay: "0.5s", animationDuration: "1.4s" }}
          >
            <Deck />
          </div>

          {/* CTAs */}
          <div
            className="mt-14 flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.7s" }}
          >
            <Link href="/work" className="btn btn-primary-dark">
              See the work
              <span aria-hidden>→</span>
            </Link>
            <Link href="/contact" className="btn btn-secondary-dark">
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
