import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getChapterById, studyGuideData } from "@/data/study-guide";
import { conciseDescription, privateMetadata, publicMetadata } from "@/lib/seo";

type ChapterLayoutProps = {
  children: ReactNode;
  params: Promise<{ chapterId: string }>;
};

export function generateStaticParams() {
  return studyGuideData.map((chapter) => ({ chapterId: chapter.id }));
}

export async function generateMetadata({ params }: ChapterLayoutProps): Promise<Metadata> {
  const { chapterId } = await params;
  const chapter = getChapterById(chapterId);

  if (!chapter) {
    return { ...privateMetadata, title: "Study Guide Chapter Not Found" };
  }

  return publicMetadata({
    title: `${chapter.title} — Ontario G1 Study Guide`,
    description: conciseDescription(
      `${chapter.description} Study this Ontario G1 handbook chapter and review its key driving rules.`
    ),
    path: `/study-guide/${chapter.id}`,
  });
}

export default function ChapterLayout({ children }: ChapterLayoutProps) {
  return children;
}
