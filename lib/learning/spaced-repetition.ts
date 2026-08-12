export const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 60] as const;
export const SLOW_ANSWER_SECONDS = 30;

export type ReviewQuestionType = "signs" | "rules";

export interface QuestionReviewSchedule {
  questionId: number;
  questionType: ReviewQuestionType;
  masteryLevel: number;
  consecutiveCorrect: number;
  lapses: number;
  lastResult: boolean | null;
  lastResponseSeconds: number | null;
  lastReviewedAt: string | null;
  nextReviewAt: string;
}

export interface ReviewAnswerEvent {
  questionId: number;
  questionType: ReviewQuestionType;
  isCorrect: boolean;
  responseSeconds?: number;
  reviewedAt: string;
}

export function reviewScheduleKey(
  questionId: number,
  questionType: ReviewQuestionType
) {
  return `${questionType}:${questionId}`;
}

function clampMasteryLevel(level: number) {
  return Math.min(REVIEW_INTERVAL_DAYS.length - 1, Math.max(0, level));
}

function nextCalendarReview(reviewedAt: string, intervalDays: number) {
  const reviewed = new Date(reviewedAt);
  if (Number.isNaN(reviewed.getTime())) {
    throw new Error("Review date is invalid");
  }

  return new Date(
    Date.UTC(
      reviewed.getUTCFullYear(),
      reviewed.getUTCMonth(),
      reviewed.getUTCDate() + intervalDays,
      12
    )
  ).toISOString();
}

export function scheduleReviewAnswer(
  current: QuestionReviewSchedule | null | undefined,
  answer: ReviewAnswerEvent
): QuestionReviewSchedule {
  const currentLevel = clampMasteryLevel(current?.masteryLevel ?? 0);
  const wasSlow =
    typeof answer.responseSeconds === "number" &&
    answer.responseSeconds >= SLOW_ANSWER_SECONDS;

  const masteryLevel = !answer.isCorrect
    ? 0
    : wasSlow
      ? currentLevel
      : clampMasteryLevel(currentLevel + 1);
  const intervalDays = REVIEW_INTERVAL_DAYS[masteryLevel];

  return {
    questionId: answer.questionId,
    questionType: answer.questionType,
    masteryLevel,
    consecutiveCorrect: answer.isCorrect
      ? (current?.consecutiveCorrect ?? 0) + 1
      : 0,
    lapses: (current?.lapses ?? 0) + Number(!answer.isCorrect),
    lastResult: answer.isCorrect,
    lastResponseSeconds: answer.responseSeconds ?? null,
    lastReviewedAt: new Date(answer.reviewedAt).toISOString(),
    nextReviewAt: nextCalendarReview(answer.reviewedAt, intervalDays),
  };
}

export function replayReviewHistory(events: ReviewAnswerEvent[]) {
  const schedules = new Map<string, QuestionReviewSchedule>();
  const chronological = [...events].sort(
    (left, right) =>
      Date.parse(left.reviewedAt) - Date.parse(right.reviewedAt)
  );

  for (const event of chronological) {
    const key = reviewScheduleKey(event.questionId, event.questionType);
    schedules.set(key, scheduleReviewAnswer(schedules.get(key), event));
  }

  return schedules;
}
