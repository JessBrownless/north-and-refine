import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { breadcrumbSchema, contactPageSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Contact — Start a project",
  description:
    "Tell us about your practice. North & Refine takes on a limited number of brand and website projects at a time for medical aesthetic and cosmetic surgery clients.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={[
          contactPageSchema(String(metadata.description)),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      {/* The canonical interior masthead (2026-07-16 hero-cohesion pass:
          the bespoke header block joined the sitewide split system, riding
          the load-in entrance like every other hero). No hero CTA — this IS
          the conversion page; the form below is the CTA. Lede dash swept
          the same day (two sentences per the dash-restraint rule). */}
      <PageHero
        align="split"
        spacious
        borderBottom
        overline="Start a project"
        title="Let’s talk about your practice."
        lede="Tell us where you are and where you want to be. We’ll reply within two working days. If we’re not the right fit, we’ll tell you that too."
      />

      <section className="relative grain overflow-hidden">
        <div className="shell pt-16 pb-16 md:pt-20 md:pb-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Intro rail — contact facts + the page's plate */}
            <div className="md:col-span-5">
              <div className="space-y-4 reveal">
                <div>
                  <p className="overline text-clay">Email</p>
                  <a
                    href={`mailto:${SITE.email}`}
                    className="body text-bone hover:text-champagne transition-colors"
                  >
                    {SITE.email}
                  </a>
                </div>
                <div>
                  <p className="overline text-clay">Where we work</p>
                  <p className="body text-bone-dim">{SITE.areaServed.join(" · ")}</p>
                </div>
              </div>

              {/* The conversion page joins the shoot (2026-07-10 sweep):
                  /contact was the one major route with zero Rowen imagery —
                  it cannot take ContactCTA's close plate because it IS the
                  contact page. A 4:5 phone plate (RowenPhone 2, the client's
                  mobile site on the suite's stone) fills the intro column's
                  dead lower half beside the deep form. Costs the form zero
                  pixels. Recipe: docs/briefs/hero-plates.md. */}
              <div className="mt-12 reveal" style={{ transitionDelay: "120ms" }}>
                <div className="frame aspect-[4/5]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/assets/plates/contact-rowen-phone-02.jpg"
                    alt="A phone on pale stone displaying the Dr Yalda Jamali mobile site — brand and web design by North & Refine"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Form — Netlify Forms via the runtime-v5 pattern; the static
                definition lives in public/__forms.html */}
            <div className="md:col-span-6 md:col-start-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
