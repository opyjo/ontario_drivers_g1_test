// Error Boundary Component
// Error handling UI with retry functionality and user feedback

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  AlertTriangle,
  RefreshCw,
  Home,
  HelpCircle,
  Wifi,
  Database,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface QuizErrorBoundaryProps {
  error?: string | Error | null;
  errorType?: "network" | "validation" | "database" | "timeout" | "unknown";
  onRetry?: () => void;
  onGoHome?: () => void;
  onGetHelp?: () => void;
  retryAttempts?: number;
  maxRetries?: number;
  showRetryCount?: boolean;
  className?: string;
  variant?: "minimal" | "detailed" | "full";
}

const QuizErrorBoundary: React.FC<QuizErrorBoundaryProps> = ({
  error,
  errorType = "unknown",
  onRetry,
  onGoHome,
  onGetHelp,
  retryAttempts = 0,
  maxRetries = 3,
  showRetryCount = true,
  className = "",
  variant = "detailed",
}) => {
  if (!error) return null;

  // Convert error to string if it's an Error object
  const errorMessage = error instanceof Error ? error.message : String(error);

  // Get error configuration based on type
  const getErrorConfig = () => {
    switch (errorType) {
      case "network":
        return {
          title: "Connection Problem",
          message:
            "Unable to connect to the quiz service. Please check your internet connection and try again.",
          icon: <Wifi className="h-5 w-5" />,
          color: "text-blue-600",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
          suggestion: "Check your internet connection and try again.",
        };

      case "database":
        return {
          title: "Data Loading Error",
          message:
            "There was a problem loading quiz questions from our database.",
          icon: <Database className="h-5 w-5" />,
          color: "text-purple-600",
          bgColor: "bg-purple-50",
          borderColor: "border-purple-200",
          suggestion:
            "This is usually temporary. Please try again in a moment.",
        };

      case "timeout":
        return {
          title: "Request Timeout",
          message: "The quiz service is taking too long to respond.",
          icon: <Clock className="h-5 w-5" />,
          color: "text-orange-600",
          bgColor: "bg-orange-50",
          borderColor: "border-orange-200",
          suggestion: "The service might be busy. Please try again.",
        };

      case "validation":
        return {
          title: "Invalid Quiz Data",
          message: "The quiz questions received are invalid or incomplete.",
          icon: <AlertTriangle className="h-5 w-5" />,
          color: "text-red-600",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          suggestion: "Try refreshing or selecting a different quiz mode.",
        };

      default:
        return {
          title: "Quiz Error",
          message: "An unexpected error occurred while loading the quiz.",
          icon: <AlertTriangle className="h-5 w-5" />,
          color: "text-gray-600",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
          suggestion:
            "Please try again or contact support if the problem persists.",
        };
    }
  };

  const config = getErrorConfig();
  const canRetry = onRetry && retryAttempts < maxRetries;
  const hasReachedMaxRetries = retryAttempts >= maxRetries;

  // Minimal error display (inline)
  if (variant === "minimal") {
    return (
      <Alert
        className={cn(
          "border-destructive/50 text-destructive dark:border-destructive",
          className
        )}
      >
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription className="flex items-center justify-between">
          <span>{config.message}</span>
          {canRetry && (
            <Button
              variant="outline"
              size="sm"
              onClick={onRetry}
              className="ml-2"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Retry
            </Button>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  // Full error page
  return (
    <Card className={cn("w-full max-w-lg mx-auto", className)}>
      <CardHeader className="text-center pb-4">
        <div
          className={cn(
            "w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4",
            config.bgColor,
            config.borderColor,
            "border-2"
          )}
        >
          <div className={config.color}>{config.icon}</div>
        </div>

        <CardTitle className="text-xl font-semibold">{config.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Error message */}
        <div className="text-center space-y-2">
          <p className="text-muted-foreground leading-relaxed">
            {config.message}
          </p>

          {variant === "detailed" && (
            <p className="text-sm text-muted-foreground">{config.suggestion}</p>
          )}
        </div>

        {/* Technical details (only in full variant) */}
        {variant === "full" && errorMessage !== config.message && (
          <Alert className="text-left">
            <HelpCircle className="h-4 w-4" />
            <AlertTitle>Technical Details</AlertTitle>
            <AlertDescription className="text-xs font-mono mt-2">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        {/* Retry attempts indicator */}
        {showRetryCount && retryAttempts > 0 && (
          <div className="flex justify-center">
            <Badge variant="outline" className="text-xs">
              Attempt {retryAttempts} of {maxRetries}
            </Badge>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {canRetry && (
            <Button
              onClick={onRetry}
              className="flex-1 max-w-[140px]"
              size="lg"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}

          {hasReachedMaxRetries && onGoHome && (
            <Button
              onClick={onGoHome}
              variant="outline"
              className="flex-1 max-w-[140px]"
              size="lg"
            >
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          )}
        </div>

        {/* Additional help option */}
        {onGetHelp && (
          <div className="text-center pt-4 border-t">
            <Button
              onClick={onGetHelp}
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Get Help
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Specialized error components for common scenarios
export const NetworkErrorDisplay: React.FC<{
  onRetry?: () => void;
  className?: string;
}> = ({ onRetry, className }) => (
  <QuizErrorBoundary
    error="Network connection failed"
    errorType="network"
    onRetry={onRetry}
    className={className}
  />
);

export const DatabaseErrorDisplay: React.FC<{
  onRetry?: () => void;
  className?: string;
}> = ({ onRetry, className }) => (
  <QuizErrorBoundary
    error="Database connection failed"
    errorType="database"
    onRetry={onRetry}
    className={className}
  />
);

export const ValidationErrorDisplay: React.FC<{
  message?: string;
  onRetry?: () => void;
  className?: string;
}> = ({ message = "Invalid quiz data", onRetry, className }) => (
  <QuizErrorBoundary
    error={message}
    errorType="validation"
    onRetry={onRetry}
    className={className}
  />
);

export const InlineErrorMessage: React.FC<{
  error: string;
  onRetry?: () => void;
  className?: string;
}> = ({ error, onRetry, className }) => (
  <QuizErrorBoundary
    error={error}
    onRetry={onRetry}
    variant="minimal"
    className={className}
  />
);

export default QuizErrorBoundary;
