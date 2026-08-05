import StageGlyph from "@/components/StageGlyph";

type ProcessStep = { num: string; title: string; body: string };

/* Tailwind scans for literal class strings, so the timeline's column count is
   a lookup rather than an interpolated class (a template literal would be
   purged). Four and five are the counts the disciplines actually use. */
const TIMELINE_COLS: Record<number, string> = {
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
};

/**
 * THE PROCESS TIMELINE — the horizontal run of stages (2026-07-14, client's
 * call), now PER DISCIPLINE. Steps run left→right as nodes on one rule; each
 * <StageGlyph> sits ON the line (an ink mask breaks the rule so it reads as
 * connecting the nodes) and draws itself in, staggered, as the row enters.
 * Stacks to a vertical list below md. The glyph opacity ramps to full across
 * however many steps the discipline has, so the run reads as building.
 *
 * WHY THE STEP COUNT VARIES: this timeline used to live on the combined
 * /services page, where it ran a WEBSITE process ("schema, analytics and
 * redirects") under a heading claiming five stages ran "every time" — and a
 * brand-only engagement never reaches those steps. The 2026-07-24 split moved
 * it to the page that actually runs each process, and the counts differ by
 * design (web 5, SEO 4, brand 4). The component takes whatever it is given.
 *
 * ⚠ Stage marks are the R5 working set of five; a discipline with more than
 * five steps needs new marks before it needs new markup (see
 * docs/briefs/stage-glyphs.md). The column lookup covers 3–5 and falls back
 * to five columns.
 */
export default function ServiceProcessTimeline({
  kicker = "How we work",
  heading,
  lede,
  steps,
}: {
  /** Section label. Defaults to the value every /services/[slug] passes. */
  kicker?: string;
  heading: string;
  lede: string;
  /** Shape-compatible with `ServiceStep` in lib/services.ts. */
  steps: ProcessStep[];
}) {
  return (
    <section className="relative overflow-hidden grain bg-ink">
      <div className="shell relative z-10 py-24 md:py-32">
        <div>
          <p className="overline reveal">{kicker}</p>
          <h2
            className="heading-lg from-overline reveal"
            style={{ transitionDelay: "80ms" }}
          >
            {heading}
          </h2>
          <p
            className="lede body-lg max-w-[52ch] text-bone-dim reveal"
            style={{ transitionDelay: "160ms" }}
          >
            {lede}
          </p>
        </div>
        <div className="relative mt-16 md:mt-24">
          <span
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden border-t rule-dark md:block"
          />
          <ol
            className={`grid grid-cols-1 gap-14 md:gap-8 ${
              TIMELINE_COLS[steps.length] ?? "md:grid-cols-5"
            }`}
          >
            {steps.map((p, i) => (
              <li
                key={p.num}
                className="reveal"
                style={
                  {
                    transitionDelay: `${i * 110}ms`,
                    "--sg-delay": `${i * 110}ms`,
                  } as React.CSSProperties
                }
              >
                <span
                  className="relative inline-flex bg-ink pr-5"
                  style={{
                    opacity:
                      steps.length > 1 ? 0.4 + (i / (steps.length - 1)) * 0.6 : 1,
                  }}
                >
                  <StageGlyph
                    stage={(i + 1) as 1 | 2 | 3 | 4 | 5}
                    className="h-14 w-14 text-champagne"
                  />
                </span>
                <p className="index-num mt-8 text-clay">{p.num}</p>
                <h3 className="heading-sm mt-2 text-bone">{p.title}</h3>
                <p className="body-sm mt-3 text-bone-dim">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
