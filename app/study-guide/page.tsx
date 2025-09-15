"use client";

import { useState } from "react";
import { studyGuideData } from "@/data/study-guide";
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
  ChevronRight,
  ChevronLeft,
  Clock,
  BookOpen,
  Layers,
} from "lucide-react";

/* ✅ Word-safe truncation */
function truncateAtWord(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength);
  return trimmed.slice(0, trimmed.lastIndexOf(" ")) + "…";
}

export default function StudyGuidePage() {
  const [selectedChapter, setSelectedChapter] =
    useState<StudyGuideChapter | null>(null);
  const [selectedSection, setSelectedSection] =
    useState<StudyGuideSection | null>(null);

  // Section navigation
  const navigateToNextSection = () => {
    if (!selectedChapter || !selectedSection) return;
    const secIndex = selectedChapter.sections.findIndex(
      (s) => s.id === selectedSection.id
    );
    const chIndex = studyGuideData.findIndex(
      (ch) => ch.id === selectedChapter.id
    );

    if (secIndex < selectedChapter.sections.length - 1) {
      setSelectedSection(selectedChapter.sections[secIndex + 1]);
    } else if (chIndex < studyGuideData.length - 1) {
      const nextChapter = studyGuideData[chIndex + 1];
      setSelectedChapter(nextChapter);
      setSelectedSection(nextChapter.sections[0]);
    }
  };

  const navigateToPrevSection = () => {
    if (!selectedChapter || !selectedSection) return;
    const secIndex = selectedChapter.sections.findIndex(
      (s) => s.id === selectedSection.id
    );
    const chIndex = studyGuideData.findIndex(
      (ch) => ch.id === selectedChapter.id
    );

    if (secIndex > 0) {
      setSelectedSection(selectedChapter.sections[secIndex - 1]);
    } else if (chIndex > 0) {
      const prevChapter = studyGuideData[chIndex - 1];
      setSelectedChapter(prevChapter);
      setSelectedSection(prevChapter.sections[prevChapter.sections.length - 1]);
    }
  };

  // --- SECTION VIEW ---
  if (selectedChapter && selectedSection) {
    return (
      <SectionReader
        section={selectedSection}
        chapter={selectedChapter}
        currentIndex={selectedChapter.sections.findIndex(
          (s) => s.id === selectedSection.id
        )}
        totalSections={selectedChapter.sections.length}
        onNext={navigateToNextSection}
        onPrevious={navigateToPrevSection}
        onBackToChapter={() => setSelectedSection(null)}
        isFirstSection={false}
        isLastSection={false}
      />
    );
  }

  // --- CHAPTER VIEW ---
  if (selectedChapter) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Navbar */}
        <header className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
              <Layers className="w-4 h-4" />
            </div>
            <span className="font-semibold text-slate-800">
              Ontario Driver's Study Guide
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedChapter(null)}
            className="flex items-center gap-1 text-sm"
          >
            <ChevronLeft className="w-3 h-3" /> Back
          </Button>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              {selectedChapter.title}
            </h1>
            {selectedChapter.description && (
              <p className="text-slate-600 max-w-2xl mx-auto text-base">
                {selectedChapter.description}
              </p>
            )}
          </div>

          {/* Sections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedChapter.sections.map((section, index) => (
              <Card
                key={section.id}
                onClick={() => setSelectedSection(section)}
                className="group cursor-pointer border border-slate-200 bg-white shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                      {section.keyPoints?.length ?? 0} key points
                    </span>
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
                    className="flex items-center justify-between w-full text-cyan-600 hover:bg-cyan-50 transition-colors"
                  >
                    Start Reading
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- HOMEPAGE (Chapters Grid) ---
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <Layers className="w-4 h-4" />
          </div>
          <span className="font-semibold text-slate-800">
            Ontario Driver's Study Guide
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studyGuideData.map((chapter, index) => (
            <Card
              key={chapter.id}
              className="group cursor-pointer border border-slate-200 bg-white shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
              onClick={() => setSelectedChapter(chapter)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-sm font-semibold">
                    {chapter.icon || index + 1}
                  </div>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                    {chapter.sections.length} sections
                  </span>
                </div>

                <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-cyan-700 transition-colors">
                  {chapter.title}
                </CardTitle>

                {chapter.description && (
                  <CardDescription className="text-slate-600 text-sm mt-2">
                    {chapter.description}
                  </CardDescription>
                )}
              </CardHeader>

              <CardContent>
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-orange-500" />
                    {chapter.estimatedTime}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-cyan-600 hover:bg-cyan-50 transition-colors"
                  >
                    Start <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
