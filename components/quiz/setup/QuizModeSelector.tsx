// Quiz Mode Selector Component
// Choose between Signs Practice, Rules Practice, and G1 Simulation

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  SignpostBig,
  BookOpen,
  Timer,
  Users,
  Trophy,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { QuizMode } from "@/types/quiz";
import { cn } from "@/lib/utils";

export interface QuizModeSelectorProps {
  selectedMode?: QuizMode;
  onModeSelect: (mode: QuizMode) => void;
  disabled?: boolean;
  className?: string;
  showDescriptions?: boolean;
  compact?: boolean;
}

interface ModeConfig {
  mode: QuizMode;
  title: string;
  description: string;
  shortDescription: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  features: string[];
  recommended?: boolean;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
}

const QuizModeSelector: React.FC<QuizModeSelectorProps> = ({
  selectedMode,
  onModeSelect,
  disabled = false,
  className = "",
  showDescriptions = true,
  compact = false,
}) => {
  const modeConfigs: ModeConfig[] = [
    {
      mode: "signs_practice",
      title: "Road Signs Practice",
      description:
        "Master Ontario road signs with targeted practice sessions. Perfect for building recognition skills.",
      shortDescription: "Practice identifying road signs",
      icon: <SignpostBig className="h-6 w-6" />,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      features: [
        "Road signs only",
        "Flexible question limits",
        "Unlimited attempts",
        "Immediate feedback",
      ],
      difficulty: "Beginner",
      estimatedTime: "5-15 min",
    },
    {
      mode: "rules_practice",
      title: "Rules of the Road",
      description:
        "Study Ontario driving rules, regulations, and best practices with comprehensive practice questions.",
      shortDescription: "Practice driving rules and regulations",
      icon: <BookOpen className="h-6 w-6" />,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      features: [
        "Rules & regulations",
        "Safety procedures",
        "Right-of-way scenarios",
        "Detailed explanations",
      ],
      difficulty: "Intermediate",
      estimatedTime: "10-20 min",
      recommended: true,
    },
    {
      mode: "simulation",
      title: "G1 Test Simulation",
      description:
        "Experience the real G1 driving test with the exact format: 20 road signs + 20 rules questions.",
      shortDescription: "Full G1 test simulation",
      icon: <Car className="h-6 w-6" />,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      features: [
        "Real test format (40 questions)",
        "20 signs + 20 rules",
        "Pass/fail scoring (80%)",
        "Official test experience",
      ],
      difficulty: "Advanced",
      estimatedTime: "20-30 min",
    },
  ];

  const handleModeSelect = (mode: QuizMode) => {
    if (disabled) return;
    onModeSelect(mode);
  };

  const handleKeyDown = (event: React.KeyboardEvent, mode: QuizMode) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleModeSelect(mode);
    }
  };

  // Compact card variant
  if (compact) {
    return (
      <div className={cn("grid grid-cols-1 sm:grid-cols-3 gap-4", className)}>
        {modeConfigs.map((config) => {
          const isSelected = selectedMode === config.mode;

          return (
            <Button
              key={config.mode}
              onClick={() => handleModeSelect(config.mode)}
              onKeyDown={(e) => handleKeyDown(e, config.mode)}
              variant={isSelected ? "default" : "outline"}
              className={cn(
                "h-auto p-4 flex-col gap-2",
                isSelected && "ring-2 ring-offset-2",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              disabled={disabled}
            >
              <div className={config.color}>{config.icon}</div>
              <div className="text-center">
                <div className="font-semibold text-sm">{config.title}</div>
                <div className="text-xs text-muted-foreground">
                  {config.shortDescription}
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    );
  }

  // Full detailed cards
  return (
    <div className={cn("space-y-6", className)}>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Choose Your Quiz Mode</h2>
        <p className="text-muted-foreground">
          Select the type of practice that best fits your learning needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {modeConfigs.map((config) => {
          const isSelected = selectedMode === config.mode;

          return (
            <Card
              key={config.mode}
              className={cn(
                "cursor-pointer transition-all duration-200 hover:shadow-lg",
                "border-2",
                isSelected ? config.borderColor : "border-border",
                isSelected && "shadow-md",
                disabled && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => handleModeSelect(config.mode)}
              onKeyDown={(e) => handleKeyDown(e, config.mode)}
              tabIndex={0}
              role="button"
              aria-pressed={isSelected}
              aria-label={`Select ${config.title} mode`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div
                    className={cn(
                      "p-3 rounded-lg",
                      config.bgColor,
                      config.borderColor,
                      "border"
                    )}
                  >
                    <div className={config.color}>{config.icon}</div>
                  </div>

                  <div className="flex flex-col gap-1 items-end">
                    {config.recommended && (
                      <Badge
                        variant="secondary"
                        className="bg-yellow-100 text-yellow-800"
                      >
                        <Trophy className="h-3 w-3 mr-1" />
                        Recommended
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {config.difficulty}
                    </Badge>
                  </div>
                </div>

                <CardTitle className="text-lg mt-4">{config.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {showDescriptions && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {config.description}
                  </p>
                )}

                <div className="space-y-2">
                  <h4 className="text-sm font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    Key Features
                  </h4>
                  <ul className="space-y-1">
                    {config.features.map((feature, index) => (
                      <li
                        key={index}
                        className="text-xs text-muted-foreground flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Timer className="h-3 w-3" />
                    {config.estimatedTime}
                  </div>

                  <Button
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    className="ml-auto"
                    disabled={disabled}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                        Selected
                      </>
                    ) : (
                      <>
                        Select
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Help text */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg text-sm text-blue-700">
          <AlertTriangle className="h-4 w-4" />
          <span>
            New to driving? Start with <strong>Road Signs Practice</strong> or{" "}
            <strong>Rules of the Road</strong>
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuizModeSelector;
