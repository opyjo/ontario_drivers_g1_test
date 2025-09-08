"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Bot,
  User,
  Loader2,
  AlertTriangle,
  BookOpen,
  Globe,
  Send,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { trackAIUsage } from "@/lib/ai/analytics";

interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  type?: "mto_answer" | "general_answer" | "error";
  confidence?: "high" | "medium" | "low";
  sources?: Array<{
    document_title: string;
    category: string;
    topic: string;
    chunk_id: string;
  }>;
  timestamp: Date;
}

// Helper function to format AI responses with better typography
const formatAIResponse = (content: string, type?: string) => {
  const paragraphs = content.split("\n\n").filter((p) => p.trim());

  return paragraphs.map((paragraph, index) => {
    // Handle numbered lists (1., 2., etc.)
    if (/^\d+\./.test(paragraph.trim())) {
      const lines = paragraph.split("\n");
      return (
        <div key={index} className="space-y-2 sm:space-y-3 my-3 sm:my-4">
          {lines.map((line, lineIndex) => {
            if (/^\d+\./.test(line.trim())) {
              const match = line.match(/^(\d+\.)\s*(.*)$/);
              if (match) {
                const [, number, text] = match;
                const formattedText = formatInlineText(text);
                return (
                  <div
                    key={lineIndex}
                    className="flex items-start space-x-2 sm:space-x-3"
                  >
                    <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {number.replace(".", "")}
                    </span>
                    <div className="flex-1 text-xs sm:text-sm leading-relaxed">
                      {formattedText}
                    </div>
                  </div>
                );
              }
            }
            return line.trim() ? (
              <p
                key={lineIndex}
                className="text-xs sm:text-sm leading-relaxed ml-7 sm:ml-9 text-gray-600"
              >
                {formatInlineText(line)}
              </p>
            ) : null;
          })}
        </div>
      );
    }

    // Handle bullet points
    if (paragraph.includes("•") || paragraph.includes("-")) {
      const lines = paragraph.split("\n");
      return (
        <div key={index} className="space-y-1.5 sm:space-y-2 my-3 sm:my-4">
          {lines.map((line, lineIndex) => {
            if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
              const cleanLine = line.replace(/^[•-]\s*/, "");
              return (
                <div
                  key={lineIndex}
                  className="flex items-start space-x-2 sm:space-x-3"
                >
                  <span className="text-blue-500 font-bold mt-1 flex-shrink-0 text-xs sm:text-sm">
                    •
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed flex-1">
                    {formatInlineText(cleanLine)}
                  </span>
                </div>
              );
            }
            return line.trim() ? (
              <p
                key={lineIndex}
                className="text-xs sm:text-sm leading-relaxed ml-5 sm:ml-6 text-gray-600"
              >
                {formatInlineText(line)}
              </p>
            ) : null;
          })}
        </div>
      );
    }

    // Handle regular paragraphs
    return (
      <p
        key={index}
        className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 last:mb-0"
      >
        {formatInlineText(paragraph)}
      </p>
    );
  });
};

// Helper function to format inline text (bold, italics, etc.)
const formatInlineText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    // Handle bold text
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldText = part.slice(2, -2);
      return (
        <strong key={index} className="font-semibold text-gray-900">
          {boldText}
        </strong>
      );
    }

    // Handle italic text (*text*)
    if (part.startsWith("*") && part.endsWith("*") && !part.startsWith("**")) {
      const italicText = part.slice(1, -1);
      return (
        <em key={index} className="italic text-gray-700">
          {italicText}
        </em>
      );
    }

    // Handle regular text, but also look for special patterns
    return formatSpecialPatterns(part, index);
  });
};

// Helper function to format special patterns like notes, disclaimers, etc.
const formatSpecialPatterns = (text: string, key: number) => {
  // Handle notes and disclaimers
  if (text.includes("*💡") || text.includes("*Note:")) {
    return (
      <span
        key={key}
        className="block mt-4 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-r-md"
      >
        <span className="text-blue-800 text-sm italic">
          {text.replace("*Note:", "📝 Note:")}
        </span>
      </span>
    );
  }

  return <span key={key}>{text}</span>;
};

export default function AskAIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      role: "ai",
      content:
        'Welcome to DriveTest Pro! I\'m your AI driving instructor assistant powered by official MTO documents. Ask me anything about Ontario driving rules, road signs, procedures, and more!\n\nTry asking:\n• "What are the speed limits in Ontario?"\n• "How do I handle a 4-way stop?"\n• "What should I do during a collision?"\n• "When can I get my G2 license after my G1?"',
      type: "mto_answer",
      confidence: "high",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      // Force scroll to bottom with multiple methods for reliability
      setTimeout(() => {
        // Method 1: Scroll the messages container
        const messagesContainer = messagesEndRef.current?.parentElement;
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        // Method 2: Scroll into view as backup
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 200);
    }
  };

  useEffect(() => {
    if (hasUserInteracted) {
      scrollToBottom();
    }
  }, [messages, hasUserInteracted]);

  useEffect(() => {
    if (!isLoading && hasUserInteracted) {
      // Extra scroll when loading finishes
      setTimeout(() => scrollToBottom(), 300);
    }
  }, [isLoading, hasUserInteracted]);

  const fetchAIResponse = async (question: string) => {
    setIsLoading(true);
    const aiLoadingMessageId = uuidv4();

    // Add a temporary loading message
    setMessages((prev) => [
      ...prev,
      {
        id: aiLoadingMessageId,
        role: "ai",
        content: "Searching MTO documents and generating response...",
        type: "mto_answer",
        timestamp: new Date(),
      },
    ]);

    try {
      const startTime = Date.now();

      const response = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          conversationHistory: messages.slice(-4).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const endTime = Date.now();
      const responseTime = endTime - startTime;

      if (!response.ok) {
        let errorMsg = `Failed to get an answer (status: ${response.status}).`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.details || errorData.error || errorMsg;
        } catch (parseError) {
          const textError = await response.text();
          errorMsg = `Server error: ${response.status} ${
            response.statusText
          }. Response: ${textError.substring(0, 100)}...`;
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();

      // Track analytics
      trackAIUsage.questionAsked(question, data.type, {
        sources: data.sources?.map((s: any) => s.document_title),
        confidence: data.confidence,
      });

      trackAIUsage.responseGenerated(responseTime, {
        chunkCount: data.sources?.length || 0,
      });

      // Update the loading message with the actual response
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === aiLoadingMessageId
            ? {
                id: msg.id,
                role: "ai",
                content: data.content,
                type: data.type,
                confidence: data.confidence,
                sources: data.sources,
                timestamp: new Date(),
              }
            : msg
        )
      );
    } catch (err) {
      const errorContent =
        err instanceof Error ? err.message : "An unknown error occurred.";

      // Track error
      trackAIUsage.error(
        errorContent || "Unknown error occurred",
        "AI Assistant Page"
      );

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === aiLoadingMessageId
            ? {
                id: msg.id,
                role: "ai",
                content:
                  "I apologize, but I'm having trouble processing your request right now. Please try again in a moment, or rephrase your question.",
                type: "error",
                timestamp: new Date(),
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const question = inputValue.trim();
    if (!question || isLoading) return;

    // Set that user has interacted, enabling auto-scroll for subsequent messages
    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }

    setMessages((prev) => [
      ...prev,
      { id: uuidv4(), role: "user", content: question, timestamp: new Date() },
    ]);
    setInputValue("");
    await fetchAIResponse(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col px-2 sm:px-4 lg:px-8">
        <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full py-4 sm:py-6 lg:py-8">
          <Card className="flex-1 flex flex-col shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50/80 backdrop-blur-sm overflow-hidden min-h-[calc(100vh-8rem)]">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white flex-shrink-0 p-4 sm:p-6 lg:p-8">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <CardTitle className="flex items-center justify-center text-2xl sm:text-3xl lg:text-4xl mb-2">
                    <div className="relative mr-3 sm:mr-4">
                      <Bot className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 animate-pulse" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-green-400 rounded-full animate-ping"></div>
                    </div>
                    <span className="font-bold">MTO Driving Assistant</span>
                    <div className="relative ml-3 sm:ml-4">
                      <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-300 animate-spin" />
                    </div>
                  </CardTitle>
                  <CardDescription className="text-blue-100 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
                    Get instant, accurate answers from official Ministry of
                    Transportation Ontario documents. Your personal AI driving
                    instructor is ready to help!
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-3 sm:p-4 lg:p-8 min-h-0">
              <div
                className="flex-1 overflow-y-auto space-y-4 sm:space-y-6 lg:space-y-8 pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                id="messages-container"
              >
                {messages.map((msg, index) => (
                  <div
                    key={msg.id}
                    className={`transform transition-all duration-500 ease-out ${
                      index === messages.length - 1
                        ? "animate-in slide-in-from-bottom-3"
                        : ""
                    } ${
                      msg.role === "user"
                        ? "flex justify-end"
                        : "flex justify-start"
                    }`}
                  >
                    <div
                      className={`relative max-w-[95%] sm:max-w-[85%] lg:max-w-[80%] transition-all duration-300 hover:shadow-lg ${
                        msg.role === "user"
                          ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-3xl rounded-br-md shadow-xl"
                          : msg.type === "error"
                          ? "bg-gradient-to-br from-red-50 to-red-100 text-red-800 border-2 border-red-200 rounded-3xl rounded-bl-md shadow-lg"
                          : "bg-white border border-gray-200 rounded-3xl rounded-bl-md shadow-lg hover:shadow-xl"
                      }`}
                    >
                      {/* Message Header for AI responses */}
                      {msg.role === "ai" && msg.type !== "error" && (
                        <div className="flex items-center justify-between px-4 sm:px-6 pt-3 sm:pt-4 pb-3 border-b border-gray-100">
                          <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap">
                            <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 flex-shrink-0" />
                            <span className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                              AI Assistant
                            </span>
                            {msg.type === "mto_answer" && (
                              <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-full">
                                <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                                <span className="text-xs sm:text-sm text-green-700 font-medium">
                                  MTO Content
                                </span>
                              </div>
                            )}
                            {msg.type === "general_answer" && (
                              <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
                                <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600" />
                                <span className="text-xs sm:text-sm text-blue-700 font-medium">
                                  General Knowledge
                                </span>
                              </div>
                            )}
                            {msg.confidence && (
                              <div
                                className={`flex items-center space-x-1 sm:space-x-2 px-3 py-1 rounded-full ${
                                  msg.confidence === "high"
                                    ? "bg-green-100 text-green-700"
                                    : msg.confidence === "medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                                <span className="text-xs sm:text-sm font-medium capitalize">
                                  {msg.confidence} Confidence
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Message Content */}
                      <div
                        className={`p-4 sm:p-6 ${
                          msg.role === "ai" && msg.type !== "error"
                            ? "pt-3 sm:pt-4"
                            : ""
                        }`}
                      >
                        {msg.role === "user" && (
                          <div className="flex items-start space-x-2 sm:space-x-3 mb-3">
                            <User className="h-5 w-5 mt-0.5 opacity-90 flex-shrink-0" />
                            <span className="text-sm font-medium opacity-90 uppercase tracking-wide">
                              You
                            </span>
                          </div>
                        )}

                        {msg.type === "error" && (
                          <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
                            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 flex-shrink-0" />
                            <span className="text-base font-semibold text-red-700">
                              Error
                            </span>
                          </div>
                        )}

                        <div
                          className={`${
                            msg.role === "user"
                              ? "text-white font-medium text-base sm:text-lg"
                              : msg.type === "error"
                              ? "text-red-800 text-base"
                              : "text-gray-800 text-base"
                          }`}
                        >
                          {msg.role === "ai" && msg.type !== "error" ? (
                            <div className="prose prose-base max-w-none">
                              {formatAIResponse(msg.content, msg.type)}
                            </div>
                          ) : (
                            <div className="whitespace-pre-wrap break-words leading-relaxed">
                              {msg.content}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Timestamp */}
                      <div
                        className={`px-4 sm:px-6 pb-3 text-xs ${
                          msg.role === "user"
                            ? "text-blue-200"
                            : "text-gray-400"
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Enhanced Loading Indicator */}
                {isLoading && messages[messages.length - 1]?.role !== "ai" && (
                  <div className="flex justify-start animate-in slide-in-from-bottom-3">
                    <div className="bg-white border border-gray-200 rounded-3xl rounded-bl-md shadow-lg p-4 sm:p-6 max-w-sm">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="relative">
                          <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                          <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-ping"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-500 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-sm sm:text-base text-gray-600 ml-2">
                            Searching MTO documents...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} className="h-32" id="messages-end" />
              </div>

              {/* Enhanced Input Form */}
              <div className="flex-shrink-0 mt-4 sm:mt-6 lg:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                <form onSubmit={handleSubmit} className="relative">
                  <div className="flex items-end space-x-3 sm:space-x-4 bg-gray-50 rounded-2xl p-3 sm:p-4 border-2 border-transparent focus-within:border-blue-300 focus-within:bg-white transition-all duration-200 shadow-lg">
                    <Input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask me anything about Ontario driving rules, road signs, procedures..."
                      disabled={isLoading}
                      className="flex-grow border-0 bg-transparent text-gray-800 placeholder-gray-500 focus:ring-0 text-base sm:text-lg py-3 sm:py-4 min-h-[48px] sm:min-h-[56px]"
                    />
                    <Button
                      type="submit"
                      disabled={isLoading || !inputValue.trim()}
                      className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl px-4 sm:px-8 py-3 sm:py-4 min-h-[48px] sm:min-h-[56px] min-w-[48px] sm:min-w-[120px] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform active:scale-95 sm:hover:scale-105"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 sm:h-6 sm:w-6 animate-spin" />
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold hidden sm:inline text-base">
                            Ask AI
                          </span>
                          <Send className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                      )}
                    </Button>
                  </div>
                </form>

                {/* Helpful Tips */}
                <div className="mt-3 sm:mt-4 text-center px-4">
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    Try asking about{" "}
                    <span className="font-medium text-blue-600">
                      speed limits
                    </span>
                    ,{" "}
                    <span className="font-medium text-blue-600">
                      traffic signs
                    </span>
                    , or{" "}
                    <span className="font-medium text-blue-600">
                      driving procedures
                    </span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
