import { describe, expect, it } from "vitest";
import type { Question } from "@/types/quiz";
import {
  addLocalQuizAttempt,
  LOCAL_QUIZ_HISTORY_LIMIT,
  parseLocalQuizHistory,
  type LocalQuizAttempt,
} from "./local-history";

const question: Question = {
  id: 1,
  question_type: "signs",
  question_text: "What does this sign mean?",
  option_a: "Stop",
  option_b: "Yield",
  option_c: "Turn",
  option_d: "Park",
  correct_option: "A",
  image_url: null,
  image_description: null,
  category: "Regulatory Signs",
  explanation: "A stop sign requires a complete stop.",
  learning_topic: "Road signs",
  handbook_section: "Traffic signs",
  handbook_url: "https://www.ontario.ca/",
};

function addAttempt(index: number, history: LocalQuizAttempt[] = []) {
  return addLocalQuizAttempt(history, {
    quizType: "signs",
    score: 1,
    totalQuestions: 1,
    completedAt: `2026-08-${String(index + 1).padStart(2, "0")}T12:00:00.000Z`,
    questions: [question],
    userAnswers: {
      1: { questionId: 1, selectedOption: "A" },
    },
  });
}

describe("local quiz history", () => {
  it("keeps the newest three attempts", () => {
    let history = addAttempt(0);
    history = addAttempt(1, history);
    history = addAttempt(2, history);
    history = addAttempt(3, history);

    expect(history).toHaveLength(LOCAL_QUIZ_HISTORY_LIMIT);
    expect(history.map((attempt) => attempt.completedAt)).toEqual([
      "2026-08-04T12:00:00.000Z",
      "2026-08-03T12:00:00.000Z",
      "2026-08-02T12:00:00.000Z",
    ]);
  });

  it("ignores corrupt or unsupported stored data", () => {
    expect(parseLocalQuizHistory("not-json")).toEqual([]);
    expect(parseLocalQuizHistory(JSON.stringify([{ version: 2 }]))).toEqual([]);
  });

  it("round-trips valid history", () => {
    const history = addAttempt(0);
    expect(parseLocalQuizHistory(JSON.stringify(history))).toEqual(history);
  });
});
