import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ExternalLink } from "lucide-react";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { JsonLd } from "@/components/seo/json-ld";
import { PageLayout } from "@/components/layouts/PageLayout";
import { getGuideArticle, guideArticles } from "@/lib/content/guides";
import { absoluteUrl, publicMetadata, SITE_NAME } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
export function generateStaticParams() { return guideArticles.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getGuideArticle((await params).slug);
  if (!article) return { title: "Guide Not Found", robots: { index: false, follow: false } };
  return publicMetadata({ title: article.title, description: article.description, path: `/guides/${article.slug}`, type: "article" });
}

export default async function GuideArticlePage({ params }: Props) {
  const article = getGuideArticle((await params).slug);
  if (!article) notFound();
  const url = absoluteUrl(`/guides/${article.slug}`);
  return (
    <PageLayout>
      <BreadcrumbJsonLd id={`${article.slug}-breadcrumbs`} items={[{ name: "Home", url: absoluteUrl("/") }, { name: "Guides", url: absoluteUrl("/guides") }, { name: article.title, url }]} />
      <JsonLd id={`${article.slug}-article`} data={{ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.description, url, mainEntityOfPage: url, datePublished: article.publishedAt, dateModified: article.updatedAt, inLanguage: "en-CA", author: { "@type": "Organization", name: `${SITE_NAME} editorial team`, url: absoluteUrl("/about") }, publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") } }} />
      <article className="container mx-auto max-w-4xl px-4 py-14">
        <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted-foreground"><Link href="/guides" className="hover:text-primary">Guides</Link><span aria-hidden="true"> / </span><span>{article.title}</span></nav>
        <header>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Ontario G1 guide</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">{article.title}</h1>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">{article.intro}</p>
          <p className="mt-4 text-sm text-muted-foreground">By the DriveTest Pro editorial team · Published <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time> · Reviewed <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time> · {article.readingMinutes} min read</p>
        </header>
        <section className="mt-10 rounded-xl border bg-blue-50/60 p-6"><h2 className="text-xl font-bold">Key takeaways</h2><ul className="mt-4 space-y-3">{article.takeaways.map((item) => <li key={item} className="flex gap-3 leading-7"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{item}</li>)}</ul></section>
        <div className="mt-12 space-y-12">{article.sections.map((section) => <section key={section.heading}><h2 className="text-2xl font-bold tracking-tight">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 leading-8 text-muted-foreground">{paragraph}</p>)}{section.bullets ? <ul className="mt-5 space-y-3">{section.bullets.map((bullet) => <li key={bullet} className="flex gap-3 leading-7"><CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />{bullet}</li>)}</ul> : null}</section>)}</div>
        <aside className="mt-12 rounded-xl border bg-muted/30 p-6"><h2 className="font-semibold">Official sources</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">This independent guide was reviewed on August 11, 2026. Rules and procedures can change; use the official pages below for current requirements.</p><ul className="mt-4 space-y-2">{article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-sm font-medium text-primary underline underline-offset-4">{source.title}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a></li>)}</ul></aside>
        <div className="mt-10 flex flex-wrap gap-3"><Link href={article.practiceHref} className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground">{article.practiceLabel}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link><Link href="/guides" className="inline-flex min-h-11 items-center rounded-lg border px-6 py-3 font-semibold">Explore more guides</Link></div>
      </article>
    </PageLayout>
  );
}
