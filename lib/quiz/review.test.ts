import { describe, expect, it } from "vitest";
import type { Question, UserAnswer } from "@/types/quiz";
import { buildQuizReviewItems, filterQuizReviewItems } from "./review";

function question(id: number, correctOption: string): Question {
  return {
    id,
    question_text: `Question ${id}`,
    question_type: id === 1 ? "signs" : "rules",
    option_a: "A",
    option_b: "B",
    option_c: "C",
    option_d: "D",
    correct_option: correctOption,
    image_url: null,
    image_description: null,
    category: "General",
    explanation: "Explanation",
    learning_topic: "General",
    handbook_section: "Section",
    handbook_url: "https://www.ontario.ca/",
  };
}

describe("quiz review", () => {
  it("matches answers without depending on letter casing", () => {
    const answers: Record<number, UserAnswer> = {
      1: { questionId: 1, selectedOption: "b" },
      2: { questionId: 2, selectedOption: "A" },
    };

    const items = buildQuizReviewItems(
      [question(1, "B"), question(2, "C")],
      answers
    );

    expect(items.map((item) => item.isCorrect)).toEqual([true, false]);
    expect(filterQuizReviewItems(items, "incorrect")).toHaveLength(1);
    expect(filterQuizReviewItems(items, "correct")).toHaveLength(1);
  });

  it("treats a missing answer as incorrect", () => {
    const [item] = buildQuizReviewItems([question(1, "A")], {});
    expect(item.isCorrect).toBe(false);
    expect(item.userAnswer).toBeUndefined();
  });
});
