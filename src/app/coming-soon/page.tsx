import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import HoldingEnquiryCard from "@/components/HoldingEnquiryCard";
import HoldingMasthead from "@/components/HoldingMasthead";
import HoldingPageShell from "@/components/HoldingPageShell";

// The pre-launch holding page — live at the domain while the full site is
// finished, so client-footer credits ("Site by North & Refine") resolve to
// something worth arriving at. Served on EVERY route when HOLDING_PAGE=true
// (see src/middleware.ts); reachable at /coming-soon otherwise.
//
// The frame, the vertical column and the fineprint live in HoldingPageShell;
// the page is the two columns of the composed unit.
export const metadata: Metadata = {
  title: "Coming soon",
  description: SITE.description,
  alternates: { canonical: "/coming-soon" },
};

export default function ComingSoonPage() {
  return (
    <HoldingPageShell>
      {/* The pitch — who we are, for the visitor arriving from a client
          site's footer credit */}
      <HoldingMasthead />

      {/* The form — the right half of the 50/50 split */}
      <HoldingEnquiryCard />
    </HoldingPageShell>
  );
}
