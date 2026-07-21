import Link from "next/link";

type MethodItem = { title: string; body: string };

/**
 * "How we think" method section (2026-07-16, client test): IMAGE on the left,
 * all the text — the intro AND the numbered method list — on the right. Built
 * tone-aware and rendered TWICE on /about ("light" bone ground, "dark" ink
 * ground, otherwise identical) so the client can compare the two grounds.
 *
 * Image: /services-hero-square.png (1200×1200) — shown 1:1 uncropped. (The
 * `alt` is empty/decorative for now; give it a description if the image
 * carries meaning the heading + copy don't.)
 */
export default function MethodSection({
  tone,
  method,
}: {
  tone: "light" | "dark";
  method: MethodItem[];
}) {
  const dark = tone === "dark";
  const sectionCls = dark ? "bg-ink text-bone" : "bg-bone text-ink";
  const rule = dark ? "rule-dark" : "rule-light";
  const dim = dark ? "text-bone-dim" : "text-ink-dim";
  const linkColor = dark ? "text-bone" : "text-ink";

  return (
    <section className={sectionCls}>
      <div className="shell py-20 md:py-32">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:items-start md:gap-8">
          {/* IMAGE — left (services-hero-square.png, shown 1:1) */}
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

          {/* TEXT — right: the intro, then the numbered method list */}
          <div className="md:col-span-6 md:col-start-7">
            <p className="overline text-clay reveal">How we think</p>
            <h2
              className="heading-lg from-overline reveal"
              style={{ transitionDelay: "80ms" }}
            >
              The method, in brief.
            </h2>
            <p className={`lede body ${dim} reveal`} style={{ transitionDelay: "160ms" }}>
              The same principles run through the brand, the build, and the way we
              choose who we work with.
            </p>
            <div className="mt-10 reveal" style={{ transitionDelay: "240ms" }}>
              <Link href="/services" className={`btn-ghost ${linkColor}`}>
                The full process <span aria-hidden>→</span>
              </Link>
            </div>

            <div className="mt-14 md:mt-16">
              {method.map((m, i) => (
                <div
                  key={m.title}
                  className={`grid grid-cols-[3rem_1fr] items-baseline gap-x-5 border-t ${rule} py-8 reveal md:grid-cols-[3.5rem_1fr] md:gap-x-7 md:py-10`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <p className="index-num text-clay">0{i + 1}</p>
                  <div>
                    <h3 className="heading-md">{m.title}</h3>
                    <p className={`body mt-3 ${dim}`}>{m.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
