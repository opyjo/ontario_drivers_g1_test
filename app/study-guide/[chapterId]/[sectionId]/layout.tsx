import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getChapterById, getSectionById, studyGuideData } from "@/data/study-guide";
import { conciseDescription, privateMetadata, publicMetadata } from "@/lib/seo";

type SectionLayoutProps = {
  children: ReactNode;
  params: Promise<{ chapterId: string; sectionId: string }>;
};

export function generateStaticParams() {
  return studyGuideData.flatMap((chapter) =>
    chapter.sections.map((section) => ({
      chapterId: chapter.id,
      sectionId: section.id,
    }))
  );
}

export async function generateMetadata({ params }: SectionLayoutProps): Promise<Metadata> {
  const { chapterId, sectionId } = await params;
  const chapter = getChapterById(chapterId);
  const section = getSectionById(chapterId, sectionId);

  if (!chapter || !section) {
    return { ...privateMetadata, title: "Study Guide Section Not Found" };
  }

  const keyPointPreview = section.keyPoints.slice(0, 2).join(" ");
  return publicMetadata({
    title: `${section.title} — Ontario G1 Study Guide`,
    description: conciseDescription(
      `Learn ${section.title.toLowerCase()} for Ontario's G1 test. ${keyPointPreview}`
    ),
    path: `/study-guide/${chapter.id}/${section.id}`,
  });
}

export default function SectionLayout({ children }: SectionLayoutProps) {
  return children;
}
