import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { GuideArticle } from "@/lib/content/guides";

export type GuideRecommendation = Pick<
  GuideArticle,
  "slug" | "category" | "title" | "description" | "readingMinutes"
>;

export function GuideRecommendations({
  guides,
  title = "Keep learning",
  description,
  compact = false,
}: Readonly<{
  guides: ReadonlyArray<GuideRecommendation>;
  title?: string;
  description?: string;
  compact?: boolean;
}>) {
  if (guides.length === 0) return null;
  const headingId = `guide-recommendations-${guides[0].slug}`;

  return (
    <section aria-labelledby={headingId}>
      <div className={compact ? "" : "max-w-3xl"}>
        <h2
          id={headingId}
          className={
            compact ? "text-lg font-bold" : "text-2xl font-bold tracking-tight"
          }
        >
          {title}
        </h2>
        {description ? (
          <p className="mt-2 leading-7 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      <div
        className={`mt-5 grid gap-4 ${compact ? "grid-cols-1" : "md:grid-cols-3"}`}
      >
        {guides.map((guide) => (
          <article
            key={guide.slug}
            className="group flex h-full flex-col rounded-xl border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              {guide.category} · {guide.readingMinutes} min
            </div>
            <h3 className="mt-3 font-bold leading-6 group-hover:text-primary">
              <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
            </h3>
            {!compact ? (
              <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                {guide.description}
              </p>
            ) : null}
            <Link
              href={`/guides/${guide.slug}`}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary"
            >
              Read guide
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
