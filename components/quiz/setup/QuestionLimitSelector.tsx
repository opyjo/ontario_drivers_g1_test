// Question Limit Selector Component
// Choose between 10/20/40 questions with UX-friendly labels

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  BookOpen,
  Target,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { QuestionLimit } from "@/types/quiz";
import { QUESTION_LIMITS, QUESTION_LIMIT_LABELS } from "@/lib/quiz/constants";
import { cn } from "@/lib/utils";

export interface QuestionLimitSelectorProps {
  selectedLimit?: QuestionLimit;
  onLimitSelect: (limit: QuestionLimit) => void;
  mode?: "practice" | "selection";
  disabled?: boolean;
  className?: string;
  showDescriptions?: boolean;
  compact?: boolean;
  availableLimits?: QuestionLimit[];
}

interface LimitConfig {
  limit: QuestionLimit;
  title: string;
  description: string;
  shortDescription: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  estimatedTime: string;
  difficulty: "Quick" | "Moderate" | "Comprehensive";
  benefits: string[];
  recommended?: boolean;
}

const QuestionLimitSelector: React.FC<QuestionLimitSelectorProps> = ({
  selectedLimit,
  onLimitSelect,
  mode = "selection",
  disabled = false,
  className = "",
  showDescriptions = true,
  compact = false,
  availableLimits = [
    QUESTION_LIMITS.QUICK_PRACTICE,
    QUESTION_LIMITS.MEDIUM_PRACTICE,
    QUESTION_LIMITS.EXTENDED_PRACTICE,
  ],
}) => {
  const limitConfigs: LimitConfig[] = [
    {
      limit: QUESTION_LIMITS.QUICK_PRACTICE,
      title: QUESTION_LIMIT_LABELS[QUESTION_LIMITS.QUICK_PRACTICE],
      description:
        "Perfect for a quick review session or when you're short on time. Focus on key concepts.",
      shortDescription: "Quick focused session",
      icon: <Zap className="h-6 w-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      estimatedTime: "5-8 min",
      difficulty: "Quick",
      benefits: [
        "Fast completion",
        "Core concepts",
        "Great for review",
        "Low time commitment",
      ],
    },
    {
      limit: QUESTION_LIMITS.MEDIUM_PRACTICE,
      title: QUESTION_LIMIT_LABELS[QUESTION_LIMITS.MEDIUM_PRACTICE],
      description:
        "Balanced practice session with good coverage. Ideal for regular study sessions and skill building.",
      shortDescription: "Balanced learning session",
      icon: <BookOpen className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      estimatedTime: "10-15 min",
      difficulty: "Moderate",
      benefits: [
        "Comprehensive coverage",
        "Skill development",
        "Confidence building",
        "Optimal learning",
      ],
      recommended: true,
    },
    {
      limit: QUESTION_LIMITS.EXTENDED_PRACTICE,
      title: QUESTION_LIMIT_LABELS[QUESTION_LIMITS.EXTENDED_PRACTICE],
      description:
        "Comprehensive practice with maximum question variety. Best for thorough preparation and test readiness.",
      shortDescription: "Comprehensive preparation",
      icon: <Target className="h-6 w-6" />,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      estimatedTime: "15-25 min",
      difficulty: "Comprehensive",
      benefits: [
        "Maximum variety",
        "Test preparation",
        "Thorough coverage",
        "Confidence boost",
      ],
    },
  ];

  // Filter configs based on available limits
  const filteredConfigs = limitConfigs.filter((config) =>
    availableLimits.includes(config.limit)
  );

  const handleLimitSelect = (limit: QuestionLimit) => {
    if (disabled) return;
    onLimitSelect(limit);
  };

  const handleKeyDown = (event: React.KeyboardEvent, limit: QuestionLimit) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleLimitSelect(limit);
    }
  };

  // Compact button variant
  if (compact) {
    return (
      <div className={cn("flex flex-wrap gap-3", className)}>
        {filteredConfigs.map((config) => {
          const isSelected = selectedLimit === config.limit;

          return (
            <Button
              key={config.limit}
              onClick={() => handleLimitSelect(config.limit)}
              onKeyDown={(e) => handleKeyDown(e, config.limit)}
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "flex items-center gap-2 px-4 py-2",
                isSelected && "ring-2 ring-offset-1",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              disabled={disabled}
            >
              <div className={isSelected ? "text-current" : config.color}>
                {config.icon}
              </div>
              <span className="font-medium">{config.limit} Questions</span>
              <Badge variant="secondary" className="ml-1 text-xs">
                {config.estimatedTime}
              </Badge>
            </Button>
          );
        })}
      </div>
    );
  }

  // Full detailed cards
  return (
    <div className={cn("space-y-6", className)}>
      {mode === "selection" && (
        <div className="text-center space-y-2">
          <h2 className="text-xl font-bold">How Many Questions?</h2>
          <p className="text-muted-foreground">
            Choose the length of your practice session
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {filteredConfigs.map((config) => {
          const isSelected = selectedLimit === config.limit;

          return (
            <Card
              key={config.limit}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-md",
                "border-2 relative",
                isSelected ? config.borderColor : "border-border",
                isSelected && "shadow-sm",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => handleLimitSelect(config.limit)}
              onKeyDown={(e) => handleKeyDown(e, config.limit)}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              aria-label={`Select ${config.limit} questions - ${config.title}`}
            >
              {config.recommended && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-yellow-500 text-white px-2 py-1 text-xs">
                    Recommended
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-3 pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div
                    className={cn(
                      "p-3 rounded-full",
                      isSelected
                        ? "bg-primary/10 border-primary"
                        : config.bgColor,
                      "border-2",
                      isSelected ? "border-primary" : config.borderColor
                    )}
                  >
                    <div className={isSelected ? "text-primary" : config.color}>
                      {config.icon}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <CardTitle className="text-lg">
                      {config.limit} Questions
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {config.title}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {showDescriptions && (
                  <p className="text-sm text-muted-foreground text-center leading-relaxed">
                    {config.description}
                  </p>
                )}

                <div className="space-y-3">
                  {/* Time and Difficulty */}
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {config.estimatedTime}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <TrendingUp className="h-3 w-3" />
                      {config.difficulty}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-semibold text-center text-muted-foreground">
                      Benefits
                    </h4>
                    <ul className="space-y-1">
                      {config.benefits.map((benefit, index) => (
                        <li
                          key={index}
                          className="text-xs text-muted-foreground flex items-center gap-2"
                        >
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className="w-full mt-4"
                  disabled={disabled}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-2" />
                      Selected
                    </>
                  ) : (
                    <>
                      Select
                      <ArrowRight className="h-3 w-3 ml-2" />
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick selection hint */}
      {mode === "selection" && (
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Tip:</strong> Start with{" "}
            {QUESTION_LIMIT_LABELS[QUESTION_LIMITS.MEDIUM_PRACTICE]} for the
            best balance of coverage and time
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionLimitSelector;
