"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
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
import { ChevronLeft } from "lucide-react";

interface SectionPageProps {
  params: Promise<{
    chapterId: string;
    sectionId: string;
  }>;
}

export default function SectionPage({ params }: SectionPageProps) {
  const router = useRouter();

  const resolvedParams = use(params);
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
          <Button onClick={() => router.push("/study-guide")}>
            Back to Study Guide
          </Button>
        </div>
      </div>
    );
  }

  // Section navigation
  const navigateToNextSection = () => {
    const secIndex = chapter.sections.findIndex((s) => s.id === section.id);
    const chIndex = studyGuideData.findIndex((ch) => ch.id === chapter.id);

    if (secIndex < chapter.sections.length - 1) {
      const nextSection = chapter.sections[secIndex + 1];
      router.push(`/study-guide/${resolvedParams.chapterId}/${nextSection.id}`);
    } else if (chIndex < studyGuideData.length - 1) {
      const nextChapter = studyGuideData[chIndex + 1];
      router.push(
        `/study-guide/${nextChapter.id}/${nextChapter.sections[0].id}`
      );
    }
  };

  const navigateToPrevSection = () => {
    const secIndex = chapter.sections.findIndex((s) => s.id === section.id);
    const chIndex = studyGuideData.findIndex((ch) => ch.id === chapter.id);

    if (secIndex > 0) {
      const prevSection = chapter.sections[secIndex - 1];
      router.push(`/study-guide/${resolvedParams.chapterId}/${prevSection.id}`);
    } else if (chIndex > 0) {
      const prevChapter = studyGuideData[chIndex - 1];
      const lastSection = prevChapter.sections[prevChapter.sections.length - 1];
      router.push(`/study-guide/${prevChapter.id}/${lastSection.id}`);
    }
  };

  const currentIndex = chapter.sections.findIndex((s) => s.id === section.id);
  const isFirstSection = currentIndex === 0;
  const isLastSection = currentIndex === chapter.sections.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-6">
        {/* Enhanced Breadcrumb */}
        <div className="mb-6 p-4 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => router.push("/study-guide")}
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
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-slate-400" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() =>
                    router.push(`/study-guide/${resolvedParams.chapterId}`)
                  }
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
          chapter={chapter}
          currentIndex={currentIndex}
          totalSections={chapter.sections.length}
          onNext={navigateToNextSection}
          onPrevious={navigateToPrevSection}
          isFirstSection={isFirstSection}
          isLastSection={isLastSection}
        />
      </div>
    </div>
  );
}
