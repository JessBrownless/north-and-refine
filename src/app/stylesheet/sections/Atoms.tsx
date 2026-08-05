import { Tier, Section, Sub, Code, Stage, Entry } from "../_ui";
import TypeScaleExplorer from "../TypeScaleExplorer";

/**
 * TIER 02 — ATOMS (2026-08-05 rebuild).
 *
 * The indivisible tokens: fonts, colour, the type ladder, space, radius,
 * material, scenes, glass, motion. Every claim on this page was checked
 * against globals.css, tailwind.config.ts, layout.tsx and the live consumers
 * before it was written; the previous version of /stylesheet carried 32
 * statements that were no longer true, which is the failure mode a
 * design-system page exists to prevent.
 *
 * Two rules the specimens obey, because a page that documents the system by
 * breaking it documents nothing:
 *   1. Every specimen renders the REAL class. No visual approximations.
 *   2. Each token is shown on the ground it is legal on. The on-light ladder
 *      is judged on bone, the glass pair on imagery.
 */

/* ── local documentation furniture (this page only) ─────────────────────── */

function Swatch({
  cls,
  name,
  hex,
  use,
}: {
  cls: string;
  name: string;
  hex: string;
  use: string;
}) {
  return (
    <div>
      <div className={`${cls} h-16 w-full rounded-ui-sm border rule-dark`} />
      <p className="label mt-2.5 text-bone">{name}</p>
      <p className="fineprint">{hex}</p>
      <p className="fineprint mt-1.5">{use}</p>
    </div>
  );
}

function Rung({
  cls,
  size,
  register,
  where,
  sample,
}: {
  cls: string;
  size: string;
  register: string;
  where: string;
  sample: React.ReactNode;
}) {
  return (
    <div className="mt-9 border-t rule-dark pt-5">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <Code>.{cls}</Code>
        <span className="fineprint">{size}</span>
      </div>
      <p className={`${cls} mt-4 text-bone`}>{sample}</p>
      <p className="body-sm mt-5 text-bone-dim">{register}</p>
      <p className="fineprint mt-1.5">{where}</p>
    </div>
  );
}

function Radius({
  cls,
  name,
  value,
  note,
}: {
  cls: string;
  name: string;
  value: string;
  note: string;
}) {
  return (
    <div>
      <div className={`${cls} h-24 w-full border rule-dark bg-ink-raised`} />
      <p className="label mt-2.5 text-bone">{name}</p>
      <p className="fineprint">{value}</p>
      <p className="fineprint mt-1.5">{note}</p>
    </div>
  );
}

/* ── the tier ───────────────────────────────────────────────────────────── */

export default function AtomsTier() {
  return (
    <>
      <Tier
        id="atoms"
        num="02"
        title="Atoms"
        note="The indivisible parts: the faces the site loads, the colours, the type ladder, the space and radius scales, the one material, the scenes, the glass pair and the motion. Nothing here is composed of anything else on the site, so everything above it inherits whatever these get wrong."
      />

      {/* ═══ FONTS AND GLOBAL DEFAULTS ═══════════════════════════════════ */}
      <Section
        id="atoms-foundations"
        title="Fonts and global defaults"
        note="One text face carries the site. Instrument Sans is loaded as --font-sans, and layout.tsx aliases --font-display to it inline on the html element, so all 27 rules in globals.css that ask for the display variable resolve to Instrument Sans without a single per-rule edit. Two faces survive in narrow, named roles: Saol Display as the italic accent word, Geist Mono as the kicker."
      >
        <Sub
          title="The faces actually loaded"
          note="All four rows below were read from layout.tsx. Any note claiming a two-font house, Saol on every heading, Dia, or a retired mono is out of date: the mono is the kicker voice, and the serif is one italic word at a time."
        />
        <div className="mt-5">
          <Entry
            name="--font-sans"
            what="Instrument Sans, loaded from next/font/google in normal and italic. The house face: body, UI, the meta voice, and via the alias below every heading tier as well."
            where="layout.tsx; consumed by body, .body*, .label, .card-title, .form-title, .index-num, .nav-link, .cta-label and the whole display ladder."
          />
          <Entry
            name="--font-display"
            what="Not a face. An alias set inline on the html element to var(--font-sans), which is what keeps the heading rules honest without rewriting them."
            where="layout.tsx style prop; read by h1 through h6, .display-mega, .display, .heading-*, .statement, .stat and .wordmark-giant."
          />
          <Entry
            name="--font-saol"
            what="Saol Display, loaded locally at Regular 400 and Light Italic 300. Exactly one rule consumes it: the em accent-word device inside a display-tier utility, declared at weight 300 with font-synthesis: none so the browser cannot faux-bold it against the surrounding 400."
            where="layout.tsx localFont; the em rule in globals.css. Reintroduced 2026-07-20 for the hero title device, after the 2026-07-14 one-font call had removed the serif from the headings."
          />
          <Entry
            name="--font-geist-mono"
            what="Geist Mono at 400 and 500: the kicker voice, so every tracked-caps kicker on the site reads as one face."
            where="Consumed by .overline in globals.css and by the homepage hero's inline kicker in HomeHero.tsx."
          />
          <Entry
            name="font-mono"
            what="The Tailwind utility resolves var(--font-mono), which nothing on the site defines, so it falls through to ui-monospace: system mono, on purpose."
            where="Device-chrome depictions only, where the point is that the type is the operating system's, not the brand's."
          />
        </div>

        <Sub
          title="Global defaults set in the base layer"
          note="These apply before any utility, which is why a heading needs no class to be a heading."
        />
        <Stage>
          <p className="fineprint">body</p>
          <p className="body mt-1.5 text-bone-dim">
            Instrument Sans at 16px, line-height 1.6, on the ink ground in bone.
            Antialiased, with optimizeLegibility and smooth scroll set on html;
            Lenis adds a .lenis class that switches scroll-behavior back to
            auto so the two never fight.
          </p>
          <p className="fineprint mt-7">h1 to h6</p>
          <p className="body mt-1.5 text-bone-dim">
            The display variable at weight 400, tracking -0.01em, margin 0, and
            colour set to color-mix(currentColor 98%, transparent): a whisper of
            transparency that softens big type on ink. It is done with colour
            alpha rather than opacity precisely so a .reveal fade cannot
            override it.
          </p>
          <p className="fineprint mt-7">Weight</p>
          <p className="body mt-1.5 text-bone-dim">
            Every rung of the ladder sets 400, so heading hierarchy comes from
            size. Weight leads in one place only: .form-title at 600. That is
            legal because the house face carries real weights; the old
            size-only rule belonged to the era when the display face shipped a
            single upright weight and a font-medium heading would have
            synthesised a fake bold.
          </p>
        </Stage>

        <Sub title="::selection and :focus-visible" note="The two states the browser draws for us. Both are champagne: gold is the interaction colour." />
        <Stage>
          <p className="body text-bone-dim">
            Select this line to see the selection paint: champagne ground, ink
            text.
          </p>
          <div className="mt-6">
            <button type="button" className="btn btn-sm btn-secondary-dark">
              Tab to me for the focus ring
            </button>
          </div>
          <p className="fineprint mt-4">
            :focus-visible is a 2px champagne outline at 3px offset, set once in
            the base layer. Never remove it locally; if a control needs a
            different ring, the ring belongs here.
          </p>
        </Stage>
      </Section>

      {/* ═══ COLOUR ══════════════════════════════════════════════════════ */}
      <Section
        id="atoms-colour"
        title="Colour"
        note="A warm near-black, a bone off-white, one champagne accent, and a contained ember ramp. The whole neutral family was re-toned onto the warm axis on 2026-07-31 so inks, bones, golds and embers tone together; the old cool ink was the palette's one outlier, which is what stopped orange ever sitting with it. Values live in globals.css :root and are mirrored in tailwind.config.ts; the two must match."
      >
        <Sub title="Ink family" note="The dark ground, the raised surface, and the hairline." />
        <Stage>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
            <Swatch
              cls="bg-ink"
              name="ink"
              hex="#110E0A"
              use="The default page background. Warm near-black; depth held through the re-tone, hue rotated."
            />
            <Swatch
              cls="bg-ink-raised"
              name="ink-raised"
              hex="#1A1610"
              use="Raised surfaces and cards on dark. Also the .frame backing."
            />
            <Swatch
              cls="bg-ink-line"
              name="ink-line"
              hex="#2F2820"
              use="The dark hairline, carried by .rule-dark. Nothing else on the site uses it as a fill."
            />
          </div>
        </Stage>

        <Sub title="Light family" note="The paper stocks and their hairline." />
        <Stage>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            <Swatch cls="bg-bone" name="bone" hex="#F4EDDF" use="Light sections; primary text on ink." />
            <Swatch
              cls="bg-ivory"
              name="ivory"
              hex="#FDF8EF"
              use="The near-white step up: a light act may climb bone to ivory to lift its second band."
            />
            <Swatch cls="bg-bone-dim" name="bone-dim" hex="#CFC5B2" use="Secondary text on ink." />
            <Swatch
              cls="bg-bone-line"
              name="bone-line"
              hex="#DED2BF"
              use="The light hairline, carried by .rule-light."
            />
            <Swatch
              cls="bg-clay"
              name="clay"
              hex="#8E8270"
              use="Captions, fine print and meta on INK. Sub-AA on bone; see the ladders below."
            />
          </div>
        </Stage>

        <Sub title="Accent and signal" note="Champagne is the one accent and belongs to details and interactions: ornament glyphs, link underlines, hovers, focus rings, form feedback. It never colours label type, and it never fills a section." />
        <Stage>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            <Swatch
              cls="bg-champagne"
              name="champagne"
              hex="#C2A878"
              use="The accent. Hover rims, the arrow chip on hover, the selection ground, the focus outline."
            />
            <Swatch
              cls="bg-champagne-soft"
              name="champagne-soft"
              hex="#D8C6A4"
              use="Soft gold: hover fills on the primary pills, and the mix behind the cream stocks."
            />
            <Swatch
              cls="bg-ember"
              name="ember"
              hex="#FF7A00"
              use="The 10 of 60-30-10, at dot scale only. PARKED: its only consumer is .live-dot, which has had no live placement since the nav availability badge was removed 2026-07-04."
            />
            <Swatch
              cls="bg-ember-burnt"
              name="ember-burnt"
              hex="#8A3411"
              use="The ember ramp mid-tone. Contained imagery only, one per page; live as the multiply grade on the Start-a-project portrait."
            />
            <Swatch
              cls="bg-ember-deep"
              name="ember-deep"
              hex="#5E1F0A"
              use="The ramp's shadow end; bridges hero imagery into ink. Never a section ground, never type."
            />
          </div>
        </Stage>

        <Sub
          title="The on-INK ladder"
          note="Three tiers, spaced on purpose: roughly 17:1, 10:1 and 5:1 against ink. The middle tier was deepened in 2026-07-10 because the old dim crowded bone and the ladder read as two tiers, not three."
        />
        <Stage ground="ink">
          <p className="heading-sm text-bone">text-bone: headings and primary text</p>
          <p className="body-lg mt-3 text-bone-dim">
            text-bone-dim: secondary text, ledes and body on a dark ground.
          </p>
          <p className="body-sm mt-3 text-clay">
            text-clay: captions, fine print and meta. The third tier of this
            ladder and this ladder only.
          </p>
        </Stage>

        <Sub
          title="The on-LIGHT ladder"
          note="The bone-ground mirror, added 2026-07-13 so light pages stop hand-rolling ink opacities and re-deriving the AA maths inline. These are the exact ink-over-bone composites of ink/70, ink/60 and ink/30."
        />
        <Stage ground="bone">
          <p className="heading-sm text-ink">text-ink: headings and primary text</p>
          <p className="body-lg mt-3 text-ink-dim">
            text-ink-dim: body and lede on bone, around 6.8:1. The mirror of
            bone-dim.
          </p>
          <p className="body-sm mt-3 text-ink-mute">
            text-ink-mute: meta and labels on bone, around 4.9:1 and AA. The
            mirror of clay on ink.
          </p>
          <p className="body-sm mt-3 text-ink-faint">
            text-ink-faint: decorative only. Middots, separators, placeholder
            glyphs. Sub-AA by design, so never body or label text.
          </p>
          <p className="fineprint mt-5 text-ink-mute">
            Clay does not appear here on purpose: it is sub-AA on bone. The one
            sanctioned survivor is the .overline kicker, which is tracked-caps
            ornament rather than meta that must be read.
          </p>
        </Stage>
      </Section>

      {/* ═══ THE DISPLAY LADDER ══════════════════════════════════════════ */}
      <Section
        id="atoms-type-scale"
        title="The display ladder"
        note="Pick a rung by REGISTER, not by taste. Each rung means a kind of thing, and the rule that follows from that is simple: a list item must never outrank or tie its section's head, and a signpost must never shout like a moment. Sizes are one clamp per class, fluid between roughly 640px and 1280px. The italic word in two of the specimens below is the accent-word device, which composes a face, a rung and an editorial rule, so it is documented in Molecules."
      >
        {/* THE KNOB (2026-08-05). It reads the clamps out of the live CSSOM
            rather than repeating them here, so it cannot drift from
            globals.css: change a rung and this follows on reload. The two
            moments worth dragging to are where a rung leaves its floor and
            where it hits its ceiling, because no breakpoint lands on
            either. */}
        <TypeScaleExplorer />
        <Rung
          cls="display-mega"
          size="52 to 152px, line-height 0.94"
          sample="04"
          register="THE MASTHEADS. ⚠ THE RULE, not a description: EVERY hero masthead H1 on the site takes this rung, so the heroes read as one site. PageHero applies it to every interior page; the homepage joined them on 2026-08-05, having been the one hero that hand-rolled its own clamp and so ran ~8% short at every width. THE ONE EXCEPTION IS DOCUMENTED AND DELIBERATE: detail pages (/work/[slug], /blog/[slug]) are ARTICLE HEADERS, not mastheads, and take .heading-xl through ArticleHeader — a piece of writing opens differently from a section of the site. A new hero that wants its own size is not a new size; it is a hero that has not read this."
          where="Its size comes from --masthead-size, the single metric token, so anything that must align to a masthead's first line reads that variable rather than copying the clamp. Its old homepage-masthead use was retired 2026-07-16."
        />
        <Rung
          cls="display"
          size="42 to 100px, line-height 1"
          sample={
            <>
              Practices that patients <em>trust</em>.
            </>
          }
          register="THE MASTHEADS AND THE LEDGER ROWS. Every H1 on the site, plus the What-we-do service rows."
          where="HomeHero, PageHero, ServicesShowcase."
        />
        <Rung
          cls="heading-xl"
          size="36 to 79px, line-height 1.04"
          sample="Let's talk about your practice"
          register="THE MOMENTS. Detail-page article headers, the homepage studio statement, the close."
          where="ContactCTA, the work and blog detail headers, the Start-a-project overlay H2, the mobile drawer links. PageHero falls back to it for a non-split hero."
        />
        <Rung
          cls="heading-part"
          size="32 to 62px, line-height 1.1"
          sample="Practices we've refined"
          register="THE PART TITLES. The head that introduces a collection, one register below a moment."
          where="The homepage collection heads. Added 2026-07-10 because those heads read too small at heading-lg, where they tied the card names beneath them, and too big at heading-xl."
        />
        <Rung
          cls="statement"
          size="28 to 56px, line-height 1.14"
          sample="They understood the practice before they designed anything."
          register="THE QUOTE REGISTER. The single register for testimonial quotes."
          where="The Testimonial band on the homepage and /services, and the work detail testimonial."
        />
        <Rung
          cls="heading-lg"
          size="28 to 48px, line-height 1.18"
          sample="Common questions"
          register="THE SIGNPOSTS. Interior-page section H2s."
          where="FaqSection, MethodSection, the industries index, StartProjectForm."
        />
        <Rung
          cls="heading-md"
          size="24 to 36px, line-height 1.25"
          sample="Discovery and diagnosis"
          register="ITEMS. Cards, process steps, the second level inside a section. Its max dropped 40 to 36px on 2026-08-05: against the signpost above it the step was 1.20, barely a step at all, while the gap down to .heading-sm was 1.43. Lowering this one rung evened both."
          where="MethodSection process plates, WorkCard, ContactForm, the pricing tiers, the service and blog detail pages."
        />
        <Rung
          cls="heading-sm"
          size="20 to 28px, line-height 1.3"
          sample="What we look at first"
          register="ITEMS, the smaller of the two. The ladder's floor."
          where="FaqSection questions, the service detail sub-heads, /contact and /privacy. Rejected once as a form section title, where it read as an editorial heading dropped inside a form, which is why .form-title exists."
        />

        <Sub
          title="Off the ladder"
          note="One register sits deliberately outside it, and knowing that it does is the point of writing it down."
        />
        <div className="mt-5">
          <Entry
            name=".belief-statement"
            what="32 to 80px at weight 500: a sans register that STEPS DOWN from the H1, so a page's belief line reads as commentary rather than a second masthead. Tighter tracking than body because it sets at display-adjacent sizes; the consumer passes its own measure."
            where="ManifestoStatement and the /services belief line."
          />
          <Entry
            name=".wordmark-giant"
            what="clamp(5.5rem, 20vw, 24rem) at line-height 0.8: the footer's cropped NORTH. Crop it with an overflow-hidden parent and a translate, so the footer ends exactly where the crop does."
            where="Footer."
          />
        </div>
      </Section>

      {/* ═══ BODY AND META ═══════════════════════════════════════════════ */}
      <Section
        id="atoms-type-meta"
        title="Body and the meta voice"
        note="Everything the ladder does not carry. All of it is Instrument Sans, with one exception: .overline is Geist Mono, which is what makes every tracked-caps kicker on the site read as one voice."
      >
        <Sub title="Body tiers" note="Four sizes plus the reading column. Body is fluid 14 to 16px; the tier below it, not the tier above, is where secondary copy goes." />
        <Stage>
          <p className="fineprint">.body-xl · 16 to 21px</p>
          <p className="body-xl mt-1.5 text-bone-dim">
            The large lede: hero and close subtitles, one step above body-lg.
            Added 2026-07-13 to retire an ad-hoc pixel override that had been
            copied around.
          </p>
          <p className="fineprint mt-7">.body-lg · 16 to 19px</p>
          <p className="body-lg mt-1.5 text-bone-dim">
            The standard lede, under a heading and inside .lede's measure.
          </p>
          <p className="fineprint mt-7">.body · 14 to 16px</p>
          <p className="body mt-1.5 text-bone-dim">
            Running copy everywhere on the site.
          </p>
          <p className="fineprint mt-7">.body-sm · 13 to 14px</p>
          <p className="body-sm mt-1.5 text-bone-dim">
            Secondary and meta copy: footer links, attribution lines, in-card
            summaries. It sits between .label and .body.
          </p>
          <p className="fineprint mt-7">.body-reading · 17px fixed, line-height 1.75</p>
          <p className="body-reading mt-1.5 max-w-[62ch] text-bone-dim">
            The long-form reading column: the MDX prose bodies for the blog and
            the case studies, set in mdx-components.tsx, plus the privacy page.
            Fixed rather than fluid, because a reading measure wants a settled
            size.
          </p>
        </Stage>

        <Sub title="The meta voice" note="Labels, kickers, numerals and microtype. This is where a design system usually drifts, so each of these has exactly one job." />
        <Stage>
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-6">
            <div>
              <p className="overline">Selected work</p>
              <p className="fineprint mt-2">.overline · 11px · 0.24em · Geist Mono</p>
            </div>
            <div>
              <p className="label text-bone">Label, 13px</p>
              <p className="fineprint mt-2">.label</p>
            </div>
            <div>
              <p className="card-title text-bone">Dr Yalda Aesthetics</p>
              <p className="fineprint mt-2">.card-title · 17 to 22px</p>
            </div>
            <div>
              <p className="form-title text-bone">About you</p>
              <p className="fineprint mt-2">.form-title · 15px · 600</p>
            </div>
            <div>
              <p className="index-num text-bone">01 /</p>
              <p className="fineprint mt-2">.index-num · 18 to 24px</p>
            </div>
            <div>
              <p className="stat text-bone">2</p>
              <p className="fineprint mt-2">.stat · 40 to 72px</p>
            </div>
            <div>
              <p className="nav-link text-bone">Journal</p>
              <p className="fineprint mt-2">.nav-link · 12px · 0.24em</p>
            </div>
            <div>
              <p className="cta-label text-bone">Read more</p>
              <p className="fineprint mt-2">.cta-label · 12px · 500 · 0.22em</p>
            </div>
            <div>
              <p className="fineprint">Fine print, 12px, clay by default.</p>
              <p className="fineprint mt-2">.fineprint</p>
            </div>
          </div>
        </Stage>

        <div className="mt-5">
          <Entry
            name=".overline"
            what="11px uppercase at 0.24em in Geist Mono, bone by default. Bone, not champagne: the type system is tonal, and gold at 11px tracked caps reads brassy. On light sections override with text-ink-mute, or text-clay where the warm brand tint is wanted on the kicker specifically."
            where="Every section kicker sitewide, the field-label treatment in both forms, and — on a page MASTHEAD only — the first half of the h1 itself, where it names the page (see the heading group in Molecules). It collides with Tailwind's `overline` text-decoration utility, so an UNLAYERED rule at the end of globals.css kills the decoration. Do not move that rule into a layer."
          />
          <Entry
            name=".label"
            what="13px at 0.01em, untransformed. Captions, image labels, stat labels, helper text."
            where="Sitewide, including this page's own furniture."
          />
          <Entry
            name=".card-title"
            what="17 to 22px in the sans. Card captions are captions to their images, not headings, so they left the display ladder. No em accent inside: the accent device belongs to the ladder."
            where="WorkCard client names, BlogList teaser titles, the homepage grids."
          />
          <Entry
            name=".form-title"
            what="15px at weight 600, sentence case, with NO rule underneath it. The one register that leads by emphasis instead of size, because a form's section titles are furniture the reader scans."
            where="StartProjectForm's step titles. Forms only: a page or section head never takes it, and ContactForm has no sections to title, so it would take this if it ever grew any."
          />
          <Entry
            name=".index-num"
            what="18 to 24px sans numerals for itemised lists, the 01 / 02 / 03 voice."
            where="ServicesScrollIndex, MethodSection, WorkCard, BlogList, the homepage."
          />
          <Entry
            name=".stat"
            what="40 to 72px for big numbers, on the display variable, with tracking eased relative to the body sans."
            where="The work detail results band, the pricing figures, the Start-a-project promise bento."
          />
          <Entry
            name=".nav-link"
            what="12px uppercase at 0.24em, with a hover that drops to 0.6 opacity. Tracking was opened from 0.18em at the client's call: airier than the 0.22em meta tier."
            where="Navbar."
          />
          <Entry
            name=".cta-label"
            what="12px at weight 500, uppercase, 0.22em. Button microtype for labels that are not inside a .btn."
            where="WorkCard and BlogList card links."
          />
          <Entry
            name=".fineprint"
            what="12px, clay by default. The smallest tier; on light grounds override the colour, because clay is sub-AA there."
            where="Sitewide meta and this page's annotations."
          />
          <Entry
            name=".blockquote"
            status="deprecated"
            what="A sans-era relic at 24 to 40px, weight 450. Quotes use .statement, the single quote register."
            where="Kept only because the noindexed /mockups archive still references it. Never use it in new work."
          />
        </div>
      </Section>

      {/* ═══ SPACE, GRID, LAYERING ═══════════════════════════════════════ */}
      <Section
        id="atoms-space-grid"
        title="Space, grid and layering"
        note="Two containers, one grid, and a z-index ladder that is small on purpose. The heading-group gaps (.from-overline, .lede) are documented in Molecules, with the composition they exist to serve: they measure themselves against a heading, so they mean nothing on their own."
      >
        <Sub title="Containers" note="Everything sits on one of these two. Nothing sets its own max-width." />
        <div className="mt-5">
          <Entry
            name=".shell"
            what="max-width 1600px with padding-inline clamp(1.5rem, 3vw, 3rem). THE content grid: use it on body sections so copy keeps a comfortable measure. Its fourth width, after 1280, 1400 and 1520; the padding eased with it, which is what actually widens it on a laptop, where the cap never binds."
            where="Every body section, the Navbar's content, and the homepage hero. Do not re-narrow below 1400 without the client asking."
          />
          <Entry
            name=".shell-wide"
            what="max-width 1760px with lighter padding, clamp(1.5rem, 4vw, 4rem). Heroes only, so they breathe wider than the content beneath them."
            where="PageHero, plus one sanctioned exception: the work detail article uses it as the IMAGE canvas while its copy stays grid-indented to a reading measure."
          />
        </div>

        <Sub
          title="The 12-column grid"
          note="Always grid-cols-1 md:grid-cols-12. A bare grid-cols-12 overflows on mobile, which is drift pattern 2 and the single most common one."
        />
        <Stage>
          <div className="grid grid-cols-1 gap-2 md:grid-cols-12">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="rounded-ui-sm border rule-dark bg-ink-raised py-3 text-center"
              >
                <span className="fineprint">{i + 1}</span>
              </div>
            ))}
          </div>
          <p className="fineprint mt-4">
            The canonical hero split is heading on columns 1 to 7 and lede on 9
            to 12; the media variant moves the text to 1 to 6 and puts the
            graphic on 8 to 12.
          </p>
        </Stage>

        <Sub
          title="The z-index ladder"
          note="Six rungs, and that is all the site uses. If something new needs a layer, it belongs on one of these, not between two of them."
        />
        <div className="mt-5">
          <Entry name="z-index 1" what="The grain film. Set inside .grain::before and .grain-light::before, never written in markup." where="globals.css." />
          <Entry name="z-10" what="Content above a ground layer. The single most-used layer on the site: anything sitting over grain, a glow or a plate." where="Sitewide, roughly 57 placements." />
          <Entry name="z-20" what="The exit-fade overlays that fade a section to ink as it leaves." where="The homepage sections and Testimonial." />
          <Entry name="z-30" what="Chrome inside an overlay, above the overlay's own content." where="The Start-a-project close chip." />
          <Entry name="z-50" what="Site chrome: the absolute transparent Navbar, the mobile drawer, and the coming-soon holding page." where="Navbar, coming-soon." />
          <Entry name="z-[70]" what="The full-page form overlay, which must cover the nav. The one arbitrary value in the ladder, and it earns it by being above z-50 with room to spare." where="StartProjectOverlay." />
        </div>
      </Section>

      {/* ═══ RADIUS ══════════════════════════════════════════════════════ */}
      <Section
        id="atoms-radius"
        title="The two radius scales"
        note="We are a rounded brand, settled 2026-08-01 in two passes: round the imagery, then round the furniture. Anything with an AREA rounds. What still does not curve is what has no corner to round: hairline rules, underline-only inputs, tracked type and the wordmark. Pills stay pills, avatar chips stay circles, device bezels keep their hardware radii, and logo marks and the OG card are untouched."
      >
        <Sub
          title="Plate scale: imagery, fluid"
          note="A picture may grow its corner with the viewport, so these are vw clamps. Less curve on small plates, more on large: pick by the plate's size, never by taste, and never a raw arbitrary clamp again."
        />
        <Stage>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Radius
              cls="rounded-plate-sm"
              name="rounded-plate-sm"
              value="clamp(10px, 1vw, 16px)"
              note="PARKED. Minted for small figures and chips of imagery; no live consumer today."
            />
            <Radius
              cls="rounded-plate"
              name="rounded-plate"
              value="clamp(16px, 1.6vw, 26px)"
              note="THE standard. .frame carries it in CSS, so every framed plate and MDX article figure curves together."
            />
            <Radius
              cls="rounded-plate-lg"
              name="rounded-plate-lg"
              value="clamp(20px, 2vw, 34px)"
              note="The big cards. Live on the ContactCTA close card."
            />
          </div>
        </Stage>

        <Sub
          title="Surface scale: controls, fixed"
          note="Fixed pixels, not clamps: a control should not grow its corner with the viewport. Panels, cards, glass, choice controls and form containers take one of these."
        />
        <Stage>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Radius
              cls="rounded-ui-sm"
              name="rounded-ui-sm"
              value="10px"
              note="Chips, choice cards, small controls and swatches."
            />
            <Radius
              cls="rounded-ui"
              name="rounded-ui"
              value="16px"
              note="THE standard. Panels, cards, glass surfaces, form containers. Carried in CSS by .card-soft, .card-glass and .glass-float."
            />
            <Radius
              cls="rounded-ui-lg"
              name="rounded-ui-lg"
              value="22px"
              note="The largest contained surfaces on a page, such as the Start-a-project form panel."
            />
          </div>
          <p className="fineprint mt-6">
            The glass handoff asked for 14px and did not get it: 14 is not on
            the scale, two pixels at panel scale is imperceptible, and a raw
            radius is drift pattern 10. If a 14px rung is ever genuinely
            wanted, it gets added here and to the Tailwind mirror.
          </p>
        </Stage>
      </Section>

      {/* ═══ MATERIAL ════════════════════════════════════════════════════ */}
      <Section
        id="atoms-material"
        title="Material and hairlines"
        note="Grain is the material and it is constant; glow is light and it decays. Every section on the site carries one grain or the other, which is the answer to the 2026-07-24 report that the backgrounds felt disconnected: every dark surface was a material and every light one a flat paint, and that split read as two different sites."
      >
        <Stage className="grain">
          <div className="relative z-10">
            <p className="label text-bone">.grain</p>
            <p className="body-sm mt-2 text-bone-dim">
              The 4% film for DARK grounds: /grain.svg tiled at 200px, on a
              pointer-events-none ::before at z-index 1.
            </p>
          </div>
        </Stage>
        <Stage ground="bone" className="grain-light">
          <div className="relative z-10">
            <p className="label text-ink">.grain-light</p>
            <p className="body-sm mt-2 text-ink-dim">
              The same noise at 5% with mix-blend-mode: multiply, for BONE and
              cream grounds, where it reads as paper tooth. Multiply so the
              noise DARKENS the stock; the dark overlay's normal blend would
              wash bone out. It also dithers, which is what stops low-contrast
              light grounds banding.
            </p>
          </div>
        </Stage>

        <Sub
          title="The contract, and the overflow footgun stated correctly"
          note="This is the note the old page got wrong, and getting it wrong cost the /services odometer twice in one day."
        />
        <div className="mt-5">
          <Entry
            name="the parent"
            what="position: relative, and content above the film on z-10. That is the whole contract."
            where="Every grained section."
          />
          <Entry
            name="overflow-hidden"
            what="NOT required by grain. Both films are an inset-0 ::before, so nothing can overflow. Only blurred GLOW blobs need clipping, because a blur radius genuinely extends past its box."
            where="Apply the clip to the glow layer, not to the section."
          />
          <Entry
            name="the sticky footgun"
            what="An overflow-hidden ancestor becomes the scroll container for any descendant position: sticky, so the pin silently stops working and the element just scrolls away. On any section containing sticky content, put the glow in an absolutely-positioned overflow-hidden layer that is a SIBLING of the sticky content, never its ancestor, and leave the section itself unclipped."
            where="The /services rolling numeral and the manifesto tracks. It regressed twice on 2026-07-24 before the client caught it."
          />
        </div>

        <Sub title="Hairlines" note="Both set border-color only, so they must be paired with a Tailwind border utility: border, border-t, border-y." />
        <Stage>
          <div className="border-t rule-dark pt-3">
            <p className="fineprint">.rule-dark · #2F2820 · var(--ink-line) · the line above this text</p>
          </div>
          <div className="mt-6 rounded-ui-sm bg-bone p-5">
            <div className="border-t rule-light pt-3">
              <p className="fineprint text-ink-mute">
                .rule-light · #DED2BF · var(--bone-line) · the line above this
                text
              </p>
            </div>
          </div>
        </Stage>
      </Section>

      {/* ═══ SCENES ══════════════════════════════════════════════════════ */}
      <Section
        id="atoms-scenes"
        title="Scenes and stocks"
        note="The ground is FLAT by default: every background gradient was retired on 2026-07-09, and the scene classes survive so section semantics do. Flat is the default, not an absolute: the named exceptions are HeroGlow, which grounds the homepage and every interior hero, the ContactCTA close, which is a gradient card, and the homepage craft card. All three keep the gradient INSIDE a hero or a card. None of them puts it on a body-section ground, and if a section feels dead the answer is content or type."
      >
        {/* Not a <Stage> here: the stocks must meet edge to edge so the steps
            between them are visible, and Stage owns its own padding. */}
        <div className="mt-5 overflow-hidden rounded-ui border rule-dark">
          <div className="scene-ink p-8">
            <p className="label text-bone">.scene-ink</p>
            <p className="body-sm mt-2 text-bone-dim">
              Flat ink. Live on the work detail article and the coming-soon
              page.
            </p>
          </div>
          <div className="scene-warm p-8">
            <p className="label text-ink">.scene-warm</p>
            <p className="body-sm mt-2 text-ink-dim">
              Flat bone. Live on PageHero's light tone and the blog index.
            </p>
          </div>
          <div className="scene-cream p-8">
            <p className="label text-ink">.scene-cream</p>
            <p className="body-sm mt-2 text-ink-dim">
              PARKED. Champagne-soft mixed 35% into bone, a warmer stock of the
              same paper. It has had no live consumer since 2026-07-24, when
              the close it was built for became the gradient card; the class
              stays because .scene-cream-deep still derives from its mix.
            </p>
          </div>
          <div className="scene-cream-deep p-8">
            <p className="label text-ink">.scene-cream-deep</p>
            <p className="body-sm mt-2 text-ink-dim">
              The FAQ stock: the cream one step down, cream plus 6% ink. Live
              in FaqSection's default tone. Darkened with INK, never with more
              champagne: raising the champagne share is what made the
              2026-07-10 gold band read too gold, so the hue holds and only the
              value moves.
            </p>
          </div>
        </div>

        <Stage ground="bone">
          <p className="label text-ink">Contrast warning on the creams</p>
          <p className="body-sm mt-2 max-w-[70ch] text-ink-dim">
            On either cream, ink measures about 13.2:1 and ink-dim about 5.4:1,
            but ink-MUTE is only 3.85:1 on the deep cream and 4.36:1 on the
            lighter one. Both are sub-AA. On a cream the meta tier is
            text-ink-dim; ink-mute's roughly 5:1 holds on BONE only, which is
            exactly why the on-light ladder is documented per ground rather
            than as one list.
          </p>
        </Stage>

        <div className="mt-5">
          <Entry
            name=".portrait-fill"
            what="The fifth stock, and the only one that is never a section ground: flat parchment, champagne-soft mixed 30% into bone. It stands in for any image that has not arrived. It was a radial gradient until it was flattened, because the glow read techy beside the real captures; a placeholder is quiet paper."
            where="WorkCard, BlogList, the homepage work cards, Footer, PhoneMockup and BrowserMockup's CSS screens, the parked Deck. The empty-plate composition it sits inside is in Molecules."
          />
        </div>
      </Section>

      {/* ═══ GLASS ═══════════════════════════════════════════════════════ */}
      <Section
        id="atoms-glass"
        title="Glass: a pair picked by ground"
        note="Two glass surfaces of opposite polarity. .card-glass is a bone wash that LIFTS a flat ground; .glass-float is an ink wash that DARKENS busy imagery so bone type can sit on it. WHICH ONE is the pick-by-ground rule in Principles, and the two stages below are that rule's evidence. The surfaces are here; the pill made of one (.btn-glass) belongs to the button hierarchy in Molecules, and so does the entrance they arrive on."
      >
        <Sub title="Over imagery: .glass-float is right, .card-glass is thin" />
        <Stage ground="image">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="glass-float p-5">
              <p className="label text-bone">.glass-float</p>
              <p className="fineprint mt-2 text-bone-dim">
                38% ink fill, blur(22), a 24% bone rim and three shadows: a
                broad lift, a tight contact shadow so it is not hovering in
                nowhere, and an inset top-edge highlight that gives the rim a
                lit edge. Radius --radius-ui.
              </p>
            </div>
            <div className="card-glass p-5">
              <p className="label text-bone">.card-glass</p>
              <p className="fineprint mt-2 text-bone-dim">
                5% bone wash and blur(10). Over imagery it reads as printed ON
                the picture rather than floating above it.
              </p>
            </div>
          </div>
          <p className="fineprint mt-6 text-bone-dim">
            The same surface exists as a pill, <Code>.btn-glass</Code>, and it
            is documented with the other button tiers in Molecules rather than
            here: a pill is not a surface, it is .btn plus a variant, and only
            the button section defines the whole of it.
          </p>
        </Stage>

        <Sub title="Over flat ink: .card-glass is right, .glass-float disappears" />
        <Stage ground="ink">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="card-glass p-5">
              <p className="label text-bone">.card-glass</p>
              <p className="fineprint mt-2 text-bone-dim">
                The bone wash lifts the flat ground; the panel reads as a
                surface. Live on the coming-soon holding card, PageHero,
                ServicesScrollIndex and the /about page.
              </p>
            </div>
            <div className="glass-float p-5">
              <p className="label text-bone">.glass-float</p>
              <p className="fineprint mt-2 text-bone-dim">
                On flat ink the fill is invisible and the shadow has nothing to
                fall on, so it reads as a bug rather than a panel.
              </p>
            </div>
          </div>
          <p className="fineprint mt-5">
            Positioning is the consumer's job, not the material's. The handoff
            that produced .glass-float also asked for panels overhanging their
            device edges; that lives in the graphic placing the panel, and an
            overflow-hidden ancestor silently eats both the overhang and these
            shadows. Live consumers: the ServicesHeroGraphic panels, the
            ServicesTiles panels and the Start-a-project promise bento.
          </p>
        </Stage>

      </Section>

      {/* ═══ MOTION ══════════════════════════════════════════════════════ */}
      <Section
        id="atoms-motion"
        title="Motion"
        note="Entrances fade IN PLACE. The 16px rise was retired on 2026-07-10 because sliding in is a screen idiom and ink develops where it sits; print never arrives from somewhere. And nothing auto-moves: the reader turns the pages. There is exactly one sanctioned exception, recorded below."
      >
        <Sub title="Entrances" />
        <div className="mt-5">
          <Entry
            name=".reveal"
            what="A pure 1.1s opacity fade with a soft cubic-bezier. The global Reveal component in the root layout observes every .reveal, adds .is-in once, then unobserves it; stagger siblings with an inline transitionDelay. Under reduced motion the elements start visible."
            where="Every scroll-entering section. Do not add rival scroll listeners."
          />
          <Entry
            name="animate-fade-in"
            what="A 1.2s keyframe fade for LOAD-INS, paired with opacity-0 and staggered inline animationDelay. Keyframes, not transitions, because there is no observer at first paint."
            where="Hero load-ins."
          />
          <Entry
            name="animate-fade-in-slow"
            what="The same fade at 2.4s: the PLATE TEMPO. Images are the slow layer, developing after the type has set."
            where="PageHero media, the /about plates, the work detail figures."
          />
          <Entry
            name=".plate-develop"
            what="The scroll-entry half of that tempo: a 2.4s opacity transition riding a parent .reveal. Outside a .reveal the image is simply visible, so it is safe anywhere."
            where="LogoStrip, Testimonial, ContactCTA, the homepage."
          />
          <Entry
            name="animate-fade-in-up"
            what="A 0.8s fade with a 20px rise. RETIRED by canon, and genuinely LIVE in one place: the mobile drawer's links and its Instagram handle, both with staggered animationDelay. Recorded here as the standing exception it is rather than pretended away; if the drawer is ever restaged, this is the moment to fold it back into the fade."
            where="Navbar.tsx, plus the noindexed /mockups archive."
          />
        </div>

        <Sub title="Ambient motion" note="Two float speeds, and the one auto-motion the brand allows." />
        <Stage>
          <div className="flex flex-wrap items-center gap-5">
            <span className="card-glass animate-float-slow inline-block px-4 py-3">
              <span className="label text-bone">animate-float-slow · 7s</span>
            </span>
            <span
              className="card-glass animate-float-slower inline-block px-4 py-3"
              style={{ animationDelay: "800ms" }}
            >
              <span className="label text-bone">animate-float-slower · 11s</span>
            </span>
          </div>
          <p className="fineprint mt-6">
            Floaty hero elements only: glass chips and orbs, never content and
            never imagery. Stagger depth by mixing the two speeds and adding an
            inline animationDelay. Live in ServicesScrollIndex and
            ServicesHeroGraphic.
          </p>
        </Stage>
        <div className="mt-5">
          <Entry
            name="animate-marquee"
            status="parked"
            what="A 60s linear -50% loop, with a hover pause in globals.css and two identical copies in a w-max track to make the loop seamless. THE ONE SANCTIONED AUTO-MOTION, minted for the /services fields ribbon at the client's explicit call."
            where="Its only consumer, CreditStrip, is parked, so nothing auto-moves on the live site today; the /mockups archive still runs it."
          />
        </div>

        <Sub
          title="Draw-on strokes"
          note="The page inking its own rules. Entrance-only, so print stillness holds once the section has arrived."
        />
        <Stage>
          <div
            className="reveal flex items-center gap-5"
            style={{ "--sg-delay": "0ms" } as React.CSSProperties}
          >
            <svg viewBox="0 0 48 48" className="h-14 w-14 shrink-0 text-champagne" fill="none" aria-hidden>
              <circle
                cx="24"
                cy="24"
                r="17"
                className="sg-stroke"
                pathLength={100}
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M10 24 H38"
                className="sg-stroke sg-stroke-2"
                pathLength={100}
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            <div>
              <p className="label text-bone">.sg-stroke · .sg-stroke-2</p>
              <p className="fineprint mt-2">
                Strokes carry pathLength=100 and draw themselves in over 1.1s
                when their plate gains .is-in; .sg-stroke-2 adds 220ms so a
                two-part mark draws in sequence. Stagger plates with a
                --sg-delay custom property on the .reveal element. DRAWN by
                default outside a .reveal, which is the safety net: worst case
                the glyph is simply shown, never blank.
              </p>
            </div>
          </div>
        </Stage>
        <div className="mt-5">
          <Entry
            name=".sg-dot"
            status="parked"
            what="The dot fade that follows a drawn form, delayed 850ms past its plate's --sg-delay. The only permitted fill in the glyph vocabulary."
            where="No consumer in the current working set of marks; kept for the on-record alternates that carry a dot."
          />
        </div>

        <Sub
          title="Reduced motion"
          note="One global guard at the end of globals.css snaps every animation and transition to its end state, and zeroes transition-delay too, so staggered draw-ons do not still trickle in one at a time. Critically it makes opacity-0 plus animate-fade-in content visible at once instead of stranding it invisible. .reveal, .glass-frost and .tile-draw each carry their own guard as well."
        />
      </Section>
    </>
  );
}
