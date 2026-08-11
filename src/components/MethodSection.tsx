import Link from "next/link";

import LedgerRow from "@/components/LedgerRow";

type MethodItem = { title: string; body: string };

/* THE /about COPY, preserved with the parked component (2026-08-11 night).
   These are the client-approved beats that ran on the live page from
   2026-07-11 to 2026-08-11 — real copy, not specimen filler. They are the
   prop's DEFAULT so a revival gets the real words back with the component,
   and so parking the band never deletes approved writing from the codebase. */
export const ABOUT_METHOD: MethodItem[] = [
  {
    title: "Understand the practice.",
    body: "Every engagement starts in the consulting room, not the moodboard: who the practice serves, what patients ask, what the practitioner wants to be known for. The brand and the website are answers; the practice is the question.",
  },
  {
    title: "Design with restraint.",
    body: "In this field, taste signals competence. We make fewer, better decisions: considered type, honest photography, copy that reassures rather than sells. That is what a discerning patient responds to.",
  },
  {
    title: "Measure and refine.",
    body: "Launch is the midpoint, not the finish. We watch how patients actually find and use the work, from search to enquiries to the pages that earn attention, and keep refining until the site serves the practice as well as the practice serves its patients.",
  },
];

/**
 * ⚠ PARKED 2026-08-11 NIGHT — NO LIVE CONSUMER (client: "this whole section
 * needs to leave the about page and go to unused components"). The section's
 * own onward link was the argument: "The full process →" points at /services
 * because the real per-discipline processes moved there on 2026-07-24, so
 * what ran here was a summary of something one click away. It renders on
 * /stylesheet live from this file — parking is not deletion — and the /about
 * copy survives above as the prop's default.
 *
 * ⚠ CONSEQUENCE RECORDED AT THE PAGE: this was /about's ONE light act, so the
 * page's arc changed with the cut — see about/page.tsx.
 *
 * "How we think" — the /about method band, on BONE (the page's one light act).
 *
 * GROUND SETTLED 2026-07-24: this was built tone-aware and rendered TWICE on
 * /about (bone then ink, otherwise identical) as a 2026-07-16 comparison test
 * that never got called. The client picked BONE and the ink copy was deleted,
 * so the `tone` prop went with it — one ground, no dead branch. (The dark
 * variant is recoverable from git if the page ever flips.)
 *
 * LAYOUT (2026-07-24, same pass): TWO BANDS, because the old single-row shape
 * ran the intro AND the numbered list down the right of a square image — the
 * text finished ~460px below the image foot, leaving the dead left column the
 * client called out. Now:
 *   1. Image left (5 cols) + intro right (6 cols) — the intro is SHORTER than
 *      the image by design and sits CENTRED against it, so neither column
 *      runs past the other.
 *   2. The numbered beats below as FULL-RAIL LEDGER ROWS — index · title ·
 *      body, the ruled-row grammar canon uses elsewhere. Nothing sits beside
 *      the image, so nothing can outrun it.
 *
 * Image: /services-hero-square.png (1200×1200) shown 1:1. ⚠ It depicts a MOCK
 * practice ("Lumen") and is bound for a Claude Design replacement — see the
 * pre-launch checklist. Decorative until then, so `alt` stays empty.
 */
export default function MethodSection({
  method = ABOUT_METHOD,
  ground,
  actSelf = false,
}: {
  method?: MethodItem[];
  /** THE GROUND-THEME TRIGGER (2026-08-11 evening): declaring a ground counts
      this band for GroundTheme's midpoint sampling and lets the page's one
      body colour stand in for its own paint. ⚠ /about passes actSelf WITH it:
      this band's padding lives on the INNER shell (py-20 md:py-32), which the
      act rule's section-level override cannot reach — participating in act
      padding would DOUBLE it. Theme yes, re-pacing no. */
  ground?: "bone";
  actSelf?: boolean;
}) {
  return (
    <section
      {...(ground ? { "data-ground": ground } : {})}
      {...(actSelf ? { "data-act-self": "" } : {})}
      className="relative overflow-hidden grain-light bg-bone text-ink"
    >
      <div className="shell relative z-10 py-20 md:py-32">
        {/* BAND 1 — image + intro, the intro CENTRED against the image (the
            same grammar PageHero's graphic slot uses for a short text stack
            beside a tall media node). Stretching it instead and parking the
            link on the image's foot left a ~380px void mid-column. */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-center md:gap-8">
          <div className="md:col-span-5">
            <div className="frame aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/services-hero-square.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <p className="overline text-clay reveal">How we think</p>
            <h2
              className="heading-lg from-overline reveal"
              style={{ transitionDelay: "80ms" }}
            >
              The method, in brief.
            </h2>
            <p className="lede body text-ink-dim reveal" style={{ transitionDelay: "160ms" }}>
              The same principles run through the build, the brand, and the way we
              choose who we work with.
            </p>
            <div className="mt-10 reveal" style={{ transitionDelay: "240ms" }}>
              <Link href="/services" className="btn-ghost text-ink">
                The full process <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* BAND 2 — the beats as full-rail ledger rows: `<LedgerRow
            layout="indexed">` since 2026-08-05, the molecule this band shares
            with /contact's facts rail. Mobile keeps the index-beside-text
            shape; md splits into index · title · body so both columns hold a
            comfortable measure. tone="light" selects the hairline only —
            rule-light on bone — and rule="top" opens each row, so the stack's
            foot runs into the section's own padding rather than closing on a
            line. The cells' tints stay here, where the copy is. */}
        <div className="mt-16 md:mt-24">
          {method.map((m, i) => (
            <LedgerRow
              key={m.title}
              layout="indexed"
              tone="light"
              rule="top"
              delay={i * 60}
            >
              {/* text-ink-mute, not clay: the on-LIGHT ladder — clay is
                  sub-AA on bone and only the kicker keeps it there. */}
              <p className="index-num text-ink-mute">0{i + 1}</p>
              <h3 className="heading-md">{m.title}</h3>
              <p className="body text-ink-dim col-start-2 md:col-start-3">{m.body}</p>
            </LedgerRow>
          ))}
        </div>
      </div>
    </section>
  );
}
