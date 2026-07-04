import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/site";

// Plain-English privacy policy — written to match what the site ACTUALLY
// collects (two Netlify forms, no analytics, no ad trackers). If tracking or
// a mailing platform is ever added, update this page in the same change.
// ⚠️ Pre-launch: have this reviewed professionally (see CLAUDE.md checklist).

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How North & Refine collects, uses and protects your information — plain English, no surprises.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

const SECTIONS: { heading: string; body: React.ReactNode }[] = [
  {
    heading: "Who we are",
    body: (
      <>
        {SITE.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a design
        studio working with medical aesthetic and cosmetic surgery practices.
        For anything in this policy, contact{" "}
        <a href={`mailto:${SITE.email}`} className="underline underline-offset-2">
          {SITE.email}
        </a>
        .
      </>
    ),
  },
  {
    heading: "What we collect, and why",
    body: (
      <>
        We collect personal information only when you give it to us through
        two forms on this site. The <strong>enquiry form</strong> collects
        your name, email, practice name and message so we can respond to your
        enquiry. The <strong>checklist form</strong> collects your email so we
        can send you the checklist you asked for — and, only if you tick the
        optional box, occasional notes on design and search for clinics. We
        record whether you ticked that box, and when. This site sets no
        advertising trackers and runs no third-party analytics.
      </>
    ),
  },
  {
    heading: "The legal basis",
    body: (
      <>
        Where European or UK law applies: we handle enquiry details on the
        basis of our legitimate interest in responding to you; we send the
        checklist because you asked for it; and we send ongoing notes only
        with your consent, which you can withdraw at any time — every email
        we send includes a one-click unsubscribe. In Australia, we handle
        your information in line with the Australian Privacy Principles and
        send commercial messages only with your consent, as the Spam Act
        requires.
      </>
    ),
  },
  {
    heading: "Where it lives, and who processes it",
    body: (
      <>
        Form submissions are processed and stored by Netlify, which hosts
        this site, acting as our processor. We don&rsquo;t sell your
        information, share it with advertisers, or move it anywhere it
        doesn&rsquo;t need to be.
      </>
    ),
  },
  {
    heading: "How long we keep it",
    body: (
      <>
        Enquiry details are kept for as long as the conversation (and any
        resulting work) needs them. Mailing-list details are kept until you
        unsubscribe or ask us to delete them, at which point they&rsquo;re
        removed.
      </>
    ),
  },
  {
    heading: "Your rights",
    body: (
      <>
        You can ask us for a copy of the information we hold about you, ask
        us to correct or delete it, or withdraw consent to marketing at any
        time — email{" "}
        <a href={`mailto:${SITE.email}`} className="underline underline-offset-2">
          {SITE.email}
        </a>{" "}
        and we&rsquo;ll act on it promptly. If you&rsquo;re unhappy with how
        we&rsquo;ve handled your information, you can complain to the OAIC
        (Australia) or the ICO (UK).
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-ink text-bone">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Privacy policy", path: "/privacy" },
        ])}
      />
      <PageHero
        overline="The fine print"
        title="Privacy policy"
        lede="Plain English, no surprises: what we collect, why, and the control you keep."
      />

      <section className="relative">
        <div className="shell pb-24 md:pb-32">
          <div className="max-w-3xl">
            {SECTIONS.map((s, i) => (
              <div key={s.heading} className={`reveal ${i > 0 ? "mt-12 border-t rule-dark pt-10" : ""}`}>
                <h2 className="heading-sm text-bone">{s.heading}</h2>
                <p className="body-reading mt-4 text-bone-dim">{s.body}</p>
              </div>
            ))}
            <p className="fineprint mt-14">
              Last updated 4 July 2026. If we change how we handle your
              information, we&rsquo;ll update this page before we do it.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
