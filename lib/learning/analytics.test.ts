import { describe, expect, it } from "vitest";
import {
  buildTopicMastery,
  calculateReadiness,
  selectAdaptiveQuestions,
  type LearningAttempt,
  type LearningQuestion,
} from "./analytics";
import type { Question } from "@/types/quiz";

const questions: LearningQuestion[] = [
  { id: 1, questionType: "signs", learningTopic: "Road signs" },
  { id: 10_021, questionType: "rules", learningTopic: "Intersections" },
];

const attempts: LearningAttempt[] = [
  {
    createdAt: "2026-08-10T12:00:00Z",
    quizType: "simulation",
    practiceType: null,
    score: 36,
    total: 40,
    answers: [
      { questionId: 1, questionType: "signs", isCorrect: true },
      { questionId: 10_021, questionType: "rules", isCorrect: false },
    ],
  },
];

describe("learning analytics", () => {
  it("builds topic mastery from synthetic rule identifiers", () => {
    const mastery = buildTopicMastery(questions, attempts);
    expect(mastery.find((topic) => topic.topic === "Road signs")?.accuracy).toBe(100);
    expect(mastery.find((topic) => topic.topic === "Intersections")?.accuracy).toBe(0);
  });

  it("does not claim consistent readiness without three passing simulations", () => {
    const readiness = calculateReadiness(buildTopicMastery(questions, attempts), attempts);
    expect(readiness.label).not.toBe("Consistently ready");
    expect(readiness.factors.map((factor) => factor.weight)).toEqual([45, 25, 20, 10]);
  });

  it("returns a stable, balanced daily set with priority reasons", () => {
    const fullQuestions = Array.from({ length: 12 }, (_, index): Question => ({
      id: index < 6 ? index + 1 : 10_000 + index + 1,
      question_type: index < 6 ? "signs" : "rules",
      question_text: `Question ${index + 1}`,
      option_a: "A",
      option_b: "B",
      option_c: "C",
      option_d: "D",
      correct_option: "A",
      image_url: null,
      image_description: null,
      category: "General",
      explanation: "Explanation",
      learning_topic: index < 6 ? "Road signs" : "Safe driving",
      handbook_section: "Official handbook",
      handbook_url: "https://www.ontario.ca/document/official-mto-drivers-handbook",
    }));
    const first = selectAdaptiveQuestions(fullQuestions, attempts, new Set(["signs:2"]), "2026-08-11", "user", 10);
    const second = selectAdaptiveQuestions(fullQuestions, attempts, new Set(["signs:2"]), "2026-08-11", "user", 10);
    expect(first.map((question) => question.id)).toEqual(second.map((question) => question.id));
    expect(first.filter((question) => question.question_type === "signs")).toHaveLength(5);
    expect(first.filter((question) => question.question_type === "rules")).toHaveLength(5);
    expect(first.every((question) => Boolean(question.adaptive_reason))).toBe(true);
  });
});
