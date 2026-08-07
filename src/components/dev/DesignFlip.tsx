import DesignFlipClient from "@/components/dev/DesignFlipClient";

/**
 * THE DESIGN FLIPPER — a DEV-ONLY auditioning tool that puts a ground toggle
 * on each homepage band (2026-08-08, client: "I wanted the flipper toggles on
 * the homepage too").
 *
 * ⚠ IT NEVER RENDERS FOR A VISITOR. In production this component returns its
 * children untouched — no wrapper element, no toggle, no data attribute — so
 * the deployed markup is byte-identical to having never wrapped the band, and
 * the inversion rules in globals.css have nothing to hook. VERIFIED against a
 * real production build: zero occurrences of `data-flip-sketch` or the toggle
 * in the built homepage HTML. That gate matters more here than anywhere else
 * on the site: the homepage is the studio's own shop window, deploys build
 * from the WORKING TREE rather than a tagged commit, and design chrome on a
 * marketing page would read as a broken site.
 *
 * ⚠ ONE HONEST CAVEAT, measured rather than assumed: because the client half
 * is imported at module scope, its code still lands in the page's JS chunk in
 * production as UNREACHABLE code (~8KB chunk, a fraction of it this). It is
 * never instantiated — the server never sends the element — so it costs a few
 * KB of transfer and nothing else. Do not upgrade that to "it never ships" in
 * this comment; if the few KB ever matter, the fix is a dynamic import here,
 * not a rewording.
 *
 * WHAT IT ACTUALLY SHOWS, stated plainly: a SKETCH. None of the homepage
 * bands has a real light variant — they hard-code bg-ink and text-bone — so
 * flipping one does not reveal a rendering that exists in the code. It
 * inverts grounds, the two type ladders and the hairlines so a composition
 * can be JUDGED on the opposite ground, and stamps the band "sketch" while
 * it does. That is the honest description, and it is why the badge is not
 * dismissible.
 *
 * ⚠ IT IS NOT THE /stylesheet FLIPPER, and must never share code with it.
 * That one documents the system, so it refuses to fake a light rendering and
 * reports "no light variant" instead — canon may not be aspirational. This
 * one is a scratch pad on a working page. Same gesture, opposite obligations,
 * which is exactly why the stylesheet primitives are forbidden from being
 * imported into the site (see _ui.tsx) and why this has its own component.
 *
 * IF A BAND SHOULD REALLY GO LIGHT, the answer is a `tone` prop on that
 * component — the FaqSection and PageHero precedent — not this. The flipper
 * is where you decide that a light variant is worth building; it is never
 * the light variant.
 */
export default function DesignFlip({
  label,
  children,
}: {
  /** Band name shown in the toggle, so the page reads as a list of bands. */
  label: string;
  children: React.ReactNode;
}) {
  if (process.env.NODE_ENV === "production") return <>{children}</>;
  return <DesignFlipClient label={label}>{children}</DesignFlipClient>;
}
