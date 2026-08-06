import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import ServicesScrollIndex from "@/components/ServicesScrollIndex";
import BeliefCanvas from "@/components/BeliefCanvas";
import BeliefStatement from "@/components/BeliefStatement";
import BalancedProsePair from "@/components/BalancedProsePair";
import { SERVICES } from "@/lib/services";
import Testimonial from "@/components/Testimonial";
import { serviceSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import ServicesHeroGraphic from "@/components/graphics/ServicesHeroGraphic";
import {
  ServicesTileBrand,
  ServicesTileSeo,
  ServicesTileWeb,
} from "@/components/graphics/ServicesTiles";

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

   CLIENT'S OWN COPY, supplied verbatim 2026-07-24 (the fourth wording of
   the day, replacing the drafted colon extension) — don't "improve" it.
   ⚠ Two knowing deviations from the house rules, flagged to her when it
   shipped: it names BRAND BEFORE SEARCH (the sitewide order rule says
   web → search → brand), and it carries an en dash (the dash-sweep rule).
   Her verbatim copy outranks both until she says otherwise. The hanging
   kicker stays "Our belief"; scroll-fill lands on "thing". */
const BELIEF =
  "Your website should reflect the excellence of your practice, from the brand behind it, to the search that finds it – all saying one thing.";

/* THE SUPPORTING PARAGRAPHS (2026-07-24, client: "a paragraph of text after
   the we believe section… aligned off to the right") — the elaboration that
   answers the belief, set through <BalancedProsePair>'s balanced columns.
   ⚠ COPY IS DRAFTED (both paragraphs), not client-supplied — review before
   launch. Order holds web → search → brand; the fragmentation line describes
   the practice's situation, not a rival's failing. */
const BELIEF_PROSE = [
  "It rarely does by accident. Most practices inherit a website from one supplier, search from another and a brand from a third, and the seams show. We keep all three in one studio, designed together, so what a patient meets online is as considered as the care itself.",
  "That is also why the work compounds. The website is built to rank from its first wireframe, the writing carries the brand’s voice into every procedure page, and each piece strengthens the others the way good clinical practice does: quietly, and over time. The result is a presence that keeps earning trust while you are in the consulting room.",
];

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
/* Row-tile devices by discipline (2026-07-24 experiment): laptop for the
   website row, phone for search, the square plate for brand — blank until
   real imagery is chosen. Superseded as the LIVE tiles 2026-08-01 by the
   ROW_IMAGE graphics below; kept as the fallback for any future row that
   ships before its graphic does. */
const ROW_ART: Record<string, "laptop" | "phone" | "plate"> = {
  "web-design": "laptop",
  seo: "phone",
  "brand-identity": "plate",
};

/* THE TILE GRAPHICS — v3 SET (2026-08-01 night, the "Website graphics
   request services" drop; client: "use the images in there to replace
   services 1 2 3 images"). Captured from the design set's own export sheet
   ("Services Graphics - Export.dc.html", three 900×600 tiles) by the sheet's
   sanctioned route — a real browser at 200% (headless Chrome, device scale 2:
   the frosted glass needs a live renderer, the PNG exporter flattens it) —
   then sharp → AVIF at 1440 (27–32KB each).
   The landscape composite language holds: real photography inside a device
   or browser, glass panels floating over a blurred warm ground, one artefact
   per discipline. THE MOCK PRACTICES ARE THE CLIENT'S TO CHANGE and they
   have moved twice in a day — Lumen retired from the tiles (it survives in
   the hero graphic), then the 2026-08-02 drop swapped two of the three
   again. Current: web = Aurelle (non-surgical aesthetics) · seo = Halden
   Osteopathy · brand = norva (women's health). Because the depicted names
   and figures live in the DESIGN SOURCE, not here, ALT TEXT IS THE ONE
   THING THAT DRIFTS SILENTLY — re-read the capture and rewrite these
   strings on every drop, or the page describes a practice that is no
   longer in the picture.
   Bakes that are GONE with this line of sets: the old "+212% enquiries"
   figure and the US "Board-certified" line. The in-tile figures that remain
   (143 Google reviews · 320 monthly searches · the site-health 100 · the
   enquiries curve) are depictions of FICTIONAL practices, not studio
   claims — same pre-launch confirmation item as the hero graphic. The
   2026-08-02 drop also brought them down to plausible small-practice
   numbers, which reads truer than the earlier set did.
   The v2 set + the retired square set stay on disk until sign-off. */
const ROW_IMAGE: Record<string, { src: string; alt: string }> = {
  "web-design": {
    src: "/assets/graphics/services-tile-web-v3.avif",
    alt: "A non-surgical aesthetics clinic website on desktop and mobile: the Aurelle hero reading “Radiance, made effortless.”, with a next-available booking panel and page markup floating over a blurred amber ground.",
  },
  seo: {
    src: "/assets/graphics/services-tile-seo-v3.avif",
    alt: "An osteopathy practice site on a phone ranking for “osteopath islington”, surrounded by glass panels: local monthly search volume, a technical SEO audit score, the practice’s schema markup and a rising enquiries line.",
  },
  "brand-identity": {
    src: "/assets/graphics/services-tile-brand-v3.avif",
    alt: "A brand board for a women’s health practice open in a design canvas: the norva logotype, type specimen, palette swatches and imagery, with the same brand carried onto a phone screen.",
  },
};

/* THE LIVE TILES (2026-08-02) — these three rows stopped being flat images
   when the design gained motion; ROW_IMAGE above is kept only as the record
   of what each plate depicts (and as the fallback path in the row renderer).
   See ServicesTiles.tsx. */
const ROW_TILE: Record<string, React.ReactNode> = {
  "web-design": <ServicesTileWeb />,
  seo: <ServicesTileSeo />,
  "brand-identity": <ServicesTileBrand />,
};

const INDEX_ROWS = SERVICES.map((s) => ({
  num: s.num,
  title: s.name,
  lead: s.lead,
  body: s.intro,
  href: `/services/${s.slug}`,
  art: ROW_ART[s.slug],
  tile: ROW_TILE[s.slug],
  /* Kept as the live FALLBACK, not dead weight: the renderer prefers `tile`
     and falls back to `image`, so a row whose graphic is re-cut before it is
     ported still shows something real. */
  image: ROW_IMAGE[s.slug],
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
      {/* borderBottom joined 2026-07-31 (client: "something needs to break
          up the hero section and the We Believe section… a horizontal
          divide") — the standard interior hairline at the hero's foot;
          /services had been the one masthead without it, relying on the
          seam blend alone. The belief's SectionGlow stepped down from
          seamEmphasis to the standard dose in the same change, so the hero
          resolves at the line instead of washing over it. */}
      <PageHero
        align="split"
        spacious
        borderBottom
        overline="Services"
        title={
          <>
            {/* SHORTENED 2026-07-24 (client: the long H1 was "just repeating
                the we believe bit"), then reworded to the client's "websites
                that just work" the same day — the em moves to "just": the
                claim is the effortlessness, and "just" is where the voice
                leans. Stays on .display per the ladder. */}
            Websites that <em>just</em> work.
          </>
        }
        lede="The design and build, the search that brings patients to it, and the brand behind both. One studio, for private medical and surgical practices."
        cta={{ label: "Start a project", href: "/start-a-project" }}
        /* The second action is PROOF: someone weighing up the disciplines
           wants to see them landed before they enquire. */
        ctaSecondary={{ label: "See the work", href: "/work" }}
        media={
          /* GRAPHIC 09 LIVE (2026-07-31): the design project's services-hero
             composition as DOM (<ServicesHeroGraphic>), replacing the 1.7MB
             services-hero-square.png export — same artwork, crisp at every
             density, ember gradient straight from the tokens, plus the
             frosted markup/SEO/schema panels from the design. The PNG stays
             in public/ (the Testimonial band below still uses it). */
          <ServicesHeroGraphic className="w-full" />
        }
      />

      {/* THE DARK MIDDLE — belief, prose pair and index on ONE SURFACE
          (2026-07-24, client: the belief and the index read as "two
          completely separate text sections"). <BeliefCanvas> owns the ground
          (ink + grain + the clipped glow layer) and the beats compose on it,
          so the 01 rows arrive while the belief is still in the eye and the
          statement reads as the index's opening line, not its own island.
          ⚠ The index's odometer numeral is position:sticky, so nothing in
          this tree may be overflow-hidden — see the canvas docstring for why
          the glow's clipping layer has to stay a SIBLING. */}
      <BeliefCanvas>
        {/* THE CREDIT STRIP left this page 2026-07-24 (client: "drop the
            industries strip now… we might bring it back") — PARKED as
            <CreditStrip> in the components drawer, alongside Deck and
            NewsletterSignup. The belief now opens the dark middle directly
            under the hero. */}

        {/* ⚠ THE COMMENT HERE WAS CORRECTED, THE MARKUP WAS NOT TOUCHED. The
            note that stood in this place claimed the belief ran on "the same
            140vh sticky track" as the homepage manifesto, and carried a
            "tightened 140vh → 118vh" line. Neither has been true since
            2026-07-24: the pin was removed that day on purpose (the client
            felt "friction" at this section), and what ships is a plain padded
            block in normal flow. The homepage keeps its 140vh pin. Full
            account in <BeliefStatement>'s docstring. */}
        <BeliefStatement kicker="Our belief" text={BELIEF} />

        <BalancedProsePair paragraphs={BELIEF_PROSE} />

        {/* THE INDEX — straight into the odometer rows (the "What we do /
            Three disciplines, one studio" kicker pair was cut 2026-07-24,
            client: "can totally go" — with the belief naming all three
            disciplines one beat above, the labels were narration; the rows'
            own hairlines are the structure now). ⚠ The odometer is
            position:sticky — the glow stays in the clipped SIBLING layer
            inside the canvas; nothing here may be overflow-hidden. */}
        <div className="shell relative z-10 pb-24 md:pb-44">
          <ServicesScrollIndex services={INDEX_ROWS} />
        </div>
      </BeliefCanvas>

      {/* THE PROCESS TIMELINE LEFT THIS PAGE 2026-07-24 with the split. It was
          a WEBSITE process ("schema, analytics and redirects") under a heading
          claiming five stages ran "every time"; it now lives on
          /services/web-design, and SEO and brand carry the processes they
          actually run. The StageGlyph timeline markup moved with it. */}

      {/* THE TESTIMONIAL (2026-07-24, replacing the same-day proof strip at
          the client's call: "I don't like the recent work as social proof.
          Let's just put a testimonial. We can use the Dr Yalda one from the
          homepage. Image left, text.") — the shared <Testimonial> band, so
          homepage and hub can't drift.
          tone="ivory" (services-pacing handoff): the light act STEPS UP —
          bone index to near-white ivory testimonial, its own section with
          the handoff's pads (112/128). The ground step IS the boundary; no
          hairline between the light bands.
          image: GRAPHIC 19e (2026-08-02, from the client's Website Graphics
          design project — captioned there "Services · Client site, square"),
          replacing the Lumen hero stand-in that sat here as a placeholder.
          Square = its native 600×600, which is what this slot wants.
          It ships as a PLATE, not DOM, and the reasoning is the same test the
          row tiles were built on: those went plate-plus-live-panels because
          their glass ANIMATES, and a raster can only be an animation's last
          frame. 19e carries no `glassIn` at all (verified in the source), so
          there is no motion to lose and a 16KB plate is the honest form. Its
          panels are the `.glass-float` recipe — captured, the frosted blur is
          real (a browser screenshot renders backdrop-filter; only the design
          tool's own PNG exporter flattens it).
          ⚠ THE QUOTE IS STILL A PLACEHOLDER — real words to land with it.
          ⚠ AND THE DEPICTED FIGURES ARE UNVERIFIED CLAIMS about a REAL
          client's site (Speed 98 · Accessibility AA · Mobile Pass · a
          five-star Google rating). They are baked into the plate, so they sit
          outside the DOM, but the no-numbers-we-cannot-defend rule does not
          care where a claim is printed. Confirm each against a real Lighthouse
          run and the practice's live rating, or have the panels re-cut,
          before this page goes near launch. Logged in the checklist. */}
      <Testimonial
        tone="ivory"
        image={{
          src: "/assets/graphics/services-testimonial-client.avif",
          alt: "The Dr Yalda Jamali mobile site shown on a phone over a softly blurred bleed of its own hero, with two glass panels summarising build quality and review rating — web design by North & Refine",
          square: true,
        }}
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
