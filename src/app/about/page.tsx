import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import FaqSection from "@/components/FaqSection";
import MethodSection from "@/components/MethodSection";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

/**
 * /about — the page that argues the homepage's claim ("A studio that treats
 * the clinic's digital presence with the same care as the practice itself")
 * with story, method and proof. Rebuilt 2026-07-11 to the about-page brief;
 * recomposed the same evening at the client's direction: the first pass ran
 * a long bone middle act and read "too white, just text plonked" — the page
 * now runs INK from hero to close like the homepage (cream only at the
 * ContactCTA), and each text section carries a homepage-grade composition
 * (statement moment, ledger rows, offset prose) instead of plain columns.
 * The client authorised content changes for this pass; the deltas from the
 * FINAL brief copy are noted inline where they happen.
 *
 * TOP REBUILT AGAIN 2026-07-12 NIGHT to the client's "1a Manifesto hero"
 * comp (her screenshots; she chose "1a top, keep everything below" and
 * "canon colours, keep marquee" when asked): (1) CENTRED manifesto hero —
 * kicker, heading-xl, lede, no in-hero buttons (the comp's meta row was
 * built then CUT in the later sweep; see PAGE ORDER). (2) FULL-BLEED image
 * band (Rowen laptop 4) as the hero's visual
 * half. (3) Who-we-are: kicker left, the brief's final origin prose right
 * (P1 restored to its unsplit form), stats row, and the GHOST MARQUEE
 * cropped at the section foot (the parked device returns at her call —
 * canon colours: bone at 8%, static). (4) The method as the comp's indexed
 * convictions layout on BONE (glyph plates left the page; glyphs live on
 * /services). (5) The fields band moved below the method. Deltas from the
 * comp, all deliberate: bone kickers + clay indices (she chose canon
 * colours over the comp's gold), the method section relabelled "How we
 * think" (the values stack below owns "What we believe"), and the comp's
 * "DESIGNED IN PLACE" image chip left off pending real words.
 *
 * PAGE ORDER (after the 2026-07-12 night sweep — the client cut the
 * fields band, the values stack, how-we-work and finally the ghost
 * marquee, reworded the hero, and moved the DS's big numbers to Saol):
 * hero (centred manifesto) → full-bleed scene band → who we are + stats →
 * the method (bone, indexed) → split FAQ → ContactCTA (close: image +
 * text).
 *
 * NO CLIENT FACES on this page (settled 2026-07-11 brief) holds: the scene
 * band is a DEVICE MOCKUP of the studio's work (the sanctioned "craft, not
 * a person" imagery), not a portrait.
 */

export const metadata: Metadata = {
  title: "About — The studio",
  description:
    "North & Refine is a specialist design studio for medical aesthetic and cosmetic surgery practices: our story, our method and the way we work.",
  alternates: { canonical: "/about" },
};

/* The 2026-07-12 night sweep (client's list) removed the values stack
   ("What we believe"), the fields band ("Where we work") and the
   how-we-work section ("Working together") — their copy survives in git
   and the brief if any of it returns. */

const STATS = [
  { value: "10", label: "Years in the craft" },
  { value: "1", label: "Field, known deeply" },
  /* ⚠ PLACEHOLDER — "3" is provisional; confirm the projects-at-a-time
     number with Jess before launch. */
  { value: "3", label: "Projects at a time" },
];

/* The three method beats — the 1a comp's indexed list (2026-07-12 night):
   clay indices + hairline rows on bone, no StageGlyphs (the glyph plates
   left this page with the comp restage; the full five-glyph vocabulary
   stays on /services). */
const METHOD: { title: string; body: string }[] = [
  {
    title: "Understand the practice.",
    body: "Every engagement starts in the consulting room, not the moodboard: who the practice serves, what patients ask, what the practitioner wants to be known for. The brand and the website are answers; the practice is the question.",
  },
  {
    title: "Design with restraint.",
    body: "In this field, taste signals competence. We make fewer, better decisions: considered type, honest photography, copy that reassures rather than sells. That is what a discerning patient responds to.",
  },
  {
    title: "Measure and refine.",
    body: "Launch is the midpoint, not the finish. We watch how patients actually find and use the work, from search to enquiries to the pages that earn attention, and keep refining until the site serves the practice as well as the practice serves its patients.",
  },
];

/* One source for the rendered FAQ AND the FAQPage schema — the brief's
   Q&A text verbatim (questions phrased as real search queries; don't
   editorialise them). Twelve is this page's ceiling; cost/pricing
   questions live on /pricing, treatment verticals on the industry pages. */
const FAQS = [
  {
    question: "Can you build our website without rebranding us?",
    answer:
      "Yes. If the identity underneath is sound, we will happily build on it. But a website can only be as considered as the brand it expresses, which is why we usually recommend brand first: every decision downstream, from photography to copy to the site itself, spends the decisions the brand makes. If your identity needs work, we will say so honestly before any website begins.",
  },
  {
    question: "What should a practice invest in first?",
    answer:
      "Brand, then photography, then the website. The brand decides how you speak. Photography decides how you are seen, and nothing undoes clinical credibility faster than stock imagery. The website is where both go to work. Done in that order, each investment makes the next one worth more.",
  },
  {
    question: "Do you write the copy?",
    answer:
      "Yes. Copy is part of the design, not something poured in afterwards. In this field the words carry the regulation as well as the reassurance, so we write them the way we design everything else: patient-first, claim-careful, and in your practice’s voice. You review everything; nothing publishes without you.",
  },
  {
    question: "Do you do SEO?",
    answer:
      "Yes, as part of the craft rather than a plugin. Structured data, performance and content strategy are designed into every site from the first wireframe. We are also selective about it: we champion one practice per field in any given area, because ranking two competitors against each other would be pointless for both.",
  },
  {
    question: "Why are you a small studio?",
    answer:
      "By intention. A small studio has no red tape: decisions happen quickly, the work is never handed down a chain, and the thinking, design and build stay with the same hands. It also means we build real relationships with the practices we serve. We would rather do a limited number of projects properly than run a production line.",
  },
  {
    question: "Will a new website hurt our existing Google rankings?",
    answer:
      "Done properly, no. Protecting what you have already earned is part of the build, not an afterthought. We map every existing page before anything changes, carry your addresses across with redirects, and keep your domain. Practices usually come out of a rebuild more visible than they went in, because the structured data, performance and content work compound from launch.",
  },
  {
    question: "Can you log into our current website and update it from there?",
    answer:
      "No. We rebuild from scratch, because we can’t hold someone else’s build to the standard we hold our own: the performance, accessibility and structured data our work is known for are decided in the foundations, not the surface. Your existing domain comes with you, though, so nothing you’ve established there is lost.",
  },
  {
    question: "Can you design the website and hand it to our developer to build?",
    answer:
      "No. Here, the design and the build are one craft. Much of what makes our work perform, from speed and accessibility to structured data and the way type behaves, is decided in the build; a design handed over is a design finished by someone else. We would rather do fewer projects whole than more projects halfway, and we only put our name to work we have seen through.",
  },
  {
    question: "Do you understand the regulation around cosmetic medicine?",
    answer:
      "Yes. We write and design to the standards this field is held to: no naming of prescription treatments, no claims a practice couldn’t stand behind, patient-first information throughout. Work that has to be corrected by a compliance review isn’t finished work.",
  },
  {
    question: "How long does a project take?",
    /* ⚠ Confirm the six-to-ten-week typical timeline with Jess before
       launch (brief placeholder #2). */
    answer:
      "Six to ten weeks is typical for a brand and website together, depending on scope. We will give you an honest timeline before we start, and because we only run a few projects at once, the timeline we give is one we keep.",
  },
  {
    question: "Who owns the website when it’s done?",
    answer:
      "You do. The design, the build and the domain are yours: no proprietary platform holding your site hostage, no licence fee for your own brand. If we ever part ways, everything we made for you goes with you.",
  },
  {
    /* ⚠ PLACEHOLDER SHAPE — confirm with Jess how ongoing support is
       actually offered (retainer, ad-hoc, included period) before this
       answer ships (brief placeholder #5). */
    question: "What happens after launch?",
    answer:
      "We stay close. Launch is the midpoint of the method, not the end of it. We watch how patients find and use the site, and keep refining what the numbers ask us to.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]),
          faqSchema(FAQS),
        ]}
      />

      {/* Hero — the canonical interior masthead (2026-07-16 hero-cohesion
          pass: the 2026-07-12 centred manifesto converted to the split, the
          one system every interior page now opens with). Copy unchanged —
          the H1 + lede were already reworded 2026-07-12 when the earlier
          line read as disparaging other practices; the claim is the
          studio's own focus. No in-hero buttons per the settled CTA policy
          (/about is not a commercial page; the nav and the close carry
          them). No borderBottom: the full-bleed scene band directly below
          is the hero's own visual half — a rule between them would cut the
          pair apart. */}
      <PageHero
        align="split"
        spacious
        overline="The studio"
        title={
          <>
            A small studio with a single, <em>deliberate</em> focus.
          </>
        }
        lede="North & Refine designs websites for surgical and medical clinics and practitioners. One field, known deeply."
      />

      {/* The hero's visual half — a FULL-BLEED scene band, edge to edge
          (the 1a comp): the studio's craft on a laptop, bright against the
          ink above and below. Rowen laptop 4 (round travertine, sheer
          curtains) — the close's Rowen 8 stays unique to the ContactCTA.
          Height is a viewport band, not a figure ratio: this is scenery the
          page moves through, cropped by the band (photography may crop;
          only SCREEN CAPTURES are never cropped). First-paint content, so
          it rides the LOAD-IN system (animate-fade-in-slow continuing the
          hero's stagger), not .reveal — heroes never wait for the
          IntersectionObserver.
          ⚠ RETINA: this file is a 1200px blog export now serving 100vw —
          re-export at 2400px+ before launch (added to the CLAUDE.md
          checklist alongside Rowen 5 and 8).
          ⚠ The comp shows a small "DESIGNED IN PLACE" chip on this image —
          words unexplained, so it is left off; add it back when Jess
          confirms the real label. */}
      <section>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/blog/plate-rowen-laptop-4.jpg"
          alt="A laptop on a round travertine table displaying the Dr Yalda Jamali website, brand and web design by North & Refine"
          loading="eager"
          className="h-[55vh] w-full object-cover opacity-0 animate-fade-in-slow md:h-[72vh]"
          style={{ animationDelay: "0.45s" }}
        />
      </section>

      {/* TEXT · who we are — the 1a comp's grammar: kicker in the left
          rail, the narrative alone in the right measure (no statement
          heading — the comp carries the section on prose), the ruled stats
          closing the band. Copy is the brief's FINAL origin trio, P1
          restored to its original unsplit form. Kicker bone per canon.
          (The ghost marquee that closed this section was cut at the
          client's call, 2026-07-12 late — the parked device goes back in
          the drawer.) */}
      <section className="bg-ink">
        <div className="shell pt-20 pb-16 md:pt-28 md:pb-24">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            <p className="overline reveal md:col-span-4">Who we are</p>
            <div className="max-w-2xl space-y-6 md:col-span-7 md:col-start-6">
              <p className="body-lg text-bone reveal" style={{ transitionDelay: "80ms" }}>
                North &amp; Refine exists because of a simple conviction: everyone is a
                patient sooner or later, and patients deserve the best information. The
                practitioners doing the most careful work, the ones who explain, reassure
                and take their time, are too often represented online by websites that do
                none of those things.
              </p>
              {/* Guardrail: "digital health" is the only public description
                  of the founder's past employment — never name the employer. */}
              <p className="body text-bone-dim reveal" style={{ transitionDelay: "160ms" }}>
                The studio was founded after ten years in design, the later of them spent
                in digital health: close enough to medicine to understand how
                practitioners think, and how much of a patient&rsquo;s trust is decided
                before they ever walk in. That experience became a specialism. Design for
                people whose work is looking after people.
              </p>
              <p className="body text-bone-dim reveal" style={{ transitionDelay: "240ms" }}>
                So we work in one field, on purpose, and we enjoy it. Helping a good
                practice communicate as well as it treats is not a niche we settled for;
                it is the work we would choose again tomorrow. Everything is designed and
                built in-house, with search, accessibility and regulation treated as part
                of the craft.
              </p>
            </div>
          </div>

          {/* The stats rule the section off — the results-band grammar
              (hairline top, ruled left separators from sm). */}
          <div className="mt-16 border-t rule-dark pt-10 md:mt-24 md:pt-12">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className="reveal sm:border-l sm:border-ink-line sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <p className="stat text-bone">{s.value}</p>
                  <p className="label text-bone-dim mt-3">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEXT · the method — the 1a comp's convictions layout on BONE
          (the light middle returns at the client's call): header stack
          left (kicker, signpost heading, short lede, ghost onward link),
          the three beats as an indexed ruled list right — clay indices per
          canon (the client chose canon colours over the comp's gold), rule
          ABOVE every row per the comp, index on the title's baseline.
          Relabelled from the comp's "What we believe" to the method's own
          voice — the values stack below owns that kicker. */}
      {/* Image LEFT, all text RIGHT (2026-07-16, client test) — rendered TWICE,
          light then dark, otherwise identical, to compare the two grounds.
          ⚠ placeholder image in MethodSection until the real asset lands. */}
      <MethodSection tone="light" method={METHOD} />
      <MethodSection tone="dark" method={METHOD} />

      {/* TEXT · FAQ — the split band, via the shared <FaqSection>
          (componentised 2026-07-12 at the client's call; /services uses
          the same component). The same FAQS array feeds the FAQPage
          schema above via faqSchema — one source, page-owned structured
          data. Title retitled the same night ("Asked, answered" was a bad
          title): plain, search-honest, in the FAQ's own real-query
          register. The top rule marks the bone-to-ink seam under the
          method section. */}
      <FaqSection
        kicker="Common questions"
        heading="What practices ask us."
        faqs={FAQS}
        cta={{ label: "Ask us directly", href: "/contact" }}
      />

      <ContactCTA />
    </main>
  );
}
