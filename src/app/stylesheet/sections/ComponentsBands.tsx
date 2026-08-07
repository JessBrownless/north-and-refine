import { Section, Sub, Code, Stage, Entry } from "../_ui";
import ContactCTA from "@/components/ContactCTA";
import FaqSection from "@/components/FaqSection";
import Testimonial from "@/components/Testimonial";
import MethodSection from "@/components/MethodSection";
import ServicesShowcase from "@/components/ServicesShowcase";
import BlogList, {
  type BlogCard,
  type BlogFilterOption,
} from "@/components/BlogList";
import ContactForm from "@/components/ContactForm";
import StartProjectForm from "@/components/StartProjectForm";

/**
 * TIER 04 — SECTION BANDS, INDEXES AND FORMS, RENDERED.
 *
 * WHY THIS FILE EXISTS (2026-08-05, client: "we don't seem to have the
 * components across the site"). The Components tier described these in prose
 * and showed almost none of them. Prose about a band is not a design system:
 * a reader cannot check a claim about spacing, ground or ladder against a
 * paragraph, which is exactly how the last page drifted into 32 untrue
 * statements. So the default here is RENDER THE THING, and the exceptions are
 * argued one by one.
 *
 * THE FOUR THINGS THAT ARE STILL ONLY DESCRIBED, and the reason each survives:
 *
 *  · ServicesScrollIndex measures page scroll against a sticky pin. In a
 *    documentation column the pin has no track to hold, so a specimen would
 *    show a still numeral and misreport the one behaviour that component IS.
 *  · ManifestoStatement scrubs its fill against the data-manifesto-track
 *    block the CONSUMER owns, timed against page scroll. In a documentation
 *    column the words would sit at whatever opacity the scroll left them.
 *  · StartProjectOverlay is a fixed inset-0 dialog whose host also installs a
 *    sitewide capture-phase click interceptor. A second host on this page
 *    installs a second interceptor and fights the real one.
 *  · NewsletterSignup is parked, has no live consumer, and its full record
 *    sits in the Parked section. Rendering it would add a third live Netlify
 *    submission path for a form nobody is currently using.
 *
 * ⚠ THE FORMS BELOW ARE THE REAL COMPONENTS AND THEY REALLY POST. Every form
 * specimen carries a note saying so. Rendering them is still right: they are
 * the most-changed surfaces on the site and the only place the light and dark
 * tone tables can be compared side by side, which is a comparison no prose
 * can make.
 *
 * FIXTURES ARE VISIBLY FIXTURES. This studio never drafts client words,
 * review counts or results, so specimen copy says "specimen" out loud. The
 * one place that rule already lived in the code is Testimonial, whose quote is
 * a marked placeholder in the component itself; the specimen inherits it
 * rather than inventing anything softer.
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
 * The live-submission warning. Deliberately in the fineprint ladder rather
 * than champagne: gold is details and interactions, and a standing caution is
 * running meta text, not form feedback.
 */
function LiveFormNote({ form }: { form: string }) {
  return (
    <p className="fineprint mt-4 max-w-[72ch]">
      ⚠ LIVE FORM. This is the real component, wired to the Netlify form{" "}
      <Code>{form}</Code>. Submitting it from this page sends a real enquiry to
      the studio inbox, exactly as the live route would. A specimen to look at,
      not one to use.
    </p>
  );
}

/* ── FIXTURES ─────────────────────────────────────────────────────────────
   Specimen copy, and it says so. Nothing here may read as a client claim, a
   quote, a rating or a result: see the numbers-and-claims principle. */

const SPECIMEN_FAQS = [
  {
    question: "A specimen question, at the summary register?",
    answer:
      "A specimen answer in the body register, long enough to show the measure an opened row holds and the tint the answer takes on this ground.",
  },
  {
    question:
      "A second specimen question, long enough that the summary wraps beside the glyph?",
    answer:
      "A second specimen answer. Each row is a native details element, so opening one leaves the others open.",
  },
  {
    question: "A third specimen question?",
    answer:
      "A third specimen answer, kept short so a closed row and an open row can be compared in one glance.",
  },
];

const SPECIMEN_METHOD = [
  {
    title: "Specimen beat",
    body: "A specimen paragraph in the body register, long enough to show the measure the third column holds against the index and the title.",
  },
  {
    title: "A second specimen beat",
    body: "A second specimen paragraph. The rows are the ledger grammar: index, title, body, on a hairline.",
  },
  {
    title: "A third specimen beat",
    body: "A third specimen paragraph, so the ruled stack reads as a stack rather than a pair.",
  },
];

const SPECIMEN_CARDS: BlogCard[] = [
  {
    slug: "specimen-entry-one",
    title: "Specimen entry title, at the card-title register",
    description:
      "A specimen description that runs to about two lines, so the clamp and the measure both show.",
    category: "web-design",
    categoryLabel: "Web Design",
    dateLabel: "12 March 2026",
    readingMinutes: 6,
    featuredImage: "/assets/blog/plate-rowen-laptop-2.jpg",
    featuredImageAlt:
      "Specimen plate standing in for a post image, shown at the 16:10 landscape ratio",
  },
  {
    slug: "specimen-entry-two",
    title: "Specimen entry with no featured image, showing the placeholder plate",
    description:
      "A specimen description. This card carries no image, so the frame falls back to the parchment placeholder and its ornament glyph.",
    category: "web-design",
    categoryLabel: "Web Design",
    dateLabel: "3 February 2026",
    readingMinutes: 4,
    featuredImage: null,
    featuredImageAlt: null,
  },
  {
    slug: "specimen-entry-three",
    title: "Specimen entry in a second category, so the filter has something to do",
    description:
      "A specimen description. Filtering to this category hides the two above it without removing them from the server-rendered DOM.",
    category: "seo",
    categoryLabel: "SEO",
    dateLabel: "18 January 2026",
    readingMinutes: 3,
    featuredImage: null,
    featuredImageAlt: null,
  },
];

const SPECIMEN_FILTERS: BlogFilterOption[] = [
  { value: "web-design", label: "Web Design" },
  { value: "seo", label: "SEO" },
];

export default function ComponentsBands() {
  return (
    <>
      {/* ── SECTION BANDS ────────────────────────────────────────────────── */}
      <Section
        id="components-bands"
        title="Section bands"
        note="Full-width bands you drop into a page. Each owns its ground, its padding tier and its type ladder, so each is shown here rendered rather than described. The stage adds a ring of ink around the band; everything inside that ring, including the vertical air, is the band's own."
      >
        <Comp
          name="ContactCTA"
          where="Homepage, /about, /blog, /blog/[slug], /industries, /industries/[slug], /pricing, /services, /services/[slug], /start-a-project, /work, /work/[slug]."
        />
        <What>
          The sitewide close. The section is ink with grain; the close itself is
          a <Code>rounded-plate-lg</Code> card carrying the hero&rsquo;s own
          ground (warm base, HeroGlow at its own contained 0.35 — a card&rsquo;s
          gradient is its content, so it stays off the ground constant — and
          grain) with the CTA inside it. The page opens under a warm glow and
          shuts on the same light held in a card. The gradient lives INSIDE the
          card, never on the section ground: a scoped exception to the
          flat-ground rule, like the homepage craft card. SIMPLIFIED 2026-08-08
          (&ldquo;remove the image and just set the text nicely&rdquo;): the
          close plate is gone and the card is TYPE ALONE — kicker, heading-xl,
          lede, flagship + ghost, one column. The heading&rsquo;s last word is
          the TYPEWRITER (<Code>TypewriterWord</Code>: trust → book from → come
          back to → recommend, the second sanctioned auto-motion), and the
          italic accent sits on <em>your</em>, never on the rotating word. THE
          NO-JUMP CONTRACT: an invisible sizer copy set with the longest word
          owns the heading&rsquo;s box, so the card cannot change height as
          the words cycle — verified one constant height through a full cycle
          at 1470 and 390. If the word list changes, the sizer must carry
          whichever entry is longest.
        </What>
        <What>
          Inside, the close mirrors the hero: kicker, <Code>.heading-xl</Code>{" "}
          with the italic accent, <Code>.body-xl</Code> lede, the flagship{" "}
          <Code>.btn-primary-dark .btn-arrow</Code> beside a ghost link, all
          left on the rail, with the close plate at 16:10 on columns 9 to 12,
          bottom locked to the CTA row. Static: the close resolves, it does not
          perform. Below md the plate falls in flow after the buttons, right
          anchored at three fifths.
        </What>
        <Props>
          <Entry
            name="heading"
            what="Overrides the default H2. Plain text, so an override carries no italic accent."
          />
          <Entry name="body" what="Overrides the supporting line." />
        </Props>
        <p className="fineprint mt-4 max-w-[72ch]">
          Specimen shows the shipped defaults, which are studio copy rather
          than a claim about a client, so nothing here needs standing in for
          anything.
        </p>
        <Stage>
          <ContactCTA />
        </Stage>

        <Comp
          name="FaqSection"
          where="/about, /pricing, /industries/[slug], /services/[slug] on cream; /services on dark."
        />
        <What>
          THE ONE FAQ IN THE SYSTEM. Every FAQ on the site renders through here;
          a bespoke <Code>&lt;details&gt;</Code> block is a drift pattern, so
          extend this component the way <Code>tone</Code> did rather than
          forking it. The kicker is hoisted above the locked grid so the HEADING
          leads its block, the head and optional outline button take columns 1
          to 4, and the ruled accordion takes 6 to 12 with its first question
          baseline locked to the H2. Summaries sit at <Code>.heading-sm</Code>,
          one register below the section head, and the champagne plus glyph
          rotates 45 degrees on open.
        </What>
        <What>
          Schema is NOT emitted here. Pages pass the same faqs array to{" "}
          <Code>faqSchema()</Code> through <Code>JsonLd</Code> themselves, so
          the rendered text and the FAQPage schema stay one source and the page
          keeps ownership of its structured data.
        </What>
        <Props>
          <Entry name="kicker" what="The overline above the grid." />
          <Entry
            name="heading"
            what="The section H2 at .heading-lg, the signpost register."
          />
          <Entry
            name="faqs"
            what="{ question, answer }[]. The same array feeds faqSchema()."
          />
          <Entry
            name="cta"
            what="Optional secondary action under the heading. Outline tier, never a second flagship."
          />
          <Entry
            name="tone"
            what="'cream' (default) | 'dark'. Pick by the PAGE'S ARC, not by taste: cream where the page has a light middle act, dark where it runs dark from hero to close."
          />
        </Props>
        <p className="fineprint mt-4 max-w-[72ch]">
          Both tones are shown, because <Code>tone</Code> is the prop that
          matters and the two grounds carry different ladders. Open a row in
          each: cream answers take <Code>text-ink-dim</Code>, since ink-mute
          measures 3.85:1 on the deeper cream and clay is sub-AA on every light
          ground.
        </p>
        <Sub
          title="tone='cream' (default)"
          note="scene-cream-deep with grain-light, ink headings, ink-dim answers and kicker, no top rule: the ground change is the boundary."
        />
        <Stage>
          <FaqSection
            kicker="Specimen kicker"
            heading="Specimen FAQ heading."
            faqs={SPECIMEN_FAQS}
            cta={{ label: "Specimen secondary action", href: "/stylesheet" }}
          />
        </Stage>
        <Sub
          title="tone='dark'"
          note="Flat ink with grain, a top hairline (dark on dark needs the rule to mark the section), the on-ink ladder, and a CLAY kicker: a deliberate scoped exception to the bone-kicker default."
        />
        <Stage>
          <FaqSection
            tone="dark"
            kicker="Specimen kicker"
            heading="Specimen FAQ heading."
            faqs={SPECIMEN_FAQS}
          />
        </Stage>

        <Comp
          name="Testimonial"
          where="Homepage (dark, with exitFade) and /services (ivory, square graphic)."
        />
        <What>
          Kind words: one quote, image left, words right. The plate takes
          columns 1 to 5, column 6 breathes, the words take 7 to 11 and column
          12 is open air, with the pair locked on last baseline. The quote sits
          at <Code>.statement</Code>; the attribution row is items-center, not
          baseline, because it mixes an image with type. The human stays present
          as the circular avatar, the third standing exception to the corner
          rules.
        </What>
        <What>
          ⚠ THE QUOTE IS A MARKED PLACEHOLDER IN THE COMPONENT ITSELF, and the
          specimen inherits it word for word. We never draft a quote, a rating
          or a result on a client&rsquo;s behalf. When real words and permission
          exist they are swapped in that one file and the structure stays.
        </What>
        <Props>
          <Entry
            name="tone"
            what="'dark' (default) | 'light' (bone) | 'ivory' (the light act's step up, with its own tighter 112/128 padding)."
          />
          <Entry
            name="image"
            what="{ src, alt, square? }. Default is the 4:5 photographic plate; square renders 1:1 for native-ratio artwork."
          />
          <Entry
            name="rule"
            what="Adds the section-level top hairline for dark-on-dark band boundaries."
          />
          <Entry
            name="exitFade"
            what="Mounts the fade-to-ink exit overlay. Homepage only; it pairs with the ExitFades driver."
          />
          <Entry name="spacious" what="The statement-moment padding tier." />
        </Props>
        <p className="fineprint mt-4 max-w-[72ch]">
          Two of the three tones are shown: the dark default and the ivory step
          up. <Code>light</Code> is the same band on bone and differs from ivory
          only in ground and padding. The ivory specimen keeps the DEFAULT
          plate rather than the graphic /services passes it, because that
          graphic depicts unverified performance and rating figures for a real
          practice: it is on the pre-launch checklist, and a design system is
          the last place to repeat a claim we cannot defend.
        </p>
        <Sub title="tone='dark' (default)" note="The homepage configuration, minus exitFade, which needs the ExitFades driver and the page it fades into." />
        <Stage>
          <Testimonial />
        </Stage>
        <Sub title="tone='ivory'" note="The light act's step up: near-white ground, the on-light ladder, the clay kicker (the tracked-caps ornament exception), and the handoff's own 112/128 pads." />
        <Stage>
          <Testimonial tone="ivory" />
        </Stage>

        <Comp name="MethodSection" where="/about only." />
        <What>
          &quot;How we think&quot;, on bone with <Code>grain-light</Code>: the
          page&rsquo;s one light act. Two bands. First a 1:1 image on columns 1
          to 5 with the intro centred against it on 7 to 12, deliberately
          shorter than the image so neither column outruns the other. Then the
          numbered beats as full-rail ledger rows: index, title, body. The old
          single-row shape ran both the intro and the list down the right of the
          image and left a dead left column, which is the fault this layout
          exists to fix. Indices take <Code>text-ink-mute</Code>, the on-light
          ladder, because clay is sub-AA on bone.
        </What>
        <What>
          It was built tone-aware and rendered twice on /about as a comparison
          test. The client picked bone, the ink copy went, and the{" "}
          <Code>tone</Code> prop went with it: one ground, no dead branch. The
          intro copy and the image are hard-coded, so only the beats are
          fixtures here.
        </What>
        <Props>
          <Entry name="method" what="{ title, body }[]. The numbered beats." />
        </Props>
        <Stage>
          <MethodSection method={SPECIMEN_METHOD} />
        </Stage>

        <Comp name="ServicesShowcase" where="Homepage. Also /mockups/old-hero." />
        <What>
          What-we-do as statement typography: three <Code>.display</Code>{" "}
          service titles on ruled rows, each row linking in whole to /services
          with a ghost &quot;Read more&quot; locked to the title&rsquo;s last
          baseline. Titles are hard-coded and the order is the sell: web, then
          search, then brand. No props. The homepage&rsquo;s formal stabiliser
          between two asymmetric sections.
        </What>
        <Stage>
          <ServicesShowcase />
        </Stage>

        <Comp
          name="ManifestoStatement"
          where="The homepage manifesto and the /services belief."
        />
        <What>
          The statement compartment: every word starts dim and brightens to
          full as the statement travels up the viewport, tied to scroll
          position rather than to time, so it moves at the reader&rsquo;s pace
          and rewinds when they scroll back — in NORMAL FLOW everywhere since
          2026-08-07, when the homepage&rsquo;s pin (the last on the site)
          went. One rAF-throttled listener measuring the nearest track.
          Reduced motion shows it fully lit.
        </What>
        <What>
          THE CONSUMER OWNS THE TRACK, and the track is the STATEMENT BLOCK:
          mark the block wrapping the statement with{" "}
          <Code>data-manifesto-track</Code> (both live consumers do — /services
          because the belief shares its section with the whole scroll index,
          the homepage because its section is a tall min-h air band). The
          completion tuning assumes track ≈ statement, filling from entry and
          completing by mid-viewport; hand it a tall box and the words are lit
          before they are read. The sticky-track recipe that stood here
          (h-[140vh], sticky h-screen child) left with the homepage pin. The
          text is a plain string because it is split per word, which means a
          statement in this compartment carries no italic accent: the fill IS
          the emphasis.
        </What>
        <Props>
          <Entry name="text" what="Plain string, split per word." />
          <Entry
            name="className"
            what="Type register. Defaults to 'display max-w-none'; /services passes .belief-statement so the hero stays the loudest voice on that page."
          />
        </Props>
        <What>
          NOT RENDERED, and this is the one band where that is not a scruple
          but a fact: the scrub reads its track&rsquo;s position in the
          viewport against page scroll. In a documentation column the words
          would sit at whatever fill the scroll happened to leave them,
          quietly claiming the component does nothing.
        </What>
      </Section>

      {/* ── INDEXES AND RAILS ────────────────────────────────────────────── */}
      <Section
        id="components-indexes"
        title="Indexes and rails"
        note="Two list components, both client components. One is honest at stage width and is rendered; the other measures page scroll against a sticky pin and is described."
      >
        <Comp name="BlogList" where="/blog." />
        <What>
          The blog index plus a category filter strip. A client component so
          filtering is instant, but ALL posts are rendered on the server into
          the DOM first and this only shows or hides them: the filter is
          progressive enhancement, so search engines still see every entry. A
          live region announces the result count when the filter changes.
        </What>
        <What>
          The strip is a ruled band on the bone ground, its top rule being the
          hero&rsquo;s borderBottom. Filters speak in the <Code>.overline</Code>{" "}
          meta voice, and active or hover state is a CHAMPAGNE UNDERLINE, never
          champagne on the label text itself. Cards run image left and text
          right on desktop, image top on mobile, at 16:10 per the ratio canon,
          with no hover motion on the plate: the affordance is the caption dim
          and the gold arrow.
        </What>
        <Props>
          <Entry
            name="cards"
            what="BlogCard[]: slug, title, description, category, categoryLabel, dateLabel, readingMinutes, featuredImage, featuredImageAlt. The server pre-formats date and category labels so this file imports nothing from @/lib/journal, which pulls in server-only fs code."
          />
          <Entry
            name="filters"
            what="{ value, label }[]. The strip only renders when there is more than one category to choose between."
          />
        </Props>
        <p className="fineprint mt-4 max-w-[72ch]">
          The specimen is live: the filter works. Three fixture cards across two
          categories, one carrying a real plate and two carrying none, so both
          the image state and the parchment placeholder show. ⚠ The specimen
          slugs do not exist, so a card click lands on a 404 by design.
        </p>
        <Stage>
          <BlogList cards={SPECIMEN_CARDS} filters={SPECIMEN_FILTERS} />
        </Stage>

        <Comp name="ServicesScrollIndex" where="/services." />
        <What>
          One big numeral pinned on the left inside a clipped one-em window. As
          you scroll the content rows, the digit stack slides so the active
          number rolls into the window like an odometer: you never see the other
          numbers anywhere else, they change within the frame. The numeral takes{" "}
          <Code>.display-mega</Code>, its only live use on the site. Rows sit on
          columns 6 to 12.
        </What>
        <What>
          Both effects are JS-driven, two IntersectionObservers writing inline
          styles, rather than CSS descendant rules on <Code>.reveal</Code>: that
          path hit a Tailwind cascade-layer quirk where an important override
          was still outranked. Content still fades through <Code>.reveal</Code>.
          The active-row trigger line sits at 40 percent from the top, not the
          centre, so the number changes once the section has more fully arrived.
        </What>
        <What>
          ⚠ THE STICKY PIN IS FRAGILE. An overflow-hidden ancestor becomes the
          sticky element&rsquo;s scroll container and the pin silently stops
          working: this regressed twice in one day before the client caught it.
          Two module flags also govern the rows:{" "}
          <Code>SHOW_ROW_RULES = false</Code> parks the draw-in progress
          hairlines above each row, and <Code>LIGHT_TILES = true</Code> puts the
          fallback tiles on the paper ladder rather than translucent black.
        </What>
        <Props>
          <Entry
            name="services"
            what="Service[]: num, title, lead, and optional body, deliverables, href, art, image, tile."
          />
          <Entry
            name="services[].tile"
            what="A live React node (the current path: ServicesTiles). Supersedes image."
          />
          <Entry
            name="services[].image"
            what="A finished raster at its native ratio. The fallback for a row whose graphic ships before it is ported."
          />
          <Entry
            name="services[].art"
            what="'laptop' | 'phone' | 'plate'. The blank-device tile, the last fallback."
          />
          <Entry
            name="tone"
            what="'dark' (default) | 'light'. Swaps the numeral, the rules, the drawing hairline and the ghost."
          />
        </Props>
        <What>
          NOT RENDERED, deliberately. This is a client component driving a
          sticky, scroll-scrubbed numeral, and its behaviour needs PAGE SCROLL
          against a track the consumer owns. Inside a documentation column the
          pin has nothing to hold and the odometer never turns, so a specimen
          here would show a still number and misrepresent the one thing the
          component exists to do. Judge it on /services, where the track is
          real.
        </What>
      </Section>

      {/* ── FORMS ────────────────────────────────────────────────────────── */}
      <Section
        id="components-forms"
        title="Forms"
        note="Two Netlify forms and the overlay that carries one of them. The forms are rendered, because the light and dark tone tables can only be compared side by side; the overlay is described, because its host installs a sitewide click interceptor. Shared class strings and validation helpers live in src/lib/forms.ts, never in the components."
      >
        <p className="fineprint mt-6 max-w-[72ch]">
          ⚠ EVERY FORM ON THIS PAGE IS THE REAL COMPONENT AND POSTS FOR REAL.
          They are here to be read, focused and inspected, not submitted. The
          field anatomy, the tone tables and the validation grammar are
          documented once in Molecules under &quot;The form system&quot;; this
          section documents the components that consume them.
        </p>

        <Comp name="ContactForm" where="/contact and /coming-soon." />
        <What>
          The lean enquiry form: name, email, message, and an optional unticked
          marketing consent. It went lean at the contact and start split; the
          what-do-you-need questions moved to StartProjectForm. Labels are{" "}
          <Code>.overline</Code> in clay, fields are the on-ink treatment
          (bottom rule only, champagne on focus), and the send is the flagship{" "}
          <Code>.btn-primary-dark .btn-arrow</Code>.
        </What>
        <What>
          VALIDATION IS DESIGNED, NOT NATIVE: <Code>noValidate</Code> on the
          form, champagne fineprint under each field, and the field&rsquo;s own
          rule turning champagne. Fields validate on blur once touched, clear as
          they are corrected, and a failed submit focuses the first invalid one.
          There is no <Code>.reveal</Code> on the form: it is
          conversion-critical and must never sit at opacity 0 waiting for an
          observer. A hidden honeypot field gives bots a silent success.
        </What>
        <Props>
          <Entry
            name="(none)"
            what="No props. The heading and ground belong to the host section; on ink only."
          />
        </Props>
        <LiveFormNote form="project-enquiry" />
        <Stage>
          <div className="max-w-[560px]">
            <ContactForm />
          </div>
        </Stage>

        <Comp
          name="StartProjectForm"
          where="Inside StartProjectOverlay (tone='light') and on the /start-a-project fallback page (default dark)."
        />
        <What>
          THREE STEPS: about you (name, email, the practice), your requirements
          (the multi-select choice cards), the project (the note and send).
          Three, not the reference&rsquo;s four, because six fields would leave
          a fourth step carrying one optional question. EVERY STEP STAYS MOUNTED
          behind the <Code>hidden</Code> attribute: the form posts via FormData
          on the real element, so unmounting a step would drop its values, and
          keeping them lets submit validate ALL fields rather than just the last
          screen. A failed submit jumps back to the step that owns the first
          invalid field, and Enter routes to Next on any step but the last.
        </What>
        <What>
          THE PROGRESS MARKS carry three states, each borrowed from elsewhere in
          the system: DONE is the checkbox language (champagne fill, ink tick,
          the banked-answer treatment) and is a button, so a reader can go back;
          CURRENT is the one solid ink or bone chip; UPCOMING is a hairline
          ring. Connectors are compact at <Code>w-12</Code>. Step titles take{" "}
          <Code>.form-title</Code>, the UI register in Atoms, and take no rule
          under them.
        </What>
        <What>
          ⚠ THE NO-JUMP CONTRACT. A centred column re-centres on any change of
          step height, so the panel is pinned to one box: the step panels sit in
          a <Code>min-h-[204px] flow-root</Code> well (flow-root is
          load-bearing, or each step&rsquo;s first-child margin collapses
          through the well top and moves it by about 20px), the hint sits INSIDE
          the well, and the foot row holds <Code>min-h-[54px]</Code> because the
          send pill is 1px shorter than Next. Re-verify after any field, hint or
          button change.
        </What>
        <Props>
          <Entry
            name="tone"
            what="'dark' (default) | 'light'. Not a straight swap: CHAMPAGNE CANNOT CARRY STATE ON BONE (1.8:1), so on light, ink carries focus, errors and the selected card's rim, while a champagne FILL under an ink tick survives on both grounds and stays the house checkbox."
          />
          <Entry
            name="className"
            what="Passed through to the form element, so the host owns the column width."
          />
        </Props>
        <p className="fineprint mt-4 max-w-[72ch]">
          Both tones are shown, because the light tone is a different state
          machine for colour and the difference is invisible in prose. Step
          through each: the marks, the choice cards and the field rules are
          where the two tables diverge. ⚠ Two instances on one page share the
          component&rsquo;s hard-coded field ids (<Code>sp-name</Code> and its
          siblings), so on this page a label click binds to the first instance.
          That is a documentation-only artefact, not a fault on the routes,
          which each mount one.
        </p>
        <LiveFormNote form="start-project" />
        <Sub
          title="tone='dark' (default)"
          note="The /start-a-project fallback page: champagne carries focus, errors and the done marks; fields rest on rule-dark."
        />
        <Stage>
          <div className="max-w-[640px]">
            <StartProjectForm />
          </div>
        </Stage>
        <Sub
          title="tone='light'"
          note="The overlay's bone column: ink carries focus, errors and the selected card's rim; fields rest at ink/35, because rule-light is a section hairline tint and an affordance has to read. The champagne tick-box survives the ground change."
        />
        <Stage ground="bone">
          <div className="max-w-[640px]">
            <StartProjectForm tone="light" />
          </div>
        </Stage>

        <Comp
          name="StartProjectOverlay"
          where="Mounted ONCE inside Navbar, so it rides every page with the chrome. Default export is StartProjectOverlayHost."
        />
        <What>
          The sitewide enquiry path. The host intercepts every click on{" "}
          <Code>a[href=&quot;/start-a-project&quot;]</Code> in the CAPTURE
          phase, before Next&rsquo;s Link, and opens a full-page form overlay in
          place. Any new CTA becomes a trigger by simply linking to that route,
          and the route itself stays the real page for no-JS, middle click,
          crawlers and shared links. On the route, the interceptor stands down.
        </What>
        <What>
          THE HALF-AND-HALF. The form column sits on BONE with{" "}
          <Code>grain-light</Code>: the mark alone in the bar as a stamp rather
          than a link, the masthead free on the bone (kicker, an{" "}
          <Code>.heading-xl</Code> H2 with the accent word <em>your</em>, a
          short lede), then ONE hairline panel at <Code>border-ink/25</Code> and{" "}
          <Code>rounded-ui-lg</Code> around exactly what the reader ACTS on,
          with the mailto escape hatch outside it. The portrait runs FULL BLEED
          on the other half as architecture rather than a plate: no ratio box,
          no radius, a 12rem banner below md. It carries an ember-burnt multiply
          grade, an ink foot scrim, grain, and the promise bento in{" "}
          <Code>.glass-float</Code> tiles.
        </What>
        <What>
          THE BENTO SAYS ONLY WHAT IS TRUE TODAY: 2 working days to a personal
          reply, 3 steps to send, 0 obligation. An illustrative results set
          lasted one round and was rebuilt defensible the same evening. When
          real anonymised client results exist they drop straight into the same
          tile structure; never draft that data.
        </What>
        <What>
          ⚠ MECHANICS THAT MUST STAY, each fixing a shipped bug: the scroll lock
          is on <Code>documentElement</Code>, because body overflow is a no-op
          on this document; the inner scroller carries{" "}
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
          NOT RENDERED. It is a fixed inset-0 dialog that locks the document and
          stops Lenis, and the host also installs the sitewide capture-phase
          click interceptor. A second host on this page would install a second
          interceptor and fight the real one that Navbar already mounts. Its
          form column is the <Code>tone=&quot;light&quot;</Code> specimen above;
          to see the whole composition, click any &quot;Start a project&quot;
          pill on the site. No props.
        </What>

        <Comp
          name="NewsletterSignup"
          where="No live consumer. Only /mockups/freebie renders it."
        />
        <What>
          Mailing-list capture for the freebie band, posting to the Netlify form{" "}
          <Code>newsletter</Code>. One email field on the on-ink rule, a{" "}
          <Code>.btn-primary-dark</Code> beside it, a separate unticked
          marketing opt-in and the privacy fineprint under both. Consent is
          recorded with the submission, so the checkbox and the record are one
          change.
        </What>
        <What>
          NOT RENDERED HERE. It is parked, with no live consumer, and its full
          record sits in the Parked section below; a specimen would add a third
          live Netlify submission path to this page for a form nobody is
          currently using. It predates <Code>lib/forms.ts</Code> and still
          carries its own field classes and its own POST, which is the first
          thing to fix when it is unparked. No props.
        </What>
      </Section>
    </>
  );
}
