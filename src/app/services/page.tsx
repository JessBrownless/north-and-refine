import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import ServicesScrollIndex from "@/components/ServicesScrollIndex";
import ManifestoStatement from "@/components/ManifestoStatement";
import SectionGlow from "@/components/SectionGlow";
import { SERVICES } from "@/lib/services";
import { INDUSTRIES } from "@/lib/industries";
import Testimonial from "@/components/Testimonial";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";

/**
 * /services — THE HUB (2026-07-24). Each discipline now owns a page of its
 * own at /services/[slug], driven by `lib/services.ts`; this page introduces
 * the three and routes to them.
 *
 * WHY THE SPLIT: three disciplines shared one URL, so none could rank for its
 * own queries ("medical website design", "medical SEO", "medical practice
 * branding"), and the five-step process sold here was a WEBSITE process under
 * a heading claiming it ran "every time" — a brand-only engagement never
 * reaches "schema, analytics and redirects". The process moved to the pages
 * that actually run it, one per discipline, counts differing by design.
 *
 * WHAT STAYS HERE:
 * (1) HERO: the canonical split masthead (2026-07-16 hero-cohesion pass).
 * (2) THE BELIEF: the statement moment under the hero (2026-07-24).
 * (3) The scroll index — the odometer numeral + ruled rows, now LINKING to
 *     the detail pages; it reads the same SERVICES array they do, so the hub
 *     and the details can never drift apart.
 * (4) FAQ through the shared <FaqSection>: the questions that span all three
 *     disciplines (the per-discipline questions live on their own pages, so
 *     no FAQPage schema is duplicated across routes).
 */

/* The belief, in the homepage manifesto's compartment (2026-07-24). Plain
   text, no markup: <ManifestoStatement> splits it word by word for the
   scroll-fill, and the fill is the emphasis (see the section note).

   COPY IS THE CLIENT'S OWN, supplied verbatim 2026-07-24. It replaced two
   drafted versions (the second was rewritten for fluency, then this arrived);
   don't "improve" it. Note it names no disciplines, so the three-noun order
   rule has nothing to bite on here, and the scroll-fill lands on "practice". */
const BELIEF =
  "We believe that your online presence should reflect the excellence and integrity of your practice.";

export const metadata: Metadata = {
  title: "Services — Web design, SEO & branding",
  description:
    "Web design and build, SEO, and brand identity for medical aesthetic and cosmetic surgery practices. How North & Refine works, and what you get.",
  alternates: { canonical: "/services" },
};

/* The index rows are DERIVED from lib/services.ts (2026-07-24) — one source
   for the hub and the detail pages, so a copy change lands in both.
   WHAT MOVED TO THE DETAIL PAGES, precisely (corrected same day — the first
   pass stripped the PARAGRAPHS too and the desktop rows collapsed to a
   heading and one line, far too thin beside the big rolling numeral): only
   the DASH-RULED DELIVERABLES list moved. The paragraph (`intro`) stays on
   the hub, so each row still makes its argument; the detail page carries the
   list, the process and the FAQs. */
/* The fields ribbon's names (2026-07-24): the three landing-page industries
   first, then the wider fields the studio serves — names only, no links, no
   claims (naming a field we design for is positioning, not a testimonial).
   Add freely; the marquee absorbs any length. */
const FIELDS = [
  ...INDUSTRIES.map((i) => i.name),
  "Plastic Surgery",
  "Dentistry",
  "Ophthalmology",
  "Hair Restoration",
  "Cosmetic Dentistry",
  "Fertility",
];

const INDEX_ROWS = SERVICES.map((s) => ({
  num: s.num,
  title: s.name,
  lead: s.lead,
  body: s.intro,
  href: `/services/${s.slug}`,
}));

/* CROSS-DISCIPLINE questions only (2026-07-24). The per-discipline ones moved
   to the pages that own them, so no FAQPage schema repeats across routes: the
   old "Who builds the site, and what's it built on?" now lives on
   /services/web-design as "What is the site built on?". Dashes swept the same
   day, per the standing rule. */
const FAQS = [
  {
    question: "Do you only work with medical aesthetic and cosmetic surgery practices?",
    answer:
      "That's our focus, and it's deliberate. Working within one field means we understand the patient psychology, the regulatory landscape and the search behaviour far better than a generalist studio could.",
  },
  {
    question: "Can you do just branding, or just the website?",
    answer:
      "Yes. Many engagements are brand-and-website together because they reinforce each other, but we're happy to take on either on its own, and we'll be honest if doing only one will hold the result back.",
  },
  {
    question: "How long does a project take?",
    answer:
      "A focused brand-and-website project typically runs six to ten weeks depending on scope and how quickly we can gather content. We'll give you a realistic timeline up front.",
  },
  /* The compliance signal (2026-07-24, the missing-information pass): a real
     differentiator in this market and true to the studio — the house style
     guide itself bans naming prescription substances. Generic across
     jurisdictions on purpose: areaServed spans AU, UK and US, so no single
     regulator is named. */
  {
    question: "Do you understand the advertising rules for medical practices?",
    answer:
      "Yes; designing inside them is part of the specialism. Copy and imagery are written to the codes that govern regulated health services: generic treatment terms rather than prescription brand names, restraint around testimonials and outcomes where the rules require it, and no claims a practitioner could not stand behind in a consulting room. Careful and confident can be the same voice; that is the register we write in.",
  },
  /* The what-happens-next answer (same pass): the anxiety immediately before
     the CTA is "what am I committing to?" — so it sits LAST, directly above
     the close. Echoes the two-working-days promise from /contact. */
  {
    question: "What happens when we get in touch?",
    answer:
      "A conversation, not a pitch. We reply within two working days and set up a short call: you tell us where the practice is and where you want it to be, and we tell you honestly whether we are the right studio for it. If we are, a written proposal follows with scope, timeline and price. If we are not, we will say so and suggest a better route.",
  },
];

export default function ServicesPage() {
  return (
    <main>
      <JsonLd
        data={[
          /* Each service's Service schema now points at ITS OWN page
             (2026-07-24) — the hub introduces them, the detail pages are
             the canonical URL for each discipline. */
          ...SERVICES.map((s) =>
            serviceSchema({
              name: s.name,
              description: s.metaDescription,
              path: `/services/${s.slug}`,
            }),
          ),
          faqSchema(FAQS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
          ]),
        ]}
      />

      {/* Hero — the canonical interior masthead (split, spacious,
          borderBottom) in its GRAPHIC variant (media slot, 2026-07-16): the
          client's square hero graphic rides the right columns. The
          2026-07-12 hand-and-phone aside + floating fragment chips left
          with the hero-cohesion conversion. H1 dash swept the same day
          (colon per the studio's dash-restraint rule). Keeps the hero CTA:
          /services is a commercial page (the settled CTA policy).
          The graphic is ARTWORK at its native square — brand graphics are
          marks, not photography, so the 16:10/4:5 imagery canon doesn't
          govern them; its rounded corners are part of the artwork, so no
          .frame around it.
          ⚠ The graphic depicts a mock practice ("Lumen") — confirm with
          Jess how this sits with the plates' real-client-work-only rule
          before launch.
          H1 REWRITTEN 2026-07-24 (client): the old line named the three
          disciplines flatly ("Brand, web and search: built to work as one.")
          and then the belief statement below said the same thing again. The
          masthead now leads on the WEBSITE and on what it does for the
          practice; search and brand arrive in the lede, in that order —
          never brand first (see the voice rules in CLAUDE.md). */}
      <PageHero
        align="split"
        spacious
        overline="Services"
        title={
          <>
            Websites that work as hard as your <em>practice</em> does.
          </>
        }
        lede="The design and build, the search that brings patients to it, and the brand behind both. One studio, for private medical and surgical practices."
        cta={{ label: "Start a project", href: "/contact" }}
        media={
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/services-hero-square.png"
            alt="A clinic website shown on a phone against a warm amber ground — web design by North & Refine"
            loading="eager"
            className="w-full"
          />
        }
      />

      {/* THE BELIEF — the studio's conviction about what actually makes a
          presence strong, setting up the three disciplines the page then
          indexes.

          THE SAME COMPARTMENT AS THE HOMEPAGE MANIFESTO (2026-07-24, client:
          "the same, layout-wise… I don't want them to feel too different"):
          the shared <ManifestoStatement> on the same 140vh sticky track, so
          the statement pins and its words FILL IN word by word as you scroll
          through the dwell. That means it follows the homepage's grammar
          exactly — .display register, statement alone (no kicker), and NO
          italic accent: on this device the scroll-fill IS the emphasis, which
          is why the homepage manifesto carries no <em> either.

          ⚠ position:sticky BREAKS under an overflow-hidden ancestor, and
          SectionGlow needs its blobs clipped — so the glow gets its own
          absolutely-positioned clipping layer, a SIBLING of the sticky child
          rather than its parent. `grain` stays on the section itself (its
          ::before is inset-0, so it can't overflow and needs no clip). This
          section still owns the seam blend, being the one adjoining the hero;
          the scroll index below sits on plain ink. */}
      {/* Track tightened 140vh → 118vh (2026-07-24, client: the fade-in
          section "looks a bit too padded") — the scrub adapts to the track
          height, so the fill still completes inside the shorter dwell; the
          section just releases ~1.5 screens sooner. The homepage manifesto
          keeps its own 140vh track — its statement is the page's centrepiece;
          here the belief is a beat between the hero and the index. */}
      {/* BELIEF + INDEX SHARE ONE SURFACE (2026-07-24, client: the two read
          as "two completely separate text sections"). One section owns the
          ground (ink + grain + the clipped glow layer); the belief's sticky
          track runs first and the index rows begin as the statement releases
          — a short pt instead of the old full py-32, so the 01 rows arrive
          while the belief is still in the eye and the statement reads as the
          index's opening line, not its own island.
          ⚠ TWO sticky devices live in here (the belief pin + the odometer
          numeral), so NO overflow-hidden anywhere on their ancestors — an
          overflow-hidden ancestor becomes the sticky element's scroll
          container and silently kills the pin (this regressed twice on
          2026-07-24 before the client caught it). `grain` alone is safe (its
          ::before is inset-0, nothing to clip); SectionGlow's blobs sit in
          an absolutely-positioned clipping layer that is a SIBLING of the
          sticky content, never its ancestor. */}
      <section className="relative grain bg-ink">
        <div aria-hidden className="absolute inset-0 overflow-hidden">
          <SectionGlow blob="left" />
        </div>

        {/* THE FIELDS RIBBON — who we work with, directly under the hero
            (2026-07-24, client: "move industries under the hero section and
            make it scroll so we can fit lots more in"). The .animate-marquee
            auto-scroll — THE ONE SANCTIONED AUTO-MOTION on the site (see
            globals.css; pauses on hover, freezes under reduced motion). Two
            identical copies make the -50% loop seamless; the second is
            aria-hidden so screen readers hear the list once. Names only, no
            links (the client's call — the footer carries the /industries
            route); FIELDS goes beyond the three landing pages to the wider
            fields the studio serves. Lives INSIDE this section so it sits on
            the seam wash continuing the hero ground — a separate flat-ink
            band here would cut the blend. */}
        <div className="relative z-10 overflow-hidden pt-12 md:pt-16">
          <div className="animate-marquee flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex">
                {FIELDS.map((name) => (
                  <span
                    key={name}
                    className="industry-band-title inline-flex items-baseline gap-x-8 whitespace-nowrap pr-8 text-bone md:gap-x-12 md:pr-12"
                  >
                    <span>{name}</span>
                    <span aria-hidden className="self-center text-[0.4em] text-champagne">
                      ✦
                    </span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* The belief — the homepage manifesto's WORD-FILL, in NORMAL FLOW
            (2026-07-24, third pass: the client felt "friction" here — the
            STICKY PIN was the culprit. The track had been tightened 140vh →
            118vh, which cut the dwell to ~18vh: long enough to snag the
            scroll, too short to read as a deliberate hold. Rather than
            lengthen the hold, the pin is GONE — <ManifestoStatement>
            handles unstuck consumers, filling the words as the section
            travels up the viewport and completing as it nears the top.
            Nothing stops the scroll; the fill is the only event.) The
            homepage KEEPS its 140vh pin — its statement is the page's
            centrepiece and the long dwell reads as intent; this one just
            opens the index.
            data-manifesto-track stays: the scrub measures this div, not the
            shared section — see the note in ManifestoStatement. */}
        {/* py stepped back up 2026-07-24 (client): with the fields ribbon
            now directly above, the belief needs its air back — the tight
            spacing read as crowding the marquee. Asymmetric on purpose: more
            above (clearing the ribbon) than below (the index follows as the
            statement's answer). */}
        <div data-manifesto-track className="relative pt-40 pb-28 md:pt-56 md:pb-40">
          <div className="shell relative z-10">
            <ManifestoStatement text={BELIEF} />
          </div>
        </div>

        {/* The scroll index — the ODOMETER (2026-07-14, client ref: Relume
            layout485). One big display-mega number pinned in a clipped
            window, rolling as the rows pass; per-row hairlines draw in; each
            row links to its detail page (2026-07-24 split). */}
        <div className="shell relative z-10 pt-4 pb-24 md:pt-6 md:pb-32">
          <ServicesScrollIndex services={INDEX_ROWS} />
        </div>
      </section>

      {/* THE PROCESS TIMELINE LEFT THIS PAGE 2026-07-24 with the split. It was
          a WEBSITE process ("schema, analytics and redirects") under a heading
          claiming five stages ran "every time"; it now lives on
          /services/web-design, and SEO and brand carry the processes they
          actually run. The StageGlyph timeline markup moved with it. */}

      {/* THE TESTIMONIAL (2026-07-24, replacing the same-day proof strip at
          the client's call: "I don't like the recent work as social proof.
          Let's just put a testimonial. We can use the Dr Yalda one from the
          homepage. Image left, text.") — the shared <Testimonial> band, so
          homepage and hub can't drift. rule: dark-on-dark band boundary.
          image: the hero's Lumen graphic as a STAND-IN (same day: the photo
          plate "doesn't fit the rest of the site"); square = native ratio.
          ⚠ placeholder on placeholder — real image + real words together
          when they land. */}
      <Testimonial
        rule
        image={{ src: "/services-hero-square.png", alt: "", square: true }}
      />

      {/* FAQ — the shared split band (componentised from /about). The same
          FAQS array feeds the FAQPage schema above. */}
      {/* tone="dark" (2026-07-24, client: the light bands "don't feel like
          they belong to the page"): /services runs dark from hero to index
          with no light middle act, so a cream FAQ + cream close was a
          double-light tail. Dark FAQ → cream close = ONE light moment
          finishing the page, the homepage's proven arc. */}
      <FaqSection
        tone="dark"
        kicker="Questions"
        heading="Common questions."
        faqs={FAQS}
        cta={{ label: "Ask us directly", href: "/contact" }}
      />

      <ContactCTA />
    </main>
  );
}
