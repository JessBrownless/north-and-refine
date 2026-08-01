import type { Metadata } from "next";
import { breadcrumbSchema, contactPageSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import PageHero from "@/components/PageHero";
import SectionGlow from "@/components/SectionGlow";
import StartProjectForm from "@/components/StartProjectForm";

/**
 * /start-a-project — the FALLBACK PAGE behind the form overlay (2026-07-31,
 * client: "Start a project" is a button that "does a form overlay" anywhere
 * on the site; /contact stays plain contact). Every "Start a project" CTA
 * links here, and <StartProjectOverlayHost> (mounted via Navbar) intercepts
 * those clicks to open the overlay in place — so this page is what no-JS
 * visitors, middle-clicks, crawlers and shared links get. Same form, same
 * ledger grammar (see StartProjectForm), so the two paths can't drift.
 *
 * The page is the canonical split masthead over ONE section: the form as the
 * content. No ContactCTA at the foot — this IS the conversion page, same as
 * /contact.
 */

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Start a project with North & Refine. A few questions about your practice and what you need: web design, search, or brand identity. We reply within two working days.",
  alternates: { canonical: "/start-a-project" },
};

export default function StartAProjectPage() {
  return (
    <main className="bg-ink">
      <JsonLd
        data={[
          contactPageSchema(
            String(metadata.description),
            "/start-a-project",
            `Start a project with North & Refine`,
          ),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Start a project", path: "/start-a-project" },
          ]),
        ]}
      />

      {/* The canonical interior masthead. No hero CTA — the form below IS
          the CTA (the /contact precedent). */}
      <PageHero
        align="split"
        spacious
        overline="Start a project"
        title={
          <>
            Tell us about your <em>practice</em>.
          </>
        }
        lede="Five questions, two minutes. Enough for the first conversation to be a useful one; nothing here commits you to anything."
      />

      {/* The hero blend decays through the form section (the seam contract);
          the individual blob sits LEFT so the ruled rows' right columns stay
          quiet behind the fields. */}
      <section className="relative grain overflow-hidden">
        <SectionGlow blob="left" />
        <div className="shell relative z-10 pt-10 pb-24 md:pt-12 md:pb-32">
          <StartProjectForm />
        </div>
      </section>
    </main>
  );
}
