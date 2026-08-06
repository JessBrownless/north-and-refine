import { getFeaturedProjects } from "@/lib/work";
import { getAllPosts } from "@/lib/journal";
import BlogRailBand from "@/components/BlogRailBand";
import LogoStrip, { type LogoStripItem } from "@/components/LogoStrip";
import ContactCTA from "@/components/ContactCTA";
import HomeHero from "@/components/HomeHero";
import ManifestoTrack from "@/components/ManifestoTrack";
import SelectedWorkBand from "@/components/SelectedWorkBand";
import SharedCanvas from "@/components/SharedCanvas";
import Testimonial from "@/components/Testimonial";
import WhatWeDoBand from "@/components/WhatWeDoBand";

// Homepage — TYPE-LED, FLAT, EDITED (decided 2026-07-09, "rip up the rule
// book"; tightened same day: "everything should earn its place"). The page
// works the way the studio's own Instagram posts work: huge Saol on flat
// warm ink, one italic accent word per statement, quiet kickers, hairlines,
// air. Nothing performs (no deck, no blend tricks, no scroll pin, no
// ambient pools, no grain, no exit fades, no marquee — all parked in the
// system, none invited here). ⚠ That last sentence has been PARTLY false
// since 2026-07-11, when the sticky manifesto track and the exit fades came
// back at the client's request; it is kept because it records the intent the
// page was cut down to, not because it describes the page. The pin half was
// RECONCILED 2026-08-07 — the manifesto unpinned and joined the glow
// language, so the EXIT FADES are now the page's last live-era holdover. Imagery: the hero
// plate (Rowen 5 portrait in the masthead's dead corner), the work captures
// (Selected work), and the close plate (Rowen 8 landscape in ContactCTA) —
// the two Rowen frames bookend the page: same room, same suite, the client's
// site on screen.
//
// Cut in the earn-its-place pass (2026-07-09 evening): the hero disciplines
// list, the proof four-up, the service-row leads, the "Who we work with"
// industries section, and the CTA's email/location rail. ("Kind words"
// was also cut that day, then returned the same evening as ONE visibly-
// placeholder testimonial after Selected work — see the section note.)
// The receipts strip (2026-07-09's compact return of the proof numbers)
// was cut for good 2026-07-10: audited against what we can actually
// stand behind, the numbers were positioning claims or too weak to
// publish. Real, client-approved metrics belong inside their case
// studies (work frontmatter `metrics`) when they exist — not here.
//
// COMPOSITION ONLY (2026-08-05): every band below is a component, so this
// file is the page's ORDER and its DATA and nothing else. The reasons a band
// looks the way it does moved into the band; edit them there and every
// consumer, /stylesheet included, moves together.

// The homepage manifesto — This-January length: one thought, four lines.
const MANIFESTO =
  "A studio that treats the clinic\u2019s digital presence with the same care as the practice itself.";

export default function HomePage() {
  const featured = getFeaturedProjects(4);
  const posts = getAllPosts().slice(0, 6);

  const logoStripItems: LogoStripItem[] = featured.map((project) => ({
    name: project.frontmatter.client,
    href: `/work/${project.slug}`,
  }));

  return (
    <main className="bg-ink text-bone">
      {/* ══ THE SHARED CANVAS — hero + manifesto on ONE ground (2026-08-07,
          client: a visible line at the join, "they need to blend seamlessly,
          like one shared background… don't fight the seam with
          colour-matching, remove the seam"). Which is verbatim the
          shared-canvas rule: the first glowed cut tried the seam contract
          (anchor strip + SectionGlow resuming the tone) and a line read
          anyway, exactly as it did twice on /about before that page
          converted. One wrapper owns base, glow (full hero dose), grain and
          the foot fade to ink; hero and manifesto render groundless on it.
          The canvas clip is also what UN-CROPS the hero's device row: sides
          still shear at the viewport edge (the 1D comp's edge-to-edge crop),
          but the bottom clip now sits ~160vh further down, so the devices
          render in full and trail into the manifesto's air. ══ */}
      <SharedCanvas intensity={1}>
        {/* HOMEPAGE HERO — 1D promoted from Claude Design (2026-07-19). */}
        <HomeHero />

        {/* Manifesto — the statement fills word by word as it scrolls
            through, in normal flow on the canvas's own light (unpinned
            2026-08-07; the site's last scroll pin went with it). "A studio
            that treats..." in its original This-January form. */}
        <ManifestoTrack
          text={MANIFESTO}
          cta={{ href: "/about", label: "Our story" }}
          exitFade
        />
      </SharedCanvas>

      {/* ── Selected work — the page's only imagery, and the proof. ── */}
      <SelectedWorkBand projects={featured} />

      {/* ── What we do — the ruled rows, the page's formal stabiliser. ── */}
      <WhatWeDoBand exitFade />

      {/* ── Kind words — ONE testimonial, returned 2026-07-09 as the page's
          human proof (work → words). COMPONENTISED 2026-07-24 when /services
          gained the same band — the canonical commentary (the RowenPhone 5
          plate, the avatar exception, the PLACEHOLDER-quote rule) moved into
          <Testimonial>; her full portrait
          (assets/testimonials/client-portrait.jpg) stays in reserve for
          /about. exitFade: the live-era section handover, homepage only. ── */}
      <Testimonial exitFade />

      {/* ── Trust bar — under the testimonial (2026-07-11, second move of
          the day: first-screen → after The Studio → here): one client
          speaks in Kind words, then the roster corroborates — words, then
          receipts. Below the fold it reveals like its neighbours. ── */}
      <LogoStrip items={logoStripItems} />

      {/* ── (The process left the homepage entirely 2026-07-10 late — it
          burned through carousel, spine timeline and a slim method strip
          in one day before the client cut it altogether. /services owns
          the five steps in full; the homepage doesn't tease them. The
          method-strip pattern survives in git history.) ── */}

      {/* ── Blog teasers — a rail instead of a grid (2026-07-10). ── */}
      <BlogRailBand posts={posts} exitFade />

      {/* ── CTA — the close. (It was "the bone interruption" until
          2026-07-24, when the band became ink plus the gradient card.) ── */}
      <ContactCTA />
    </main>
  );
}
