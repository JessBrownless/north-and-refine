import Link from "next/link";
import ExitFadeOverlay from "@/components/ExitFadeOverlay";
import ManifestoStatement from "@/components/ManifestoStatement";
import SectionGlow from "@/components/SectionGlow";

/**
 * THE MANIFESTO BAND — BACK ON INK (2026-08-09, client: "Intro section
 * after hero: Black (remove rounded corners)"). This band's short history
 * is worth keeping, because it explains why "ink" isn't simply a return to
 * where it started: it OPENED dark, edgeless, 160vh tall, on a scroll pin;
 * went LIGHT for exactly one reason (a COLOUR CUT is the only clean edge
 * the system has, and the dark version had none — same-colour ground
 * stretching until it happened to stop, plus the hero's devices "cutting
 * off into that same-colour field" awkwardly); gained the rounded-top SHEET
 * EDGE the client liked ("I've seen websites do that… looks nice"); and now
 * returns to ink with the sheet edge explicitly removed. The reasons that
 * took it light in the first place (no edge, awkward device crop) are BOTH
 * STILL SOLVED — not by this band's own colour, but by what changed under
 * it since: the hero's device shelf now clips against its OWN section edge
 * (HomeHero's overflow:hidden + negative shelf margin, 2026-08-08), and the
 * hero's SharedCanvas already resolves to flat `--ink` at its foot. So an
 * ink Manifesto sitting directly under an ink-resolving hero foot is TWO
 * flat sections meeting at the exact same token (#110E0A both sides) —
 * literally no seam to hide, the CLAUDE.md-sanctioned outcome, achieved for
 * free rather than by wrapping both in one shared canvas.
 *
 * NO ROUNDED CORNERS, explicitly asked for: `rounded-t-plate-lg` is
 * dropped outright, not swapped for a smaller radius. The sheet-edge device
 * only ever made sense as the seam between two DIFFERENT colours (the ink
 * peeking through the notch was the whole effect); on ink-into-ink there is
 * no colour to peek through, so a rounded top here would be corners with
 * nothing to curve away from.
 *
 * THE PIN IS GONE (2026-08-07 morning, client: it "blocks the screen into
 * place… much bigger padding or something so it feels more fluid") — the
 * site's last scroll pin, ending on the same verdict that unpinned /services
 * on 2026-07-24. The statement fills word by word at the reader's scroll
 * pace, in normal flow; RE-INVERTED 2026-08-09 (the words develop dim
 * bone → full bone again, matching every other dark section's fill).
 * Statement stays FLUSH LEFT on the rail (client's call — the
 * /services belief precedent; the hero above remains the page's one centred
 * moment).
 *
 * TYPE SITS AT .heading-xl, and stayed there when the image left
 * (2026-08-09). The step-down from .display was made during the image split
 * for two reasons, and only one was the image: .display wrapped the sentence
 * into a 7-line staircase in the six-column well the plate created, AND the
 * ladder had already assigned this rung — CLAUDE.md's .heading-xl entry
 * names "on the homepage: THE STUDIO STATEMENT, the ContactCTA close", which
 * makes the .display era the actual drift. The wrap reason went with the
 * plate; the canon reason did not.
 *
 * THE AIR: min-h 80vh at md, statement centred in the band. The number has
 * fallen twice at md as the band's ARCHITECTURE changed, which is the
 * useful record here: 160vh when it was an edgeless DARK field and only
 * sheer distance could suggest an edge; 120vh once the bone act gave it two
 * designed colour cuts and the air no longer had to do that work; 80vh when
 * the client read the result as simply "too tall" (2026-08-08). At 120 the
 * statement held 40% of its own band and sat in ~300px of air per side; at
 * 80 it holds ~60%, which is a slab with margin rather than a statement
 * adrift in one. THE LESSON, since this is the third setting: air is
 * relative to what BOUNDS it, so re-judge this number whenever the band's
 * edges change, and never carry a value across an architecture change.
 * Still MIN-H + CENTRING, deliberately not py-*: padding utilities are
 * frozen until the spacing sweep lands. The scrub is immune to the number:
 * the track is the inner statement block, not the band.
 *
 * THE MOBILE min-h IS BACK TO 56vh (2026-08-09, with the plate's removal).
 * It had gone 56 → 100 for one reason: the stacked 4:5 plate grew the phone
 * content stack to 749px, past 56vh's 455px on an 812px phone, and min-h +
 * centring only produces air while min-h EXCEEDS the content — so the
 * mechanism had silently stopped working and the rounded top corner met the
 * first line of text at 0px. With the plate gone the original number clears
 * the content again. Re-measure if the statement or CTA grows materially.
 *
 * THE EXIT FADE IS BACK (2026-08-09) now that this band is INK again — it
 * renders unconditionally rather than behind a prop, because this component
 * is homepage-only and the fade is not optional on a black band. The note
 * below is kept because its REASONING still governs: it explains why the
 * fade must never return if this band ever goes bone again.
 *
 * (Historic) NO EXIT FADE, and the old `exitFade` prop was DELETED:
 * the fade-to-ink handover belongs to dark sections dissolving into each
 * other, and a bone band does not dissolve — it CUTS. (Its one consumer was
 * this band's dark era; the overlay component lives on under the dark bands
 * below.) `grain-light` is the paper tooth, multiply-blended per the one-
 * material rule; the section needs relative + overflow-hidden for it, which
 * is safe — nothing inside pins.
 *
 * ⚠ data-manifesto-track ON THE INNER BLOCK IS LOAD-BEARING. The scrub
 * measures the nearest track element, and its completion tuning assumes the
 * track ≈ the statement block. Measure the tall air band instead and the
 * fill completes while the words are still at the fold.
 *
 * `text` is a PLAIN STRING: the compartment splits it per word, so the
 * statement carries no italic accent — the fill is the emphasis.
 */
export default function ManifestoTrack({
  text,
  cta,
  ground,
  actSelf = false,
}: {
  /** THE ACT SYSTEM (2026-08-11) — declaring a ground opts this band into the
      act rule in globals.css. Omit it and the band keeps its own padding,
      which is what every non-homepage consumer does. */
  ground?: "ink" | "bone";
  /** "I declare my ground for ADJACENCY only; I pace myself." */
  actSelf?: boolean;

  /** The statement itself. One thought; at heading-xl in the six-column
      split the homepage runs five lines. */
  text: string;
  /** The onward link under the statement, if the band carries one. */
  cta?: { href: string; label: string };
}) {
  return (
    /* THE SHEET EDGE (2026-08-08, client — straight after reverting the
       card-homepage trial: "can we try 'A studio that treats' with rounded
       corners just at the top? I've seen websites do that before and it
       looks nice"). The bone act's TOP corners take the big-card radius, so
       the band reads as a light sheet rising over the dark hero — the ink
       shows through the two corner notches, which is what sells it. The
       radius is the PLATE-LG token, not a raw value (drift pattern 10), and
       ONLY the top curves: the bottom cut into Selected work stays a hard
       straight edge on purpose — one curved lift, one clean cut, so the
       device reads as an entrance, not a pill. The card trial died the same
       hour this was born; this is the one survivor of it the client kept. */
    <section className="relative z-10 overflow-hidden grain bg-ink text-bone"
      {...(ground ? { "data-ground": ground } : {})}
      {...(actSelf ? { "data-act-self": "" } : {})}
    >
      {/* LIGHT ON THE RIGHT (2026-08-09, client: "what about if we went a bit
          heavier on the blurred gradient over the background on the right of
          the… section?"). Worth recording that this band had NO glow at all
          before — it was flat ink, the SharedCanvas glow belonging to the
          hero above — so this adds one rather than raising one.

          It answers the same problem the 4:5 plate and the borrowed carousel
          card were both trying to solve and the client rejected: the
          statement holds the left of the rail and the right half was empty.
          LIGHT fills it without putting an object there, which is why this
          one works where the other two did not.

          `seam={false}` renders the placed blob ALONE. The tail and the
          seam wash exist to carry a hero's warmth across a boundary; this
          band sits under a canvas that already resolves to flat ink, so a
          wash would lift the top edge for no reason.

          BOTH NUMBERS ARE WELL ABOVE CANON, and deliberately: the 0.02 dose
          and 36×30% geometry are tuned for a glow DECAYING out of a hero,
          where being easy to miss is the point. This one is the only light
          in its band and has to carry a whole half of the rail, so it runs
          at 0.18 across 52×58%. Tuned by eye against the statement — first
          pass at intensity 4 (0.08) on canon geometry was invisible. */}
      <SectionGlow
        blob="right"
        seam={false}
        intensity={9}
        blobSize={{ width: "52%", height: "58%", top: "16%" }}
      />
      <div className="relative z-10 flex min-h-[56vh] items-center md:min-h-[80vh]">
        {/* TEXT ONLY AGAIN (2026-08-09, client: "I'm very happy with the
            images now in the hero so can we revert the… section to be text
            only please?"). The 4:5 Rowen plate that sat on cols 8–12 is gone
            and the statement has the whole rail back — the band is one
            block again, `.shell` IS the statement block, so
            data-manifesto-track rides it directly rather than an inner
            column.

            ⚠ THE PLATE'S REMOVAL IS WHY THE MOBILE min-h DROPS BACK TO 56vh.
            It went 56 → 100 only because the stacked plate had grown the
            phone content stack past 56vh (749px against 455px), which
            silently killed the min-h + centring mechanism — air only exists
            while min-h EXCEEDS the content. Take the plate away and the
            original number does its job again; leaving 100vh would have
            been ~350px of unasked-for air on phones. This is the band's own
            documented lesson holding: re-judge the number whenever the
            band's edges change.

            ⚠ THE TYPE STAYS AT .heading-xl, which is NOT simply what the
            plate left behind. The step-down had two reasons and only one of
            them was the plate: .display wrapped into a 7-line staircase in
            a six-column well, AND the ladder had already assigned this
            rung — CLAUDE.md's .heading-xl entry names its consumers as
            "DETAIL-page H1s… on the homepage: THE STUDIO STATEMENT, the
            ContactCTA close". The wrap reason goes with the plate; the
            canon reason does not, so .display here would be reinstating the
            drift the step-down corrected. It is one word to change if the
            statement now reads too quiet on the full rail. */}
        <div data-manifesto-track className="shell w-full">
          <ManifestoStatement text={text} className="heading-xl max-w-none" />
          {cta && (
            <div className="mt-12 reveal" style={{ transitionDelay: "160ms" }}>
              {/* The on-INK secondary, back to one live consumer for
                  .btn-secondary-light's sibling since the band re-inked. */}
              <Link href={cta.href} className="btn btn-secondary-dark">
                <span aria-hidden>↳</span>
                {cta.label}
              </Link>
            </div>
          )}
        </div>
      </div>
      {/* THE BLACK FADE-OUT (2026-08-09, client: "any section that's black,
          as it goes up to the top of the screen on scroll, to fade into
          black… a little black fade over it"). This is the site's existing
          handover overlay, driven by <ExitFades> in the root layout, and the
          rule it has always carried is the one the client just described in
          her own words: the fade-to-INK belongs to DARK sections. That is
          precisely why it came OFF What we do, Kind words and the blog rail
          earlier today — those went bone, and an ink wash over a light band
          was the "fades to white as you scroll" bug. Now it goes back on the
          bands that are actually black.

          ⚠ It must stay a DIRECT child of this section: <ExitFades> measures
          el.parentElement to get its scope, so wrapping it changes the window
          it fades over. */}
      <ExitFadeOverlay />
    </section>
  );
}
