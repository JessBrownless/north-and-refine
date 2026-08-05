import Link from "next/link";

export interface RuledLinkRow {
  href: string;
  title: string;
  /** One line under the title. Pages shape this themselves (the industries
      index spends the first sentence of the intro on it), so the component
      never truncates or re-punctuates copy. */
  lead: string;
}

interface RuledLinkRowsProps {
  rows: readonly RuledLinkRow[];
  /** The ghost link's label ("Explore", "Read more"). Every row shares it:
      the rows are one index, so one verb. */
  linkLabel: string;
  /** Optional kicker above the rows. Present when the index sits INSIDE a
      page and has to name itself ("The other disciplines"); absent when the
      rows ARE the page's content and the masthead already named them. */
  kicker?: string;
  /** THE ROW'S REGISTER. Two shipped shapes:

      "index" — the rows are the page's own content (/industries): the title
      takes heading-lg, the lead stacks under it inside a 2xl measure, and
      the ghost link sits opposite on a flex row.

      "onward" — a ruled index of somewhere else, dropped into a page that
      has its own subject (/services/[slug]'s sibling disciplines): the title
      steps down to heading-md so it can't outrank the page's own signposts,
      and title / lead / link split a 12-col grid at 5 / 5 / 2.

      Pick by what the rows ARE to the page, not by taste — a list item must
      never outrank its section's head (THE LADDER). */
  layout: "index" | "onward";
  /** Per-row entrance step, ms. 60 is the index tempo; the sibling rows run
      80 because there are only ever two of them. */
  stagger?: number;
  /** Roomier band: py-20 rather than py-16 (both md:py-24). */
  spacious?: boolean;
}

/**
 * THE RULED LINK INDEX — a hairline-ruled stack of whole-row links, each a
 * title, a one-line lead and a ghost arrow, baseline-locked. Shipped twice
 * identically: the /industries index and the "other disciplines" rows at the
 * foot of /services/[slug]. Extracted 2026-08-05.
 *
 * THE ROW IS THE LINK, and the ghost arrow is the visual affordance rather
 * than the target: a tertiary ghost, not a pill, because rows are navigation.
 * Its champagne-arrow hover and the title's opacity dim both read through the
 * one group hover, so the whole row responds as a single object.
 *
 * Titles are baseline-locked to their lead and link (BASELINES LOCK) — never
 * box-aligned, never nudged with pt-*.
 *
 * THE DISPLAY-TIER SIBLING is `ServicesShowcase`: the same grammar (ruled
 * whole-row links, ghost "Read more", last-baseline lock) at `.display` scale
 * with NO lead line, because there the titles are statement typography and
 * the leads were cut for it (2026-07-09, "everything should earn its place").
 * Deliberately NOT folded in here: it is one register up and one element
 * short, and collapsing them would put a homepage statement row and an
 * interior navigation row on the same switch.
 */
export default function RuledLinkRows({
  rows,
  linkLabel,
  kicker,
  layout,
  stagger = 60,
  spacious = false,
}: RuledLinkRowsProps) {
  const onward = layout === "onward";

  return (
    <section className="relative overflow-hidden grain bg-ink">
      <div
        className={`shell relative z-10 ${
          spacious ? "py-20 md:py-24" : "py-16 md:py-24"
        }`}
      >
        {kicker && <p className="overline reveal">{kicker}</p>}
        {/* The ruling arrives differently either side but reads the same: a
            rule above the first row, between every pair, and below the last.
            "onward" hangs it off the container top + each row's foot;
            "index" divides the stack and closes it with border-y. */}
        <div
          className={`${kicker ? "mt-10 " : ""}${
            onward
              ? "border-t rule-dark"
              : "divide-y rule-dark border-y rule-dark"
          }`}
        >
          {rows.map((row, i) => (
            <Link
              key={row.href}
              href={row.href}
              className={
                onward
                  ? "group grid grid-cols-1 items-baseline gap-y-3 border-b rule-dark py-8 reveal md:grid-cols-12 md:gap-8 md:py-10"
                  : "group flex flex-col md:flex-row md:items-baseline justify-between gap-4 py-8 reveal rule-dark"
              }
              style={{ transitionDelay: `${i * stagger}ms` }}
            >
              {onward ? (
                <>
                  <h2 className="heading-md text-bone transition-opacity group-hover:opacity-70 md:col-span-5">
                    {row.title}
                  </h2>
                  <p className="body text-bone-dim md:col-span-5">{row.lead}</p>
                </>
              ) : (
                <div className="max-w-2xl">
                  <h2 className="heading-lg text-bone transition-opacity group-hover:opacity-70">
                    {row.title}
                  </h2>
                  <p className="body mt-2 text-bone-dim">{row.lead}</p>
                </div>
              )}
              <span
                className={
                  onward
                    ? "btn-ghost text-bone md:col-span-2 md:justify-self-end"
                    : "btn-ghost text-bone shrink-0"
                }
              >
                {linkLabel} <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
