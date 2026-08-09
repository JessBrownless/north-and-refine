import LedgerRow from "@/components/LedgerRow";
import ContactIcon, { type ContactChannel } from "@/components/ContactIcon";
import { SITE } from "@/lib/site";

export interface StudioFact {
  /** The value's own text, locked to the label's FIRST baseline. */
  value: string;
  /** Present when the value is a destination. A row WITH an href is a
      target, so it sits at full bone and turns champagne on hover; a row
      WITHOUT one is meta, so it dims to bone-dim. The tone follows from
      what the row is, which is why it isn't a prop. */
  href?: string;
  /** The channel's mark, drawn before the value. Every row has one now that
      the label column is gone (2026-08-09, second pass). */
  icon: ContactChannel;
  /** ⚠ NOT RENDERED — it is the row's ACCESSIBLE NAME. With the visible
      label column gone, this is the only thing telling a screen reader which
      channel the glyph belongs to. Never drop it to "tidy up the type". */
  label: string;
}

/* The studio's own details, read from SITE so the ledger can never drift
   from the schema, the footer and the metadata. */
const STUDIO_FACTS: readonly StudioFact[] = [
  {
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    icon: "email",
  },
  {
    label: "Instagram",
    value: "@northandrefine",
    href: SITE.sameAs[0],
    icon: "instagram",
  },
  {
    label: "LinkedIn",
    value: "North & Refine",
    href: SITE.sameAs[1],
    icon: "linkedin",
  },
];

/* ⚠ "WHERE WE WORK" WAS REMOVED 2026-08-09 (client: "remove Where we work,
   we don't need that"). It listed SITE.areaServed, and that field is NOT
   orphaned by this — it still drives `areaServed` on both the Organization
   and the Service schema in lib/schema.ts, so the jurisdictions are still
   declared to a crawler; they just stopped being a row a reader had to
   scan on the way to the form. Do not "tidy up" areaServed on the strength
   of this row's absence.

   LINKEDIN JOINED IN THE SAME CHANGE, and it is not a new claim: the footer
   has always mapped over the whole of SITE.sameAs, so the profile was
   already linked in public. The ledger had simply been showing sameAs[0]
   only. */

/**
 * THE STUDIO FACTS RAIL — /contact's details as RULED LEDGER ROWS: hairline,
 * label left, value locked to its baseline. It arrived 2026-07-31 when the
 * client called the old editorial phone plate off ("doesn't go well anymore")
 * and the page was restaged in the /services row grammar. Extracted 2026-08-05.
 *
 * THIS IS THE DESIGN SYSTEM'S "LedgerRow" MOLECULE, made real. /stylesheet's
 * Molecules tier documented the pattern by HAND-COPYING this markup into a
 * Stage, which is the drift the component tier exists to end: the specimen
 * can now import the rail itself, so the canon and the live page cannot say
 * different things.
 *
 * The rows themselves are `<LedgerRow layout="split">` (2026-08-05), shared
 * with /about's method beats. The rule IS the row, so it carries no
 * background, no radius and no padding beyond its vertical rhythm; the two
 * sides lock on a FIRST baseline (BASELINES LOCK), because the label leads
 * its block, so the value sits on the label's own line, never on a box edge
 * and never nudged with pt-*. Both of those now live in the molecule and
 * cannot be turned off here.
 *
 * ⚠ ICON-LED SINCE 2026-08-09 (client, with a Relume contact1 reference:
 * "let's try something a bit more like this"). Its details list is a glyph
 * and a value on ONE line with no label column, so the tracked-caps label
 * cell went and the mark took its place. The values carry themselves — an
 * email address looks like an email address and @northandrefine looks like a
 * handle — which is exactly why the reference can drop the labels.
 *
 * IT IS STILL `LedgerRow layout="split"`, WITH ONE CELL. That is not a
 * workaround: `split` is `justify-between`, and a single child under
 * justify-between simply sits at the start, so a left-flowing row falls out
 * of the shape already shipped. No third layout was added, the molecule's
 * hairline and its py-5 rhythm are untouched, and the baseline-lock contract
 * is not strained either — the icon rides INSIDE the one cell, so the row
 * never has to align a glyph against type.
 *
 * THE CONTAINER'S border-t STAYS HERE, and has to: each row closes itself
 * with a border-b, so the rail needs one hairline of its own to open with.
 * The container is the LEDGER; the molecule is the row.
 */
export default function StudioFactsLedger({
  facts = STUDIO_FACTS,
  stagger = 80,
}: {
  /** Defaults to the studio's own details. A consumer may pass its own
      rows; the shape, not the content, is what repeats. */
  facts?: readonly StudioFact[];
  /** Per-row entrance step, ms. The first row carries no delay at all, so
      the rail starts the moment it enters. */
  stagger?: number;
}) {
  return (
    <div className="border-t rule-dark">
      {facts.map((fact, i) => (
        <LedgerRow
          key={fact.label}
          layout="split"
          delay={i ? i * stagger : undefined}
        >
          {fact.href ? (
            /* Off-site links open away; a mailto hands off to the mail
               client, which has nowhere to open. */
            <a
              href={fact.href}
              {...(fact.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              /* inline-flex so the mark rides the value's own line and
                 inherits its colour through currentColor — the hover turns
                 glyph and handle champagne together, with no second rule. */
              aria-label={`${fact.label}: ${fact.value}`}
              className="body inline-flex items-center gap-3 text-bone transition-colors hover:text-champagne"
            >
              <ContactIcon name={fact.icon} />
              {fact.value}
            </a>
          ) : (
            <p className="body inline-flex items-center gap-3 text-bone-dim">
              <ContactIcon name={fact.icon} />
              {fact.value}
            </p>
          )}
        </LedgerRow>
      ))}
    </div>
  );
}
