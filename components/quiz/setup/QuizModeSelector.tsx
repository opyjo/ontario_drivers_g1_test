"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Car, Target } from "lucide-react";

type QuizMode = "signs_practice" | "rules_practice" | "simulation";

interface QuizModeSelectorProps {
  value?: QuizMode;
  onChange: (mode: QuizMode) => void;
}

/**
 * Choose mode: signs_practice, rules_practice, simulation.
 * Provides clear descriptions and visual indicators for each mode.
 */
export function QuizModeSelector({ value, onChange }: QuizModeSelectorProps) {
  const modes = [
    {
      id: "signs_practice" as const,
      title: "Traffic Signs Practice",
      description: "Practice identifying traffic signs and their meanings",
      icon: Target,
      color: "border-blue-200 hover:border-blue-300",
    },
    {
      id: "rules_practice" as const,
      title: "Rules of the Road Practice",
      description: "Practice traffic laws and driving regulations",
      icon: BookOpen,
      color: "border-green-200 hover:border-green-300",
    },
    {
      id: "simulation" as const,
      title: "G1 Knowledge Test Simulation",
      description:
        "Full simulation: 20 signs + 20 rules questions (80% to pass)",
      icon: Car,
      color: "border-purple-200 hover:border-purple-300",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-semibold">Choose Your Quiz Mode</h2>
        <p className="text-muted-foreground">
          Select the type of practice you'd like to do
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = value === mode.id;

          return (
            <Card
              key={mode.id}
              className={`
                cursor-pointer transition-all duration-200 hover:shadow-md
                ${mode.color}
                ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""}
              `}
              tabIndex={0}
              role="button"
              onClick={() => onChange(mode.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onChange(mode.id);
                }
              }}
            >
              <CardHeader className="text-center space-y-2">
                <div className="flex justify-center">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-lg">{mode.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-balance">
                  {mode.description}
                </CardDescription>

                <Button
                  variant={isSelected ? "default" : "outline"}
                  className="w-full mt-4"
                  aria-pressed={isSelected}
                  aria-label={`Select ${mode.title}`}
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
