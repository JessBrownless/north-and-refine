import Link from "next/link";

/**
 * THE NEXT-PROJECT BAND — the onward step at the foot of a case study: a clay
 * kicker and the next study's title, the whole thing one link.
 *
 * IT SITS BETWEEN THE STUDY AND THE `ContactCTA`, and that order is the
 * argument: a reader who has finished one case study is offered another piece
 * of work BEFORE being asked to start a project. The band is quiet on purpose
 * for the same reason. The title takes `.heading-lg`, the SIGNPOST register,
 * so it can never outrank the article H1 above it or shout over the close's
 * flagship CTA below.
 *
 * IT CARRIES NO `.reveal`. It is a small, low band that the reader usually
 * scrolls past at speed, and a fade at that point in the page reads as a
 * stutter rather than an entrance.
 *
 * THE ROW IS THE LINK, and the affordance is the title's opacity dim through
 * the group hover. No arrow, no pill: this is navigation between two pieces of
 * the same thing, not a call to action.
 */
export default function NextProjectBand({
  href,
  title,
  kicker = "Next project",
}: {
  href: string;
  title: string;
  kicker?: string;
}) {
  return (
    <section className="shell py-16 border-t rule-dark">
      <Link href={href} className="group block">
        <p className="overline text-clay">{kicker}</p>
        <h2 className="heading-lg text-bone from-overline transition-opacity group-hover:opacity-70">
          {title}
        </h2>
      </Link>
    </section>
  );
}
