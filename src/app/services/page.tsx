import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import FaqSection from "@/components/FaqSection";
import JsonLd from "@/components/JsonLd";
import ServicesScrollIndex from "@/components/ServicesScrollIndex";
import ManifestoStatement from "@/components/ManifestoStatement";
import SectionGlow from "@/components/SectionGlow";
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
        ctaVariant="glass"
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
          {/* Standard dose since 2026-07-31 (was seamEmphasis, the handoff's
              richer amber tail): with the hero's new foot hairline the
              boundary is a stated divide, so the warmth resolves at the
              line rather than carrying through it. */}
          <SectionGlow blob="left" />
          {/* The canvas blobs (2026-07-24, "blurred gradient blobs" down the
              dark middle): two quiet pools past the seam glow's reach, so
              the belief and the index rows sit in atmosphere rather than on
              flat ink — the /about shared-canvas grammar, hub doses. */}
          <div
            style={{
              position: "absolute",
              right: "-12%",
              top: "38%",
              width: "44%",
              height: "26%",
              borderRadius: "50%",
              background: "#C2A878",
              opacity: 0.04,
              filter: "blur(150px)",
              transform: "translateZ(0)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "-10%",
              top: "68%",
              width: "48%",
              height: "26%",
              borderRadius: "50%",
              background: "#8A5A2E",
              opacity: 0.06,
              filter: "blur(150px)",
              transform: "translateZ(0)",
            }}
          />
        </div>

        {/* THE CREDIT STRIP left this page 2026-07-24 (client: "drop the
            industries strip now… we might bring it back") — PARKED as
            <CreditStrip> in the components drawer, alongside Deck and
            NewsletterSignup. The belief now opens the dark middle directly
            under the hero. */}

        {/* THE BELIEF — the HANGING-KICKER INDENT (2026-07-24, client ref:
            the "[Our Approach]" statement pattern — kicker sits inside the
            first line's indent, the statement runs flush left underneath and
            fills the rail). The wrapper carries .belief-statement too, so
            the kicker's em-offsets track the statement's own clamp; the
            indent is md+ only — on mobile the kicker stacks above and the
            text runs unindented (22% of a phone is less than the label).
            Kicker says "Our belief" and the statement drops its old "We
            believe that" opener (client, same day) — the belief-verb lives
            once, in the label, and the big words start at the substance.
            Word-fill unchanged (data-manifesto-track = the scrub's measure).
            AIR: 160px both sides at md+ (the handoff value), stepped down to
            96px on mobile — 2026-07-24, client: "padding feels a bit off" on
            the phone, where the desktop pads stacked into dead screens.
            The whole block also rides .reveal now (client: the section
            "needs to fade in a bit in some way") — the fill completes by
            mid-viewport per the handoff, so a fast scroller met it already
            lit and static; the 1.1s entrance fade gives it an arrival, and
            the word opacities compose with it untouched. */}
        {/* Desktop top air stepped up 160 → 208 (2026-07-31, client: "a bit
            more padding on top of the We Believe section… on desktop at
            least") — with the new hero-foot hairline the belief opens a
            stated new chapter, and the deeper breath before the kicker sells
            it. Mobile keeps 96 (the phone pads were tuned down 2026-07-24
            and stay). Foot holds the handoff's 160. */}
        <div data-manifesto-track className="relative z-10 py-24 md:pb-40 md:pt-52">
          <div className="shell">
            <div className="belief-statement reveal relative">
              <p className="overline mb-6 text-clay reveal md:absolute md:left-0 md:top-[0.3em] md:mb-0">
                Our belief
              </p>
              <ManifestoStatement
                text={BELIEF}
                className="belief-statement max-w-none text-bone md:indent-[22%]"
              />
            </div>
          </div>
        </div>

        {/* THE SUPPORTING PARAGRAPH (2026-07-24, client: "a paragraph of
            text after the we believe section… aligned off to the right") —
            the prose-beside-statement grammar: the belief speaks at display
            scale flush left, the elaboration answers at body scale seated
            in the right columns. A SIBLING of the manifesto track on
            purpose: inside it, the extra height could tip the scrub into
            its sticky-dwell branch and stall the fill.
            ⚠ COPY IS DRAFTED (not client-supplied) — review before launch.
            Order holds web → search → brand; the fragmentation line
            describes the practice's situation, not a rival's failing. */}
        {/* TWO-COLUMN EDITORIAL PAIR (2026-07-25, three seats in one
            morning — full-rail edges, then right-half 3+3, then the final:
            "it needs to span the width of the border above the image
            below"). The pair now occupies EXACTLY the index rows' content
            column — cols 6–8 and 10–12 — so the first column's left edge
            and the second's right edge align with the row hairline's ends
            below; col 9 is the centre gutter, and the numeral's left third
            stays air. Stacks to one column below md. */}
        {/* Desktop foot 144 → 192 (same 2026-07-31 ask: more air "under the
            two paragraphs") — the editorial pair releases with a fuller
            breath before the index rows arrive. */}
        <div className="shell relative z-10 pb-24 md:pb-48">
          {/* Outer grid gap-10 MATCHES the index's grid below (it runs
              gap-10, not the usual md:gap-8) so the col-6 edge sits exactly
              on the hairline's start. The pair itself is an INNER two-column
              split of that span (fourth seat, client: the spare-column
              gutter looked "huge") — equal halves, one standard gutter. */}
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            {/* CSS MULTI-COLUMNS, not a grid (fifth seat, client: "paragraphs
                need to be even… any fancy css stuff?"): both paragraphs FLOW
                through columns-2 and the browser BALANCES them (column-fill:
                balance is the default), so the two columns bottom out even
                at every viewport regardless of copy length — true newspaper
                setting. The trade: a paragraph may break across the column
                gutter mid-sentence, which is exactly how editorial columns
                behave. Reveal rides the wrapper (per-paragraph reveals would
                fade a split paragraph in two stages). */}
            {/* [orphans:1]/[widows:1]: browsers default both to 2 in column
                fragmentation, so the balancer can only move lines in PAIRS —
                that quantisation was the stubborn two-line offset. Allowing
                single-line breaks lets balance land within one line. */}
            <div className="reveal md:col-span-7 md:col-start-6 md:columns-2 md:gap-10 [orphans:1] [widows:1]">
              <p className="body-lg mb-6 text-bone-dim md:mb-0">
                It rarely does by accident. Most practices inherit a website
                from one supplier, search from another and a brand from a
                third, and the seams show. We keep all three in one studio,
                designed together, so what a patient meets online is as
                considered as the care itself.
              </p>
              {/* ⚠ COPY IS DRAFTED (both paragraphs) — review before launch.
                  No inter-paragraph margin OR indent at md (2026-07-31,
                  client: the indent made the second paragraph "jut in" and
                  unbalance the columns — "make it very flowing"): the two
                  paragraphs read as one continuous stream through the
                  balanced columns. The newspaper first-line indent lives in
                  git history if paragraph marks are ever wanted back; a
                  margin stays off the table (it defeats column-fill:
                  balance). Mobile keeps the stacked mb-6 separation. */}
              <p className="body-lg text-bone-dim">
                That is also why the work compounds. The website is built to
                rank from its first wireframe, the writing carries the
                brand&rsquo;s voice into every procedure page, and each piece
                strengthens the others the way good clinical practice does:
                quietly, and over time. The result is a presence that keeps
                earning trust while you are in the consulting room.
              </p>
            </div>
          </div>
        </div>

        {/* THE INDEX — straight into the odometer rows (the "What we do /
            Three disciplines, one studio" kicker pair was cut 2026-07-24,
            client: "can totally go" — with the belief naming all three
            disciplines one beat above, the labels were narration; the rows'
            own hairlines are the structure now). ⚠ The odometer is
            position:sticky — the glow stays in the clipped SIBLING layer
            above; nothing here may be overflow-hidden. */}
        <div className="shell relative z-10 pb-24 md:pb-44">
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
