import { notFound } from "next/navigation";
import { ChapterOverview } from "@/components/study-guide/chapter-overview";
import { getChapterById } from "@/data/study-guide";

interface ChapterPageProps {
  params: Promise<{ chapterId: string }>;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { chapterId } = await params;
  const chapter = getChapterById(chapterId);

  if (!chapter) notFound();

  return (
    <ChapterOverview
      chapter={{
        id: chapter.id,
        title: chapter.title,
        description: chapter.description,
        sections: chapter.sections.map((section) => ({
          id: section.id,
          title: section.title,
          preview: section.content.slice(0, 180),
          keyPointCount: section.keyPoints.length,
        })),
      }}
    />
  );
}
