import type { Question } from "@/types/quiz";
import {
  meetsG1PassingStandard,
  type QuizSectionBreakdown,
} from "../quiz/scoring";
import type { QuestionReviewSchedule } from "./spaced-repetition";

export type LearningQuestionType = "signs" | "rules";

export interface LearningQuestion {
  id: number;
  questionType: LearningQuestionType;
  learningTopic: string;
}

export interface LearningAnswer {
  questionId: number;
  questionType: LearningQuestionType;
  isCorrect: boolean;
  timeSpentSeconds?: number;
}

export interface LearningAttempt {
  createdAt: string;
  quizType: string | null;
  practiceType: string | null;
  score: number;
  total: number;
  breakdown?: QuizSectionBreakdown | null;
  answers: LearningAnswer[];
}

export interface TopicMastery {
  topic: string;
  attempts: number;
  correct: number;
  accuracy: number;
  score: number;
  lastPracticedAt: string | null;
}

export interface ReadinessFactor {
  label: string;
  value: number;
  weight: number;
  detail: string;
}

export interface ReadinessScore {
  score: number;
  label: "Needs practice" | "Almost ready" | "Consistently ready";
  factors: ReadinessFactor[];
  simulationCount: number;
}

export interface AdaptiveQuestion extends Question {
  adaptive_reason: string;
}

export interface SpacedReviewQuestionCandidate {
  id: number;
  questionType: LearningQuestionType;
  adaptiveReason: string;
}

export function databaseQuestionId(id: number, type: LearningQuestionType) {
  return type === "rules" && id > 10_000 ? id - 10_000 : id;
}

export function publicQuestionId(id: number, type: LearningQuestionType) {
  return type === "rules" && id <= 10_000 ? id + 10_000 : id;
}

export function questionKey(id: number, type: LearningQuestionType) {
  return `${type}:${databaseQuestionId(id, type)}`;
}

export function buildTopicMastery(
  questions: LearningQuestion[],
  attempts: LearningAttempt[]
): TopicMastery[] {
  const questionTopics = new Map(
    questions.map((question) => [
      questionKey(question.id, question.questionType),
      question.learningTopic,
    ])
  );
  const topicNames = [...new Set(questions.map((question) => question.learningTopic))];
  const totals = new Map<
    string,
    { attempts: number; correct: number; lastPracticedAt: string | null }
  >(
    topicNames.map((topic) => [
      topic,
      { attempts: 0, correct: 0, lastPracticedAt: null },
    ])
  );

  for (const attempt of attempts) {
    for (const answer of attempt.answers) {
      const topic = questionTopics.get(
        questionKey(answer.questionId, answer.questionType)
      );
      if (!topic) continue;
      const current = totals.get(topic);
      if (!current) continue;
      current.attempts += 1;
      current.correct += Number(answer.isCorrect);
      if (!current.lastPracticedAt || attempt.createdAt > current.lastPracticedAt) {
        current.lastPracticedAt = attempt.createdAt;
      }
    }
  }

  return [...totals.entries()]
    .map(([topic, total]) => {
      const accuracy = total.attempts
        ? Math.round((total.correct / total.attempts) * 100)
        : 0;
      const confidence = Math.min(1, total.attempts / 5);
      const score = total.attempts
        ? Math.round(accuracy * (0.6 + 0.4 * confidence))
        : 0;
      return { topic, ...total, accuracy, score };
    })
    .sort((a, b) => a.score - b.score || a.attempts - b.attempts || a.topic.localeCompare(b.topic));
}

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function standardDeviation(values: number[]) {
  if (values.length < 2) return 0;
  const mean = average(values);
  return Math.sqrt(average(values.map((value) => (value - mean) ** 2)));
}

export function calculateReadiness(
  mastery: TopicMastery[],
  attempts: LearningAttempt[]
): ReadinessScore {
  const simulationScores = attempts
    .filter((attempt) => attempt.quizType === "simulation" && attempt.total > 0)
    .slice(0, 5)
    .map((attempt) => (attempt.score / attempt.total) * 100);
  const simulationPerformance = Math.round(average(simulationScores));
  const masteryAverage = Math.round(average(mastery.map((topic) => topic.score)));
  const coveredTopics = mastery.filter((topic) => topic.attempts >= 2).length;
  const coverage = mastery.length
    ? Math.round((coveredTopics / mastery.length) * 100)
    : 0;
  const consistency =
    simulationScores.length < 2
      ? 0
      : Math.max(0, Math.round(100 - standardDeviation(simulationScores) * 2));

  const factors: ReadinessFactor[] = [
    {
      label: "Recent simulations",
      value: simulationPerformance,
      weight: 45,
      detail: simulationScores.length
        ? `Average of ${simulationScores.length} most recent simulation${simulationScores.length === 1 ? "" : "s"}`
        : "Complete a simulation to establish this factor",
    },
    {
      label: "Topic mastery",
      value: masteryAverage,
      weight: 25,
      detail: "Accuracy adjusted for practice volume",
    },
    {
      label: "Topic coverage",
      value: coverage,
      weight: 20,
      detail: `${coveredTopics} of ${mastery.length} topics practiced at least twice`,
    },
    {
      label: "Consistency",
      value: consistency,
      weight: 10,
      detail:
        simulationScores.length >= 2
          ? "Higher when recent simulation scores are close together"
          : "Two simulations are needed to measure consistency",
    },
  ];
  const score = Math.round(
    factors.reduce(
      (total, factor) => total + factor.value * (factor.weight / 100),
      0
    )
  );
  const recentSimulations = attempts
    .filter((attempt) => attempt.quizType === "simulation" && attempt.total > 0)
    .slice(0, 3);
  const consistentlyPassing =
    recentSimulations.length >= 3 &&
    recentSimulations.every((attempt) =>
      meetsG1PassingStandard({
        score: attempt.score,
        total: attempt.total,
        breakdown: attempt.breakdown,
      })
    );
  const label =
    score >= 80 && consistentlyPassing
      ? "Consistently ready"
      : score >= 60
        ? "Almost ready"
        : "Needs practice";

  return { score, label, factors, simulationCount: simulationScores.length };
}

function stableHash(value: string) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

export function selectAdaptiveQuestions(
  questions: Question[],
  attempts: LearningAttempt[],
  flaggedKeys: Set<string>,
  dateKey: string,
  userId: string,
  limit = 10
): AdaptiveQuestion[] {
  const stats = new Map<
    string,
    { seen: number; incorrect: number; totalTime: number; timed: number; lastSeen: number }
  >();

  for (const attempt of attempts) {
    const timestamp = Date.parse(attempt.createdAt) || 0;
    for (const answer of attempt.answers) {
      const key = questionKey(answer.questionId, answer.questionType);
      const current = stats.get(key) ?? {
        seen: 0,
        incorrect: 0,
        totalTime: 0,
        timed: 0,
        lastSeen: 0,
      };
      current.seen += 1;
      current.incorrect += Number(!answer.isCorrect);
      current.lastSeen = Math.max(current.lastSeen, timestamp);
      if (typeof answer.timeSpentSeconds === "number") {
        current.totalTime += answer.timeSpentSeconds;
        current.timed += 1;
      }
      stats.set(key, current);
    }
  }

  const now = Date.parse(`${dateKey}T12:00:00Z`) || Date.now();
  const ranked = questions.map((question) => {
    const key = questionKey(question.id, question.question_type);
    const stat = stats.get(key);
    const isFlagged = flaggedKeys.has(key);
    const isUnseen = !stat?.seen;
    const incorrectRate = stat?.seen ? stat.incorrect / stat.seen : 0;
    const averageTime = stat?.timed ? stat.totalTime / stat.timed : 0;
    const staleDays = stat?.lastSeen
      ? Math.min(30, Math.max(0, (now - stat.lastSeen) / 86_400_000))
      : 30;
    const priority =
      incorrectRate * 55 +
      (isFlagged ? 45 : 0) +
      (isUnseen ? 30 : 0) +
      staleDays +
      (averageTime >= 30 ? 20 : 0);
    const reason = isFlagged
      ? "Flagged for review"
      : incorrectRate >= 0.5
        ? "Previously missed"
        : averageTime >= 30
          ? "Needs faster recall"
          : isUnseen
            ? "New question"
            : staleDays >= 14
              ? "Due for review"
              : "Keeps your coverage balanced";

    return {
      ...question,
      adaptive_reason: reason,
      priority,
      tieBreak: stableHash(`${dateKey}:${userId}:${key}`),
    };
  });
  ranked.sort((a, b) => b.priority - a.priority || a.tieBreak - b.tieBreak);

  const targetSigns = Math.floor(limit / 2);
  const targetRules = limit - targetSigns;
  const selected = [
    ...ranked.filter((question) => question.question_type === "signs").slice(0, targetSigns),
    ...ranked.filter((question) => question.question_type === "rules").slice(0, targetRules),
  ];
  if (selected.length < limit) {
    const selectedKeys = new Set(
      selected.map((question) => questionKey(question.id, question.question_type))
    );
    selected.push(
      ...ranked
        .filter(
          (question) =>
            !selectedKeys.has(questionKey(question.id, question.question_type))
        )
        .slice(0, limit - selected.length)
    );
  }

  return selected
    .sort(
      (a, b) =>
        stableHash(`${dateKey}:${userId}:order:${questionKey(a.id, a.question_type)}`) -
        stableHash(`${dateKey}:${userId}:order:${questionKey(b.id, b.question_type)}`)
    )
    .map(({ priority: _priority, tieBreak: _tieBreak, ...question }) => question);
}

export function selectSpacedReviewQuestionCandidates(
  questions: Array<Pick<LearningQuestion, "id" | "questionType">>,
  schedules: QuestionReviewSchedule[],
  flaggedKeys: Set<string>,
  dateKey: string,
  userId: string,
  limit = 10
): SpacedReviewQuestionCandidate[] {
  const now = Date.parse(`${dateKey}T12:00:00Z`) || Date.now();
  const scheduleByKey = new Map(
    schedules.map((schedule) => [
      questionKey(schedule.questionId, schedule.questionType),
      schedule,
    ])
  );
  const ranked = questions.flatMap((question) => {
    const key = questionKey(question.id, question.questionType);
    const schedule = scheduleByKey.get(key);
    const dueAt = schedule ? Date.parse(schedule.nextReviewAt) : null;
    const isDue = dueAt !== null && Number.isFinite(dueAt) && dueAt <= now;
    const isFlagged = flaggedKeys.has(key);
    const isNew = !schedule;

    if (!isDue && !isFlagged && !isNew) return [];

    const overdueDays = isDue && dueAt !== null
      ? Math.max(0, Math.floor((now - dueAt) / 86_400_000))
      : 0;
    const priority = isDue
      ? 1_000 +
        overdueDays * 20 +
        (schedule?.lapses ?? 0) * 8 +
        (5 - (schedule?.masteryLevel ?? 0)) * 4 +
        Number(schedule?.lastResult === false) * 30 +
        Number(isFlagged) * 15
      : isFlagged
        ? 700
        : 300;
    const reason = isDue
      ? overdueDays > 0
        ? `Overdue by ${overdueDays} day${overdueDays === 1 ? "" : "s"}`
        : schedule?.lastResult === false
          ? "Missed last time — due today"
          : "Due today"
      : isFlagged
        ? "Flagged for review"
        : "New question";

    return [{
      id: question.id,
      questionType: question.questionType,
      adaptiveReason: reason,
      priority,
      tieBreak: stableHash(`${dateKey}:${userId}:${key}`),
    }];
  });

  ranked.sort((left, right) =>
    right.priority - left.priority || left.tieBreak - right.tieBreak
  );

  const targetSigns = Math.floor(limit / 2);
  const targetRules = limit - targetSigns;
  const selected = [
    ...ranked
      .filter((question) => question.questionType === "signs")
      .slice(0, targetSigns),
    ...ranked
      .filter((question) => question.questionType === "rules")
      .slice(0, targetRules),
  ];
  if (selected.length < limit) {
    const selectedKeys = new Set(
      selected.map((question) =>
        questionKey(question.id, question.questionType)
      )
    );
    selected.push(
      ...ranked
        .filter(
          (question) =>
            !selectedKeys.has(
              questionKey(question.id, question.questionType)
            )
        )
        .slice(0, limit - selected.length)
    );
  }

  return selected
    .sort(
      (left, right) =>
        stableHash(
          `${dateKey}:${userId}:order:${questionKey(left.id, left.questionType)}`
        ) -
        stableHash(
          `${dateKey}:${userId}:order:${questionKey(right.id, right.questionType)}`
        )
    )
    .map(({ priority: _priority, tieBreak: _tieBreak, ...question }) => question);
}

export function selectSpacedReviewQuestions(
  questions: Question[],
  schedules: QuestionReviewSchedule[],
  flaggedKeys: Set<string>,
  dateKey: string,
  userId: string,
  limit = 10
): AdaptiveQuestion[] {
  const questionByKey = new Map(
    questions.map((question) => [
      questionKey(question.id, question.question_type),
      question,
    ])
  );
  const candidates = selectSpacedReviewQuestionCandidates(
    questions.map((question) => ({
      id: question.id,
      questionType: question.question_type,
    })),
    schedules,
    flaggedKeys,
    dateKey,
    userId,
    limit
  );

  return candidates.flatMap((candidate) => {
    const question = questionByKey.get(
      questionKey(candidate.id, candidate.questionType)
    );
    return question
      ? [{ ...question, adaptive_reason: candidate.adaptiveReason }]
      : [];
  });
}
