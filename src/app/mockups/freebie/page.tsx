import type { Metadata } from "next";
import NewsletterSignup from "@/components/NewsletterSignup";

// The homepage "freebie" band (lead magnet + newsletter capture), PARKED
// 2026-07-04: pulled from the homepage close so the page ends on the bone
// CTA. Destined for its own landing page. Kept in the internal sandbox
// (noindexed, robots-disallowed via /mockups) so the section and its Netlify
// form wiring ("newsletter", static definition in public/__forms.html) stay
// working and ready to lift.
export const metadata: Metadata = {
  title: "Parked — the freebie band",
  robots: { index: false, follow: false },
};

export default function FreebieParkedPage() {
  return (
    <main className="bg-ink text-bone min-h-screen">
      <div className="shell pt-36 pb-4 md:pt-44">
        <p className="overline">Internal — parked component</p>
        <h1 className="heading-xl from-overline">The freebie band</h1>
        <p className="lede body-lg text-bone-dim max-w-2xl">
          Pulled from the homepage close, destined for its own landing page.
          The Netlify form stays wired while it sits here.
        </p>
      </div>

      {/* The band, verbatim from the homepage (exit-fade omitted — that
          device belongs to the homepage scene) */}
      <section className="relative">
        <div className="shell py-24 md:py-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:items-center">
            <div className="md:col-span-6">
              <p className="overline reveal">The freebie</p>
              <h2 className="heading-lg from-overline reveal" style={{ transitionDelay: "80ms" }}>
                What patients check before they book
              </h2>
              {/* The form's promise is the checklist ALONE — the ongoing
                  notes are a separate opt-in checkbox (GDPR: no bundling) */}
              <p className="body-lg lede text-bone-dim reveal" style={{ transitionDelay: "160ms" }}>
                A twelve-point audit of your practice&rsquo;s website, straight
                to your inbox. No noise.
              </p>
            </div>
            <div className="md:col-span-5 md:col-start-8 reveal" style={{ transitionDelay: "240ms" }}>
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
