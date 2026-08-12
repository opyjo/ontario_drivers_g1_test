import { describe, expect, it } from "vitest";
import { isPassedQuizAttempt, meetsG1PassingStandard } from "./scoring";

describe("G1 scoring", () => {
  it("rejects the former 15-out-of-40 result-page threshold", () => {
    expect(meetsG1PassingStandard({ score: 15, total: 40 })).toBe(false);
  });

  it("accepts 32 out of 40 when no legacy section breakdown exists", () => {
    expect(meetsG1PassingStandard({ score: 32, total: 40 })).toBe(true);
  });

  it("requires both 20-question sections to meet their thresholds", () => {
    expect(
      meetsG1PassingStandard({
        score: 32,
        total: 40,
        breakdown: {
          signsCorrect: 15,
          signsTotal: 20,
          rulesCorrect: 17,
          rulesTotal: 20,
        },
      })
    ).toBe(false);
    expect(
      meetsG1PassingStandard({
        score: 32,
        total: 40,
        breakdown: {
          signsCorrect: 16,
          signsTotal: 20,
          rulesCorrect: 16,
          rulesTotal: 20,
        },
      })
    ).toBe(true);
  });

  it("never labels practice as an official-style pass", () => {
    expect(
      isPassedQuizAttempt({ isPractice: true, score: 40, total: 40 })
    ).toBe(false);
  });
});
