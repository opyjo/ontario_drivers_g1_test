import { BookOpen, Clock, Layers3, ListChecks, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { Features } from "@/components/home/Features";
import { CallToAction } from "@/components/home/CTA";
import { PageLayout } from "@/components/layouts/PageLayout";
import { JsonLd } from "@/components/seo/json-ld";
import { publicMetadata, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata = publicMetadata({
  title: "Ontario G1 Practice Tests & Study Guide",
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

const stats = [
  { number: "300", label: "Active questions", icon: ListChecks },
  { number: "40", label: "Questions per simulation", icon: Layers3 },
  { number: "2", label: "Exam topics covered", icon: BookOpen },
  { number: "24/7", label: "Self-paced access", icon: Clock },
] as const;

const confidencePoints = [
  "Separate practice for road signs and rules",
  "Incorrect-answer review for signed-in learners",
  "Clear explanations grounded in Ontario handbook material",
] as const;

export default function HomePage() {
  return (
    <PageLayout>
      <JsonLd
        id="software-application-json-ld"
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: SITE_NAME,
          url: SITE_URL,
          applicationCategory: "EducationalApplication",
          operatingSystem: "Any",
          browserRequirements: "Requires a modern web browser",
          description: SITE_DESCRIPTION,
          inLanguage: "en-CA",
          audience: {
            "@type": "Audience",
            geographicArea: {
              "@type": "AdministrativeArea",
              name: "Ontario, Canada",
            },
          },
        }}
      />

      <Hero stats={stats} />
      <Features />

      <section className="border-y border-border bg-muted/30 py-14 sm:py-16">
        <div className="container mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              Independent and transparent
            </div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Focus on learning, not inflated promises
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              DriveTest Pro is an independent preparation resource. It is not
              affiliated with the Ministry of Transportation or DriveTest, and
              it does not guarantee an exam result.
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-3" aria-label="Learning benefits">
            {confidencePoints.map((point) => (
              <li
                key={point}
                className="rounded-xl border border-border bg-card p-4 text-sm font-medium leading-6 shadow-sm"
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CallToAction />
    </PageLayout>
  );
}
