import type { Question } from "@/types/quiz";

interface QuestionDisplayProps {
  question: Question;
}

/**
 * Compact question display with modern card design and optimized image handling.
 * Displays question content with proper accessibility attributes and space efficiency.
 */
export const QuestionDisplay = ({ question }: QuestionDisplayProps) => {
  return (
    <div className="bg-card border rounded-xl p-5 shadow-sm flex-shrink-0">
      {question.category && (
        <div className="inline-flex items-center px-2.5 py-1 bg-primary/10 text-primary text-xs font-medium uppercase tracking-wide rounded-full mb-3">
          {question.category}
        </div>
      )}

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-balance leading-snug text-foreground">
          {question.question_text}
        </h2>

        {question.image_url && (
          <div className="flex justify-center">
            <div className="relative w-[280px]">
              <img
                src={question.image_url || "/placeholder.svg"}
                alt={question.image_description || "Question illustration"}
                className="w-full h-auto max-h-36 object-contain rounded-lg border shadow-sm bg-muted/10"
                loading="lazy"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
