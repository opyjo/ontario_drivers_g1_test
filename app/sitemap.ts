import type { MetadataRoute } from "next";
import { studyGuideData } from "../data/study-guide";
import { absoluteUrl } from "../lib/seo";
import { guideArticles } from "../lib/content/guides";
import { practiceLandingPageList } from "../lib/content/practice-pages";
import { getStudyGuideSourceRecord } from "../lib/content/study-guide-sources";

const staticPages: Array<{
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/study-guide", changeFrequency: "monthly", priority: 0.9 },
  { path: "/guides", changeFrequency: "weekly", priority: 0.8 },
  { path: "/ask-ai", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.6 },
  { path: "/about", changeFrequency: "monthly", priority: 0.5 },
  { path: "/sources", changeFrequency: "monthly", priority: 0.6 },
  { path: "/editorial-policy", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.4 },
  { path: "/privacy", changeFrequency: "monthly", priority: 0.3 },
  { path: "/terms", changeFrequency: "monthly", priority: 0.3 },
  ...practiceLandingPageList.map((page) => ({
    path: page.path,
    changeFrequency: "weekly" as const,
    priority: page.path === "/g1-practice-test" ? 0.95 : 0.9,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const chapterPages: MetadataRoute.Sitemap = studyGuideData.map((chapter) => {
    const sourceRecord = getStudyGuideSourceRecord(chapter.id);
    return {
      url: absoluteUrl(`/study-guide/${chapter.id}`),
      lastModified: sourceRecord?.reviewedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    };
  });

  const sectionPages: MetadataRoute.Sitemap = studyGuideData.flatMap((chapter) =>
    chapter.sections.map((section) => ({
      url: absoluteUrl(`/study-guide/${chapter.id}/${section.id}`),
      lastModified: getStudyGuideSourceRecord(chapter.id)?.reviewedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [
    ...staticPages.map((page) => ({
      url: absoluteUrl(page.path),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...chapterPages,
    ...sectionPages,
    ...guideArticles.map((article) => ({
      url: absoluteUrl(`/guides/${article.slug}`),
      lastModified: article.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
