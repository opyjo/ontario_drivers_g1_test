import type { MetadataRoute } from "next";
import { studyGuideData } from "../data/study-guide";
import { absoluteUrl } from "../lib/seo";

const staticPages: Array<{
  path: string;
  changeFrequency: "weekly" | "monthly";
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/study-guide", changeFrequency: "monthly", priority: 0.9 },
  { path: "/ask-ai", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const chapterPages: MetadataRoute.Sitemap = studyGuideData.map((chapter) => ({
    url: absoluteUrl(`/study-guide/${chapter.id}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const sectionPages: MetadataRoute.Sitemap = studyGuideData.flatMap((chapter) =>
    chapter.sections.map((section) => ({
      url: absoluteUrl(`/study-guide/${chapter.id}/${section.id}`),
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
  ];
}
