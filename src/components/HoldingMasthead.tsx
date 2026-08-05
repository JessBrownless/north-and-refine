import { SITE } from "@/lib/site";

/**
 * THE HOLDING PAGE'S PITCH — the left half of the 50/50 split: kicker,
 * statement, and the studio line. It is written for ONE reader, the visitor
 * arriving from a client site's footer credit, which is the whole reason
 * /coming-soon exists before the site does.
 *
 * THE COPY IS THE COMPONENT (the ContactCTA precedent): this is the studio's
 * one pre-launch statement, carrying the accent-word device on `trust` that
 * the homepage masthead also lands on. The lede is SITE.tagline, so the
 * holding page and the metadata can never say different things.
 *
 * ⚠ THE LOAD-IN IS THE PAGE'S, NOT THE COMPONENT'S IDEA. The kicker tracks
 * in, then the statement at 0.5s, the lede at 0.7s, and the enquiry card at
 * 1.1s: one sequence spanning BOTH columns, so the delays here and in
 * `HoldingEnquiryCard` are read together. `animate-track-in` survives here
 * alone; it retired from the brand with the old homepage top (2026-07-16).
 *
 * Extracted from /coming-soon 2026-08-05.
 */
export default function HoldingMasthead() {
  return (
    <div className="md:col-span-6">
      <p className="overline opacity-0 animate-track-in">
        Coming soon
      </p>
      <h1
        className="heading-xl from-overline max-w-3xl text-balance opacity-0 animate-fade-in"
        style={{ animationDelay: "0.5s" }}
      >
        Building websites that patients <em className="italic">trust</em>.
      </h1>
      <p
        className="lede body-lg max-w-2xl text-bone-dim opacity-0 animate-fade-in"
        style={{ animationDelay: "0.7s" }}
      >
        {SITE.tagline}.
      </p>
    </div>
  );
}
