import { getFeaturedProjects } from "@/lib/work";
import { getAllPosts } from "@/lib/journal";
import BlogRailBand from "@/components/BlogRailBand";
import ContactCTA from "@/components/ContactCTA";
import DesignFlip from "@/components/dev/DesignFlip";
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

  return (
    <main className="bg-ink text-bone">
      {/* ══ THE HERO CANVAS (2026-08-07 layout pass). The canvas holds the
          HERO ALONE now: the manifesto left it the same day it briefly
          joined, becoming the BONE ACT below — the client's own call ("maybe
          try the next section a different bg colour?"), because the shared
          dark ground gave the band's big air no edges and the devices
          nothing definite to end against. The canvas still does what it was
          brought in for — no seam WITHIN the dark act, the clip that lets
          the devices render in full — and its built-in foot fade resolves
          the ground to ink so the ink→bone cut below lands as a DESIGNED
          edge, /about's exact architecture. THE GLOW IS THE INTERIOR RECIPE
          EXACTLY: intensity AND topLeft are the shared defaults since the
          2026-08-08 night unification — no overrides passed at all, so the
          homepage cannot drift from the interior heroes by construction. Client
          calls, in order: "make the homepage blurred gradient graphics the
          same" (2026-08-08), then "knock the glow back across the whole
          site" the same day; homepage dose history 1 → 0.7 → 0.4 → the
          shared constant. ══ */}
      <DesignFlip label="Hero">
        <SharedCanvas>
          {/* HOMEPAGE HERO — 1D promoted from Claude Design (2026-07-19),
              re-laid in FLOW 2026-08-07: kicker → H1 → CTAs → devices at the
              foot, one column, no absolute layers to collide. */}
          <HomeHero />
        </SharedCanvas>
      </DesignFlip>

      {/* ══ THE BONE ACT — the manifesto on its own light ground, hard
          designed cuts at both ends (ink→bone above, bone→ink into Selected
          work). The statement fills word by word in normal flow; flush left
          per the /services precedent. "A studio that treats..." in its
          original This-January form. ══ */}
      <DesignFlip label="Manifesto">
        <ManifestoTrack
          text={MANIFESTO}
          cta={{ href: "/about", label: "Our story" }}
        />
      </DesignFlip>

      {/* ── Selected work — the page's only imagery, and the proof. ── */}
      <DesignFlip label="Selected work">
        <SelectedWorkBand projects={featured} />
      </DesignFlip>

      {/* ── What we do — the ruled rows, the page's formal stabiliser. ── */}
      <DesignFlip label="What we do">
        <WhatWeDoBand exitFade />
      </DesignFlip>

      {/* ── Kind words — ONE testimonial, returned 2026-07-09 as the page's
          human proof (work → words). COMPONENTISED 2026-07-24 when /services
          gained the same band — the canonical commentary (the RowenPhone 5
          plate, the avatar exception, the PLACEHOLDER-quote rule) moved into
          <Testimonial>; her full portrait
          (assets/testimonials/client-portrait.jpg) stays in reserve for
          /about. exitFade: the live-era section handover, homepage only. ── */}
      <DesignFlip label="Kind words">
        <Testimonial exitFade />
      </DesignFlip>


      {/* ── (The process left the homepage entirely 2026-07-10 late — it
          burned through carousel, spine timeline and a slim method strip
          in one day before the client cut it altogether. /services owns
          the five steps in full; the homepage doesn't tease them. The
          method-strip pattern survives in git history.) ── */}

      {/* ── Blog teasers — a rail instead of a grid (2026-07-10). ── */}
      <DesignFlip label="Blog rail">
        <BlogRailBand posts={posts} exitFade />
      </DesignFlip>

      {/* ── CTA — the close. (It was "the bone interruption" until
          2026-07-24, when the band became ink plus the gradient card.) ── */}
      <DesignFlip label="Close">
        <ContactCTA />
      </DesignFlip>
    </main>
  );
}
