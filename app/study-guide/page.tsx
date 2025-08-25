"use client";

import { useState } from "react";
import { studyGuideData } from "@/data/study-guide";
import {
  type StudyGuideChapter,
  type StudyGuideSection,
} from "@/data/study-guide";
import {
  SectionContent,
  KeyPoints,
  StudyTip,
  LicenseSection,
  SafeDrivingSection,
  EmergencySection,
  TrafficSection,
  VehicleSection,
  OffroadSection,
} from "@/components/study-guide";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Clock,
  BookOpen,
  ChevronLeft,
  Menu,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function StudyGuidePage() {
  const [selectedChapter, setSelectedChapter] =
    useState<StudyGuideChapter | null>(null);
  const [selectedSection, setSelectedSection] =
    useState<StudyGuideSection | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(
    new Set()
  );

  const toggleChapterExpansion = (chapterId: string) => {
    const newExpanded = new Set(expandedChapters);
    if (newExpanded.has(chapterId)) {
      newExpanded.delete(chapterId);
    } else {
      newExpanded.add(chapterId);
    }
    setExpandedChapters(newExpanded);
  };

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

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

  const Sidebar = () => (
    <div className="w-80 bg-white border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Study Guide</h2>
        <p className="text-sm text-gray-600 mt-1">
          {studyGuideData.reduce((acc, ch) => acc + ch.sections.length, 0)}{" "}
          sections available
        </p>
      </div>

      <div className="p-4 space-y-2">
        {studyGuideData.map((chapter, chapterIndex) => {
          const isChapterExpanded = expandedChapters.has(chapter.id);

          return (
            <div key={chapter.id} className="space-y-1">
              <div className="flex">
                <button
                  onClick={() => toggleChapterExpansion(chapter.id)}
                  className="flex items-center justify-center w-8 h-8 rounded-l-lg hover:bg-gray-100 transition-colors border-r border-gray-200"
                >
                  {isChapterExpanded ? (
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-gray-600" />
                  )}
                </button>

                <button
                  onClick={() => {
                    setSelectedChapter(chapter);
                    setSelectedSection(null);
                    setSidebarOpen(false);
                  }}
                  className={`flex-1 text-left p-3 rounded-r-lg transition-colors ${
                    selectedChapter?.id === chapter.id
                      ? "bg-cyan-50 text-cyan-700 border border-cyan-200 border-l-0"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{chapter.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium truncate">
                        {chapter.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {chapter.sections.length} sections
                      </div>
                    </div>
                  </div>
                </button>
              </div>

              {isChapterExpanded && (
                <div className="ml-6 space-y-1 animate-in slide-in-from-top-2 duration-200">
                  {chapter.sections.map((section, sectionIndex) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setSelectedChapter(chapter);
                        setSelectedSection(section);
                        setSidebarOpen(false);
                      }}
                      className={`w-full text-left p-2 rounded text-sm transition-colors ${
                        selectedSection?.id === section.id
                          ? "bg-cyan-100 text-cyan-800"
                          : "hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="truncate">{section.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

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
      <div className="min-h-screen bg-gray-50 flex">
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed left-0 top-0 h-full">
              <Sidebar />
            </div>
          </div>
        )}

        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-4 h-4" />
                </Button>
                <button
                  onClick={() => setSelectedChapter(null)}
                  className="hover:text-cyan-600 transition-colors"
                >
                  Study Guide
                </button>
                <ChevronRight className="w-4 h-4" />
                <button
                  onClick={() => setSelectedSection(null)}
                  className="hover:text-cyan-600 transition-colors"
                >
                  {selectedChapter.title}
                </button>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900">{selectedSection.title}</span>
              </div>

              <div className="text-sm text-gray-500">
                Section {currentSectionIndex + 1} of{" "}
                {selectedChapter.sections.length}
              </div>
            </div>

            {/* Render section based on chapter type */}
            {selectedChapter.id === "getting-your-license" && (
              <LicenseSection chapter={selectedChapter} />
            )}

            {selectedChapter.id === "safe-responsible-driving" && (
              <SafeDrivingSection chapter={selectedChapter} />
            )}

            {selectedChapter.id === "dealing-with-particular-situations" && (
              <EmergencySection chapter={selectedChapter} />
            )}

            {selectedChapter.id === "dealing-with-emergencies" && (
              <EmergencySection chapter={selectedChapter} />
            )}

            {selectedChapter.id === "traffic-signs-lights" && (
              <TrafficSection chapter={selectedChapter} />
            )}

            {selectedChapter.id === "keeping-your-license" && (
              <LicenseSection chapter={selectedChapter} />
            )}

            {selectedChapter.id === "your-vehicle" && (
              <VehicleSection chapter={selectedChapter} />
            )}

            {selectedChapter.id === "off-road-vehicles-and-snowmobiles" && (
              <OffroadSection chapter={selectedChapter} />
            )}

            <StudyTip />

            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={navigateToPrevSection}
                disabled={isFirstSection}
                className="flex items-center gap-2 bg-transparent"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setSelectedSection(null)}
                >
                  Chapter Overview
                </Button>
                <Button className="bg-cyan-600 hover:bg-cyan-700">
                  Practice Questions
                </Button>
              </div>

              <Button
                onClick={navigateToNextSection}
                disabled={isLastSection}
                className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedChapter) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="fixed left-0 top-0 h-full">
              <Sidebar />
            </div>
          </div>
        )}

        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Button
                  variant="ghost"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="w-4 h-4" />
                </Button>
                <button
                  onClick={() => setSelectedChapter(null)}
                  className="hover:text-cyan-600 transition-colors"
                >
                  Study Guide
                </button>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900">{selectedChapter.title}</span>
              </div>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-3xl text-gray-900 mb-2">
                      {selectedChapter.icon} {selectedChapter.title}
                    </CardTitle>
                    <CardDescription className="text-lg mb-3">
                      {selectedChapter.description}
                    </CardDescription>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-800">
                        📖 Content based on the Official Ministry of
                        Transportation (MTO) Driver's Handbook
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      className={getDifficultyColor(selectedChapter.difficulty)}
                    >
                      {selectedChapter.difficulty}
                    </Badge>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      {selectedChapter.estimatedTime}
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <div className="space-y-4">
              {selectedChapter.sections.map(
                (section: StudyGuideSection, index: number) => {
                  const isExpanded = expandedSections.has(section.id);
                  return (
                    <Card key={section.id} className="overflow-hidden">
                      <button
                        onClick={() => toggleSection(section.id)}
                        className="w-full text-left hover:bg-gray-50 transition-colors"
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center justify-center w-8 h-8 bg-cyan-100 text-cyan-600 rounded-full font-semibold">
                                {index + 1}
                              </div>
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {section.title}
                                </h3>
                                <p className="text-gray-600 text-sm mt-1">
                                  {section.keyPoints.length} key points to learn
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              {isExpanded ? (
                                <ChevronUp className="w-5 h-5 text-gray-400" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-gray-200 bg-gray-50">
                          <div className="p-6 space-y-6">
                            <SectionContent content={section.content} />

                            <KeyPoints points={section.keyPoints} />

                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                              <Button
                                variant="outline"
                                onClick={() => setSelectedSection(section)}
                                className="flex items-center gap-2"
                              >
                                <BookOpen className="w-4 h-4" />
                                Study in Detail
                              </Button>
                              <Button className="bg-cyan-600 hover:bg-cyan-700">
                                Practice Questions
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                }
              )}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setSelectedChapter(null)}
              >
                Back to All Chapters
              </Button>
              <Button className="bg-orange-600 hover:bg-orange-700">
                Take Chapter Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ontario Driver's Study Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Master the official MTO driver's handbook with our comprehensive
            study guide. Learn at your own pace with structured chapters and
            practice questions.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-blue-800">
              📖 All content is based on the Official Ministry of Transportation
              (MTO) Driver's Handbook for Ontario
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {studyGuideData.map((chapter) => (
            <Card
              key={chapter.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              onClick={() => setSelectedChapter(chapter)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl">{chapter.icon}</div>
                  <Badge className={getDifficultyColor(chapter.difficulty)}>
                    {chapter.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-gray-900">
                  {chapter.title}
                </CardTitle>
                <CardDescription>{chapter.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {chapter.estimatedTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {chapter.sections.length} sections
                    </div>
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
