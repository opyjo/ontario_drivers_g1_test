import { describe, expect, it } from "vitest";
import {
  replayReviewHistory,
  scheduleReviewAnswer,
  type ReviewAnswerEvent,
} from "./spaced-repetition";

const baseEvent: ReviewAnswerEvent = {
  questionId: 21,
  questionType: "rules",
  isCorrect: true,
  reviewedAt: "2026-08-12T20:00:00.000Z",
};

describe("spaced repetition", () => {
  it("advances a confidently correct new answer to a three-day interval", () => {
    const result = scheduleReviewAnswer(null, {
      ...baseEvent,
      responseSeconds: 12,
    });

    expect(result.masteryLevel).toBe(1);
    expect(result.consecutiveCorrect).toBe(1);
    expect(result.nextReviewAt).toBe("2026-08-15T12:00:00.000Z");
  });

  it("keeps a slow correct answer at the current level", () => {
    const result = scheduleReviewAnswer(
      {
        questionId: 21,
        questionType: "rules",
        masteryLevel: 2,
        consecutiveCorrect: 2,
        lapses: 0,
        lastResult: true,
        lastResponseSeconds: 10,
        lastReviewedAt: "2026-08-01T12:00:00.000Z",
        nextReviewAt: "2026-08-08T12:00:00.000Z",
      },
      { ...baseEvent, responseSeconds: 35 }
    );

    expect(result.masteryLevel).toBe(2);
    expect(result.consecutiveCorrect).toBe(3);
    expect(result.nextReviewAt).toBe("2026-08-19T12:00:00.000Z");
  });

  it("resets an incorrect answer and schedules it for tomorrow", () => {
    const result = scheduleReviewAnswer(
      {
        questionId: 21,
        questionType: "rules",
        masteryLevel: 4,
        consecutiveCorrect: 5,
        lapses: 1,
        lastResult: true,
        lastResponseSeconds: 8,
        lastReviewedAt: "2026-07-01T12:00:00.000Z",
        nextReviewAt: "2026-07-31T12:00:00.000Z",
      },
      { ...baseEvent, isCorrect: false, responseSeconds: 18 }
    );

    expect(result.masteryLevel).toBe(0);
    expect(result.consecutiveCorrect).toBe(0);
    expect(result.lapses).toBe(2);
    expect(result.nextReviewAt).toBe("2026-08-13T12:00:00.000Z");
  });

  it("replays history chronologically even when attempts arrive newest first", () => {
    const schedules = replayReviewHistory([
      {
        ...baseEvent,
        reviewedAt: "2026-08-15T12:00:00.000Z",
        responseSeconds: 10,
      },
      { ...baseEvent, responseSeconds: 10 },
    ]);
    const result = schedules.get("rules:21");

    expect(result?.masteryLevel).toBe(2);
    expect(result?.nextReviewAt).toBe("2026-08-22T12:00:00.000Z");
  });
});
