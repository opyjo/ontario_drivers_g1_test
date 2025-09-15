"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { studyGuideData, getChapterById } from "@/data/study-guide";
import type { StudyGuideChapter, StudyGuideSection } from "@/data/study-guide";
import { SectionReader } from "@/components/study-guide";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  ChevronRight,
  Clock,
  Layers,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { useStudyProgress } from "@/hooks/useStudyProgress";

/* ✅ Word-safe truncation */
function truncateAtWord(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength);
  return trimmed.slice(0, trimmed.lastIndexOf(" ")) + "…";
}

interface ChapterPageProps {
  params: Promise<{
    chapterId: string;
  }>;
}

export default function ChapterPage({ params }: ChapterPageProps) {
  const router = useRouter();
  const [selectedSection, setSelectedSection] =
    useState<StudyGuideSection | null>(null);

  const resolvedParams = use(params);
  const chapter = getChapterById(resolvedParams.chapterId);
  const { isSectionCompleted, getChapterCompletionPercentage, isLoaded } =
    useStudyProgress();

  if (!chapter) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            Chapter Not Found
          </h1>
          <p className="text-slate-600 mb-4">
            The requested chapter could not be found.
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
    if (!selectedSection) return;
    const secIndex = chapter.sections.findIndex(
      (s) => s.id === selectedSection.id
    );
    const chIndex = studyGuideData.findIndex((ch) => ch.id === chapter.id);

    if (secIndex < chapter.sections.length - 1) {
      const nextSection = chapter.sections[secIndex + 1];
      router.push(`/study-guide/${chapter.id}/${nextSection.id}`);
    } else if (chIndex < studyGuideData.length - 1) {
      const nextChapter = studyGuideData[chIndex + 1];
      router.push(
        `/study-guide/${nextChapter.id}/${nextChapter.sections[0].id}`
      );
    }
  };

  const navigateToPrevSection = () => {
    if (!selectedSection) return;
    const secIndex = chapter.sections.findIndex(
      (s) => s.id === selectedSection.id
    );
    const chIndex = studyGuideData.findIndex((ch) => ch.id === chapter.id);

    if (secIndex > 0) {
      const prevSection = chapter.sections[secIndex - 1];
      router.push(`/study-guide/${chapter.id}/${prevSection.id}`);
    } else if (chIndex > 0) {
      const prevChapter = studyGuideData[chIndex - 1];
      const lastSection = prevChapter.sections[prevChapter.sections.length - 1];
      router.push(`/study-guide/${prevChapter.id}/${lastSection.id}`);
    }
  };

  // --- SECTION VIEW ---
  if (selectedSection) {
    return (
      <SectionReader
        section={selectedSection}
        chapter={chapter}
        currentIndex={chapter.sections.findIndex(
          (s) => s.id === selectedSection.id
        )}
        totalSections={chapter.sections.length}
        onNext={navigateToNextSection}
        onPrevious={navigateToPrevSection}
        isFirstSection={false}
        isLastSection={false}
      />
    );
  }

  // --- CHAPTER VIEW ---
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <Layers className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-800">
            Ontario Driver's Study Guide
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Enhanced Breadcrumb */}
        <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => router.push("/study-guide")}
                  className="flex items-center gap-1 px-2 py-1 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200 cursor-pointer"
                >
                  <Layers className="w-4 h-4" />
                  Study Guide
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-slate-400" />
              <BreadcrumbItem>
                <BreadcrumbPage className="px-2 py-1 rounded-md bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 font-medium border border-blue-200">
                  {chapter.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {chapter.title}
          </h1>
          {chapter.description && (
            <p className="text-slate-600 max-w-2xl mx-auto text-base">
              {chapter.description}
            </p>
          )}
        </div>

        {/* Chapter Progress */}
        <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-slate-800">
              Chapter Progress
            </h3>
            <span className="text-sm text-slate-600">
              {isLoaded
                ? `${getChapterCompletionPercentage(
                    chapter.id,
                    chapter.sections.length
                  )}% Complete`
                : "Loading…"}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${
                  isLoaded
                    ? getChapterCompletionPercentage(
                        chapter.id,
                        chapter.sections.length
                      )
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Sections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapter.sections.map((section, index) => {
            const isCompleted = isLoaded
              ? isSectionCompleted(chapter.id, section.id)
              : false;

            return (
              <Card
                key={section.id}
                onClick={() =>
                  router.push(
                    `/study-guide/${resolvedParams.chapterId}/${section.id}`
                  )
                }
                className={`group cursor-pointer border shadow-sm hover:shadow-md transition ${
                  isCompleted
                    ? "border-green-200 bg-green-50/30"
                    : "border-slate-200 bg-white"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-md text-white text-sm font-semibold ${
                        isCompleted
                          ? "bg-gradient-to-br from-green-500 to-emerald-600"
                          : "bg-gradient-to-br from-cyan-500 to-blue-600"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {isCompleted && (
                        <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                          Completed
                        </span>
                      )}
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {section.keyPoints?.length ?? 0} key points
                      </span>
                    </div>
                  </div>

                  <CardTitle className="text-base font-semibold text-slate-900 group-hover:text-cyan-700 transition-colors">
                    {section.title}
                  </CardTitle>

                  {section.content && (
                    <p className="text-slate-600 text-sm leading-relaxed mt-2 mb-4 line-clamp-3">
                      {truncateAtWord(section.content, 120)}
                    </p>
                  )}
                </CardHeader>

                <CardContent>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center justify-between w-full text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 transition-colors"
                  >
                    {isCompleted ? "Review" : "Start Reading"}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
