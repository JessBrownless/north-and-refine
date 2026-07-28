import Link from "next/link";

interface FaqSectionProps {
  /** Kicker above the heading (hoisted above the locked grid). */
  kicker: string;
  /** Section heading — heading-lg, the signpost register. */
  heading: string;
  faqs: { question: string; answer: string }[];
  /** Optional secondary action under the heading (outline tier — never a
      second flagship; the close band owns the foot CTA). */
  cta?: { label: string; href: string };
  /** Ground. "cream" (default) = the deeper-ivory FAQ stock, for pages with
      a light middle act (/about, /pricing, the detail + industry pages).
      "dark" = flat ink, for pages that run dark from hero to close
      (2026-07-24, client on /services: the light bands "don't feel like they
      belong" — a cream FAQ + cream close is a double-light tail on a page
      with no light middle, so the FAQ goes ink and the page keeps ONE light
      moment, the close, exactly the homepage's arc). Same layout either way;
      only the ground and the type ladder swap. */
  tone?: "cream" | "dark";
}

/**
 * The split FAQ band — componentised from the /about layout (client's call,
 * 2026-07-12: "for the FAQ follow the about page layout - it should be
 * componentised"). Head and a secondary action in the left rail, the ruled
 * accordion right. The kicker is hoisted above the locked grid so the
 * HEADING leads its block and md:items-baseline locks the first question's
 * line to the H2's baseline (BASELINES LOCK). Summaries sit at heading-sm,
 * one register below the section head, per the ladder.
 *
 * GROUND: tone-aware since 2026-07-24 (see the `tone` prop note). The cream
 * path is THE DEEPER IVORY (.scene-cream-deep — one step below the close's
 * .scene-cream so the FAQ owns its band and the close still LIFTS to finish
 * the page; ink headings, `text-ink-dim` answers and kicker — ink-mute is
 * sub-AA on the deep cream, clay is sub-AA on all light grounds). No top
 * rule on cream: the ground change is the boundary, and a hairline into the
 * cream close would cut the two apart. The dark path is flat ink WITH the
 * top hairline (dark-on-dark needs the rule to mark the section) and the
 * on-ink ladder (bone/bone-dim), champagne + glyphs, the dark outline
 * button. Both grounds carry their grain — the one-material rule.
 *
 * THE ONE FAQ IN THE SYSTEM (2026-07-24, client: "make ALL FAQs the same
 * styling across the site — we want to work in components"). Every FAQ on the
 * site renders through here: /about, /services, /services/[slug], /pricing and
 * /industries/[slug]. Bespoke `<details>` blocks are a drift pattern — extend
 * this component (as `tone` does) instead of forking it.
 *
 * SCHEMA IS NOT EMITTED HERE: pages pass the same faqs array to
 * faqSchema() via <JsonLd> themselves, so the rendered text and the
 * FAQPage schema stay one source with the page owning its structured data
 * (schema builders never render from components).
 */
export default function FaqSection({
  kicker,
  heading,
  faqs,
  cta,
  tone = "cream",
}: FaqSectionProps) {
  const dark = tone === "dark";
  const sectionCls = dark
    ? "relative overflow-hidden grain border-t rule-dark bg-ink text-bone"
    : "scene-cream-deep relative overflow-hidden grain-light text-ink";
  const rule = dark ? "rule-dark" : "rule-light";
  const kickerColor = dark ? "" : " text-ink-dim";
  const answerColor = dark ? "text-bone-dim" : "text-ink-dim";
  const button = dark ? "btn-secondary-dark" : "btn-secondary-light";

  return (
    <section className={sectionCls}>
      <div className="shell relative z-10 py-24 md:py-32">
        {/* Cream kicker is ink-DIM, not ink-mute: on the deeper cream
            ink-mute measures 3.85:1 (sub-AA); ink-dim is 5.43:1 and matches
            the ContactCTA close's kicker. Dark kicker is bone per canon. */}
        <p className={`overline${kickerColor} mb-8 reveal md:mb-10`}>{kicker}</p>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-baseline md:gap-8">
          <div className="md:col-span-4">
            <h2 className="heading-lg reveal" style={{ transitionDelay: "80ms" }}>
              {heading}
            </h2>
            {cta && (
              <div className="mt-10 reveal" style={{ transitionDelay: "160ms" }}>
                <Link href={cta.href} className={`btn ${button}`}>
                  {cta.label}
                </Link>
              </div>
            )}
          </div>
          <div
            className={`border-y ${rule} divide-y reveal md:col-span-7 md:col-start-6`}
            style={{ transitionDelay: "120ms" }}
          >
            {faqs.map((f) => (
              <details key={f.question} className={`group py-6 ${rule}`}>
                <summary className="flex items-baseline justify-between gap-6 cursor-pointer list-none">
                  <span className="heading-sm">{f.question}</span>
                  <span
                    className="text-champagne text-2xl leading-none transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className={`body mt-4 ${answerColor}`}>{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
