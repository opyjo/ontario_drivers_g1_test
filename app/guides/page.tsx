import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { PageLayout } from "@/components/layouts/PageLayout";
import { guideArticles } from "@/lib/content/guides";
import { publicMetadata } from "@/lib/seo";

export const metadata = publicMetadata({ title: "Ontario G1 Learning Guides", description: "Practical, source-linked guides about Ontario G1 restrictions, test day, road signs, right-of-way, demerit points, and study planning.", path: "/guides" });

export default function GuidesPage() {
  return (
    <PageLayout title="Ontario G1 Learning Guides" subtitle="Clear explanations, practical study routines, and links to current official Ontario and DriveTest sources.">
      <div className="container mx-auto grid max-w-6xl gap-5 px-4 pb-16 md:grid-cols-2">
        {guideArticles.map((article) => (
          <article key={article.slug} className="rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-2 text-sm text-primary"><BookOpen className="h-4 w-4" aria-hidden="true" />{article.readingMinutes} min read</div>
            <h2 className="mt-3 text-xl font-bold"><Link href={`/guides/${article.slug}`} className="hover:text-primary">{article.title}</Link></h2>
            <p className="mt-3 leading-7 text-muted-foreground">{article.description}</p>
            <Link href={`/guides/${article.slug}`} className="mt-5 inline-flex items-center gap-1 font-semibold text-primary">Read the guide<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </article>
        ))}
      </div>
    </PageLayout>
  );
}
