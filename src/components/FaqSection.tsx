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
}

/**
 * The split FAQ band — componentised from the /about layout (client's call,
 * 2026-07-12: "for the FAQ follow the about page layout - it should be
 * componentised"). Head and a secondary action in the left rail, the ruled
 * accordion right. The kicker is hoisted above the locked grid so the
 * HEADING leads its block and md:items-baseline locks the first question's
 * line to the H2's baseline (BASELINES LOCK). Summaries sit at heading-sm,
 * one register below the section head, per the ladder. Ruled top boundary —
 * the band edge.
 *
 * SCHEMA IS NOT EMITTED HERE: pages pass the same faqs array to
 * faqSchema() via <JsonLd> themselves, so the rendered text and the
 * FAQPage schema stay one source with the page owning its structured data
 * (schema builders never render from components).
 */
export default function FaqSection({ kicker, heading, faqs, cta }: FaqSectionProps) {
  return (
    <section className="border-t rule-dark bg-ink">
      <div className="shell py-24 md:py-32">
        <p className="overline mb-8 reveal md:mb-10">{kicker}</p>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-baseline md:gap-8">
          <div className="md:col-span-4">
            <h2 className="heading-lg text-bone reveal" style={{ transitionDelay: "80ms" }}>
              {heading}
            </h2>
            {cta && (
              <div className="mt-10 reveal" style={{ transitionDelay: "160ms" }}>
                <Link href={cta.href} className="btn btn-secondary-dark">
                  {cta.label}
                </Link>
              </div>
            )}
          </div>
          <div
            className="border-y rule-dark divide-y reveal md:col-span-7 md:col-start-6"
            style={{ transitionDelay: "120ms" }}
          >
            {faqs.map((f) => (
              <details key={f.question} className="group py-6 rule-dark">
                <summary className="flex items-baseline justify-between gap-6 cursor-pointer list-none">
                  <span className="heading-sm text-bone">{f.question}</span>
                  <span
                    className="text-champagne text-2xl leading-none transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="body mt-4 text-bone-dim">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
