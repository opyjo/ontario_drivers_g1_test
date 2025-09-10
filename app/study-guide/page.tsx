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
  Clock,
  BookOpen,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";

export default function StudyGuidePage() {
  const [selectedChapter, setSelectedChapter] =
    useState<StudyGuideChapter | null>(null);
  const [selectedSection, setSelectedSection] =
    useState<StudyGuideSection | null>(null);

  const navigateToNextSection = () => {
    if (!selectedChapter || !selectedSection) return;

    const currentSectionIndex = selectedChapter.sections.findIndex(
      (sec: StudyGuideSection) => sec.id === selectedSection.id
    );
    const currentChapterIndex = studyGuideData.findIndex(
      (ch) => ch.id === selectedChapter.id
    );

    // If there's a next section in current chapter
    if (currentSectionIndex < selectedChapter.sections.length - 1) {
      setSelectedSection(selectedChapter.sections[currentSectionIndex + 1]);
    }
    // If we're at the last section, go to next chapter's first section
    else if (currentChapterIndex < studyGuideData.length - 1) {
      const nextChapter = studyGuideData[currentChapterIndex + 1];
      setSelectedChapter(nextChapter);
      setSelectedSection(nextChapter.sections[0]);
    }
  };

  const navigateToPrevSection = () => {
    if (!selectedChapter || !selectedSection) return;

    const currentSectionIndex = selectedChapter.sections.findIndex(
      (sec: StudyGuideSection) => sec.id === selectedSection.id
    );
    const currentChapterIndex = studyGuideData.findIndex(
      (ch) => ch.id === selectedChapter.id
    );

    // If there's a previous section in current chapter
    if (currentSectionIndex > 0) {
      setSelectedSection(selectedChapter.sections[currentSectionIndex - 1]);
    }
    // If we're at the first section, go to previous chapter's last section
    else if (currentChapterIndex > 0) {
      const prevChapter = studyGuideData[currentChapterIndex - 1];
      setSelectedChapter(prevChapter);
      setSelectedSection(prevChapter.sections[prevChapter.sections.length - 1]);
    }
  };

  if (selectedChapter && selectedSection) {
    const currentSectionIndex = selectedChapter.sections.findIndex(
      (sec: StudyGuideSection) => sec.id === selectedSection.id
    );
    const currentChapterIndex = studyGuideData.findIndex(
      (ch) => ch.id === selectedChapter.id
    );
    const isFirstSection =
      currentChapterIndex === 0 && currentSectionIndex === 0;
    const isLastSection =
      currentChapterIndex === studyGuideData.length - 1 &&
      currentSectionIndex === selectedChapter.sections.length - 1;

    return (
      <SectionReader
        section={selectedSection}
        chapter={selectedChapter}
        currentIndex={currentSectionIndex}
        totalSections={selectedChapter.sections.length}
        onNext={navigateToNextSection}
        onPrevious={navigateToPrevSection}
        onBackToChapter={() => setSelectedSection(null)}
        isFirstSection={isFirstSection}
        isLastSection={isLastSection}
      />
    );
  }

  if (selectedChapter) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/40">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-8">
            <button
              onClick={() => setSelectedChapter(null)}
              className="hover:text-cyan-600 transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/60 backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Study Guide
            </button>
          </div>

          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-lg mb-6">
              <span className="text-4xl">{selectedChapter.icon}</span>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent mb-6 text-balance">
              {selectedChapter.title}
            </h1>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-8 leading-relaxed text-pretty">
              {selectedChapter.description}
            </p>

            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center gap-3 px-4 py-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-slate-700 font-medium">
                  {selectedChapter.estimatedTime}
                </span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-sm">
                <div className="w-8 h-8 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-cyan-600" />
                </div>
                <span className="text-slate-700 font-medium">
                  {selectedChapter.sections.length} sections
                </span>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/60 rounded-2xl p-6 max-w-3xl mx-auto backdrop-blur-sm">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600">📖</span>
                </div>
                <p className="text-blue-800 font-medium">
                  Content based on the Official Ministry of Transportation (MTO)
                  Driver's Handbook
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {selectedChapter.sections.map(
              (section: StudyGuideSection, index: number) => (
                <Card
                  key={section.id}
                  className="group cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                  onClick={() => setSelectedSection(section)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {index + 1}
                      </div>
                      <div className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-medium">
                        {section.keyPoints.length} key points
                      </div>
                    </div>
                    <CardTitle className="text-xl text-slate-900 leading-tight group-hover:text-cyan-700 transition-colors duration-200 text-balance">
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                      {section.content.substring(0, 120)}...
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full group-hover:bg-cyan-600 group-hover:text-white group-hover:border-cyan-600 transition-all duration-200 font-medium bg-transparent"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSection(section);
                      }}
                    >
                      Start Reading
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </CardContent>
                </Card>
              )
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-16">
            <Button
              variant="outline"
              onClick={() => setSelectedChapter(null)}
              className="flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm hover:bg-white border-slate-200 hover:border-slate-300 transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Chapters
            </Button>
            <Button className="bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 flex items-center gap-2 px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200 font-medium">
              Take Chapter Quiz
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/40">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-20">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-slate-900 via-cyan-700 to-slate-900 bg-clip-text text-transparent mb-6 text-balance">
            Ontario Driver's Study Guide
          </h1>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto mb-10 leading-relaxed text-pretty">
            Master the official MTO driver's handbook with our comprehensive
            study guide. Learn at your own pace with structured chapters and
            practice questions.
          </p>

          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/60 rounded-2xl p-6 max-w-3xl mx-auto backdrop-blur-sm shadow-sm">
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📖</span>
              </div>
              <p className="text-blue-800 font-medium text-lg">
                All content is based on the Official Ministry of Transportation
                (MTO) Driver's Handbook for Ontario
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {studyGuideData.map((chapter) => (
            <Card
              key={chapter.id}
              className="group cursor-pointer bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              onClick={() => setSelectedChapter(chapter)}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{chapter.icon}</span>
                  </div>
                </div>
                <CardTitle className="text-2xl text-slate-900 group-hover:text-cyan-700 transition-colors duration-200 text-balance">
                  {chapter.title}
                </CardTitle>
                <CardDescription className="text-slate-600 leading-relaxed text-pretty">
                  {chapter.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="text-sm font-medium text-slate-700">
                      {chapter.estimatedTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg">
                    <BookOpen className="w-4 h-4 text-cyan-600" />
                    <span className="text-sm font-medium text-slate-700">
                      {chapter.sections.length} sections
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
