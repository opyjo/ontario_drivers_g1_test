"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Car,
  Wrench,
  Settings,
  Gauge,
  CheckCircle,
  BookOpen,
  Clock,
} from "lucide-react";
import { StudyGuideChapter } from "@/data/study-guide";

interface VehicleSectionProps {
  chapter: StudyGuideChapter;
}

export const VehicleSection = ({ chapter }: VehicleSectionProps) => {
  return (
    <div className="mb-8 space-y-6">
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
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
                      {index === 0 && <Car className="h-6 w-6 mr-2" />}
                      {index === 1 && <Wrench className="h-6 w-6 mr-2" />}
                      {index === 2 && <Settings className="h-6 w-6 mr-2" />}
                      {index > 2 && <Gauge className="h-6 w-6 mr-2" />}
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{section.content}</p>
                    {section.keyPoints.length > 0 && (
                      <div className="bg-indigo-50 p-4 rounded-lg">
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
                    Renewal Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="border-l-4 border-blue-500 pl-3">
                      <strong>Registration</strong> - Every 1-2 years
                    </div>
                    <div className="border-l-4 border-green-500 pl-3">
                      <strong>License Plates</strong> - Every 5 years
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-3">
                      <strong>Safety Inspection</strong> - When required
                    </div>
                    <div className="border-l-4 border-red-500 pl-3">
                      <strong>Emissions Test</strong> - Every 2 years (if
                      applicable)
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Required Equipment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-semibold">Lights</div>
                      <div className="text-sm text-gray-600">
                        Headlights, taillights, brake lights, signals
                      </div>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <div className="font-semibold">Safety Equipment</div>
                      <div className="text-sm text-gray-600">
                        Seatbelts, mirrors, horn, wipers
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <div className="font-semibold">Tires</div>
                      <div className="text-sm text-gray-600">
                        Adequate tread depth, proper inflation
                      </div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <div className="font-semibold">License Plates</div>
                      <div className="text-sm text-gray-600">
                        Front and rear plates, current stickers
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
                    <li>• Know minimum insurance requirements</li>
                    <li>• Understand when safety inspections are required</li>
                    <li>• Learn about emissions testing requirements</li>
                    <li>• Know what documents to carry in vehicle</li>
                    <li>• Understand registration renewal process</li>
                    <li>• Know penalties for driving uninsured</li>
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
