import Link from "next/link";

interface ContactCTAProps {
  /** Override the default heading. */
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
  heading = "Let's build something your patients trust.",
  body = "Tell us about your practice and where you want it to be. We take on a limited number of projects at a time, so the right fit matters.",
}: ContactCTAProps) {
  return (
    <section data-nav-light className="bg-bone text-ink">
      <div className="shell py-20 md:py-32">
        <div className="max-w-3xl">
          <p className="overline text-clay reveal">Start a project</p>
          <h2 className="statement from-overline reveal" style={{ transitionDelay: "80ms" }}>
            {heading}
          </h2>
          <p className="lede body-lg text-ink/70 reveal" style={{ transitionDelay: "160ms" }}>
            {body}
          </p>
          <div className="mt-10 flex flex-wrap gap-4 reveal" style={{ transitionDelay: "240ms" }}>
            <Link href="/contact" className="btn btn-primary-light">
              Start a project
              <span aria-hidden>→</span>
            </Link>
            <Link href="/work" className="btn btn-secondary-light">
              See the work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
