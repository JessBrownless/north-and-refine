import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";

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
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact North & Refine",
            url: `${SITE.url}/contact`,
            description: metadata.description,
          },
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ]}
      />

      <section className="relative grain overflow-hidden">
        <div className="shell-wide pt-36 pb-16 md:pt-48 md:pb-20 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            {/* Intro */}
            <div className="md:col-span-5">
              <p className="overline text-champagne reveal">Start a project</p>
              <h1 className="heading-xl text-bone from-overline reveal" style={{ transitionDelay: "80ms" }}>
                Let&rsquo;s talk about your practice.
              </h1>
              <p className="lede body-lg text-bone-dim reveal" style={{ transitionDelay: "160ms" }}>
                Tell us where you are and where you want to be. We&rsquo;ll reply within two working
                days — and if we&rsquo;re not the right fit, we&rsquo;ll tell you that too.
              </p>
              <div className="mt-10 space-y-4 reveal" style={{ transitionDelay: "240ms" }}>
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
