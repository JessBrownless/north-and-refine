import Link from "next/link";
import type { ReactNode } from "react";

/**
 * THE COLLECTION HEAD — a kicker, a part title and the onward ghost link that
 * opens a collection on the homepage ("Practices we've refined" / All work;
 * "Notes from the studio" / All entries). Shipped twice, verbatim, in one
 * file until it was extracted 2026-08-05.
 *
 * REGISTER: `.heading-part` (32→62px, the rung added 2026-07-10). The
 * collection heads were promoted off `.heading-lg` because they were too small
 * beside their neighbouring beats and TIED to the card titles below them: a
 * signpost must never tie its own items. Part titles introduce a collection,
 * one register below a MOMENT.
 *
 * The link locks to the heading's LAST baseline (BASELINES LOCK): the heading
 * closes its block, so the link sits on its bottom line. `items-end` is
 * declared first as the old-browser fallback for `[align-items:last_baseline]`.
 * Never box-align this row, and never nudge it with pt-*.
 *
 * `title` takes a node so a head can carry the italic accent-word device
 * (one word per statement); the kicker and the link label are plain strings.
 *
 * `tone` (2026-08-09, born when Selected work and Blog rail went light):
 * the heading itself needs no override — `.heading-part` carries no colour
 * class, so it already inherits whichever ink the section sets — but the
 * `.overline` kicker is BONE BY DEFAULT (the sitewide rule) and the ghost
 * link hardcodes `text-bone`, so both need the on-light swap explicitly.
 * The kicker takes `text-clay` on light, not `text-ink-mute`: this IS the
 * section's own kicker (the sanctioned clay-on-light exception), not
 * running meta.
 */
export default function CollectionHeader({
  kicker,
  title,
  linkHref,
  linkLabel,
  tone = "dark",
}: {
  kicker: string;
  title: ReactNode;
  linkHref: string;
  linkLabel: string;
  tone?: "dark" | "light";
}) {
  const light = tone === "light";
  return (
    <div className="flex flex-wrap items-end [align-items:last_baseline] justify-between gap-6">
      <div>
        <p className={`overline reveal${light ? " text-clay" : ""}`}>{kicker}</p>
        <h2 className="heading-part from-overline reveal" style={{ transitionDelay: "80ms" }}>
          {title}
        </h2>
      </div>
      <Link href={linkHref} className={`btn-ghost reveal ${light ? "text-ink" : "text-bone"}`}>
        {/* The trailing space rides INSIDE the interpolation: as two adjacent
            children ({linkLabel} then a literal space) React has to separate
            them with a hydration comment, and the extracted markup would stop
            being byte-identical to what the page shipped. */}
        {`${linkLabel} `}
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
