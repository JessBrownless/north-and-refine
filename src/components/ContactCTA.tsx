import Link from "next/link";
import TypewriterWord from "@/components/TypewriterWord";

// The default heading's rotating last word — all the things a practice
// needs its patients to do. Grammar: "…something your patients ___."
const PATIENT_VERBS = ["trust", "book through", "remember", "recommend", "return to"];

interface ContactCTAProps {
  /** Override the default heading (plain text — no typewriter). */
  heading?: string;
  /** Override the default supporting line. */
  body?: string;
}

/**
 * Standard "start a project" CTA band. Light (bone) section for contrast
 * against the dark page base. Drop at the foot of most pages — don't hand-roll
 * a parallel CTA block.
 */
export default function ContactCTA({
  heading,
  body = "Tell us about your practice and where you want it to be. We take on a limited number of projects at a time, so the right fit matters.",
}: ContactCTAProps) {
  return (
    <section data-nav-light className="scene-warm relative overflow-hidden text-ink">
      {/* Imagery spaces — a floating collage on the right (one medium, one
          small, a tiny mark: placeholder slots until real photography lands).
          Desktop only, decorative. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] md:block">
        <div className="absolute right-[16%] top-[14%] w-48 rotate-3 animate-float-slow reveal lg:w-56">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border rule-light bg-bone shadow-[0_32px_64px_-32px_rgba(12,12,13,0.35)]">
            <span className="portrait-fill absolute inset-0" />
            <span className="overline absolute bottom-4 left-4 text-ink/45">Imagery slot</span>
          </div>
        </div>
        <div
          className="absolute bottom-[16%] right-[42%] w-32 -rotate-6 animate-float-slower reveal lg:w-36"
          style={{ transitionDelay: "160ms" }}
        >
          <div className="relative aspect-square overflow-hidden rounded-lg border rule-light bg-bone shadow-[0_24px_48px_-24px_rgba(12,12,13,0.3)]">
            <span className="portrait-fill absolute inset-0" />
          </div>
        </div>
        <span className="absolute right-[38%] top-[10%] text-lg text-champagne reveal" style={{ transitionDelay: "240ms" }}>
          ✦
        </span>
        {/* Third piece — a small PHONE-shaped mockup slot */}
        <div
          className="absolute right-[5%] top-[42%] w-20 rotate-[8deg] animate-float-slow reveal lg:w-24"
          style={{ transitionDelay: "320ms" }}
        >
          <div className="relative aspect-[0.5] overflow-hidden rounded-[1.4rem] border rule-light bg-bone shadow-[0_28px_56px_-28px_rgba(12,12,13,0.35)]">
            <span className="portrait-fill absolute inset-0" />
            {/* speaker notch */}
            <span className="absolute left-1/2 top-2 h-1 w-6 -translate-x-1/2 rounded-full bg-ink/15" />
          </div>
        </div>
      </div>

      <div className="shell relative py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="overline text-clay reveal">Start a project</p>
          <h2 className="statement from-overline reveal" style={{ transitionDelay: "80ms" }}>
            {heading ?? (
              <>
                Let&rsquo;s build something your patients{" "}
                <TypewriterWord words={PATIENT_VERBS} />
              </>
            )}
          </h2>
          <p className="lede body-lg text-ink/70 reveal" style={{ transitionDelay: "160ms" }}>
            {body}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 reveal" style={{ transitionDelay: "240ms" }}>
            <Link href="/contact" className="btn btn-primary-light btn-arrow">
              Start a project
              <span className="btn-arrow-chip" aria-hidden>↗</span>
            </Link>
            <Link href="/work" className="btn btn-secondary-light">
              See the work
            </Link>
          </div>
        </div>
      </div>
      {/* Fade-to-ink on exit — the bone band dims into darkness as what
          follows arrives (JS-driven, pointer-events-none) */}
      <div aria-hidden className="exit-fade absolute inset-0 z-20 bg-ink" />
    </section>
  );
}
