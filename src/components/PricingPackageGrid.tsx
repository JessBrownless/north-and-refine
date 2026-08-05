import type { ReactNode } from "react";
import Link from "next/link";

export interface PricingPackage {
  name: string;
  /** The figure exactly as it should read ("from $9,000", "from $2,500 /
      mo"). A string, not a number: the qualifier is part of the claim, and
      the component must never format or round a price. */
  price: string;
  summary: string;
  /** Who the package is for — the `.label` line under the summary. */
  for: string;
  includes: readonly string[];
  /** The one package carrying the "Most chosen" mark: it gains the kicker and
      an ink-raised fill, and its CTA steps up from the secondary outline to
      the solid primary. One per grid. */
  featured?: boolean;
}

interface PricingPackageGridProps {
  packages: readonly PricingPackage[];
  /** The caveat under the grid. Defaults to the live /pricing wording, which
      is the sentence that makes the figures legally a guide rather than a
      quote: if the figures ever change, read this line again. */
  fineprint?: ReactNode;
  /** The per-card CTA. The href stays /start-a-project so `StartProjectOverlay`
      intercepts the click and opens the form overlay in place (it matches on
      `a[href="/start-a-project"]`, so pointing this anywhere else silently
      demotes three CTAs to a page load). */
  ctaLabel?: string;
  ctaHref?: string;
  /** The mark on the featured card. */
  featuredLabel?: string;
}

/**
 * THE PRICING PACKAGE GRID — three ruled cards on ink, each a name, a figure,
 * who it is for and what it includes, closing on a per-card CTA. Extracted
 * 2026-08-05 from /pricing, its only consumer.
 *
 * ⚠️ THE FIGURES ARE PLACEHOLDERS. Every price the live page passes in is a
 * guide number invented for the build and is on the pre-launch checklist
 * ("Replace placeholder pricing in src/app/pricing/page.tsx with real
 * figures"). They are DATA, passed by the consumer, and this component never
 * carries a number of its own — so a specimen of it shows whatever it is
 * handed. Do not quote any of it to a client as studio pricing until the
 * checklist item is signed off.
 *
 * The cards are hairline-ruled surfaces on the flat ink ground, hierarchy
 * carried by fill: the featured card raises to `bg-ink-raised` and takes the
 * solid primary pill, the other two stay unfilled with the secondary outline
 * (which must never fill solid on hover, or it impersonates the primary).
 * They round on the SURFACE scale, `rounded-ui` — from the 2026-08-01
 * rounded-brand pass, where these were the last hand-rolled square cards on
 * the site.
 *
 * The dash before each included item is `text-champagne`, which is the
 * sanctioned ornament use of the accent; the item TEXT stays bone-dim,
 * because gold never carries label type.
 *
 * The grid runs a single 80ms `.reveal` ladder left to right, so the three
 * cards arrive as one row rather than three objects.
 */
export default function PricingPackageGrid({
  packages,
  fineprint = "Guide pricing shown to help you plan. Final quotes depend on scope, page count and content readiness, and are confirmed in writing after a discovery call.",
  ctaLabel = "Enquire",
  ctaHref = "/start-a-project",
  featuredLabel = "Most chosen",
}: PricingPackageGridProps) {
  return (
    <section className="relative overflow-hidden grain bg-ink">
      <div className="shell relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {packages.map((p, i) => (
            <div
              key={p.name}
              className={`reveal rounded-ui border p-8 flex flex-col ${
                p.featured ? "rule-dark bg-ink-raised" : "rule-dark"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {p.featured && <p className="overline">{featuredLabel}</p>}
              <h2 className="heading-md text-bone mt-1">{p.name}</h2>
              <p className="stat text-bone mt-4">{p.price}</p>
              <p className="body mt-3 text-bone-dim">{p.summary}</p>
              <p className="label mt-4 text-clay">{p.for}</p>

              {/* flex-1 on the list is what bottom-locks the pills: the cards
                  are flex columns, so the list absorbs the height difference
                  between a six-item and a four-item package and the three
                  CTAs still land on one line. */}
              <ul className="mt-6 space-y-3 flex-1">
                {p.includes.map((item) => (
                  <li key={item} className="body flex gap-3 text-bone-dim">
                    <span className="text-champagne" aria-hidden>
                      —
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <Link
                href={ctaHref}
                className={`btn mt-8 ${p.featured ? "btn-primary-dark" : "btn-secondary-dark"}`}
              >
                {ctaLabel}
                <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>
        {fineprint && <p className="fineprint mt-8 max-w-2xl">{fineprint}</p>}
      </div>
    </section>
  );
}
