import Link from "next/link";
import {
  studyGuideData,
  getChapterById,
  getSectionById,
} from "@/data/study-guide";
import { SectionReader } from "@/components/study-guide";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { absoluteUrl } from "@/lib/seo";

interface SectionPageProps {
  params: Promise<{
    chapterId: string;
    sectionId: string;
  }>;
}

export default async function SectionPage({ params }: SectionPageProps) {
  const resolvedParams = await params;
  const chapter = getChapterById(resolvedParams.chapterId);
  const section = getSectionById(
    resolvedParams.chapterId,
    resolvedParams.sectionId
  );

  if (!chapter || !section) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Section Not Found
          </h1>
          <p className="text-slate-600 mb-4">
            The requested section could not be found.
          </p>
          <Button asChild>
            <Link href="/study-guide">Back to Study Guide</Link>
          </Button>
        </div>
      </div>
    );
  }

  const currentIndex = chapter.sections.findIndex((s) => s.id === section.id);
  const chapterIndex = studyGuideData.findIndex((ch) => ch.id === chapter.id);
  const isFirstSection = currentIndex === 0;
  const isLastSection = currentIndex === chapter.sections.length - 1;
  const previousHref = !isFirstSection
    ? `/study-guide/${chapter.id}/${chapter.sections[currentIndex - 1].id}`
    : chapterIndex > 0
      ? (() => {
          const previousChapter = studyGuideData[chapterIndex - 1];
          const previousSection = previousChapter.sections.at(-1);
          return previousSection
            ? `/study-guide/${previousChapter.id}/${previousSection.id}`
            : undefined;
        })()
      : undefined;
  const nextHref = !isLastSection
    ? `/study-guide/${chapter.id}/${chapter.sections[currentIndex + 1].id}`
    : chapterIndex < studyGuideData.length - 1
      ? (() => {
          const nextChapter = studyGuideData[chapterIndex + 1];
          const nextSection = nextChapter.sections[0];
          return nextSection
            ? `/study-guide/${nextChapter.id}/${nextSection.id}`
            : undefined;
        })()
      : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <BreadcrumbJsonLd
        id={`section-breadcrumb-${chapter.id}-${section.id}`}
        items={[
          { name: "Home", url: absoluteUrl("/") },
          { name: "Study Guide", url: absoluteUrl("/study-guide") },
          {
            name: chapter.title,
            url: absoluteUrl(`/study-guide/${chapter.id}`),
          },
          {
            name: section.title,
            url: absoluteUrl(`/study-guide/${chapter.id}/${section.id}`),
          },
        ]}
      />
      <div className="container mx-auto px-4 py-6">
        {/* Enhanced Breadcrumb */}
        <div className="mb-6 p-4 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/study-guide"
                    className="flex items-center gap-1 px-2 py-1 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 cursor-pointer"
                  >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"
                    />
                  </svg>
                  Study Guide
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-slate-400" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href={`/study-guide/${resolvedParams.chapterId}`}
                    className="flex items-center gap-1 px-2 py-1 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 cursor-pointer"
                  >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                  {chapter.title}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-slate-400" />
              <BreadcrumbItem>
                <BreadcrumbPage className="px-2 py-1 rounded-md bg-gradient-to-r from-cyan-50 to-blue-50 text-blue-700 font-medium border border-blue-200">
                  {section.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <SectionReader
          section={section}
          chapter={{
            id: chapter.id,
            title: chapter.title,
            sections: chapter.sections.map(({ id, title }) => ({ id, title })),
          }}
          currentIndex={currentIndex}
          totalSections={chapter.sections.length}
          nextHref={nextHref}
          previousHref={previousHref}
      />
      </div>
    </div>
  );
}
