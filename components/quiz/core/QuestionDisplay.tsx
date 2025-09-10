import type { Question } from "@/types/quiz"

interface QuestionDisplayProps {
  question: Question
}

/**
 * Render a single question (text + optional image), category, and assistive description.
 * Displays question content with proper accessibility attributes.
 */
export function QuestionDisplay({ question }: QuestionDisplayProps) {
  return (
    <div className="space-y-4">
      {question.category && (
        <div className="text-sm text-muted-foreground font-medium uppercase tracking-wide">{question.category}</div>
      )}

      <div className="space-y-4">
        <h2 className="text-lg md:text-xl font-semibold text-balance leading-relaxed">{question.question_text}</h2>

        {question.image_url && (
          <div className="flex justify-center">
            <img
              src={question.image_url || "/placeholder.svg"}
              alt={question.image_description || "Question illustration"}
              className="max-w-full h-auto rounded-lg border shadow-sm"
              loading="lazy"
            />
          </div>
        )}
      </div>
    </div>
  )
}
