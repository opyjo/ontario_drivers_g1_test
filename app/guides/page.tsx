import Link from "next/link";
import { ArrowRight, BookOpen, Compass } from "lucide-react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { guideArticles } from "@/lib/content/guides";
import { GuideRecommendations } from "@/components/content/guide-recommendations";
import { publicMetadata } from "@/lib/seo";

export const metadata = publicMetadata({
  title: "Ontario G1 Learning Guides",
  description:
    "Practical, source-linked guides about Ontario G1 restrictions, test day, road signs, right-of-way, demerit points, and study planning.",
  path: "/guides",
});

export default function GuidesPage() {
  const featuredSlugs = [
    "how-many-questions-ontario-g1-test",
    "g1-test-passing-score",
    "most-common-g1-test-mistakes",
  ];
  const featuredGuides = featuredSlugs
    .map((slug) => guideArticles.find((article) => article.slug === slug))
    .filter((article): article is (typeof guideArticles)[number] =>
      Boolean(article)
    );
  const remainingGuides = guideArticles.filter(
    (article) => !featuredSlugs.includes(article.slug)
  );

  return (
    <PageLayout
      title="Ontario G1 Learning Guides"
      subtitle="Clear explanations, practical study routines, and links to current official Ontario and DriveTest sources."
    >
      <div className="container mx-auto max-w-6xl space-y-14 px-4 pb-16">
        <GuideRecommendations
          guides={featuredGuides}
          title="Start with the essentials"
          description="Answers to the questions learners usually ask before choosing a study plan."
        />

        <section aria-labelledby="all-guides-heading">
          <div className="flex items-center gap-2 text-primary">
            <Compass className="h-5 w-5" aria-hidden="true" />
            <h2
              id="all-guides-heading"
              className="text-2xl font-bold tracking-tight"
            >
              Explore all guides
            </h2>
          </div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {remainingGuides.map((article) => (
              <article
                key={article.slug}
                className="rounded-2xl border bg-card p-6 shadow-sm"
              >
                <div className="flex items-center gap-2 text-sm text-primary">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  {article.category} · {article.readingMinutes} min read
                </div>
                <h3 className="mt-3 text-xl font-bold">
                  <Link
                    href={`/guides/${article.slug}`}
                    className="hover:text-primary"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="mt-3 leading-7 text-muted-foreground">
                  {article.description}
                </p>
                <Link
                  href={`/guides/${article.slug}`}
                  className="mt-5 inline-flex items-center gap-1 font-semibold text-primary"
                >
                  Read the guide
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
