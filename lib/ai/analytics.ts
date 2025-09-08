// AI Usage Analytics for MTO RAG System
export interface AIUsageEvent {
  questionAsked: {
    question: string;
    responseType: "mto_answer" | "general_answer" | "error";
    sources?: string[];
    confidence?: "high" | "medium" | "low";
    userId?: string;
    timestamp: string;
  };

  responseGenerated: {
    responseTime: number;
    tokensUsed?: number;
    chunkCount: number;
    userId?: string;
    timestamp: string;
  };

  errorOccurred: {
    error: string;
    context: string;
    userId?: string;
    timestamp: string;
  };
}

class AIAnalytics {
  private static instance: AIAnalytics;

  private constructor() {}

  public static getInstance(): AIAnalytics {
    if (!AIAnalytics.instance) {
      AIAnalytics.instance = new AIAnalytics();
    }
    return AIAnalytics.instance;
  }

  public trackQuestionAsked(data: {
    question: string;
    responseType: "mto_answer" | "general_answer" | "error";
    sources?: string[];
    confidence?: "high" | "medium" | "low";
    userId?: string;
  }) {
    const event: AIUsageEvent["questionAsked"] = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    // Log to console (replace with your analytics service)
    console.log("[AI Analytics] Question Asked:", {
      type: event.responseType,
      hasMTOSources: (event.sources?.length || 0) > 0,
      confidence: event.confidence,
      questionLength: event.question.length,
    });

    // TODO: Send to your analytics service
    // Examples:
    // - Google Analytics 4
    // - PostHog
    // - Mixpanel
    // - Custom database logging

    this.logToSupabase("question_asked", event);
  }

  public trackResponseGenerated(data: {
    responseTime: number;
    tokensUsed?: number;
    chunkCount: number;
    userId?: string;
  }) {
    const event: AIUsageEvent["responseGenerated"] = {
      ...data,
      timestamp: new Date().toISOString(),
    };

    console.log("[AI Analytics] Response Generated:", {
      responseTime: event.responseTime,
      chunkCount: event.chunkCount,
      performance:
        event.responseTime < 2000
          ? "fast"
          : event.responseTime < 5000
          ? "medium"
          : "slow",
    });

    this.logToSupabase("response_generated", event);
  }

  public trackError(data: { error: string; context: string; userId?: string }) {
    try {
      const event: AIUsageEvent["errorOccurred"] = {
        error: String(data.error || "Unknown error"),
        context: String(data.context || "Unknown context"),
        userId: data.userId,
        timestamp: new Date().toISOString(),
      };

      // Use console.log instead of console.error to avoid Next.js error interceptor
      console.log("[AI Analytics] Error Tracked:", {
        error: event.error,
        context: event.context,
        timestamp: event.timestamp,
      });

      this.logToSupabase("error_occurred", event);
    } catch (loggingError) {
      // Fallback logging if there's an issue with the error tracking itself
      console.log(
        "[AI Analytics] Error tracking failed:",
        String(loggingError)
      );
    }
  }

  public trackUsageStats() {
    // TODO: Implement usage statistics tracking
    // Track daily/monthly usage, popular topics, etc.
    console.log("[AI Analytics] Usage stats tracking called");
  }

  private async logToSupabase(eventType: string, eventData: any) {
    try {
      // TODO: Implement Supabase logging if desired
      // You could create an 'ai_usage_logs' table to track usage
      // Example Supabase logging:
      /*
      const { error } = await supabase
        .from('ai_usage_logs')
        .insert({
          event_type: eventType,
          event_data: eventData,
          created_at: new Date().toISOString(),
        });
      
      if (error) {
        console.error('Failed to log AI usage to Supabase:', error);
      }
      */
    } catch (error) {
      console.error("Failed to log AI usage:", error);
    }
  }
}

// Singleton instance
export const aiAnalytics = AIAnalytics.getInstance();

// Convenience functions
export const trackAIUsage = {
  questionAsked: (
    question: string,
    responseType: "mto_answer" | "general_answer" | "error",
    options?: {
      sources?: string[];
      confidence?: "high" | "medium" | "low";
      userId?: string;
    }
  ) => {
    aiAnalytics.trackQuestionAsked({
      question,
      responseType,
      ...options,
    });
  },

  responseGenerated: (
    responseTime: number,
    options?: {
      tokensUsed?: number;
      chunkCount?: number;
      userId?: string;
    }
  ) => {
    aiAnalytics.trackResponseGenerated({
      responseTime,
      chunkCount: options?.chunkCount || 0,
      tokensUsed: options?.tokensUsed,
      userId: options?.userId,
    });
  },

  error: (error: string, context: string, userId?: string) => {
    aiAnalytics.trackError({ error, context, userId });
  },
};

// Usage example:
/*
import { trackAIUsage } from '@/lib/ai/analytics';

// Track a question being asked
trackAIUsage.questionAsked(
  "What are the speed limits in Ontario?",
  "mto_answer",
  {
    sources: ["Traffic Signs, Lights and Markings"],
    confidence: "high",
    userId: "user123"
  }
);

// Track response generation time
const startTime = Date.now();
// ... generate response ...
const endTime = Date.now();
trackAIUsage.responseGenerated(endTime - startTime, {
  chunkCount: 3,
  userId: "user123"
});
*/
