import Image from "next/image";
import { CheckCircle, XCircle, AlertCircle, BookOpen, ExternalLink } from "lucide-react";

interface Question {
  readonly id: number;
  readonly question_text: string;
  readonly option_a: string;
  readonly option_b: string;
  readonly option_c: string;
  readonly option_d: string;
  readonly correct_option: string;
  readonly explanation?: string;
  readonly handbook_section?: string;
  readonly handbook_url?: string;
  readonly image_url?: string | null;
  readonly image_description?: string | null;
}

interface QuestionReviewProps {
  readonly question: Question;
  readonly userAnswer: string | undefined;
  readonly isCorrect: boolean;
  readonly questionNumber: number;
  readonly reviewContext: "all" | "correct" | "incorrect";
}

function getOptionStyles(
  isUserAnswer: boolean,
  isCorrectAnswer: boolean
): {
  bgStyle: string;
  borderStyle: string;
  iconContainerStyle: string;
  hoverStyle: string;
} {
  const defaultStyles = {
    bgStyle: "",
    borderStyle: "border-border",
    iconContainerStyle: "border-border",
    hoverStyle: "hover:bg-muted",
  };

  if (isCorrectAnswer) {
    return {
      bgStyle: "bg-success/10",
      borderStyle: "border-success",
      iconContainerStyle: "border-success bg-success text-success-foreground",
      hoverStyle: "",
    };
  }

  if (isUserAnswer) {
    return {
      bgStyle: "bg-destructive/10",
      borderStyle: "border-destructive",
      iconContainerStyle:
        "border-destructive bg-destructive text-destructive-foreground",
      hoverStyle: "",
    };
  }

  return defaultStyles;
}

function shouldShowAlertIcon(
  isCorrectOption: boolean,
  isQuestionCorrect: boolean,
  hasUserAnswer: boolean,
  reviewContext: string
): boolean {
  return (
    isCorrectOption &&
    !isQuestionCorrect &&
    hasUserAnswer &&
    (reviewContext === "incorrect" || reviewContext === "all")
  );
}

export function QuestionReview({
  question,
  userAnswer,
  isCorrect,
  questionNumber,
  reviewContext,
}: QuestionReviewProps) {
  const questionStatusClass = isCorrect
    ? "bg-success/20 text-success"
    : "bg-destructive/20 text-destructive";

  return (
    <article
      className="space-y-3 rounded-lg border p-4"
      aria-labelledby={`review-question-${question.id}`}
    >
      <div className="flex items-start gap-2">
        <div
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${questionStatusClass}`}
        >
          {isCorrect ? (
            <CheckCircle className="h-4 w-4" aria-hidden="true" />
          ) : (
            <XCircle className="h-4 w-4" aria-hidden="true" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-medium">Question {questionNumber}</p>
            <span className={`text-sm font-semibold ${isCorrect ? "text-success" : "text-destructive"}`}>
              {isCorrect ? "Correct" : "Incorrect"}
            </span>
          </div>
          <h3 id={`review-question-${question.id}`} className="mt-1 text-base font-semibold leading-6">
            {question.question_text}
          </h3>
        </div>
      </div>

      {question.image_url ? (
        <div className="ml-8 flex justify-center rounded-lg border bg-white p-3 dark:bg-slate-950">
          <Image
            src={question.image_url}
            alt={question.image_description || "Traffic sign shown in the question"}
            width={240}
            height={160}
            className="h-32 w-auto max-w-full object-contain"
            unoptimized
          />
        </div>
      ) : null}

      <div className="space-y-2 pl-8">
        {(["a", "b", "c", "d"] as const).map((option) => {
          const optionValue = question[
            `option_${option}` as keyof Question
          ] as string;
          const isUserAnswer =
            userAnswer?.toUpperCase() === option.toUpperCase();
          const isCorrectAnswer =
            question.correct_option === option.toUpperCase();

          const styles = getOptionStyles(
            isUserAnswer && !isCorrectAnswer,
            isCorrectAnswer
          );

          const showAlert = shouldShowAlertIcon(
            isCorrectAnswer,
            isCorrect,
            userAnswer !== undefined,
            reviewContext
          );

          return (
            <div
              key={option}
              className={`p-3 border rounded-md ${styles.borderStyle} ${styles.bgStyle} ${styles.hoverStyle}`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${styles.iconContainerStyle}`}
                >
                  <span className="text-sm">{option.toUpperCase()}</span>
                </div>
                <span>
                  {optionValue}
                  {isUserAnswer ? <span className="sr-only"> Your answer.</span> : null}
                  {isCorrectAnswer ? <span className="sr-only"> Correct answer.</span> : null}
                </span>
                {showAlert && (
                  <AlertCircle className="ml-auto h-5 w-5 text-success" aria-label="Correct answer" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {question.explanation ? (
        <div className="ml-8 rounded-lg border border-primary/15 bg-primary/5 p-3">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <BookOpen className="h-4 w-4 text-primary" aria-hidden="true" />
            Explanation
          </p>
          <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
            {question.explanation}
          </p>
          {question.handbook_url ? (
            <a
              href={question.handbook_url}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              Official MTO Handbook: {question.handbook_section || "source"}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

export default QuestionReview;
