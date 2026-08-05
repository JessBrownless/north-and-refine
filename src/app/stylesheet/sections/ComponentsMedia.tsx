import { Section, Sub, Code, Stage, Entry } from "../_ui";
import NRMonogram from "@/components/NRMonogram";
import StageGlyph from "@/components/StageGlyph";
import PhoneMockup from "@/components/PhoneMockup";
import BrowserMockup from "@/components/BrowserMockup";
import WorkCard from "@/components/WorkCard";
import Carousel from "@/components/Carousel";
import LogoStrip from "@/components/LogoStrip";
import PageHero from "@/components/PageHero";
import SectionGlow from "@/components/SectionGlow";
import type { WorkEntry } from "@/lib/work";

/**
 * TIER 04 — COMPONENTS, part one: the marks, the media pieces and the heroes.
 *
 * THE RULE THIS FILE WAS REWRITTEN UNDER (2026-08-05, client: "we don't seem to
 * have the components across the site"). A design system that DESCRIBES its
 * components is a document about a library; a design system SHOWS them. So the
 * default here is the specimen, and prose is what is left when a specimen would
 * lie. Every component below is either rendered or carries a written reason it
 * is not, and the reasons have to survive being read back.
 *
 * WHAT A SPECIMEN MAY SAY. The studio never drafts client claims, so fixture
 * copy is unmistakably fixture: "Practice name", "A short specimen lede".
 * No invented quote, no star rating, no percentage, no client result — not even
 * a plausible one, because a plausible number is the one that escapes the page.
 *
 * TWO HONEST COSTS OF RENDERING, recorded so nobody reports them as bugs:
 *  1. The hero specimens render a real <h1> into this document. A masthead
 *     carries its own H1 and cannot be asked not to; that is the price of
 *     showing it, and it is cheaper than a page of prose about air.
 *  2. Specimen links point at routes that do not exist (a specimen case study)
 *     or at "#" (the logo strip). They are inert on purpose: a documentation
 *     page must not smuggle in real destinations.
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

/**
 * A SPECIMEN case study. Shaped exactly like a WorkEntry off the collection so
 * the card is exercised through its real type, with copy that could never be
 * mistaken for a client's: no metrics, no testimonial, no outcome. The slug
 * resolves to nothing, which is the point.
 */
const SPECIMEN_PROJECT: WorkEntry = {
  slug: "specimen-case-study",
  content: "",
  readingMinutes: 4,
  frontmatter: {
    title: "Specimen case study",
    description: "A specimen entry that exists only on this page.",
    client: "Practice name",
    sector: "cosmetic-surgery",
    services: ["Web design", "SEO", "Brand identity"],
    year: "2026",
    publishedAt: "2026-01-01",
    summary:
      "A short specimen summary showing the measure the text column holds beside the plate: two lines at most, in the body register.",
  },
};

/** The same entry one index along, to show the alternating side. */
const SPECIMEN_PROJECT_TWO: WorkEntry = {
  ...SPECIMEN_PROJECT,
  slug: "specimen-case-study-two",
  frontmatter: {
    ...SPECIMEN_PROJECT.frontmatter,
    client: "Second practice name",
    services: ["Web design", "Brand identity"],
    summary:
      "The second specimen, at an odd index, so the plate and the text swap sides down the page.",
  },
};

/** Specimen names for the trust bar. They match no mark, so the pool cycles. */
/* The hrefs must be DISTINCT: LogoStrip keys its list items by `item.href`,
   so three specimens all pointing at "#" collapse to one React key and the
   console fills with duplicate-key errors. Real practices each have their
   own site, so the component's key is sound; it was the fixture that was
   unrealistic. Kept as fragments so the links stay inert. */
const SPECIMEN_LOGOS = [
  { name: "Practice name", href: "#specimen-practice-1" },
  { name: "Second practice name", href: "#specimen-practice-2" },
  { name: "Third practice name", href: "#specimen-practice-3" },
];

/**
 * The placeholder that stands in for a brand graphic in the hero media slot.
 * Parchment plus one label, in the site's own placeholder language — never a
 * mock practice, which would put invented marketing copy in the DOM.
 */
function SpecimenGraphic() {
  return (
    <div className="frame aspect-square md:ml-auto md:max-w-[380px]">
      <span className="portrait-fill absolute inset-0 flex items-center justify-center">
        <span className="label text-ink-mute">Specimen graphic</span>
      </span>
    </div>
  );
}

export default function ComponentsMedia() {
  return (
    <>
      {/* ── MARKS AND PRIMITIVES ─────────────────────────────────────────── */}
      <Section
        id="components-primitives"
        title="Marks and primitives"
        note="The components that render themselves and nothing else. All are server components with no state and no props beyond sizing, so they are safe anywhere in the tree, and there is no reason not to show every one of them."
      >
        <Comp
          name="NRMonogram"
          where="Navbar, Footer, the Start-a-project overlay bar."
        />
        <What>
          The dot-compass NR lockup as one inline SVG (N, needle, R), fully
          outlined. It fills with <Code>currentColor</Code>, so it takes the
          surrounding text colour and never needs a light file and a dark file:
          size it with an <Code>h-*</Code> class and the width follows the 216×84
          viewBox. It carries its own <Code>role=&quot;img&quot;</Code> and the
          label &quot;North &amp; Refine&quot;, which is why the overlay can use
          it as a bare stamp and still have the studio&rsquo;s name read aloud.
        </What>
        <Props>
          <Entry
            name="className"
            what="Sizing and colour. Everything else is fixed."
          />
        </Props>
        <Stage>
          <div className="flex flex-wrap items-end gap-10">
            <div>
              <NRMonogram className="h-8 w-auto text-bone" />
              <p className="fineprint mt-3">h-8, text-bone: the footer lockup.</p>
            </div>
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
            The same file on bone, tinted by <Code>text-ink</Code>. One mark,
            both grounds: that is what <Code>currentColor</Code> buys.
          </p>
        </Stage>

        <Comp
          name="StageGlyph"
          where="The homepage process spine, /about, and the /services and /services/[slug] process plates."
        />
        <What>
          The process marks: the site&rsquo;s own hairline bent into a pure form.
          Every stroke is <Code>stroke-width 1</Code> with{" "}
          <Code>vector-effect: non-scaling-stroke</Code>, which is the
          load-bearing part, because it keeps the glyph identical in weight to a{" "}
          <Code>rule-dark</Code> divider at any rendered size. Allowed elements
          are circle, line, rect and triangle only: no paths, no arcs, never an
          imported icon set. The glyphs are always <Code>aria-hidden</Code>, so a
          plate must still read with the glyph deleted.
        </What>
        <What>
          Motion M·1: each stroke carries <Code>pathLength=&#123;100&#125;</Code>{" "}
          and <Code>.sg-stroke</Code>, and draws itself in when the glyph sits
          inside a <Code>.reveal</Code> that gains <Code>.is-in</Code>. Outside a
          reveal it renders fully drawn, which is what makes it safe to drop
          anywhere, including here. The specimens below sit outside a reveal, so
          they show the end state; stagger per plate with{" "}
          <Code>--sg-delay</Code> on the reveal element.
        </What>
        <Props>
          <Entry
            name="stage"
            what="1 | 2 | 3 | 4 | 5. The working set R5: lens pair, rings, corner-lock, triangle, trued. The row reads as a sequence: two views focus, rings narrow, forms compose, structure stands, the form is trued to its rule."
          />
          <Entry
            name="className"
            what="Sizing. Render at h-12 to h-14; below ~32px the overlaps muddy, above ~80px the glyph competes with the type ladder."
          />
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
          <p className="fineprint mt-6">
            On ink the glyph is the ornament-glyph use, so it takes champagne
            through <Code>currentColor</Code>. Gold on a MARK is legal; gold on
            label type is not.
          </p>
        </Stage>
        <Stage ground="bone">
          <div className="flex flex-wrap items-start gap-x-10 gap-y-8 text-ink/70">
            {([1, 2, 3, 4, 5] as const).map((stage) => (
              <StageGlyph key={stage} stage={stage} className="h-12 w-12" />
            ))}
          </div>
          <p className="fineprint mt-6 text-ink-mute">
            The light polarity: <Code>text-ink/70</Code>, the same five forms and
            the same hairline weight.
          </p>
        </Stage>

        <Comp
          name="JsonLd"
          where="Root layout (Organization, WebSite) and nearly every page for its own breadcrumb; detail pages add Article or CreativeWork; services, pricing and industries add Service and FAQPage."
        />
        <What>
          Serialises one schema object or an array of them into{" "}
          <Code>&lt;script type=&quot;application/ld+json&quot;&gt;</Code>. A
          server component, so emit it anywhere in a page tree. Builders live in{" "}
          <Code>@/lib/schema</Code>; structured data is never written inline.
        </What>
        <What>
          NOT RENDERED, and this is the one case where that is not a compromise:
          the component has no visual output at all. A specimen would publish
          invented structured data about the studio into the head of a real page.
        </What>
        <Props>
          <Entry
            name="data"
            what="object | object[]. An array is emitted as one script tag per node."
          />
        </Props>

        <Sub
          title="A stray duplicate"
          note="src/components/handoff/StageGlyph.tsx is a copy shipped with a design handoff, alongside HANDOFF.md, canon-updates.md and globals-additions.css. Nothing imports it. The live component is src/components/StageGlyph.tsx; treat the handoff folder as reference material, not source."
        />
      </Section>

      {/* ── MOCKUPS AND MEDIA ────────────────────────────────────────────── */}
      <Section
        id="components-media"
        title="Mockups and media"
        note="The hardware frames and the pieces that carry imagery. Device bezels keep their own hardware radii: they are the standing exception to the plate radius scale, because a phone corner is a real object, not a framed picture."
      >
        <Comp
          name="PhoneMockup"
          where="/work/[slug] device cluster; /mockups/obsidian."
        />
        <What>
          An iPhone-style frame around either a real mobile screenshot (pass{" "}
          <Code>screenshot</Code>, preferred) or a CSS miniature clinic site,
          which is the placeholder until real captures land. The screen sits at
          aspect <Code>0.462</Code> and crops top-aligned, so tall
          mobile-viewport captures around 390px wide work best. Specimens below
          are in placeholder mode: the mini-site depicts a mock practice, so it
          is furniture, never client work.
        </What>
        <Props>
          <Entry
            name="screenshot"
            what="Path to a real capture. Replaces the CSS mini-site entirely."
          />
          <Entry
            name="screenshotAlt"
            what="Required with screenshot. Accessibility, not decoration."
          />
          <Entry
            name="screen"
            what="'editorial' (parchment, default) | 'ink' (dark). Placeholder mode only; a real capture brings its own tone."
          />
          <Entry
            name="size"
            what="'sm' (w-40) | 'md' (default, w-52 / sm:w-56) | 'lg' (w-64 / sm:w-80, the hero statement device)."
          />
          <Entry name="name / specialty" what="Text inside the placeholder mini-site." />
          <Entry name="className" what="Positioning in a cluster." />
        </Props>
        <Stage>
          <div className="flex flex-wrap items-start gap-10">
            <div>
              <PhoneMockup size="sm" screen="editorial" />
              <p className="fineprint mt-4">size=&quot;sm&quot;, editorial</p>
            </div>
            <div>
              <PhoneMockup size="sm" screen="ink" />
              <p className="fineprint mt-4">size=&quot;sm&quot;, ink</p>
            </div>
            <div>
              <PhoneMockup size="md" screen="editorial" />
              <p className="fineprint mt-4">size=&quot;md&quot;, the default</p>
            </div>
            <div>
              <PhoneMockup size="lg" screen="editorial" />
              <p className="fineprint mt-4">size=&quot;lg&quot;, the statement device</p>
            </div>
          </div>
        </Stage>

        <Comp
          name="BrowserMockup"
          where="/work/[slug]; /mockups/hero-three, /mockups/print-hero-poster."
        />
        <What>
          The wide companion to PhoneMockup: a macOS-style window (traffic
          lights, address pill) around a real desktop capture or a CSS editorial
          clinic site. The viewport sits at aspect <Code>1.6</Code>, so desktop
          captures shot at 1440×900 drop in uncropped, which is exactly why the
          canon fixes the capture size rather than cropping to the frame.
          Anchored with a PhoneMockup overlapping its corner, this is the
          canonical responsive showcase cluster.
        </What>
        <Props>
          <Entry
            name="screenshot / screenshotAlt"
            what="A real desktop capture and its alt text. Replaces the placeholder site."
          />
          <Entry name="domain" what="The address-bar label, e.g. 'dryalda.com.au'." />
          <Entry name="name / specialty" what="Text inside the placeholder site." />
          <Entry name="className" what="Sizing and position." />
        </Props>
        <Stage>
          <div className="max-w-[560px]">
            <BrowserMockup domain="specimen.example" />
          </div>
          <p className="fineprint mt-5">
            Placeholder mode, with a specimen domain in the address pill.
          </p>
        </Stage>

        <Comp name="WorkCard" where="/work index only." />
        <What>
          A case study as a horizontal editorial row: a 16:10 plate on one side,
          the text on the other, alternating sides down the page on odd indices.
          The client name sits at <Code>.heading-md</Code> rather than the{" "}
          <Code>.card-title</Code> caption register, so each piece reads as a
          work in its own right. No hover motion on the plate: the affordance is
          the caption dim plus the champagne arrow. With no image it falls back
          to the typographic index numeral on <Code>.portrait-fill</Code>, which
          is the state both specimens below are in.
        </What>
        <Props>
          <Entry name="project" what="WorkEntry from @/lib/work. Reads client, services, summary, sector, year and the card or thumb image." />
          <Entry name="index" what="Drives the 0n placeholder numeral and the alternating side: odd indices flip." />
          <Entry name="tone" what="'dark' (default) | 'light'. No live light consumer; /work runs dark hero to close." />
        </Props>
        <Stage>
          <div className="flex flex-col gap-16">
            <WorkCard project={SPECIMEN_PROJECT} index={0} />
            <WorkCard project={SPECIMEN_PROJECT_TWO} index={1} />
          </div>
          <p className="fineprint mt-8">
            Two specimen entries, indices 0 and 1, so the alternation shows. The
            fixtures carry no metrics and no testimonial, and both links point at
            routes that do not exist: a design-system page renders the card, not
            a claim. Each row also carries <Code>.reveal</Code>, so it fades in
            under the global observer like it does on /work.
          </p>
        </Stage>

        <Comp
          name="Carousel"
          where="Homepage: the blog rail at every size, and the Selected work rail below md. Also /mockups/old-hero."
        />
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
          <Entry name="children" what="One node per slide; each is wrapped in a snap-start list item." />
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
          <p className="fineprint mt-8">
            Four specimen plates at the homepage peek. The folio line below is
            the live one: scroll or page the rail and the counter moves.
          </p>
        </Stage>

        <Comp
          name="LogoStrip"
          where="Homepage, directly under the Kind words testimonial. Also /mockups/old-hero."
        />
        <What>
          The trust bar: a quiet ruled strip of client marks, each linking to its
          case study, fed from the work collection on the homepage so it cannot
          drift. It carries no background of its own and sits on whatever dark
          section holds it. Marks are ALWAYS monochrome bone, with per-mark
          heights tuned to equal optical width, because the wordmarks differ
          roughly 6:1 against 13:1 in aspect and equal heights would render
          wildly unequal widths. The row never wraps and never auto-moves: a
          marquee was trialled and retired the same day it was built. It scrolls
          on mobile, spreads on md and up.
        </What>
        <Props>
          <Entry name="items" what="{ name, href }[]. The name is matched against the mark pool by regex and is also the link's accessible label; the href is the case study." />
          <Entry name="label" what="The kicker. Defaults to 'Trusted by'." />
        </Props>
        <Stage>
          <LogoStrip items={SPECIMEN_LOGOS} label="Specimen strip" />
          <p className="fineprint mt-8">
            The names here are specimen text and match nothing in the pool, so
            the strip does what it does for a practice whose mark has not
            arrived: it cycles the pool in order. The mark files are the real
            ones, which is the only way to judge the optical-width tuning. Links
            are inert. The component carries its own <Code>.shell</Code>, so it
            is indented twice inside this stage; on a page it sits on the shared
            rail.
          </p>
        </Stage>
      </Section>

      {/* ── HEROES ───────────────────────────────────────────────────────── */}
      <Section
        id="components-heroes"
        title="Heroes"
        note="One interior masthead, one bespoke homepage hero, and the two ground layers they share. Heroes are first-paint content, so their entrance is a load-in (opacity-0 plus animate-fade-in with delay staggers), never an IntersectionObserver reveal, which is why the specimens below fade in with the page rather than on scroll."
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
          THE MASTHEAD IS ONE SENTENCE IN TWO REGISTERS. The kicker is not a
          label sitting above a heading; it is the first half OF the heading,
          and since 2026-08-05 it renders inside the <Code>&lt;h1&gt;</Code>
          via <Code>.with-overline</Code>. The contract is fixed: the kicker
          is THE PAGE NAME and the display line is a FEATURE-BENEFIT
          STATEMENT. So every masthead on the site now reads, to a crawler and
          a screen reader alike, as{" "}
          <Code>&quot;Services Websites that just work.&quot;</Code> — the
          page&rsquo;s own name finally inside its own strongest signal. Two
          things follow. A detail page names ITSELF rather than its section.
          And a page&rsquo;s <Code>&lt;title&gt;</Code> is a SEPARATE string
          from its H1 wherever the two want different words: the services and
          industries data carry both <Code>heading</Code> (the H1) and{" "}
          <Code>seoTitle</Code> (the title tag, the OG title and the Service
          schema name), because a masthead change must never cost a title tag.
          The homepage is the one exception to the content half, having no
          page name to mimic; its kicker states the offer instead.
        </What>
        <Props>
          <Entry name="title" what="ReactNode. The H1's SECOND half: a feature-benefit statement, what the page does for the reader. It must not restate the overline, which has just named the page. An <em> inside it renders the Saol italic accent word: one word or short phrase, never a clause." />
          <Entry name="overline" what="THE PAGE NAME, and it renders INSIDE the <h1> as its first half — not a sibling. Pass 'Work', 'About', 'Web design & build'; never a flavour line. A detail page names ITSELF, not its section, which is why /services/web-design says 'Web design & build' and not 'Services'." />
          <Entry name="lede" what="The subtitle. In split mode it takes the right columns; in wide and media modes it sits under the heading on the .lede system." />
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
          <Entry name="ground" what="Default true. Set false for the shared-canvas escape hatch: the hero renders no ground at all (no bg, no glow, no seam strip), so the PAGE can wrap it and its neighbour in one surface. One live consumer: /about." />
        </Props>

        <Sub
          title="Specimen 1: the canonical split"
          note="align='split' spacious borderBottom, no CTA: the recipe /work, /blog and /about open with. The heading holds cols 1–7, the lede cols 9–12 on the heading's LAST baseline."
        />
        <Stage>
          {/* The stage's own padding is bled through horizontally so the hero
              meets the frame edge: a masthead judged inside a second gutter is
              a masthead judged at the wrong measure. The vertical padding
              stays — it reads as the frame. */}
          <div className="-mx-6 sm:-mx-8">
            <PageHero
              align="split"
              spacious
              borderBottom
              overline="Specimen kicker"
              title={
                <>
                  A specimen masthead, set in the <em>display</em> register.
                </>
              }
              lede="A short specimen lede that shows the measure of the right-hand column and where it locks to the heading."
            />
            {/* SectionGlow reads only as a SEAM, so it is shown as one: the band
                below is what a page puts under a hero, carrying the wash that
                resumes from the hero's own anchor tone. */}
            <div className="relative overflow-hidden bg-ink">
              <SectionGlow blob="right" />
              <div className="shell relative z-10 py-16">
                <p className="overline text-clay">The section below the hero</p>
                <p className="body mt-4 max-w-[62ch] text-bone-dim">
                  Specimen body copy, here only so the seam has something to sit
                  under. The join above this line is the contract: the
                  hero&rsquo;s foot resolves to one fixed tone and{" "}
                  <Code>SectionGlow</Code>&rsquo;s wash starts from exactly that
                  tone, so no line reads.
                </p>
              </div>
            </div>
          </div>
        </Stage>
        <p className="fineprint mt-5 max-w-[72ch]">
          Rendered at the width of this document column, not scaled: a hero is a
          composition of air, and a transform-scaled hero would misreport the one
          thing it exists to control. The band is narrower than a page, so read
          the proportions and the baseline lock here, and read the full-width
          air on /work and /services.
        </p>

        <Sub
          title="Specimen 2: the media slot"
          note="Split plus media: the text stack drops to cols 1–6, the graphic takes 7–12 centred against it. With the glass CTA and a meta line, which is the live /services recipe."
        />
        <Stage>
          <div className="-mx-6 sm:-mx-8">
            <PageHero
              align="split"
              spacious
              borderBottom
              overline="Specimen kicker"
              title={
                <>
                  A masthead that <em>carries</em> a graphic.
                </>
              }
              lede="With a media node the lede leaves the right columns and sits under the heading, because the right columns are now the graphic's."
              cta={{ label: "Specimen action", href: "/stylesheet" }}
              ctaVariant="glass"
              meta="Specimen meta line"
              media={<SpecimenGraphic />}
            />
          </div>
        </Stage>
        <p className="fineprint mt-5 max-w-[72ch]">
          The media node above is a parchment placeholder, not a brand graphic:
          the real graphics depict mock practices, and their invented marketing
          copy has no business in this page&rsquo;s DOM. See{" "}
          <Code>ServicesHeroGraphic</Code> in Brand graphics for the live one.
        </p>

        <What>
          ⚠ NAV CLEARANCE IS THE HERO&rsquo;S JOB, and it is the rule this
          component has regressed on twice. The nav is ABSOLUTE and TRANSPARENT,
          so the section&rsquo;s first 96px (128px at md, from the nav&rsquo;s{" "}
          <Code>h-24 md:h-32</Code>) sit behind it. Top padding must carry that
          clearance, and air is judged OPTICALLY from the nav&rsquo;s foot, not
          from the section edge. The live media recipe is <Code>pt-40</Code> with{" "}
          <Code>pb-8</Code> around splitBox&rsquo;s <Code>py-28</Code>, which
          measures 144 above and 144 below. Stripping that padding as leftover
          nav maths put the kicker 40px under the nav. ⚠ The specimens on this
          page sit inside a stage with no nav above them, so they are the one
          place that clearance cannot be judged: check it on a real route.
        </What>

        <Comp name="HomeHero" where="Homepage only." />
        <What>
          The bespoke homepage hero: a centred kicker in the shared{" "}
          <Code>.overline</Code> voice, a large headline with a Saol-italic
          accent word set inline, the flagship pill plus a ghost link, and a
          phone, desktop, phone row bled off the bottom AND both sides so the
          outer phones crop at the screen edges. The device screens are BLANK by
          the client&rsquo;s call: the frames hold their shape while new imagery
          is chosen. It carries no nav of its own; the site Navbar renders above
          it like every other page. No props.
        </What>
        <What>
          ⚠ IT SITS OUTSIDE THE LADDER. The H1 size, weight and letter-spacing
          are set inline rather than through a display utility, and the pills are
          hand-rolled rather than composed from <Code>.btn</Code>. That is a
          known deviation in a one-off composition ported from a design comp, not
          a licence to do the same elsewhere.
        </What>
        <What>
          NOT RENDERED, and the reason is structural rather than editorial: the
          section is <Code>min-height: 100vh</Code> with an absolutely positioned
          device row that must be WIDER than the viewport to read correctly. In a
          document column it would either swamp the page or crop to something
          that is not the component. Read it on the homepage.
        </What>

        <Comp
          name="HeroGlow"
          where="HomeHero (intensity 1), every dark PageHero (0.6, topLeft 0.3), the ContactCTA card (0.8), and the /about shared canvas."
        />
        <What>
          The warm gradient ground, in one place so every hero reads as the same
          site: three blurred blobs plus a vignette, all absolute and
          pointer-events-none. The parent must be relative, overflow-hidden, and
          must paint the warm base itself; content rides above on its own
          z-index. A lighter, less muddy version was trialled and reverted the
          same day: the deeper vignette is what gives the bone logo and nav
          their contrast, so do not lighten it without checking logo contrast.
        </What>
        <What>
          RENDERED IN SITU: both hero specimens above carry the live glow at the
          interior dose. It is shown that way on purpose. Isolated in a stage
          over a token ground it would be a picture of blurred circles over the
          wrong base colour, and the one thing worth judging, how far the warmth
          travels before it resolves, only exists at hero scale.
        </What>
        <Props>
          <Entry name="intensity" what="Scales blob opacity. 1 is the full homepage ground; 0.6 is the quieter interior dose." />
          <Entry name="topLeft" what="An extra multiplier on the top-left champagne pool alone, so the pool behind an H1 can quieten without flattening the rest." />
          <Entry name="vignette" what="Multiplier on the vignette alone. Nothing passes it today: the overlay it was built for went light the same day." status="parked" />
        </Props>

        <Comp
          name="SectionGlow"
          where="/work, /services, /services/[slug], /contact, /start-a-project."
        />
        <What>
          The hero blend&rsquo;s decay below the seam, at a fraction of
          HeroGlow&rsquo;s dose. Three layers painted in order: one quiet
          in-family blob deeper in the section, a faint amber tail bleeding down
          from the seam, then the seam wash itself, which starts at the
          hero&rsquo;s anchor tone and is gone by about half the section height.
          The wash is painted LAST so it wins at the boundary. The parent must be
          relative and overflow-hidden and keep its own <Code>bg-ink</Code>.
        </What>
        <What>
          RENDERED under specimen 1, which is the only honest way to show it: on
          its own it is three invisible layers, and its whole subject is a
          boundary between two sections.
        </What>
        <What>
          ⚠ The seam contract shipped and FAILED TWICE on /about. Where a line is
          ever reported, the fix is converting that page to the shared canvas
          (one wrapper, one glow, children groundless), not more seam tuning.
        </What>
        <Props>
          <Entry name="blob" what="'left' | 'right'. Vary per page so neighbouring pages do not repeat." />
          <Entry name="intensity" what="Scales the whole dose." />
          <Entry name="seamEmphasis" what="The /services hero to belief seam only: a richer tail and a slightly stronger side blob. Not a general warm-up knob." />
        </Props>
      </Section>
    </>
  );
}
