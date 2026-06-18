import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact — Start a project",
  description:
    "Tell us about your practice. North & Refine takes on a limited number of brand and website projects at a time for medical aesthetic and cosmetic surgery clients.",
  alternates: { canonical: "/contact" },
};

const FIELD =
  "w-full bg-transparent border-0 border-b rule-dark py-3 text-bone placeholder:text-clay focus:outline-none focus:border-champagne transition-colors";

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

            {/* Form — wired for Netlify Forms. */}
            <div className="md:col-span-6 md:col-start-7">
              <form
                name="project-enquiry"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                action="/contact?success=1"
                className="reveal space-y-7"
              >
                {/* Netlify form detection + honeypot */}
                <input type="hidden" name="form-name" value="project-enquiry" />
                <p className="hidden">
                  <label>
                    Don&rsquo;t fill this in: <input name="bot-field" />
                  </label>
                </p>

                <div>
                  <label htmlFor="name" className="overline text-clay">
                    Your name
                  </label>
                  <input id="name" name="name" type="text" required className={FIELD} placeholder="Dr Jane Smith" />
                </div>
                <div>
                  <label htmlFor="email" className="overline text-clay">
                    Email
                  </label>
                  <input id="email" name="email" type="email" required className={FIELD} placeholder="you@practice.com" />
                </div>
                <div>
                  <label htmlFor="practice" className="overline text-clay">
                    Practice / clinic
                  </label>
                  <input id="practice" name="practice" type="text" className={FIELD} placeholder="Practice name" />
                </div>
                <div>
                  <label htmlFor="interest" className="overline text-clay">
                    What you&rsquo;re after
                  </label>
                  <select id="interest" name="interest" className={`${FIELD} appearance-none`}>
                    <option className="bg-ink">Brand &amp; website</option>
                    <option className="bg-ink">Website only</option>
                    <option className="bg-ink">Brand only</option>
                    <option className="bg-ink">Ongoing SEO &amp; growth</option>
                    <option className="bg-ink">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="overline text-clay">
                    Tell us a little more
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className={`${FIELD} resize-none`}
                    placeholder="Where your practice is now, and what you'd like to change."
                  />
                </div>

                <button type="submit" className="btn btn-primary-dark">
                  Send enquiry
                  <span aria-hidden>→</span>
                </button>
                <p className="fineprint">
                  We&rsquo;ll only use your details to reply to this enquiry.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
