import type { Metadata } from "next";
import Link from "next/link";
import PhoneMockup from "@/components/PhoneMockup";

// Design exploration — not a public page.
export const metadata: Metadata = {
  title: "Mockup — Obsidian",
  robots: { index: false, follow: false },
};

const PHONES = [
  { name: "Dr Elena Marsh", specialty: "Oculoplastics" },
  { name: "Vire Aesthetics", specialty: "Medical aesthetics" },
  { name: "Dr Tom Ashworth", specialty: "Rhinoplasty" },
  { name: "Halcyon Skin", specialty: "Dermatology" },
  { name: "Dr Mia Chen", specialty: "Facial surgery" },
];

export default function ObsidianMockup() {
  return (
    <main className="bg-ink text-bone">
      {/* ── Hero — centred on a champagne-lit ink scene ────────────────── */}
      <section className="scene-ink grain relative overflow-hidden">
        <div className="shell relative z-10 pt-40 pb-12 md:pt-52 md:pb-16 text-center">
          <p className="overline reveal">Design studio for private clinics</p>
          <h1
            className="display from-overline mx-auto max-w-4xl reveal"
            style={{ transitionDelay: "80ms" }}
          >
            Quiet luxury for serious medicine
          </h1>
          <p
            className="lede body-lg mx-auto text-bone-dim reveal"
            style={{ transitionDelay: "160ms" }}
          >
            Brands and search-led websites for cosmetic surgeons and aesthetic clinics —
            engineered like software, finished like a flagship store.
          </p>
          <div
            className="mt-10 flex flex-wrap justify-center gap-4 reveal"
            style={{ transitionDelay: "240ms" }}
          >
            <Link href="/contact" className="btn btn-primary-dark">
              Start a project
              <span aria-hidden>→</span>
            </Link>
            <Link href="/work" className="btn btn-secondary-dark">
              See the work
            </Link>
          </div>
        </div>

        {/* ── Device marquee — phones glowing out of the dark ────────────── */}
        <div className="relative z-10 overflow-hidden pb-24 pt-10">
          <div className="flex w-max items-start gap-10 animate-marquee">
            {[...PHONES, ...PHONES].map((p, i) => (
              <PhoneMockup
                key={i}
                {...p}
                screen={i % 3 === 0 ? "ink" : "editorial"}
                className={i % 2 === 1 ? "translate-y-10" : ""}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Manifesto ──────────────────────────────────────────────────── */}
      <section className="border-t rule-dark">
        <div className="shell py-20 md:py-28">
          <p className="overline reveal">Considered</p>
          <p className="statement from-overline max-w-4xl reveal" style={{ transitionDelay: "80ms" }}>
            After years of watching brilliant clinics undersold by template websites, we built a
            studio that treats a practice&rsquo;s digital presence with the same care as the
            medicine itself.
          </p>
        </div>
      </section>

      {/* ── Split feature — glass card device + copy ───────────────────── */}
      <section>
        <div className="shell pb-20 md:pb-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center">
            <div className="md:col-span-5 reveal">
              <div className="card-glass scene-ink flex justify-center px-8 py-14">
                <PhoneMockup name="Dr Elena Marsh" specialty="Oculoplastics" />
              </div>
            </div>
            <div className="md:col-span-7 reveal" style={{ transitionDelay: "120ms" }}>
              <h2 className="heading-xl max-w-xl">
                Exclusively serving private medical clinics
              </h2>
              <p className="lede body-lg text-bone-dim">
                We build brands that speak directly to patient confidence. Precise, deliberate,
                and never louder than they need to be.
              </p>
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="border-t rule-dark pt-5">
                  <h3 className="heading-sm">Our approach</h3>
                  <p className="body mt-2 text-bone-dim">
                    Strategic design that connects clinical expertise with patient trust and
                    visual clarity.
                  </p>
                </div>
                <div className="border-t rule-dark pt-5">
                  <h3 className="heading-sm">Our promise</h3>
                  <p className="body mt-2 text-bone-dim">
                    Work measured by the patients it brings, not just the awards it could win.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bento — glass + one bone interruption ────────────────── */}
      <section className="border-t rule-dark">
        <div className="shell py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <h2 className="heading-xl md:col-span-6 reveal">
              Results that speak quietly
            </h2>
            <p className="body-lg text-bone-dim md:col-span-5 md:col-start-8 reveal" style={{ transitionDelay: "80ms" }}>
              Measurable growth in patient enquiries and brand recognition — outcomes that
              matter to a practice, delivered without noise.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-glass p-8 reveal">
              <p className="stat text-bone">87%</p>
              <p className="heading-sm mt-6">Patient enquiry increase</p>
              <p className="label mt-2 text-bone-dim">
                Average growth within the first year of partnership
              </p>
            </div>
            <div className="card-glass scene-ink flex justify-center px-6 py-10 reveal" style={{ transitionDelay: "80ms" }}>
              <PhoneMockup name="Vire Aesthetics" specialty="Medical aesthetics" size="sm" />
            </div>
            <div className="card-soft bg-bone p-8 text-ink reveal" style={{ transitionDelay: "160ms" }}>
              <p className="stat">156%</p>
              <p className="heading-sm mt-6">Website conversion lift</p>
              <p className="label mt-2 text-ink/60">
                Clinics report stronger patient confidence metrics
              </p>
            </div>
            <div className="card-glass scene-ink flex justify-center px-6 py-10 reveal">
              <PhoneMockup name="Dr Tom Ashworth" specialty="Rhinoplasty" size="sm" screen="ink" />
            </div>
            <div className="card-glass p-8 reveal" style={{ transitionDelay: "80ms" }}>
              <p className="stat text-bone">10+</p>
              <p className="heading-sm mt-6">Years in medical aesthetics</p>
              <p className="label mt-2 text-bone-dim">
                Deep understanding of cosmetic surgery practice needs
              </p>
            </div>
            <div className="card-glass p-8 flex flex-col justify-between reveal" style={{ transitionDelay: "160ms" }}>
              <p className="blockquote">
                &ldquo;The first agency that actually understood our world.&rdquo;
              </p>
              <p className="label mt-6 text-bone-dim">Practice principal, Sydney</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Ghost marquee ──────────────────────────────────────────────── */}
      <section className="overflow-hidden border-t rule-dark py-10 md:py-16">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((i) => (
            <span key={i} className="display-mega text-ghost-on-dark pr-16">
              Clinics deserve designers who understand their world&nbsp;—&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* ── CTA band — bone interruption for contrast ──────────────────── */}
      <section className="bg-bone text-ink">
        <div className="shell py-20 md:py-32">
          <p className="overline text-clay reveal">Start a project</p>
          <h2 className="heading-xl from-overline max-w-3xl reveal" style={{ transitionDelay: "80ms" }}>
            Elevate your clinic online.
          </h2>
          <div className="mt-10 flex flex-wrap gap-4 reveal" style={{ transitionDelay: "160ms" }}>
            <Link href="/contact" className="btn btn-primary-light">
              Schedule a call
              <span aria-hidden>→</span>
            </Link>
            <Link href="/pricing" className="btn btn-secondary-light">
              See packages
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
