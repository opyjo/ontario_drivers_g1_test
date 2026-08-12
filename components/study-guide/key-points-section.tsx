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
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className="relative bg-gradient-to-br from-amber-50 via-yellow-50/30 to-orange-50/20">
        <CardHeader className="relative px-4 pb-4 sm:px-6">
          <div className="flex items-center justify-between mb-3">
            <CardTitle className="flex items-center text-xl font-semibold text-foreground">
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

      <CardContent className="bg-white px-4 py-5 sm:px-6">
        <div className="space-y-3">
          {visiblePoints.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100"
            >
              <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                <CheckCircle2 className="h-3 w-3 text-white" />
              </div>
              <p className="flex-1 text-[15px] font-medium leading-6 tracking-[-0.005em] text-card-foreground">
                {point}
              </p>
            </div>
          ))}
        </div>

        {hasMorePoints && (
          <div className="mt-4 pt-4 border-t border-warning/20">
            <Button
              variant="ghost"
              onClick={() => setShowAll(!showAll)}
              className="w-full flex items-center justify-center gap-2 text-warning hover:text-warning/80 hover:bg-warning/10 transition-colors"
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
