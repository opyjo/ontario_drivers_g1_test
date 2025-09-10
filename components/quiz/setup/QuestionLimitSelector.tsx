"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Target } from "lucide-react";
import type { QuestionLimit } from "@/types/quiz";
import { QUESTION_LIMITS, QUESTION_LIMIT_LABELS } from "@/lib/quiz/constants";

interface QuestionLimitSelectorProps {
  value: QuestionLimit;
  onChange: (limit: QuestionLimit) => void;
}

/**
 * Choose 10/20/40 with labels (Quick/Medium/Extended).
 * Maps from constants and shows recommended options.
 */
export function QuestionLimitSelector({
  value,
  onChange,
}: QuestionLimitSelectorProps) {
  const limits = [
    {
      value: QUESTION_LIMITS.QUICK_PRACTICE as QuestionLimit,
      label: QUESTION_LIMIT_LABELS[QUESTION_LIMITS.QUICK_PRACTICE],
      description: "Perfect for a focused short session",
      icon: Zap,
      recommended: false,
    },
    {
      value: QUESTION_LIMITS.MEDIUM_PRACTICE as QuestionLimit,
      label: QUESTION_LIMIT_LABELS[QUESTION_LIMITS.MEDIUM_PRACTICE],
      description: "Good balance of breadth and time",
      icon: Target,
      recommended: true,
    },
    {
      value: QUESTION_LIMITS.EXTENDED_PRACTICE as QuestionLimit,
      label: QUESTION_LIMIT_LABELS[QUESTION_LIMITS.EXTENDED_PRACTICE],
      description: "Comprehensive practice session",
      icon: Target,
      recommended: false,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Choose Number of Questions</h2>
        <p className="text-muted-foreground">
          Select how many questions you'd like to practice
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {limits.map((limit) => {
          const Icon = limit.icon;
          const isSelected = value === limit.value;

          return (
            <Card
              key={limit.value}
              className={`
                cursor-pointer transition-all duration-200 hover:shadow-md
                ${
                  isSelected
                    ? "ring-2 ring-primary ring-offset-2 border-primary"
                    : "hover:border-muted-foreground/30"
                }
              `}
              onClick={() => onChange(limit.value)}
            >
              <CardHeader className="text-center space-y-2 relative">
                {limit.recommended && (
                  <Badge className="absolute -top-2 -right-2 text-xs">
                    Recommended
                  </Badge>
                )}

                <div className="flex justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>

                <CardTitle className="text-lg">{limit.label}</CardTitle>
                <div className="text-2xl font-bold text-primary">
                  {limit.value} Questions
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <CardDescription className="text-center text-balance">
                  {limit.description}
                </CardDescription>

                {/* Untimed: no duration display */}

                <Button
                  variant={isSelected ? "default" : "outline"}
                  className="w-full"
                  aria-pressed={isSelected}
                  aria-label={`Select ${limit.value} questions for ${limit.label}`}
                >
                  {isSelected ? "Selected" : "Select"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
