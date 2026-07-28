import Link from "next/link";

type MethodItem = { title: string; body: string };

/**
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
export default function MethodSection({ method }: { method: MethodItem[] }) {
  return (
    <section className="relative overflow-hidden grain-light bg-bone text-ink">
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

        {/* BAND 2 — the beats as full-rail ledger rows. Mobile keeps the
            index-beside-text shape; md splits into index · title · body so
            both columns hold a comfortable measure. */}
        <div className="mt-16 md:mt-24">
          {method.map((m, i) => (
            <div
              key={m.title}
              className="grid grid-cols-[3rem_1fr] items-baseline gap-x-5 gap-y-3 border-t rule-light py-8 reveal md:grid-cols-[3.5rem_1fr_1fr] md:gap-x-8 md:gap-y-0 md:py-10"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* text-ink-mute, not clay: the on-LIGHT ladder — clay is
                  sub-AA on bone and only the kicker keeps it there. */}
              <p className="index-num text-ink-mute">0{i + 1}</p>
              <h3 className="heading-md">{m.title}</h3>
              <p className="body text-ink-dim col-start-2 md:col-start-3">{m.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
