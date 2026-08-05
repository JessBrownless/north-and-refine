import LedgerRow from "@/components/LedgerRow";
import { SITE } from "@/lib/site";

export interface StudioFact {
  /** Left of the rule: the tracked-caps kicker naming the fact. */
  label: string;
  /** Right of the rule, locked to the label's FIRST baseline. */
  value: string;
  /** Present when the value is a destination. A row WITH an href is a
      target, so it sits at full bone and turns champagne on hover; a row
      WITHOUT one is meta, so it dims to bone-dim. The tone follows from
      what the row is, which is why it isn't a prop. */
  href?: string;
}

/* The studio's own details, read from SITE so the ledger can never drift
   from the schema, the footer and the metadata. */
const STUDIO_FACTS: readonly StudioFact[] = [
  { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { label: "Instagram", value: "@northandrefine", href: SITE.sameAs[0] },
  { label: "Where we work", value: SITE.areaServed.join(" · ") },
];

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
          <p className="overline text-clay">{fact.label}</p>
          {fact.href ? (
            /* Off-site links open away; a mailto hands off to the mail
               client, which has nowhere to open. */
            <a
              href={fact.href}
              {...(fact.href.startsWith("http")
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              className="body text-bone transition-colors hover:text-champagne"
            >
              {fact.value}
            </a>
          ) : (
            <p className="body text-bone-dim">{fact.value}</p>
          )}
        </LedgerRow>
      ))}
    </div>
  );
}
