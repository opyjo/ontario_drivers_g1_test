"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrafficCone,
  Eye,
  Brain,
  Navigation,
  Compass,
  BookOpen,
  Clock,
} from "lucide-react";
import { StudyGuideChapter } from "@/data/study-guide";

interface TrafficSectionProps {
  chapter: StudyGuideChapter;
}

export const TrafficSection = ({ chapter }: TrafficSectionProps) => {
  return (
    <div className="mb-8 space-y-6">
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {chapter.title}
            </h1>
            <p className="text-xl text-gray-600">{chapter.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Main sections from chapter data */}
              {chapter.sections.map((section, index) => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {index === 0 && <TrafficCone className="h-6 w-6 mr-2" />}
                      {index === 1 && <Eye className="h-6 w-6 mr-2" />}
                      {index === 2 && <Brain className="h-6 w-6 mr-2" />}
                      {index > 2 && <Navigation className="h-6 w-6 mr-2" />}
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{section.content}</p>
                    {section.keyPoints.length > 0 && (
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Key Points:</h4>
                        <ul className="space-y-2">
                          {section.keyPoints.map((point, pointIndex) => (
                            <li key={pointIndex}>
                              <strong>•</strong> {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Sign Shapes & Colors
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="border-l-4 border-red-500 pl-3">
                      <strong>Red Octagon</strong> - Stop sign
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-3">
                      <strong>Yellow Triangle</strong> - Yield sign
                    </div>
                    <div className="border-l-4 border-orange-500 pl-3">
                      <strong>Orange Diamond</strong> - Construction warning
                    </div>
                    <div className="border-l-4 border-blue-500 pl-3">
                      <strong>Blue Rectangle</strong> - Information/services
                    </div>
                    <div className="border-l-4 border-green-500 pl-3">
                      <strong>Green Rectangle</strong> - Highway guidance
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2" />
                    Priority Signs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-red-50 p-3 rounded">
                      <div className="font-semibold">Stop Sign</div>
                      <div className="text-sm text-gray-600">
                        Complete stop required
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <div className="font-semibold">Yield Sign</div>
                      <div className="text-sm text-gray-600">
                        Give way to other traffic
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-semibold">All-Way Stop</div>
                      <div className="text-sm text-gray-600">
                        First to arrive has right-of-way
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Study Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Learn sign shapes and their meanings</li>
                    <li>• Memorize color-coding system</li>
                    <li>• Practice identifying signs quickly</li>
                    <li>• Understand pavement marking rules</li>
                    <li>• Know traffic light sequences</li>
                    <li>• Study construction zone signs</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
