"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";

interface KeyPointsSectionProps {
  keyPoints: string[];
}

const MAX_VISIBLE_POINTS = 5;

export const KeyPointsSection = ({ keyPoints }: KeyPointsSectionProps) => {
  const [showAll, setShowAll] = useState(false);

  const visiblePoints = showAll
    ? keyPoints
    : keyPoints.slice(0, MAX_VISIBLE_POINTS);
  const hasMorePoints = keyPoints.length > MAX_VISIBLE_POINTS;

  return (
    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="relative bg-gradient-to-br from-amber-50 via-yellow-50/30 to-orange-50/20">
        <CardHeader className="relative pb-4">
          <div className="flex items-center justify-between mb-3">
            <CardTitle className="flex items-center text-xl font-semibold text-slate-800">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                <Lightbulb className="h-4 w-4 text-white" />
              </div>
              Key Points
              {hasMorePoints && (
                <span className="ml-2 text-sm font-normal text-amber-600 bg-amber-100 px-2 py-1 rounded-full">
                  {showAll
                    ? `${keyPoints.length} total`
                    : `${MAX_VISIBLE_POINTS} of ${keyPoints.length}`}
                </span>
              )}
            </CardTitle>
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide shadow-sm">
              IMPORTANT
            </div>
          </div>
          <div className="h-px bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 opacity-60"></div>
        </CardHeader>
      </div>

      <CardContent className="bg-white px-6 py-4">
        <div className="space-y-3">
          {visiblePoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
              <p
                className="text-slate-700 flex-1"
                style={{
                  fontFamily:
                    "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "1.6",
                  letterSpacing: "-0.01em",
                }}
              >
                {point}
              </p>
            </div>
          ))}
        </div>

        {hasMorePoints && (
          <div className="mt-4 pt-4 border-t border-amber-100">
            <Button
              variant="ghost"
              onClick={() => setShowAll(!showAll)}
              className="w-full flex items-center justify-center gap-2 text-amber-600 hover:text-amber-700 hover:bg-amber-50 transition-colors"
            >
              {showAll ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Show Less
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Show All {keyPoints.length} Points
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
