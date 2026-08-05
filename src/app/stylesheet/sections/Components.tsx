import { Tier, Section, Sub, Code, Stage, Entry } from "../_ui";
import NRMonogram from "@/components/NRMonogram";
import StageGlyph from "@/components/StageGlyph";
import PhoneMockup from "@/components/PhoneMockup";
import BrowserMockup from "@/components/BrowserMockup";
import ServicesShowcase from "@/components/ServicesShowcase";
import Carousel from "@/components/Carousel";
import ServicesHeroGraphic from "@/components/graphics/ServicesHeroGraphic";
import { ServicesTileWeb } from "@/components/graphics/ServicesTiles";

/**
 * TIER 04 — COMPONENTS. Every component in src/components, documented from the
 * code rather than from memory.
 *
 * WHAT IS RENDERED AND WHAT IS NOT. A component is demoed here only when it is
 * honest at this scale and safe on this page: it must take simple static props,
 * need nothing from the content collections, and mount no global behaviour.
 * That rules out most of the library, and deliberately so:
 *
 *  · Full-bleed BANDS (PageHero, ContactCTA, FaqSection, Testimonial,
 *    MethodSection) carry their own ground and their own vertical air. Shrunk
 *    into a documentation stage they would misreport the one thing they exist
 *    to control, which is space.
 *  · SCROLL machinery (ManifestoStatement, ServicesScrollIndex) measures a
 *    track the consumer owns. Off that track the demo would simply be wrong.
 *  · GLOBAL mounts (Navbar, Reveal, SmoothScroll, ExitFades, the overlay host)
 *    already run once in the root layout, and this page sits inside it. A
 *    second copy would fight the real one.
 *  · LIVE FORMS post to Netlify. A second `start-project` or `project-enquiry`
 *    form in the DOM is a real submission path, not a specimen.
 *  · JsonLd emits structured data. A specimen would publish invented schema.
 *
 * Everything not rendered gets a card that says what it is, what it takes and
 * where it runs, plus the reason it is described rather than shown.
 */

/** Component heading: the name, then the routes that render it. */
function Comp({ name, where }: { name: string; where: string }) {
  return <Sub title={name} note={where} />;
}

/** The body of a component card. */
function What({ children }: { children: React.ReactNode }) {
  return <p className="body-sm mt-3 max-w-[72ch] text-bone-dim">{children}</p>;
}

/** A prop list. Rows are Entry rows so props and components share one voice. */
function Props({ children }: { children: React.ReactNode }) {
  return <div className="mt-5">{children}</div>;
}

export default function ComponentsTier() {
  return (
    <>
      <Tier
        id="components"
        num="04"
        title="Components"
        note="The library as it actually ships: every file in src/components, its real props, and the routes that render it. Where a component is described rather than demoed, the card says why. Nothing here is aspirational."
      />

      {/* ── MARKS AND PRIMITIVES ─────────────────────────────────────────── */}
      <Section
        id="components-primitives"
        title="Marks and primitives"
        note="Three components that render themselves and nothing else. All are server components with no state, so they are safe anywhere in the tree."
      >
        <Comp name="NRMonogram" where="Navbar, Footer, the Start-a-project overlay bar." />
        <What>
          The dot-compass NR lockup as one inline SVG (N, needle, R), fully
          outlined. It fills with <Code>currentColor</Code>, so it takes the
          surrounding text colour and never needs a light and dark file: size it
          with an <Code>h-*</Code> class and the width follows the 216×84
          viewBox. It carries its own <Code>role=&quot;img&quot;</Code> and the
          label &quot;North &amp; Refine&quot;, which is why the overlay can use
          it as a bare stamp and still have the studio&rsquo;s name read aloud.
        </What>
        <Props>
          <Entry name="className" what="Sizing and colour. Everything else is fixed." />
        </Props>
        <Stage>
          <div className="flex flex-wrap items-end gap-10">
            <div>
              <NRMonogram className="h-6 w-auto text-bone" />
              <p className="fineprint mt-3">h-6, text-bone: the nav at md.</p>
            </div>
            <div>
              <NRMonogram className="h-5 w-auto text-bone-dim" />
              <p className="fineprint mt-3">h-5, text-bone-dim.</p>
            </div>
          </div>
        </Stage>
        <Stage ground="bone">
          <NRMonogram className="h-6 w-auto text-ink" />
          <p className="fineprint mt-3 text-ink-mute">
            The same mark on bone, tinted by <Code>text-ink</Code>. One file,
            both grounds.
          </p>
        </Stage>

        <Comp name="StageGlyph" where="The /services/[slug] process plates." />
        <What>
          The process marks: the site&rsquo;s own hairline bent into a pure
          form. Every stroke is <Code>stroke-width 1</Code> with{" "}
          <Code>vector-effect: non-scaling-stroke</Code>, which is the load
          bearing part, because it keeps the glyph identical in weight to a{" "}
          <Code>rule-dark</Code> divider at any rendered size. Allowed elements
          are circle, line, rect and triangle only; no paths, no arcs, never an
          imported icon set. Colour arrives through <Code>currentColor</Code>:
          champagne on ink (the ornament-glyph use), <Code>text-ink/70</Code> on
          light. The glyphs are always <Code>aria-hidden</Code>, so a plate must
          still read with the glyph deleted.
        </What>
        <What>
          Motion M·1: each stroke carries <Code>pathLength=&#123;100&#125;</Code>{" "}
          and <Code>.sg-stroke</Code>, and draws itself in when the glyph sits
          inside a <Code>.reveal</Code> that gains <Code>.is-in</Code>. Outside a
          reveal it renders fully drawn, so it is safe to drop anywhere. Stagger
          per plate with <Code>--sg-delay</Code> on the reveal element. The
          specimens below are outside a reveal, so they show the end state.
        </What>
        <Props>
          <Entry name="stage" what="1 | 2 | 3 | 4 | 5. The working set R5: lens pair, rings, corner-lock, triangle, trued." />
          <Entry name="className" what="Sizing. Render at h-12 to h-14; below ~32px the overlaps muddy, above ~80px the glyph competes with the type ladder." />
        </Props>
        <Stage>
          <div className="flex flex-wrap items-start gap-x-10 gap-y-8 text-champagne">
            {([1, 2, 3, 4, 5] as const).map((stage) => (
              <div key={stage}>
                <StageGlyph stage={stage} className="h-12 w-12" />
                <p className="index-num mt-3 text-clay">0{stage}</p>
              </div>
            ))}
          </div>
        </Stage>

        <Comp name="JsonLd" where="Root layout (Organization, WebSite) and nearly every page for its own breadcrumb; detail pages add Article or CreativeWork; services, pricing and industries add Service and FAQPage." />
        <What>
          Serialises one schema object or an array of them into{" "}
          <Code>&lt;script type=&quot;application/ld+json&quot;&gt;</Code>. A
          server component, so emit it anywhere in a page tree. Builders live in{" "}
          <Code>@/lib/schema</Code>; structured data is never written inline.
          NOT RENDERED here: a specimen would publish invented structured data
          on this page.
        </What>
        <Props>
          <Entry name="data" what="object | object[]. An array is emitted as one script tag per node." />
        </Props>

        <Sub
          title="A stray duplicate"
          note="src/components/handoff/StageGlyph.tsx is a copy shipped with a design handoff, alongside HANDOFF.md, canon-updates.md and globals-additions.css. Nothing imports it. The live component is src/components/StageGlyph.tsx; treat the handoff folder as reference material, not source."
        />
      </Section>

      {/* ── MOCKUPS AND MEDIA ────────────────────────────────────────────── */}
      <Section
        id="components-media"
        title="Device mockups and media"
        note="The hardware frames and the pieces that carry imagery. Device bezels keep their own hardware radii: they are the standing exception to the plate radius scale, because a phone corner is a real object, not a framed picture."
      >
        <Comp name="PhoneMockup" where="/work/[slug] device cluster; /mockups/obsidian." />
        <What>
          An iPhone-style frame around either a real mobile screenshot (pass{" "}
          <Code>screenshot</Code>, preferred) or a CSS miniature clinic site,
          which is the placeholder until real captures land. The screen sits at
          aspect <Code>0.462</Code> and crops top-aligned, so tall
          mobile-viewport captures around 390px wide work best. The placeholder
          depicts a mock practice; it is furniture, not client work.
        </What>
        <Props>
          <Entry name="screenshot" what="Path to a real capture. Replaces the CSS mini-site entirely." />
          <Entry name="screenshotAlt" what="Required with screenshot. Accessibility, not decoration." />
          <Entry name="screen" what="'editorial' (parchment, default) | 'ink' (dark). Placeholder mode only." />
          <Entry name="size" what="'sm' (w-40) | 'md' (default, w-52/56) | 'lg' (w-64/80, the hero statement device)." />
          <Entry name="name / specialty" what="Text inside the placeholder mini-site." />
          <Entry name="className" what="Positioning in a cluster." />
        </Props>
        <Stage>
          <div className="flex flex-wrap items-start gap-10">
            <div>
              <PhoneMockup size="sm" screen="editorial" />
              <p className="fineprint mt-4">size=&quot;sm&quot;, screen=&quot;editorial&quot;</p>
            </div>
            <div>
              <PhoneMockup size="sm" screen="ink" />
              <p className="fineprint mt-4">size=&quot;sm&quot;, screen=&quot;ink&quot;</p>
            </div>
          </div>
        </Stage>

        <Comp name="BrowserMockup" where="/work/[slug]; /mockups/hero-three, /mockups/print-hero-poster." />
        <What>
          The wide companion to PhoneMockup: a macOS-style window (traffic
          lights, address pill) around a real desktop capture or a CSS editorial
          clinic site. The viewport sits at aspect <Code>1.6</Code>, so desktop
          captures shot at 1440×900 drop in uncropped. Anchored with a
          PhoneMockup overlapping its corner, this is the canonical responsive
          showcase cluster.
        </What>
        <Props>
          <Entry name="screenshot / screenshotAlt" what="A real desktop capture and its alt text." />
          <Entry name="domain" what="The address-bar label, e.g. 'dryalda.com.au'." />
          <Entry name="name / specialty" what="Text inside the placeholder site." />
          <Entry name="className" what="Sizing and position." />
        </Props>
        <Stage>
          <div className="max-w-[520px]">
            <BrowserMockup />
          </div>
        </Stage>

        <Comp name="WorkCard" where="/work index only." />
        <What>
          A case study as a horizontal editorial row: a 16:10 plate on one side,
          the text on the other, alternating sides down the page on odd indices.
          The client name sits at <Code>.heading-md</Code> rather than the{" "}
          <Code>.card-title</Code> caption register, so each piece reads as a
          work in its own right. No hover motion on the plate: the affordance is
          the caption dim plus the champagne arrow. Falls back to a typographic
          index numeral on <Code>.portrait-fill</Code> when no image exists.
        </What>
        <What>
          NOT RENDERED: it takes a <Code>WorkEntry</Code> from the content
          collection and links to a real case-study route. A fabricated entry
          would be invented client work on the studio&rsquo;s own reference page.
        </What>
        <Props>
          <Entry name="project" what="WorkEntry from @/lib/work." />
          <Entry name="index" what="Drives the 0n placeholder numeral and the alternating side." />
          <Entry name="tone" what="'dark' (default) | 'light'." />
        </Props>

        <Comp name="Carousel" where="Homepage: the blog rail at every size, and the Selected work rail below md. Also /mockups/old-hero." />
        <What>
          The contact-sheet rail. Native scroll-snap plates, hard clipped at the
          shell edge with no fade mask, sized so the next plate peeks as the
          invitation to scroll. Below it sits the folio line: a hairline, two
          arrow buttons (bone, champagne on hover) and a page counter in the meta
          voice. It NEVER autoplays; the reader turns the pages. The folio hides
          itself entirely when the track does not overflow, so a short collection
          degrades to a calm static row rather than showing dead arrows. Buttons
          respect reduced motion with an instant jump.
        </What>
        <Props>
          <Entry name="ariaLabel" what="Accessible name for the region, e.g. 'Latest blog posts'." />
          <Entry name="slideClassName" what="Width classes per slide. This is where the peek is set." />
          <Entry name="className" what="Outer spacing." />
          <Entry name="children" what="One node per slide." />
        </Props>
        <Stage>
          <Carousel ariaLabel="Carousel specimen" slideClassName="w-[62%] sm:w-[42%]">
            {["01", "02", "03", "04"].map((n) => (
              <div key={n} className="frame aspect-[16/10]">
                <span className="portrait-fill absolute inset-0 flex items-center justify-center">
                  <span className="index-num text-ink/25" aria-hidden>
                    {n}
                  </span>
                </span>
              </div>
            ))}
          </Carousel>
        </Stage>

        <Comp name="LogoStrip" where="Homepage, directly under the Kind words testimonial. Also /mockups/old-hero." />
        <What>
          The trust bar: a quiet ruled strip of client marks, each linking to its
          case study, fed from the work collection so it cannot drift. It carries
          no background of its own and sits on whatever dark section holds it.
          Marks are ALWAYS monochrome bone, with per-mark heights tuned to equal
          optical width, because the two wordmarks differ roughly 6:1 against
          13:1 in aspect and equal heights would render wildly unequal widths.
          The row never wraps and never auto-moves: a marquee was trialled and
          retired the same day it was built. Practices without a file yet cycle
          the pool.
        </What>
        <What>
          NOT RENDERED: it needs real practice names and real case-study routes,
          and the marks are matched to practices by name so the accessible labels
          stay honest.
        </What>
        <Props>
          <Entry name="items" what="{ name, href }[]. Name matches a mark in the pool; href is the case study." />
          <Entry name="label" what="The kicker. Defaults to 'Trusted by'." />
        </Props>
      </Section>

      {/* ── HEROES ───────────────────────────────────────────────────────── */}
      <Section
        id="components-heroes"
        title="Heroes"
        note="One interior masthead, one bespoke homepage hero, and the two ground layers they share. Heroes are first-paint content, so their entrance is a load-in (opacity-0 plus animate-fade-in with delay staggers), never an IntersectionObserver reveal."
      >
        <Comp
          name="PageHero"
          where="/about, /blog, /contact, /industries, /industries/[slug], /pricing, /privacy, /services, /services/[slug], /start-a-project, /work."
        />
        <What>
          The canonical interior masthead. Extend it through props; never spawn a
          HeroX variant. The standard recipe is{" "}
          <Code>align=&quot;split&quot; spacious borderBottom</Code>: the display
          heading holds columns 1 to 7, and the lede sits in columns 9 to 12
          locked to the heading&rsquo;s LAST baseline. Split heroes take the{" "}
          <Code>.display</Code> register; every other layout takes{" "}
          <Code>.heading-xl</Code>. It sits on <Code>.shell</Code>, the one rail
          shared with the nav and every section below.
        </What>
        <What>
          THE GROUND. A dark hero paints the warm base <Code>#16110C</Code>,
          layers <Code>HeroGlow</Code> at intensity 0.6 with topLeft 0.3, adds{" "}
          <Code>.grain</Code>, and closes with a seam-anchor strip resolving to
          one fixed tone (<Code>#14100B</Code>) at its foot, which is exactly the
          tone <Code>SectionGlow</Code> resumes from on the other side of the
          boundary. Change one, change both.
        </What>
        <What>
          ⚠ NAV CLEARANCE IS THE HERO&rsquo;S JOB. The nav is absolute and
          transparent, so the section&rsquo;s first 96px (128px at md) sit behind
          it. Top padding must carry that clearance, and air is judged optically
          from the nav&rsquo;s foot, not the section edge. The live media recipe
          is pt-40 with pb-8 around splitBox&rsquo;s py-28, which measures 144
          above and 144 below.
        </What>
        <Props>
          <Entry name="title" what="ReactNode. The H1. An <em> inside it renders the Saol italic accent word." />
          <Entry name="overline" what="The kicker. Rendered as a direct sibling so .from-overline carries the gap." />
          <Entry name="lede" what="The subtitle. In split mode it takes the right columns; in wide and media modes it sits under the heading." />
          <Entry name="cta" what="{ label, href }. COMMERCIAL PAGES ONLY: /services, /pricing and the industries pages carry one; /work, /blog and /about stay button-free." />
          <Entry name="ctaVariant" what="'primary' (default) | 'glass' (.btn-glass, dark heroes only). One live consumer: /services." />
          <Entry name="meta" what="A small label line beside the CTA, baseline-locked to it." />
          <Entry name="media" what="The graphic slot. Split only: the text stack moves to columns 1 to 6 and the node takes 7 to 12, vertically centred. Brand graphics run at their NATIVE ratio, so the 16:10 and 4:5 canon does not govern them. One live consumer: /services." />
          <Entry name="align" what="'left' (the DEFAULT) | 'center' | 'split'. Every page passes split except /privacy, which takes the default and is therefore the one live consumer of the legacy left layout." />
          <Entry name="wide" what="Split only: the heading runs the full rail in long lines and the whole stack stays flush left. One live consumer: /work, whose H1 carries inline title chips." />
          <Entry name="tone" what="'dark' (default) | 'light'. A light hero needs its exact route in Navbar's LIGHT_TOP_ROUTES or the nav renders bone on bone. No live consumers." />
          <Entry name="spacious" what="The taller band and the generous padding. Part of the standard recipe." />
          <Entry name="borderBottom" what="A tone-aware hairline at the hero foot, at CONTENT width so it aligns with the section rules below rather than the shell border-box." />
          <Entry name="grain" what="Default true. No live false consumers since every dark section gained the grain." />
          <Entry name="ground" what="Default true. Set false for the shared-canvas escape hatch: the hero renders no ground at all so the PAGE can wrap it and its neighbour in one surface. One live consumer: /about." />
        </Props>
        <What>
          NOT RENDERED: a masthead is a composition of air. At stage width the
          proportions, the nav clearance and the baseline lock all misreport
          themselves. Read it live on /work (wide) and /services (media).
        </What>

        <Comp name="HomeHero" where="Homepage only." />
        <What>
          The bespoke homepage hero: a centred kicker in the shared{" "}
          <Code>.overline</Code> voice, a large headline with a Saol-italic
          accent word set inline, the flagship pill plus a ghost link, and a
          phone, desktop, phone row bled off the bottom and both sides so the
          outer phones crop at the screen edges. The device screens are BLANK by
          the client&rsquo;s call: the frames hold their shape while new imagery
          is chosen. It carries no nav of its own; the site Navbar renders above
          it like every other page.
        </What>
        <What>
          ⚠ IT SITS OUTSIDE THE LADDER. The H1 size, weight and letter-spacing
          are set inline rather than through a display utility, and the pills are
          hand-rolled rather than composed from <Code>.btn</Code>. That is a
          known deviation in a one-off composition ported from a design comp, not
          a licence to do the same elsewhere. No props.
        </What>
        <What>
          NOT RENDERED: <Code>min-height: 100vh</Code> plus an absolutely
          positioned device row that must overflow the viewport to read
          correctly.
        </What>

        <Comp name="HeroGlow" where="HomeHero (intensity 1), every dark PageHero (0.6), the ContactCTA card (0.8), and the /about shared canvas." />
        <What>
          The warm gradient ground, in one place so every hero reads as the same
          site. Three blurred blobs plus a vignette, all absolute and
          pointer-events-none. The parent must be relative, overflow-hidden, and
          must set the warm base itself; content rides above on its own z-index.
          A lighter, less muddy version was trialled and reverted the same day:
          the deeper vignette is what gives the bone logo and nav their contrast.
        </What>
        <Props>
          <Entry name="intensity" what="Scales blob opacity. 1 is the full homepage ground; 0.6 is the quieter interior dose." />
          <Entry name="topLeft" what="An extra multiplier on the top-left champagne pool alone, so the pool behind an H1 can quieten without flattening the rest." />
          <Entry name="vignette" what="Multiplier on the vignette alone. Nothing passes it today: the overlay it was built for went light the same day." status="parked" />
        </Props>

        <Comp name="SectionGlow" where="/work, /services, /services/[slug], /contact, /start-a-project." />
        <What>
          The hero blend&rsquo;s decay below the seam, at a fraction of
          HeroGlow&rsquo;s dose. Three layers painted in order: one quiet
          in-family blob deeper in the section, a faint amber tail bleeding down
          from the seam, then the seam wash itself, which starts at the
          hero&rsquo;s anchor tone and is gone by about half the section height.
          The seam wash is painted last so it wins at the boundary. The parent
          must be relative and overflow-hidden with its own <Code>bg-ink</Code>.
        </What>
        <What>
          ⚠ The seam contract shipped and failed twice on /about. Where a join is
          ever reported, the fix is converting that page to the shared canvas,
          not more seam tuning.
        </What>
        <Props>
          <Entry name="blob" what="'left' | 'right'. Vary per page so neighbouring pages do not repeat." />
          <Entry name="intensity" what="Scales the whole dose." />
          <Entry name="seamEmphasis" what="The /services hero to belief seam only: a richer tail and a slightly stronger side blob. Not a general warm-up knob." />
        </Props>
      </Section>

      {/* ── SECTION BANDS ────────────────────────────────────────────────── */}
      <Section
        id="components-bands"
        title="Section bands"
        note="Full-width bands you drop into a page. Each owns its ground, its padding tier and its type ladder, which is exactly why none of them is demoed at stage width."
      >
        <Comp name="ContactCTA" where="Homepage, /about, /blog, /blog/[slug], /industries, /industries/[slug], /pricing, /services, /services/[slug], /work, /work/[slug]." />
        <What>
          The sitewide close. The section is ink with grain; the close itself is
          a <Code>rounded-plate-lg</Code> card carrying the HERO&rsquo;S OWN
          GROUND (warm base, HeroGlow at 0.8, grain) with the CTA inside it. The
          page opens under a warm glow and shuts on the same light held in a
          card. The gradient lives INSIDE the card, never on the section ground:
          a scoped exception to the flat-ground rule, like the homepage craft
          card.
        </What>
        <What>
          Inside, the close mirrors the hero: kicker, <Code>.heading-xl</Code>{" "}
          with the italic accent, <Code>.body-xl</Code> lede, the flagship{" "}
          <Code>.btn-primary-dark .btn-arrow</Code> plus a ghost link, all left
          on the rail, with the close plate (16:10) on columns 9 to 12 bottom
          locked to the CTA row. Static: the close resolves, it does not perform.
          On mobile the plate falls in flow after the buttons, right anchored at
          three fifths.
        </What>
        <Props>
          <Entry name="heading" what="Overrides the default H2. Plain text, so an override carries no italic accent." />
          <Entry name="body" what="Overrides the supporting line." />
        </Props>

        <Comp name="FaqSection" where="/about, /pricing, /industries/[slug], /services/[slug] (cream) and /services (dark)." />
        <What>
          THE ONE FAQ IN THE SYSTEM. Every FAQ on the site renders through here;
          a bespoke <Code>&lt;details&gt;</Code> block is a drift pattern, so
          extend this component the way <Code>tone</Code> did rather than forking
          it. Layout: the kicker is hoisted above the locked grid so the HEADING
          leads its block, the head and optional outline button take columns 1 to
          4, and the ruled accordion takes 6 to 12 with its first question
          baseline-locked to the H2. Summaries sit at <Code>.heading-sm</Code>,
          one register below the section head. The champagne plus glyph rotates
          45 degrees on open.
        </What>
        <What>
          Schema is NOT emitted here. Pages pass the same faqs array to{" "}
          <Code>faqSchema()</Code> through <Code>JsonLd</Code> themselves, so the
          rendered text and the FAQPage schema stay one source and the page keeps
          ownership of its structured data.
        </What>
        <Props>
          <Entry name="kicker" what="The overline above the grid." />
          <Entry name="heading" what="The section H2 at .heading-lg, the signpost register." />
          <Entry name="faqs" what="{ question, answer }[]. The same array feeds faqSchema()." />
          <Entry name="cta" what="Optional secondary action under the heading. Outline tier, never a second flagship." />
          <Entry name="tone" what="'cream' (default): .scene-cream-deep with grain-light, ink headings and text-ink-dim answers and kicker, no top rule because the ground change is the boundary. 'dark': flat ink with grain, a top hairline, the on-ink ladder and a CLAY kicker, which is a deliberate scoped exception to the bone-kicker default. Pick by the PAGE'S ARC: cream where the page has a light middle act, dark where it runs dark hero to close." />
        </Props>

        <Comp name="Testimonial" where="Homepage (dark, with exitFade) and /services (ivory, square graphic)." />
        <What>
          Kind words: one quote, image left, words right. The plate takes columns
          1 to 5, column 6 breathes, the words take 7 to 11 and column 12 is open
          air, with the pair locked on last baseline. The quote sits at{" "}
          <Code>.statement</Code>; the attribution row is items-center, not
          baseline, because it mixes an image with type. The human stays present
          as the circular avatar, which is the third standing exception to the
          corner rules.
        </What>
        <What>
          ⚠ The quote is VISIBLY MARKED PLACEHOLDER until real client words and
          permission exist. We never draft a quote on a client&rsquo;s behalf.
          Swap the words in this one file and keep the structure.
        </What>
        <Props>
          <Entry name="tone" what="'dark' (default) | 'light' (bone) | 'ivory' (the light act's step up, with its own tighter 112/128 padding)." />
          <Entry name="image" what="{ src, alt, square? }. Default is the 4:5 photographic plate; square renders 1:1 for native-ratio artwork." />
          <Entry name="rule" what="Adds the section-level top hairline for dark-on-dark band boundaries." />
          <Entry name="exitFade" what="Mounts the fade-to-ink exit overlay. Homepage only; it pairs with the ExitFades driver." />
          <Entry name="spacious" what="The statement-moment padding tier." />
        </Props>

        <Comp name="MethodSection" where="/about only." />
        <What>
          &quot;How we think&quot;, on bone with <Code>grain-light</Code>: the
          page&rsquo;s one light act. Two bands. First a 1:1 image on columns 1
          to 5 with the intro centred against it on 7 to 12, deliberately shorter
          than the image so neither column outruns the other. Then the numbered
          beats as full-rail ledger rows: index, title, body. The old single-row
          shape ran both the intro and the list down the right of the image and
          left a dead left column, which is the fault this layout exists to fix.
          Indices take <Code>text-ink-mute</Code>, the on-light ladder, because
          clay is sub-AA on bone.
        </What>
        <What>
          It was built tone-aware and rendered twice on /about as a comparison
          test. The client picked bone, the ink copy went, and the{" "}
          <Code>tone</Code> prop went with it: one ground, no dead branch.
        </What>
        <Props>
          <Entry name="method" what="{ title, body }[]. The numbered beats." />
        </Props>

        <Comp name="ServicesShowcase" where="Homepage. Also /mockups/old-hero." />
        <What>
          What-we-do as statement typography: three <Code>.display</Code> service
          titles on ruled rows, each row linking in whole to /services with a
          ghost &quot;Read more&quot; locked to the title&rsquo;s last baseline.
          The titles are hard-coded and the order is the sell: web, then search,
          then brand. No props. This is the homepage&rsquo;s formal stabiliser
          between two asymmetric sections, and the one band small enough to show
          honestly here.
        </What>
        <Stage>
          <ServicesShowcase />
        </Stage>

        <Comp name="ManifestoStatement" where="The homepage manifesto and the /services belief." />
        <What>
          The statement compartment: every word starts dim and brightens to full
          as you scroll through a sticky track, tied to scroll position rather
          than time, so it moves at the reader&rsquo;s pace and rewinds when they
          scroll back. One rAF-throttled listener measuring the nearest{" "}
          <Code>&lt;section&gt;</Code>. Reduced motion shows it fully lit.
        </What>
        <What>
          THE CONSUMER OWNS THE TRACK, and it must be the same track or the scrub
          timing differs: a <Code>h-[140vh] pt-[10vh] pb-[5vh]</Code> section
          wrapping a <Code>sticky top-0 flex h-screen items-center</Code> child.
          ⚠ <Code>position: sticky</Code> dies under an overflow-hidden ancestor,
          so where the section also carries a SectionGlow, the glow needs its own
          absolutely positioned clipping layer as a SIBLING of the sticky child.
          The text is a plain string because it is split per word, which means a
          statement in this compartment carries no italic accent: the fill IS the
          emphasis.
        </What>
        <Props>
          <Entry name="text" what="Plain string, split per word." />
          <Entry name="className" what="Type register. Defaults to 'display max-w-none'; /services passes .belief-statement so the hero stays the loudest voice on that page." />
        </Props>
        <What>NOT RENDERED: off its 140vh track the scrub has nothing to measure.</What>

        <Comp name="NewsletterSignup" where="No live consumers. Only /mockups/freebie renders it." />
        <What>
          Mailing-list capture for the freebie band, posting to the Netlify form{" "}
          <Code>newsletter</Code>. Parked since the freebie band left the
          homepage; it is destined for its own landing page. Full record in
          Parked below.
        </What>
      </Section>

      {/* ── INDEXES AND RAILS ────────────────────────────────────────────── */}
      <Section
        id="components-indexes"
        title="Indexes and rails"
        note="Two list components. Both are client components, and both do their work against scroll or state, which is why neither is demoed here."
      >
        <Comp name="ServicesScrollIndex" where="/services." />
        <What>
          One big numeral pinned on the left inside a clipped one-em window. As
          you scroll the content rows, the digit stack slides so the active
          number rolls into the window like an odometer: you never see the other
          numbers anywhere else, they change within the frame. The numeral takes{" "}
          <Code>.display-mega</Code>, which is its only live use on the site.
          Rows sit on columns 6 to 12.
        </What>
        <What>
          Both effects are JS-driven, two IntersectionObservers with inline
          styles, rather than CSS descendant rules on <Code>.reveal</Code>: that
          path hit a Tailwind cascade-layer quirk where an important override was
          still outranked. Content still fades through <Code>.reveal</Code>. The
          active-row trigger line sits at 40 percent from the top, not the
          centre, so the number changes once the section has more fully arrived.
        </What>
        <What>
          ⚠ THE STICKY PIN IS FRAGILE. An overflow-hidden ancestor becomes the
          sticky element&rsquo;s scroll container and the pin silently stops
          working. This regressed twice in one day before the client caught it.
          Two module flags also govern the rows:{" "}
          <Code>SHOW_ROW_RULES = false</Code> parks the draw-in progress
          hairlines above each row, and <Code>LIGHT_TILES = true</Code> puts the
          fallback tiles on the paper ladder rather than translucent black.
        </What>
        <Props>
          <Entry name="services" what="Service[]: num, title, lead, and optional body, deliverables, href, art, image, tile." />
          <Entry name="services[].tile" what="A live React node (the current path: ServicesTiles). Supersedes image." />
          <Entry name="services[].image" what="A finished raster at its native ratio. Kept as the fallback for a row whose graphic ships before it is ported." />
          <Entry name="services[].art" what="'laptop' | 'phone' | 'plate'. The blank-device tile, the last fallback." />
          <Entry name="tone" what="'dark' (default) | 'light'. Swaps the numeral, the rules, the drawing hairline and the ghost." />
        </Props>

        <Comp name="BlogList" where="/blog." />
        <What>
          The blog index plus a category filter strip. A client component so
          filtering is instant, but ALL posts are rendered on the server into the
          DOM first and this only shows or hides them: the filter is progressive
          enhancement, so search engines still see every entry. A live region
          announces the result count when the filter changes.
        </What>
        <What>
          The strip is a ruled band on the bone ground, its top rule being the
          hero&rsquo;s borderBottom. Filters speak in the <Code>.overline</Code>{" "}
          meta voice, and active or hover state is a CHAMPAGNE UNDERLINE, never
          champagne on the label text itself. Cards run image left, text right on
          desktop and image top on mobile, at 16:10 per the ratio canon, with no
          hover motion on the plate.
        </What>
        <Props>
          <Entry name="cards" what="BlogCard[]. The server pre-formats date and category labels so this file imports nothing from @/lib/journal, which pulls in server-only fs code." />
          <Entry name="filters" what="{ value, label }[]. The strip only renders when there is more than one category to choose between." />
        </Props>
      </Section>

      {/* ── FORMS ────────────────────────────────────────────────────────── */}
      <Section
        id="components-forms"
        title="Forms and the enquiry path"
        note="Two Netlify forms and the overlay that carries one of them. None is rendered here: a second copy of a live form in the DOM is a real submission path, not a specimen. The shared class strings and validation helpers live in src/lib/forms.ts, not in the components."
      >
        <Sub
          title="Where the form classes live"
          note="src/lib/forms.ts: EMAIL_RE, FIELD_BASE, FIELD_BASE_LIGHT, fieldBase(tone), fieldBorder(error, tone), errorTone(tone), postNetlifyForm(fields). Both forms sit on these so their behaviour cannot drift."
        />
        <Props>
          <Entry name="FIELD_BASE" what="The on-ink field: bottom rule only, champagne on focus, champagne/35 placeholder, plus field-on-dark for the autofill repaint." />
          <Entry name="FIELD_BASE_LIGHT" what="The on-bone field: same anatomy, ink focus, ink-faint placeholder, field-on-light for the autofill repaint." />
          <Entry name="fieldBorder(error, tone)" what="Resting rule is rule-dark on ink and ink/35 on light, because rule-light is a section hairline tint and an affordance has to read. Error is champagne on ink, full ink on light." />
          <Entry name="errorTone(tone)" what="Champagne on ink; full ink on light, where champagne measures 1.8:1 and cannot carry state." />
        </Props>

        <Comp name="StartProjectOverlay" where="Mounted ONCE inside Navbar, so it rides every page with the chrome. Default export is StartProjectOverlayHost." />
        <What>
          The sitewide enquiry path. The host intercepts every click on{" "}
          <Code>a[href=&quot;/start-a-project&quot;]</Code> in the CAPTURE phase,
          before Next&rsquo;s Link, and opens a full-page form overlay in place.
          That means any new CTA becomes a trigger by simply linking to that
          route, and the route itself stays the real page for no-JS, middle
          click, crawlers and shared links. On the route, the interceptor stands
          down.
        </What>
        <What>
          THE HALF-AND-HALF. The form column sits on BONE with{" "}
          <Code>grain-light</Code>: the mark alone in the bar as a stamp rather
          than a link, the masthead free on the bone (kicker, an{" "}
          <Code>.heading-xl</Code> H2 with the accent word{" "}
          <em>your</em>, a short lede), then ONE hairline panel at{" "}
          <Code>border-ink/25</Code> and <Code>rounded-ui-lg</Code> around
          exactly what the reader ACTS on, with the mailto escape hatch outside
          it. The portrait runs FULL BLEED on the other half as architecture
          rather than a plate: no ratio box, no radius, a 12rem banner below md.
          It carries an ember-burnt multiply grade, an ink foot scrim, grain, and
          the promise bento in <Code>.glass-float</Code> tiles.
        </What>
        <What>
          THE BENTO SAYS ONLY WHAT IS TRUE TODAY: 2 working days to a personal
          reply, 3 steps to send, 0 obligation. An illustrative results set
          lasted one round and was rebuilt defensible the same evening. When real
          anonymised client results exist they drop straight into the same tile
          structure; never draft that data.
        </What>
        <What>
          ⚠ MECHANICS THAT MUST STAY, each fixing a shipped bug: the scroll lock
          is on <Code>documentElement</Code>, because body overflow is a no-op on
          this document; the inner scroller carries{" "}
          <Code>data-lenis-prevent</Code> and the overlay calls{" "}
          <Code>lenis.stop()</Code> through <Code>window.__nrLenis</Code>, since
          Lenis swallows wheel and touch globally and a nested scroller would
          never receive them; the entrance is a mounted-state opacity TRANSITION
          with a setTimeout fallback, never a keyframe, so it can never strand a
          full-screen invisible layer over the page; the dialog container itself
          takes focus; and the height is <Code>h-[100dvh]</Code> so an iOS
          keyboard cannot push the layout out of the viewport.
        </What>
        <What>
          NOT RENDERED: it is a fixed inset-0 dialog that locks the document and
          stops Lenis, and the host also installs the sitewide click interceptor.
          A second one on this page would install a second interceptor. No props.
        </What>

        <Comp name="StartProjectForm" where="Inside the overlay (tone='light') and on the /start-a-project fallback page (default dark)." />
        <What>
          THREE STEPS: about you (name, email, practice), your requirements (the
          multi-select choice cards), the project (the note and send). Three, not
          the reference&rsquo;s four, because six fields would leave a fourth
          step carrying one optional question. EVERY STEP STAYS MOUNTED behind
          the <Code>hidden</Code> attribute: the form posts via FormData on the
          real element, so unmounting a step would drop its values, and keeping
          them lets submit validate ALL fields rather than just the last screen.
          A failed submit jumps back to the step that owns the first invalid
          field. Enter routes to Next on any step but the last.
        </What>
        <What>
          THE PROGRESS MARKS carry three distinct states, all borrowed from
          elsewhere in the system: DONE is the checkbox language (champagne fill,
          ink tick, the banked-answer treatment) and is a button so a reader can
          go back; CURRENT is the one solid ink or bone chip; UPCOMING is a
          hairline ring. Connectors are a fixed <Code>w-12</Code>, never flex, so
          the row cannot stretch across the measure.
        </What>
        <What>
          ⚠ THE NO-JUMP CONTRACT. The column is vertically centred, so any change
          in step height re-centres the whole panel. Three things pin it: the
          step panels sit in a <Code>min-h-[204px] flow-root</Code> well, the
          hint renders INSIDE that well, and the foot row carries{" "}
          <Code>min-h-[54px]</Code>. <Code>flow-root</Code> is load bearing:
          without it each step&rsquo;s different first-child margin collapses
          through the well top for a 20px swing the min-height never sees.
          Re-measure after ANY field, hint or button change.
        </What>
        <What>
          TONE IS A PROP, NEVER A FORK, on the FaqSection precedent. The light
          tone is not a straight swap: champagne cannot carry state on bone at
          1.8:1, so ink carries focus, errors and the selected card&rsquo;s rim.
          A champagne FILL under an ink glyph survives anywhere at roughly 7:1,
          which is why the champagne tick-box is the house checkbox on BOTH
          grounds and the selected card&rsquo;s wash on light is champagne/10,
          the cream family. Section titles take <Code>.form-title</Code> with no
          rule under them. Choice cards are multi-select, and &quot;Not sure
          yet&quot; is mutually exclusive with the three disciplines; they post
          as one comma-joined <Code>needs</Code> string.
        </What>
        <Props>
          <Entry name="tone" what="'dark' (default) | 'light'. Resolves one table of colours used across every control." />
          <Entry name="className" what="Passed through to the form element. The HOST supplies the heading: the overlay's masthead, or the fallback page's PageHero." />
        </Props>

        <Comp name="ContactForm" where="/contact and /coming-soon." />
        <What>
          Lean since the contact and start split: /contact says CONTACT, so name,
          email and message, plus the optional unticked marketing consent
          checkbox. The what-do-you-need questions moved to StartProjectForm.
          Labels are <Code>.overline</Code> in clay; fields take{" "}
          <Code>FIELD_BASE</Code> with <Code>fieldBorder</Code>. Validation is
          DESIGNED, NOT NATIVE: <Code>noValidate</Code> on the form with inline
          champagne errors, fields validating on blur once touched, clearing as
          they are corrected, and a failed submit focusing the first invalid
          field. A honeypot field gives bots a silent success. Posts to the
          Netlify form <Code>project-enquiry</Code>.
        </What>
        <What>
          ⚠ NO <Code>.reveal</Code> ON A FORM. It is conversion critical and must
          never sit at opacity 0 waiting for an observer: it raced hydration on
          the coming-soon overlay and could stay invisible. Entrances belong to
          the surrounding section. No props.
        </What>
      </Section>

      {/* ── BRAND GRAPHICS ───────────────────────────────────────────────── */}
      <Section
        id="components-graphics"
        title="Brand graphics"
        note="Compositions ported from the client's design docs. Each is ARTWORK: a fixed-pixel layout, like a plate or an exported image, rendered as DOM so it ships crisp at any density with live text. Brand graphics run at their NATIVE ratio; the 16:10 and 4:5 imagery canon does not govern them."
      >
        <Comp name="GraphicScaler" where="Every graphic in src/components/graphics. Exported from graphics/shared.tsx." />
        <What>
          Renders a fixed-px composition responsively: the plate is laid out at
          its native size and transform-scaled to the container width by a
          ResizeObserver, so a graphic drops into any column the way an image
          would. With a <Code>label</Code> it becomes{" "}
          <Code>role=&quot;img&quot;</Code> with that one accessible name and its
          children go <Code>aria-hidden</Code>, so a screen reader gets one
          description rather than a scatter of orphaned fragments. The same file
          also exports <Code>SANS</Code>, <Code>MONO</Code> and{" "}
          <Code>PLATE</Code>, the design&rsquo;s rounded outer card frame. Mono
          inside a graphic is the sanctioned device-chrome use.
        </What>
        <Props>
          <Entry name="width / height" what="The native composition size from the design doc. Sets the aspect box." />
          <Entry name="label" what="Accessible name. Omit only for a purely decorative composition." />
          <Entry name="className" what="Sizing in the consumer's grid." />
        </Props>

        <Comp name="ServicesHeroGraphic" where="The /services hero media slot." />
        <What>
          Graphic 09, native 760×800. A square ember crop, which is the ONE
          ember-ramp image on that page per the ramp contract, carrying a
          depicted phone, with THREE frosted panels floating over its edges: the
          page markup, the search-result preview, the clinic schema. Web, search
          and schema: the studio&rsquo;s disciplines signed in artefacts. The
          depicted schema is UK-first, using <Code>MedicalClinic</Code> and{" "}
          <Code>PlasticSurgery</Code>, both real schema.org vocabulary, in place
          of the design doc&rsquo;s Physician and FacialSurgery.
        </What>
        <What>
          The panels are <Code>.glass-float</Code>: the handoff spec that
          produced that token came from this family of graphics. Each carries{" "}
          <Code>.reveal</Code> staggered at 140, 300 and 460ms, so the crop lands
          first and the glass arrives over it in reading order. It is{" "}
          <Code>.reveal</Code> and not a keyframe for three reasons: it is the
          house entrance, it transitions to a static end state so it cannot
          strand invisible, and it touches opacity only, which is what lets it
          coexist with the float animation on two of the panels.
        </What>
        <What>
          ⚠ The depicted practice is the standing &quot;Lumen&quot; mock, on the
          pre-launch confirmation list.
        </What>
        <Props>
          <Entry name="className" what="Sizing. The composition is otherwise fixed." />
        </Props>
        <Stage>
          <div className="mx-auto max-w-[420px]">
            <ServicesHeroGraphic />
          </div>
          <p className="fineprint mt-5 text-center">
            Shown at 420px. Native canvas 760×800; the hero column runs about
            620px.
          </p>
        </Stage>

        <Comp name="ServicesTiles" where="The three /services scroll-index rows. Exports ServicesTileWeb, ServicesTileSeo, ServicesTileBrand." />
        <What>
          THE SPLIT IS THE WHOLE DESIGN OF THIS FILE. Every animated element in
          the source sits inside a frosted panel, and the devices, the
          photography and the ember ground never move. So the tile is a PLATE (a
          raster: ground, device, mock website, photography) plus PANELS (live
          DOM, and all the motion). They shipped as flat captures for a day,
          which was right while they were still pictures; then the design gained
          motion, and a raster can only ever be its last frame.
        </What>
        <What>
          That split buys three things a full live port would not. The
          photography stays photography rather than ninety absolutely positioned
          divs. The panels get a REAL backdrop-filter, computed against the plate
          underneath instead of baked in. And the mock practices&rsquo; invented
          marketing copy stays inside the picture instead of becoming crawlable
          text on the studio&rsquo;s most commercially important page: only the
          panel copy is live, and the whole tile is{" "}
          <Code>role=&quot;img&quot;</Code> with one written label.
        </What>
        <What>
          Panel material is <Code>.glass-float .glass-frost .reveal</Code>: the
          reveal owns the fade, the frost owns a 6px blur burning off, and the
          stagger comes straight from the source&rsquo;s own animation delays.
          Ring gauges and the enquiries curve use <Code>.tile-draw</Code> with a{" "}
          <Code>--draw-len</Code> path length. RE-CAPTURING A PLATE needs no code
          change: hide the panels, shoot at 900×600 in a real browser at 2×, and
          convert. Panels are positioned in the source&rsquo;s own 900×600
          coordinates, so they stay registered to any re-shot plate.
        </What>
        <What>
          ⚠ The tiles depict three mock practices, and the names change with each
          design drop, so the label has to be re-read against the capture every
          time. Two known items stand: the SEO tile&rsquo;s photograph is still
          the therapy shot from a retired version of that practice, and the
          in-tile figures are fictional-practice depictions awaiting confirmation
          against the real-client-work-only rule.
        </What>
        <Props>
          <Entry name="className" what="Sizing. Each tile is a 900×600 GraphicScaler." />
        </Props>
        <Stage>
          <ServicesTileWeb />
          <p className="fineprint mt-5">
            ServicesTileWeb. The plate is one AVIF; the markup panel and the
            booking panel are live DOM frosting in over it.
          </p>
        </Stage>

        <Comp name="graphics/showcases.tsx" where="No live consumers." />
        <What>
          <Code>FeatureShowcaseDesktop</Code> (native 1180×600) and{" "}
          <Code>FeatureShowcaseMobile</Code>: bone plates carrying a depicted
          clinic site, an in-graphic browser and an in-graphic phone, imported
          from the same design doc. All type inside is depiction, not page copy.
          Nothing imports them today. They carry no written park record, so treat
          them as available stock rather than a parked decision.
        </What>
      </Section>

      {/* ── CHROME ───────────────────────────────────────────────────────── */}
      <Section
        id="components-chrome"
        title="Chrome and global behaviour"
        note="Five components mounted once in the root layout. They are DESCRIBED here and never rendered: this page sits inside that layout, so a second Reveal, SmoothScroll or ExitFades would install a rival observer or listener against the same DOM, and a second Navbar would install a second sitewide click interceptor for the enquiry overlay."
      >
        <Comp name="Navbar" where="Root layout, so every page." />
        <What>
          One nav sitewide; do not fork a second. It is ABSOLUTE and TRANSPARENT
          at the page top (<Code>absolute inset-x-0 top-0 z-50</Code>, no
          background), so each page&rsquo;s hero ground runs up behind it, and it
          scrolls away with the page rather than sticking. The consequence is
          load-bearing: every hero&rsquo;s top padding must include nav clearance
          of 96px, or 128px at md.
        </What>
        <What>
          Content sits on <Code>.shell</Code>, so the logo and links share one
          rail with every page&rsquo;s content. The CTA is a{" "}
          <Code>.btn-sm</Code> PRIMARY pill with no arrow chip, so it is never a
          second flagship in the first viewport, and on mobile the same pill
          rides the BAR beside the burger rather than living in the drawer.
          Opening the drawer locks <Code>documentElement</Code> (body overflow
          never reached the viewport) and stops Lenis.{" "}
          <Code>LIGHT_TOP_ROUTES</Code> is currently EMPTY: every page opens
          dark, and the machinery stays for any future light-topped page, which
          must list its exact route or the nav renders bone on bone. Navbar also
          mounts <Code>StartProjectOverlayHost</Code>, which is why the overlay
          rides every page.
        </What>
        <What>
          ⚠ A STANDING EXCEPTION: the mobile drawer&rsquo;s links and the
          Instagram handle use <Code>animate-fade-in-up</Code>, the 16px rise the
          canon otherwise retires in favour of fading in place. It is live, it
          works, and it is recorded here rather than quietly denied. Do not copy
          it into new work.
        </What>

        <Comp name="Footer" where="Root layout, so every page." />
        <What>
          Opens with the full-bleed Instagram strip: 4:5 tiles, three each side
          of a centred monogram, currently all quiet placeholders until a real
          feed exists. Then the monogram, the tagline and the email, then the
          Explore and Elsewhere columns, then the signature close: a giant NORTH
          at <Code>.wordmark-giant</Code> in <Code>text-bone/[0.13]</Code>,
          cropped by a translate rather than a margin so the footer&rsquo;s height
          ends exactly at the visible glyph line. A floating back-to-top anchor
          rides the lower right as a plain <Code>#top</Code> link, so Lenis
          carries the glide. The fineprint carries the quiet link to this page.
          Single footer for the whole site.
        </What>

        <Comp name="Reveal" where="Root layout. Drives every .reveal on the site." />
        <What>
          One IntersectionObserver for the whole page: it watches every{" "}
          <Code>.reveal:not(.is-in)</Code> and adds <Code>.is-in</Code> when the
          element enters, then unobserves it. Re-runs on pathname change.
          Reduced motion marks everything in immediately. Usage is the class plus
          an inline <Code>transitionDelay</Code> for the stagger. Do not add
          per-component scroll listeners that would fight it.
        </What>

        <Comp name="SmoothScroll" where="Root layout." />
        <What>
          Lenis inertial scrolling at <Code>lerp: 0.08</Code> with{" "}
          <Code>anchors: true</Code>, so same-page anchor links ride the same
          easing. Native scroll stays authoritative: sticky, the Reveal observer
          and every scroll listener keep working, because Lenis only interpolates
          wheel and touch input. It skips entirely under reduced motion. It also
          publishes THE MODAL HANDLE, <Code>window.__nrLenis</Code>: anything
          that opens a modal calls stop on the way in and start on the way out,
          and nested scrollers carry <Code>data-lenis-prevent</Code>. Do not add
          a rival smooth-scroll library.
        </What>

        <Comp name="ExitFades" where="Root layout. Live .exit-fade overlays: three placed directly on homepage sections, plus the one the homepage Testimonial mounts through its exitFade prop. All four use the long window." />
        <What>
          As a section exits the top of the viewport, its overlay fades it to ink
          and hands the stage to the section arriving beneath. One rAF-throttled
          scroll listener, JS rather than CSS scroll-timeline, so Safari behaves
          identically and the fade stays frame-synced with Lenis. The
          overlay&rsquo;s PARENT is the measured scope. Two windows:{" "}
          <Code>.exit-fade</Code> runs late, from a bottom of 45vh to 8vh, and{" "}
          <Code>.exit-fade-long</Code> runs early, 78vh to 14vh, for dark content
          sections where a late fade would dim only padding. Skips under reduced
          motion.
        </What>
      </Section>

      {/* ── PARKED ───────────────────────────────────────────────────────── */}
      <Section
        id="components-parked"
        title="Parked"
        note="Built, working, and deliberately out of service. Parked is not dead: each of these has a written record and, in most cases, a client who asked to keep the option. Marking them stops the next audit deleting them and stops a reader assuming they are in play."
      >
        <div className="mt-8">
          <Entry
            name="Deck"
            status="parked"
            what="The showreel: a fanned, auto-cycling stack of desktop-screen cards, each a slot for a real capture. Pauses on hover, respects reduced motion, and with an href the FRONT card links through while the others click forward. Props: slides (DeckSlide[]: title, tag, optional href, screenshot, screenshotAlt)."
            where="Parked 2026-07-09 when the homepage hero changed. Surviving consumers are explorations only: /mockups/showreel and /mockups/old-hero."
          />
          <Entry
            name="CreditStrip"
            status="parked"
            what="The who-we-work-with fields as a one-row credit line: a kicker, then the fields on a 64s marquee with champagne separators and a fade mask each end. Carries its own hairlines and padding, so it drops into any dark section at gutter width. It is the ONE sanctioned auto-motion on the site (.animate-marquee, paused on hover, frozen under reduced motion). No props."
            where="Parked 2026-07-24, the same day it was built: 'I think we can drop the industries strip now, we might bring it back'. It lived under the /services hero for one afternoon. No consumers."
          />
          <Entry
            name="NewsletterSignup"
            status="parked"
            what="Mailing-list capture: an email field, the submit pill, and a SEPARATE unticked marketing-opt-in checkbox, because ongoing marketing consent is never bundled with delivering the freebie. Posts to the Netlify form 'newsletter'; field names must stay in sync with public/__forms.html. No props."
            where="Parked when the freebie band left the homepage 2026-07-04; destined for its own landing page. Only /mockups/freebie renders it."
          />
          <Entry
            name="TypewriterWord"
            status="parked"
            what="A word that types, holds, deletes and retypes the next, with a thin champagne caret blinking at the insertion point. Under reduced motion the first word renders statically with no cycling. Props: words (string[])."
            where="⚠ NO CONSUMERS AND NO WRITTEN PARK RECORD. Its own comment describes it as the CTA's rotator, but no CTA renders it today. It is marked parked here because it is intact and working, not because a decision to park it was ever recorded. Either give it a record or retire it."
          />
        </div>
      </Section>
    </>
  );
}
