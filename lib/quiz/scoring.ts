import { G1_TEST_CONFIG } from "./constants";

export interface QuizSectionBreakdown {
  signsCorrect?: number;
  rulesCorrect?: number;
  signsTotal?: number;
  rulesTotal?: number;
}

export interface QuizScoreInput {
  score: number;
  total: number;
  breakdown?: QuizSectionBreakdown | null;
}

export interface SavedQuizScoreInput extends QuizScoreInput {
  isPractice: boolean;
}

function isCompleteSimulationBreakdown(
  breakdown: QuizSectionBreakdown | null | undefined
): breakdown is Required<QuizSectionBreakdown> {
  return (
    breakdown?.signsTotal === G1_TEST_CONFIG.SIGNS_QUESTIONS_PER_TEST &&
    breakdown.rulesTotal === G1_TEST_CONFIG.RULES_QUESTIONS_PER_TEST &&
    typeof breakdown.signsCorrect === "number" &&
    typeof breakdown.rulesCorrect === "number"
  );
}

export function meetsG1PassingStandard({
  score,
  total,
  breakdown,
}: QuizScoreInput) {
  if (!Number.isFinite(score) || !Number.isFinite(total) || total <= 0) {
    return false;
  }

  const meetsOverallStandard =
    (score / total) * 100 >= G1_TEST_CONFIG.PASSING_PERCENTAGE;
  if (!meetsOverallStandard) return false;

  if (!isCompleteSimulationBreakdown(breakdown)) {
    return true;
  }

  return (
    breakdown.signsCorrect >= G1_TEST_CONFIG.SIGNS_PASSING_SCORE &&
    breakdown.rulesCorrect >= G1_TEST_CONFIG.RULES_PASSING_SCORE
  );
}

export function isPassedQuizAttempt({
  isPractice,
  ...score
}: SavedQuizScoreInput) {
  return !isPractice && meetsG1PassingStandard(score);
}
