import Link from "next/link";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import type { PracticeLandingPageData } from "@/lib/content/practice-pages";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { TrackedLink } from "@/components/analytics/tracked-link";
import { PageLayout } from "@/components/layouts/PageLayout";

export function PracticeLandingPage({ page }: Readonly<{ page: PracticeLandingPageData }>) {
  const pageUrl = absoluteUrl(page.path);
  return (
    <PageLayout>
      <BreadcrumbJsonLd id={`${page.path.slice(1)}-breadcrumbs`} items={[{ name: "Home", url: absoluteUrl("/") }, { name: page.title, url: pageUrl }]} />
      <JsonLd id={`${page.path.slice(1)}-learning-resource`} data={{ "@context": "https://schema.org", "@type": "LearningResource", name: page.title, description: page.description, url: pageUrl, inLanguage: "en-CA", provider: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") }, educationalUse: "practice" }} />
      <article>
        <header className="border-b bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 sm:py-20">
          <div className="container mx-auto max-w-5xl px-4">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">{page.eyebrow}</p>
            <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl">{page.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{page.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <TrackedLink href={page.ctaHref} eventName="practice_start" eventData={{ landing_page: page.path, practice_destination: page.ctaHref }} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground shadow hover:bg-primary/90">
                {page.ctaLabel}<ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <Link href="/study-guide" className="inline-flex min-h-11 items-center rounded-lg border bg-background px-6 py-3 font-semibold hover:bg-muted">Review the study guide</Link>
            </div>
          </div>
        </header>
        <div className="container mx-auto max-w-5xl space-y-12 px-4 py-12">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Page coverage">
            {page.facts.map((fact) => <li key={fact} className="flex items-center gap-2 rounded-xl border bg-card p-4 text-sm font-medium"><CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />{fact}</li>)}
          </ul>
          {page.sections.map((section) => (
            <section key={section.heading} className="max-w-3xl">
              <h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-base leading-7 text-muted-foreground">{paragraph}</p>)}
              {section.bullets ? <ul className="mt-5 space-y-3">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-3 leading-7"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" /><span>{bullet}</span></li>)}</ul> : null}
            </section>
          ))}
          <aside className="rounded-xl border bg-muted/30 p-6">
            <h2 className="font-semibold">Official references</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Reviewed August 11, 2026. Requirements and testing procedures can change; confirm them with these official sources.</p>
            <ul className="mt-4 space-y-2">{page.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary underline underline-offset-4">{source.title}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a></li>)}</ul>
          </aside>
        </div>
      </article>
    </PageLayout>
  );
}
