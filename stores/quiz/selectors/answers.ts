// stores/quiz/selectors/answers.ts
import { useQuizStore } from "../quizStore";

export const useQuizQuestions = () => useQuizStore((s) => s.questions);

export const useCurrentQuestion = () =>
  useQuizStore((s) => s.questions[s.currentQuestionIndex] || null);

export const useUserAnswers = () => useQuizStore((s) => s.userAnswers);

export const useAnsweredQuestionsCount = () =>
  useQuizStore((s) => Object.keys(s.userAnswers).length);

export const useTotalQuestions = () => useQuizStore((s) => s.questions.length);

export const useProgress = () => useQuizStore((s) => s.progress);

export const useProgressPercentage = () =>
  useQuizStore((s) => s.progress.percentComplete);

export const useCanSubmit = () =>
  useQuizStore(
    (s) =>
      s.questions.length > 0 &&
      Object.keys(s.userAnswers).length === s.questions.length &&
      s.status === "active"
  );

// Fix for selectedAnswer bug - proper subscription to current question's answer
export const useSelectedAnswerForCurrentQuestion = () =>
  useQuizStore((s) => {
    const currentQuestion = s.questions[s.currentQuestionIndex];
    return currentQuestion ? s.userAnswers[currentQuestion.id] || null : null;
  });
