// Question Display Component
// Universal component for rendering quiz questions with image support

import React from "react";
import Image from "next/image";
import { Question } from "@/types/quiz";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, FileImage } from "lucide-react";

export interface QuestionDisplayProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  showQuestionType?: boolean;
  className?: string;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  questionNumber,
  totalQuestions,
  showQuestionType = true,
  className = "",
}) => {
  if (!question) {
    return (
      <Card className={`w-full ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-center text-muted-foreground">
            <AlertCircle className="h-5 w-5 mr-2" />
            No question available
          </div>
        </CardContent>
      </Card>
    );
  }

  const getQuestionTypeColor = (type: string) => {
    switch (type) {
      case "signs":
        return "bg-blue-500 hover:bg-blue-600";
      case "rules":
        return "bg-green-500 hover:bg-green-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const getQuestionTypeLabel = (type: string) => {
    switch (type) {
      case "signs":
        return "Road Signs";
      case "rules":
        return "Rules of the Road";
      default:
        return "Question";
    }
  };

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Question Counter */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </span>
          </div>

          {/* Question Type Badge */}
          {showQuestionType && (
            <Badge
              variant="secondary"
              className={`text-white ${getQuestionTypeColor(
                question.question_type
              )}`}
            >
              {getQuestionTypeLabel(question.question_type)}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Question Image */}
        {question.image_url && (
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="aspect-square relative bg-gray-50 rounded-lg overflow-hidden border">
                <Image
                  src={question.image_url}
                  alt={question.image_description || "Question image"}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={questionNumber <= 3} // Priority load first few questions
                />
              </div>
              {question.image_description && (
                <p className="text-xs text-muted-foreground text-center mt-2">
                  {question.image_description}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Question Text */}
        <div className="space-y-3">
          <div
            className="text-lg leading-relaxed"
            role="heading"
            aria-level={2}
            aria-label={`Question ${questionNumber}: ${question.question_text}`}
          >
            {question.question_text}
          </div>

          {/* Question Category (if available) */}
          {question.category && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileImage className="h-4 w-4" />
              <span>Category: {question.category}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionDisplay;
