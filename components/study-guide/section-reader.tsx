"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import {
  type StudyGuideSection,
} from "@/data/study-guide";
import { useStudyProgress } from "@/hooks/useStudyProgress";
import { KeyPointsSection } from "./key-points-section";
import { StudyGuideSourcePanel } from "./source-panel";

interface StudyGuideChapterNavigation {
  id: string;
  title: string;
  sections: Array<{ id: string; title: string }>;
}

interface SectionReaderProps {
  section: StudyGuideSection;
  chapter: StudyGuideChapterNavigation;
  currentIndex: number;
  totalSections: number;
  nextHref?: string;
  previousHref?: string;
}

export default function SectionReader({
  section,
  chapter,
  currentIndex,
  totalSections,
  nextHref,
  previousHref,
}: SectionReaderProps) {
  const { markSectionInProgress, markSectionCompleted, isSectionCompleted } =
    useStudyProgress();
  const hasMarkedInProgress = useRef(false);

  // Reset per-section guard when section or chapter changes
  useEffect(() => {
    hasMarkedInProgress.current = false;
  }, [chapter.id, section.id]);

  // Mark section as in progress when component mounts (only once)
  useEffect(() => {
    if (!hasMarkedInProgress.current) {
      const sectionCompleted = isSectionCompleted(chapter.id, section.id);
      if (!sectionCompleted) {
        markSectionInProgress(chapter.id, section.id);
        hasMarkedInProgress.current = true;
      }
    }
  }, [chapter.id, section.id, markSectionInProgress, isSectionCompleted]);

  // Mark section as completed when user reaches the end
  const handleMarkCompleted = () => {
    markSectionCompleted(chapter.id, section.id);
  };

  const isCompleted = isSectionCompleted(chapter.id, section.id);

  const handleNext = () => {
    if (!isCompleted) {
      markSectionCompleted(chapter.id, section.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-3 py-5 sm:px-4 sm:py-6">
        {/* Top Navigation */}
        <div className="flex justify-end items-center mb-4">
          <div className="flex gap-2">
            {previousHref ? (
              <Button asChild variant="outline" className="flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <Link href={previousHref}>
                  <ArrowLeft className="h-4 w-4" /> Previous Section
                </Link>
              </Button>
            ) : (
              <Button variant="outline" disabled className="flex items-center gap-2 disabled:opacity-50">
                <ArrowLeft className="h-4 w-4" /> Previous Section
              </Button>
            )}

            {nextHref ? (
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href={nextHref} onClick={handleNext} className="flex items-center gap-2">
                  Next Section <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button disabled className="disabled:opacity-50">
                Next Section <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Enhanced Header */}
        <div className="mb-6">
          {/* Title Section */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-purple-50/50 rounded-2xl"></div>
            <div className="relative rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-lg backdrop-blur-sm sm:p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-lg">
                        {currentIndex + 1}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                          Section {currentIndex + 1} of {totalSections}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-600 font-medium">
                          {chapter.title}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h1 className="text-3xl font-bold text-foreground leading-tight mb-2">
                    {section.title}
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        Est.{" "}
                        {Math.ceil(section.content.split(" ").length / 200)} min
                        read
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>MTO-based study material</span>
                    </div>
                  </div>
                </div>

                {/* Progress Ring */}
                <div className="relative hidden h-16 w-16 flex-shrink-0 sm:block">
                  <svg
                    className="w-16 h-16 transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeDasharray={`${
                        ((currentIndex + 1) / totalSections) * 100
                      }, 100`}
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-card-foreground">
                      {Math.round(((currentIndex + 1) / totalSections) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Main Content */}
            <Card className="overflow-hidden border-0 shadow-lg">
              <div className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
                <CardHeader className="relative px-4 pb-4 sm:px-6">
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="flex items-center text-xl font-semibold text-foreground">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      Study Content
                    </CardTitle>
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide shadow-sm">
                      MTO-BASED
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-blue-200 via-indigo-300 to-blue-200 opacity-60"></div>
                </CardHeader>
              </div>

              <CardContent className="bg-white px-4 py-5 sm:px-6 sm:py-6">
                <div className="prose max-w-none">
                  {section.content.includes("<img") ? (
                    <div
                      className="mx-auto max-w-[62ch] space-y-6 text-[17px] font-normal leading-7 tracking-[-0.005em] text-slate-700"
                    >
                      {section.content
                        .split("\n\n")
                        .map((contentSection, index) => {
                          if (contentSection.includes("<img")) {
                            // Extract image info
                            const imgMatch = contentSection.match(
                              /<img\s+src=['"]([^'"]*)['"]\s+alt=['"]([^'"]*)['"]\s*\/>/
                            );
                            if (imgMatch) {
                              const [, src, alt] = imgMatch;
                              const beforeImg = contentSection
                                .substring(0, contentSection.indexOf("<img"))
                                .trim();
                              const afterImg = contentSection
                                .substring(contentSection.indexOf("/>") + 2)
                                .trim();

                              return (
                                <div
                                  key={index}
                                  className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg"
                                >
                                  <div className="flex-shrink-0">
                                    <Image
                                      src={src}
                                      alt={alt}
                                      width={80}
                                      height={80}
                                      sizes="80px"
                                      className="max-w-20 max-h-20 object-contain rounded-lg shadow-sm bg-white p-1"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    {afterImg && (
                                      <p className="text-sm font-semibold leading-snug text-slate-700 sm:text-[15px]">
                                        {afterImg}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          }

                          // Regular paragraph content
                          return (
                            <p key={index} className="text-slate-700 mb-4">
                              {contentSection
                                .split("\n")
                                .map((line, lineIndex) => (
                                  <span
                                    key={lineIndex}
                                    className="block mb-2 last:mb-0"
                                  >
                                    {line}
                                  </span>
                                ))}
                            </p>
                          );
                        })}
                    </div>
                  ) : (
                    section.content.split("\n\n").map((paragraph, index) => (
                      <div key={index} className="mb-4">
                        {paragraph.split("\n").map((line, lineIndex) => (
                          <p
                            key={lineIndex}
                            className="mx-auto mb-3 max-w-[62ch] text-[17px] font-normal leading-7 tracking-[-0.005em] text-slate-700 last:mb-0"
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Key Points */}
            {section.keyPoints && section.keyPoints.length > 0 && (
              <KeyPointsSection keyPoints={section.keyPoints} />
            )}

            <StudyGuideSourcePanel chapterId={chapter.id} />

            {/* Navigation */}
            <div className="flex justify-between items-center">
              {previousHref ? (
                <Button asChild variant="outline">
                  <Link href={previousHref} className="flex items-center">
                    <ArrowLeft className="h-4 w-4 mr-2" /> Previous Section
                  </Link>
                </Button>
              ) : (
                <Button variant="outline" disabled>
                  <ArrowLeft className="h-4 w-4 mr-2" /> Previous Section
                </Button>
              )}

              <div className="flex items-center gap-3">
                {!isCompleted && (
                  <Button
                    onClick={handleMarkCompleted}
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Mark Complete
                  </Button>
                )}

                {isCompleted && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Completed</span>
                  </div>
                )}

                {nextHref ? (
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href={nextHref} onClick={handleNext} className="flex items-center">
                      Next Section <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                ) : (
                  <Button disabled>
                    Next Section <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Chapter Sections */}
            <Card>
              <CardHeader>
                <CardTitle>All Sections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {chapter.sections.map((sec, index) => {
                    const sectionCompleted = isSectionCompleted(
                      chapter.id,
                      sec.id
                    );
                    const isCurrentSection = index === currentIndex;

                    return (
                      <Link
                        key={sec.id}
                        href={`/study-guide/${chapter.id}/${sec.id}`}
                        aria-current={isCurrentSection ? "page" : undefined}
                        className={`p-1.5 rounded border-l-4 ${
                          isCurrentSection
                            ? "border-blue-500 bg-blue-50"
                            : sectionCompleted
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={isCurrentSection ? "font-semibold" : ""}
                          >
                            {index + 1}. {sec.title}
                          </span>
                          {sectionCompleted && (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Study Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Study Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>• Take notes on key points as you read</li>
                  <li>• Review each section before moving on</li>
                  <li>• Practice with the quiz questions</li>
                  <li>• Focus on understanding, not just memorizing</li>
                  <li>• Take breaks between sections</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
