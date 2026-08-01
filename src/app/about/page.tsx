import type { Metadata } from "next";
import Link from "next/link";
import ContactCTA from "@/components/ContactCTA";
import FaqSection from "@/components/FaqSection";
import MethodSection from "@/components/MethodSection";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import HeroGlow from "@/components/HeroGlow";
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
      "Six to ten weeks is typical for a website and brand together, depending on scope. We will give you an honest timeline before we start, and because we only run a few projects at once, the timeline we give is one we keep.",
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

/* ── The double ream (2026-07-23) ─────────────────────────────────────
   Two staggered, edge-cropped rows of rounded tiles under the hero text,
   each a semi-transparent black glass card with a blank device rising
   from its foot (same-day revision: per-tile gradients CUT at the
   client's call — the SECTION ground carries the gradient, like the
   other pages' SectionGlow grounds, and the tiles let it read through).
   Local to this page while the direction settles; promote to a component
   if a second page wants it. */

function BlankPhone() {
  return (
    <div
      style={{
        position: "relative",
        width: "34%",
        aspectRatio: "320 / 680",
        background: "#060607",
        // White bezel edge (2026-07-23, with the pure-black tiles): the
        // device contrasts against the black pane by its own rim.
        border: "1px solid #FFFFFF",
        borderRadius: "clamp(14px,1.4vw,24px)",
        padding: "clamp(3px,0.3vw,5px)",
        boxShadow: "0 30px 60px -18px rgba(0,0,0,0.55)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: "clamp(7px,0.7vw,12px)",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(24px,2.4vw,40px)",
          height: "clamp(7px,0.7vw,12px)",
          background: "#000",
          borderRadius: "999px",
          zIndex: 2,
        }}
      />
      <div style={{ width: "100%", height: "100%", borderRadius: "clamp(11px,1.15vw,20px)", background: "#121112" }} />
    </div>
  );
}

function BlankLaptop() {
  return (
    <div
      style={{
        width: "72%",
        background: "#060607",
        // White bezel edge — see BlankPhone.
        border: "1px solid #FFFFFF",
        borderRadius: "clamp(8px,0.8vw,14px)",
        padding: "clamp(4px,0.4vw,7px)",
        boxShadow: "0 30px 60px -18px rgba(0,0,0,0.55)",
      }}
    >
      <div style={{ width: "100%", aspectRatio: "722 / 459", borderRadius: "clamp(5px,0.5vw,9px)", background: "#121112" }} />
    </div>
  );
}

function MockupReam({ row }: { row: 0 | 1 }) {
  // Six larger tiles ≈ 170vw (2026-07-23 same-day: six SHOWING per row read
  // as too many — bigger tiles, ~3–4 in view) — the row always overflows
  // and crops at the screen edges. The second row shifts the device pattern
  // and slides sideways, so the two reams read as a staggered contact
  // sheet, not a grid.
  const tiles = Array.from({ length: 6 }, (_, i) => i);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "clamp(12px,1.4vw,24px)",
        transform: row === 0 ? "translateX(-6vw)" : "translateX(6vw)",
      }}
    >
      {tiles.map((i) => {
        const phone = (i + row) % 2 === 0;
        return (
          <div
            key={i}
            style={{
              position: "relative",
              flexShrink: 0,
              width: "max(280px, 27vw)",
              aspectRatio: "4 / 3",
              borderRadius: "clamp(18px,1.8vw,30px)",
              overflow: "hidden",
              // Tiles are LIGHT GLASS (2026-07-23, third revision of the
              // day: dark glass → "make the background lighter") — the
              // .card-glass idiom's bone-tinted lift, rounded per the
              // current direction: the tiles now read as lifted panes ON
              // the glowing canvas rather than holes in it. The ground
              // still owns the colour; the glass only lightens it.
              // SOLID PURE BLACK (client, same day, after white: "try pure
              // black") — the devices contrast via their WHITE BEZEL BORDER
              // instead of the card; the black panes read as windows cut
              // into the warm canvas.
              background: "#000000",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
            }}
          >
            {/* Device rises from the tile's foot and crops there — the tile
                is the frame, the screen stays blank glass. */}
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                transform: phone ? "translateY(18%)" : "translateY(14%)",
              }}
            >
              {phone ? <BlankPhone /> : <BlankLaptop />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

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
      {/* THE SHARED CANVAS (2026-07-23, third pass of the day): hero + ream
          are ONE surface. The seam-contract approach (hero fades to an
          anchor tone, section wash resumes from it) failed HERE because
          /about's glow is still bright at the hero's foot — both sides
          dipped dark at the boundary and the join read as a line with a
          film over the ream. So: one wrapper owns the ground (warm base,
          ONE HeroGlow spanning both, grain), the hero renders bare
          (ground={false}) and the ream sits lower on the same canvas — no
          seam exists to hide. The wrapper's foot fades to ink so the
          who-we-are section joins invisibly (ink meets ink). */}
      <div className="relative overflow-hidden grain bg-[#16110C]">
        {/* 0.9 → 0.7 (2026-07-24, the sitewide "bit much" trim) — the canvas
            keeps a touch more than the interior heroes since it feeds the
            glass tiles too. */}
        <HeroGlow intensity={0.7} />
        {/* The canvas foot resolves to page ink over its last stretch — the
            method band below is BONE, so the dark story ends on canonical
            ink before the designed ink→bone cut. (The 2026-07-23 attempt to
            END the canvas at the ream and hand off to a SectionGlow seam in
            Who-we-are left a visible line — the seam-matching contract is
            retired on this page; ONE CANVAS is the fix. See CLAUDE.md
            "Blending dark sections".) */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            insetInline: 0,
            bottom: 0,
            height: "clamp(200px,26vh,340px)",
            background:
              "linear-gradient(180deg, rgba(17,14,10,0) 0%, var(--ink) 100%)",
            pointerEvents: "none",
          }}
        />

      <PageHero
        align="split"
        spacious
        ground={false}
        overline="The studio"
        title={
          <>
            A small studio with a single, <em>deliberate</em> focus.
          </>
        }
        lede="North & Refine designs websites for surgical and medical clinics and practitioners. One field, known deeply."
      />

      {/* The hero's visual half — a DOUBLE REAM of device mock-ups
          (2026-07-23, client's call, replacing the 1a comp's full-bleed
          Rowen scene band): two staggered rows of quiet glass tiles, each a
          rounded card carrying a blank device (screens stay blank while
          imagery is being rechosen — same call as the homepage hero). The
          CANVAS ground glows through the glass; the tiles carry no colour
          of their own. Both rows overflow the viewport and crop at the
          screen edges like the homepage device row. Purely decorative →
          aria-hidden. First-paint content, so it rides the LOAD-IN system
          (animate-fade-in-slow continuing the hero's stagger), not
          .reveal. (Rowen laptop 4 is freed up — its retina re-export note
          moves out with it if this stays.) */}
      <section aria-hidden className="relative">
        <div
          className="relative z-10 opacity-0 animate-fade-in-slow"
          style={{
            animationDelay: "0.45s",
            display: "flex",
            flexDirection: "column",
            gap: "clamp(12px,1.4vw,24px)",
            // Modest air between the hero text and the tiles — same canvas,
            // so this is rhythm, not a seam.
            paddingBlock: "clamp(32px,5vh,72px) clamp(40px,6vw,80px)",
          }}
        >
          <MockupReam row={0} />
          <MockupReam row={1} />
        </div>
      </section>

      {/* TEXT · who we are — the 1a comp's grammar: kicker in the left
          rail, the narrative alone in the right measure (no statement
          heading — the comp carries the section on prose), the ruled stats
          closing the band. Copy is the brief's FINAL origin trio, P1
          restored to its original unsplit form. Kicker bone per canon.
          (The ghost marquee that closed this section was cut at the
          client's call, 2026-07-12 late — the parked device goes back in
          the drawer.) */}
      {/* INSIDE THE SHARED CANVAS (2026-07-24: the SectionGlow seam handoff
          left a visible line here twice — the client called it: fix it the
          way that WORKED, one wrapper). No ground of its own — the canvas
          carries base, glow, grain and the foot fade; this band adds only
          its own quiet blob (right, since the canvas glow leans left). */}
      <section className="relative">
        <div
          aria-hidden
          style={{
            position: "absolute",
            right: "-14%",
            top: "20%",
            width: "46%",
            height: "60%",
            borderRadius: "50%",
            background: "#C2A878",
            opacity: 0.05,
            filter: "blur(150px)",
            pointerEvents: "none",
          }}
        />
        <div className="shell relative z-10 pt-20 pb-16 md:pt-28 md:pb-24">
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
          {/* The STATS ROW that closed this band was cut 2026-07-24 at the
              client's call ("remove the stats section, I don't like it") —
              it also took the flagged "3 projects at a time" placeholder off
              the pre-launch list. The narrative now closes the band. */}
        </div>
      </section>
      {/* ── shared canvas ends: hero → ream → who-we-are, one ground ── */}
      </div>

      {/* TEXT · the method — the 1a comp's convictions layout on BONE
          (the light middle returns at the client's call): header stack
          left (kicker, signpost heading, short lede, ghost onward link),
          the three beats as an indexed ruled list right — clay indices per
          canon (the client chose canon colours over the comp's gold), rule
          ABOVE every row per the comp, index on the title's baseline.
          Relabelled from the comp's "What we believe" to the method's own
          voice — the values stack below owns that kicker. */}
      {/* GROUND SETTLED 2026-07-24: the 2026-07-16 test rendered this band
          TWICE (bone then ink) to compare grounds and the comparison never
          got called — it was still shipping both, ~30% of the page, with a
          duplicate H2 on an SEO-led route. The client chose BONE; the ink
          copy and the `tone` prop are gone. This is now the page's ONE light
          act, between the dark canvas above and the ink FAQ below.
          ⚠ placeholder image in MethodSection until the Claude Design asset
          lands. */}
      <MethodSection method={METHOD} />

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
