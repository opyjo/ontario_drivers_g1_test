"use client";

import React, { useCallback, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { MessageResponse } from "@/components/ai-elements/message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import {
  Bot,
  User,
  AlertTriangle,
  BookOpen,
  Globe,
  Send,
  CheckCircle,
  Sparkles,
  Square,
  LogIn,
  RefreshCw,
  WifiOff,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { trackAIUsage } from "@/lib/ai/analytics";
import {
  toConversationHistory,
  type ChatRole,
} from "@/lib/ai/chat-config";
import {
  chatResponseSchema,
  confidenceAfterCitationCheck,
  parseChatStreamHeaders,
  type ChatConfidence,
  type ChatResponse,
  type ChatResponseType,
  type ChatSource,
} from "@/lib/ai/chat-contract";
import { useAuthStore } from "@/stores";

const SUGGESTED_QUESTIONS = [
  "What are the speed limits in Ontario?",
  "How do I handle a four-way stop?",
  "What documents do I need for my G1 test?",
  "Explain right-of-way rules at intersections.",
] as const;

type AssistantErrorKind = "auth" | "rate_limit" | "service" | "request";
type ServiceStatus = "checking" | "ready" | "unavailable";

class ChatRequestError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
    this.name = "ChatRequestError";
  }
}

interface Message {
  id: string;
  role: ChatRole;
  content: string;
  type?: ChatResponseType | "error";
  confidence?: ChatConfidence;
  sources?: ChatSource[];
  timestamp?: Date;
  isLoading?: boolean;
  isStreaming?: boolean;
  isSynthetic?: boolean;
  errorKind?: AssistantErrorKind;
  retryQuestion?: string;
}

export default function AskAIPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      role: "assistant",
      content:
        "👋 Welcome to **DriveTest Pro**. Ask an Ontario driving question and I’ll answer using retrieved MTO handbook material, with source links when available.",
      type: "mto_answer",
      isSynthetic: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [serviceStatus, setServiceStatus] =
    useState<ServiceStatus>("checking");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const activeRequestRef = useRef<AbortController | null>(null);
  const user = useAuthStore((state) => state.user);
  const authLoading = useAuthStore((state) => state.isLoading);

  const checkService = useCallback(async () => {
    setServiceStatus("checking");
    try {
      const response = await fetch("/api/ask-ai", {
        method: "GET",
        cache: "no-store",
      });
      setServiceStatus(response.ok ? "ready" : "unavailable");
    } catch {
      setServiceStatus("unavailable");
    }
  }, []);

  useEffect(() => {
    void checkService();
  }, [checkService]);

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

  useEffect(() => () => activeRequestRef.current?.abort(), []);

  const fetchAIResponse = async (question: string) => {
    setIsLoading(true);
    const aiLoadingMessageId = uuidv4();
    const controller = new AbortController();
    activeRequestRef.current = controller;

    const loadingMessages = [
      "🔍 Analyzing your question and searching through official MTO documents...",
      "📚 Reviewing relevant driving regulations and procedures...",
      "🧠 Processing information from Ontario's driving handbook...",
      "✨ Crafting a comprehensive answer just for you...",
    ];

    let messageIndex = 0;

    // Add a temporary loading message
    setMessages((prev) => [
      ...prev,
      {
        id: aiLoadingMessageId,
        role: "assistant",
        content: loadingMessages[0],
        type: "mto_answer",
        timestamp: new Date(),
        isLoading: true,
      },
    ]);

    // Update loading message every 2 seconds
    const loadingInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === aiLoadingMessageId && msg.isLoading
            ? { ...msg, content: loadingMessages[messageIndex] }
            : msg
        )
      );
    }, 2000);

    try {
      const startTime = Date.now();

      const response = await fetch("/api/ask-ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          question,
          conversationHistory: toConversationHistory(messages),
        }),
      });

      if (!response.ok) {
        let errorMsg = `Failed to get an answer (status: ${response.status}).`;
        try {
          const errorData = (await response.json()) as {
            details?: string;
            error?: string;
          };
          errorMsg = errorData.details ?? errorData.error ?? errorMsg;
        } catch {
          const textError = await response.text();
          errorMsg = `Server error: ${response.status} ${
            response.statusText
          }. Response: ${textError.substring(0, 100)}...`;
        }
        throw new ChatRequestError(errorMsg, response.status);
      }

      const contentType = response.headers.get("content-type") ?? "";
      let data: ChatResponse;

      if (contentType.includes("application/json")) {
        data = chatResponseSchema.parse(await response.json());
      } else {
        const metadata = parseChatStreamHeaders(response.headers);
        if (!metadata || !response.body) {
          throw new Error("The AI assistant returned an invalid response.");
        }

        clearInterval(loadingInterval);
        setMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.id === aiLoadingMessageId
              ? {
                  ...msg,
                  content: "",
                  type: metadata.type,
                  confidence: metadata.confidence,
                  sources: metadata.sources,
                  isLoading: false,
                  isStreaming: true,
                }
              : msg
          )
        );

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        const readStream = async (accumulated: string): Promise<string> => {
          const { done, value } = await reader.read();
          if (done) return accumulated + decoder.decode();
          const nextContent =
            accumulated + decoder.decode(value, { stream: true });
          setMessages((prevMessages) =>
            prevMessages.map((msg) =>
              msg.id === aiLoadingMessageId
                ? { ...msg, content: nextContent }
                : msg
            )
          );
          return readStream(nextContent);
        };
        const content = await readStream("");

        if (!content.trim()) {
          throw new Error("The AI assistant did not return an answer.");
        }

        data = {
          type: metadata.type,
          content: content.trim(),
          confidence: confidenceAfterCitationCheck(
            metadata.confidence,
            content,
            metadata.sources.length
          ),
          sources: metadata.sources,
        };
      }

      trackAIUsage.questionAsked(question, data.type, {
        sources: data.sources.map((source) => source.document_title),
        confidence: data.confidence,
      });

      trackAIUsage.responseGenerated(Date.now() - startTime, {
        chunkCount: data.sources.length,
      });

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === aiLoadingMessageId
            ? {
                id: msg.id,
                role: "assistant",
                content: data.content,
                type: data.type,
                confidence: data.confidence,
                sources: data.sources,
                timestamp: new Date(),
                isLoading: false,
                isStreaming: false,
              }
            : msg
        )
      );
    } catch (err) {
      const wasAborted = controller.signal.aborted;
      const status = err instanceof ChatRequestError ? err.status : 0;
      const errorKind: AssistantErrorKind =
        status === 401
          ? "auth"
          : status === 429
            ? "rate_limit"
            : status >= 500
              ? "service"
              : "request";
      const errorContent = wasAborted
        ? "Response stopped. You can edit your question and try again."
        : err instanceof Error
        ? err.message
        : "An unknown error occurred.";

      // Track error
      if (!wasAborted) {
        trackAIUsage.error(errorContent, "AI Assistant Page");
      }

      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === aiLoadingMessageId
            ? {
                id: msg.id,
                role: "assistant",
                content: errorContent,
                type: "error",
                timestamp: new Date(),
                isLoading: false,
                isStreaming: false,
                errorKind,
                retryQuestion:
                  !wasAborted && errorKind !== "auth" ? question : undefined,
              }
            : msg
        )
      );
    } finally {
      clearInterval(loadingInterval);
      if (activeRequestRef.current === controller) {
        activeRequestRef.current = null;
      }
      setIsLoading(false);
    }
  };

  const handleCancel = () => activeRequestRef.current?.abort();

  const askQuestion = async (question: string) => {
    const trimmedQuestion = question.trim();
    if (
      !trimmedQuestion ||
      isLoading ||
      !user ||
      serviceStatus !== "ready"
    ) {
      return;
    }

    if (!hasUserInteracted) {
      setHasUserInteracted(true);
    }

    setMessages((prev) => [
      ...prev,
      {
        id: uuidv4(),
        role: "user",
        content: trimmedQuestion,
        timestamp: new Date(),
      },
    ]);
    setInputValue("");
    await fetchAIResponse(trimmedQuestion);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await askQuestion(inputValue);
  };

  return (
    <div className="flex flex-col vh-minus-nav">
      <div className="flex-1 flex flex-col px-2 sm:px-4 lg:px-8 min-h-0">
        <div className="flex-1 flex flex-col max-w-5xl mx-auto w-full py-2 sm:py-3 min-h-0 animate-fade-in">
          <Card className="flex-1 flex flex-col card-enhanced overflow-hidden min-h-0">
            <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground flex-shrink-0 p-2 sm:p-3 animate-slide-up">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <h1 className="mb-1 flex items-center justify-center text-lg font-semibold leading-none sm:text-xl">
                    <div className="relative mr-2 sm:mr-3">
                      <Bot className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
                      <span
                        className={`absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border-2 border-primary ${
                          serviceStatus === "ready"
                            ? "bg-emerald-400"
                            : serviceStatus === "checking"
                              ? "animate-pulse bg-amber-300"
                              : "bg-red-300"
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                    <span className="font-bold">MTO Driving Assistant</span>
                    <Sparkles
                      className="ml-2 h-4 w-4 text-warning sm:ml-3 sm:h-5 sm:w-5"
                      aria-hidden="true"
                    />
                  </h1>
                  <CardDescription
                    className="text-primary-foreground/80 text-xs sm:text-sm animate-fade-in"
                    style={{ animationDelay: "200ms" }}
                  >
                    {serviceStatus === "checking"
                      ? "Checking assistant availability…"
                      : serviceStatus === "ready"
                        ? "Ready · answers grounded in Ontario MTO documents"
                        : "Assistant setup needs attention"}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-2 sm:p-3 min-h-0 overflow-hidden">
              <div
                className="flex-1 overflow-y-auto space-y-2 pr-1 sm:pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent min-h-0 max-h-full"
                id="messages-container"
                aria-live="polite"
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
                      className={`relative transition-all duration-300 hover:shadow-xl cursor-pointer ${
                        msg.role === "user"
                          ? "max-w-[90%] sm:max-w-[75%] lg:max-w-[70%] bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl rounded-br-sm shadow-lg hover:shadow-xl hover:scale-[1.02]"
                          : "max-w-[95%] sm:max-w-[85%] lg:max-w-[80%]"
                      } ${
                        msg.type === "error"
                          ? "bg-gradient-to-br from-destructive/10 to-destructive/5 text-destructive border-2 border-destructive/20 rounded-3xl rounded-bl-md shadow-lg"
                          : msg.role !== "user"
                          ? "card-enhanced rounded-3xl rounded-bl-md"
                          : ""
                      }`}
                    >
                      {/* Message Header for AI responses */}
                      {msg.role === "assistant" && msg.type !== "error" && (
                        <div className="flex items-center justify-between px-4 sm:px-6 pt-3 sm:pt-4 pb-3 border-b border-border/50">
                          <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap">
                            <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-primary flex-shrink-0" />
                            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                              {msg.isSynthetic ? "Study assistant" : "AI answer"}
                            </span>
                            {!msg.isSynthetic && msg.type === "mto_answer" && (
                              <div className="flex items-center space-x-2 bg-success/10 px-3 py-1 rounded-full border border-success/20">
                                <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 text-success" />
                                <span className="text-xs sm:text-sm text-success font-medium">
                                  MTO Content
                                </span>
                              </div>
                            )}
                            {!msg.isSynthetic && msg.type === "general_answer" && (
                              <div className="flex items-center space-x-2 bg-info/10 px-3 py-1 rounded-full border border-info/20">
                                <Globe className="h-3 w-3 sm:h-4 sm:w-4 text-info" />
                                <span className="text-xs sm:text-sm text-info font-medium">
                                  General Knowledge
                                </span>
                              </div>
                            )}
                            {!msg.isSynthetic && msg.confidence && (
                              <div
                                className={`flex items-center space-x-1 sm:space-x-2 px-3 py-1 rounded-full border ${
                                  msg.confidence === "high"
                                    ? "bg-success/10 text-success border-success/20"
                                    : msg.confidence === "medium"
                                    ? "bg-warning/10 text-warning border-warning/20"
                                    : "bg-muted text-muted-foreground border-border"
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
                        className={`${
                          msg.role === "user" ? "p-3 sm:p-4" : "p-4 sm:p-6"
                        } ${
                          msg.role === "assistant" && msg.type !== "error"
                            ? "pt-3 sm:pt-4"
                            : ""
                        }`}
                      >
                        {msg.role === "user" && (
                          <div className="flex items-start space-x-2 mb-2">
                            <User className="h-4 w-4 mt-0.5 opacity-80 flex-shrink-0" />
                            <span className="text-xs font-medium opacity-80 uppercase tracking-wide">
                              You
                            </span>
                          </div>
                        )}

                        {msg.type === "error" && (
                          <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
                            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-destructive flex-shrink-0" />
                            <span className="text-base font-semibold text-destructive">
                              Error
                            </span>
                          </div>
                        )}

                        <div
                          className={`${
                            msg.role === "user"
                              ? "text-primary-foreground font-normal text-xs leading-normal"
                              : msg.type === "error"
                              ? "text-destructive text-base"
                              : "text-card-foreground text-base"
                          }`}
                        >
                          {msg.isLoading ? (
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center space-x-1">
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                                <div
                                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                                  style={{ animationDelay: "0.1s" }}
                                ></div>
                                <div
                                  className="w-2 h-2 bg-primary rounded-full animate-bounce"
                                  style={{ animationDelay: "0.2s" }}
                                ></div>
                              </div>
                              <div className="text-muted-foreground">
                                <div className="flex flex-col space-y-1">
                                  <span className="font-normal text-sm text-primary">
                                    {msg.content}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    Please wait while I find the best answer for
                                    you...
                                  </span>
                                </div>
                              </div>
                            </div>
                          ) : msg.role === "assistant" && msg.type !== "error" ? (
                            <MessageResponse
                              isAnimating={msg.isStreaming}
                              className="text-sm leading-relaxed text-card-foreground"
                            >
                              {msg.content}
                            </MessageResponse>
                          ) : (
                            <div className="whitespace-pre-wrap break-words">
                              {msg.content}
                            </div>
                          )}
                        </div>

                        {msg.type === "error" ? (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {msg.errorKind === "auth" ? (
                              <Button asChild size="sm">
                                <Link href="/auth?redirect=/ask-ai">
                                  <LogIn className="h-4 w-4" aria-hidden="true" />
                                  Sign in
                                </Link>
                              </Button>
                            ) : null}
                            {msg.retryQuestion ? (
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                disabled={isLoading}
                                onClick={() =>
                                  void fetchAIResponse(msg.retryQuestion ?? "")
                                }
                              >
                                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                                Try again
                              </Button>
                            ) : null}
                          </div>
                        ) : null}
                      </div>

                      {msg.sources && msg.sources.length > 0 ? (
                        <div className="border-t border-border/60 px-4 py-3 sm:px-6">
                          <p className="mb-2 text-xs font-semibold text-muted-foreground">
                            Official handbook sources
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {msg.sources.map((source) => (
                              <a
                                key={`${source.chunk_id}-${source.url}`}
                                href={source.url}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary hover:bg-primary/10 hover:underline"
                              >
                                {source.document_title}
                              </a>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      {/* Timestamp */}
                      {msg.timestamp ? (
                        <div
                          className={`${
                            msg.role === "user"
                              ? "px-3 sm:px-4 pb-2"
                              : "px-4 sm:px-6 pb-3"
                          } text-xs ${
                            msg.role === "user"
                              ? "text-primary-foreground/75"
                              : "text-muted-foreground"
                          }`}
                        >
                          {msg.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}

                {!hasUserInteracted ? (
                  <div className="px-1 py-3 sm:px-4" aria-label="Suggested questions">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Try a question
                    </p>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {SUGGESTED_QUESTIONS.map((question) => (
                        <Button
                          key={question}
                          type="button"
                          variant="outline"
                          className="h-auto justify-start whitespace-normal px-3 py-2 text-left text-xs leading-5"
                          disabled={!user || serviceStatus !== "ready" || isLoading}
                          onClick={() => void askQuestion(question)}
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Enhanced Loading Indicator */}
                {isLoading &&
                  messages[messages.length - 1]?.role !== "assistant" && (
                  <div className="flex justify-start animate-slide-up">
                    <div className="card-enhanced rounded-3xl rounded-bl-md p-4 sm:p-6 max-w-sm">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="relative">
                          <Bot className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                          <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-success rounded-full animate-ping"></div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <span className="text-sm sm:text-base text-muted-foreground ml-2">
                            Searching MTO documents...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} className="h-2" id="messages-end" />
              </div>

              {/* Input and recovery states */}
              <div className="flex-shrink-0 mt-2 pt-2 border-t border-border bg-card">
                {authLoading || serviceStatus === "checking" ? (
                  <div className="flex min-h-14 items-center justify-center gap-2 rounded-xl bg-muted/40 px-4 text-sm text-muted-foreground" role="status">
                    <RefreshCw className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Preparing the study assistant…
                  </div>
                ) : !user ? (
                  <div className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold">Sign in to ask the assistant</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        An account protects the service and keeps AI requests tied to your study session.
                      </p>
                    </div>
                    <Button asChild size="sm" className="shrink-0">
                      <Link href="/auth?redirect=/ask-ai">
                        <LogIn className="h-4 w-4" aria-hidden="true" />
                        Sign in
                      </Link>
                    </Button>
                  </div>
                ) : serviceStatus === "unavailable" ? (
                  <div className="flex flex-col gap-3 rounded-xl border border-destructive/20 bg-destructive/5 p-3 sm:flex-row sm:items-center sm:justify-between" role="alert">
                    <div className="flex items-start gap-2">
                      <WifiOff className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-destructive">Assistant unavailable</p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          The service configuration could not be verified. Check again in a moment.
                        </p>
                      </div>
                    </div>
                    <Button type="button" size="sm" variant="outline" onClick={() => void checkService()}>
                      <RefreshCw className="h-4 w-4" aria-hidden="true" />
                      Check again
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="relative">
                    <label htmlFor="ai-question" className="sr-only">
                      Ask a question about Ontario driving rules
                    </label>
                    <div className="flex items-end space-x-2 sm:space-x-3 input-modern rounded-xl p-2 border-2 border-transparent focus-within:border-primary/30 focus-within:bg-card transition-all duration-200 shadow-lg">
                      <Input
                        id="ai-question"
                        name="question"
                        type="text"
                        autoComplete="off"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask about Ontario driving rules, signs, or procedures…"
                        disabled={isLoading}
                        className="flex-grow border-0 bg-transparent text-foreground placeholder-muted-foreground focus:ring-0 text-sm py-1.5 min-h-[36px] focus-ring-modern"
                      />
                      <Button
                        type={isLoading ? "button" : "submit"}
                        onClick={isLoading ? handleCancel : undefined}
                        disabled={!isLoading && !inputValue.trim()}
                        aria-label={isLoading ? "Stop generating answer" : "Ask AI"}
                        className="button-modern focus-ring-modern rounded-lg px-3 sm:px-4 py-1.5 min-h-[36px] min-w-[44px] sm:min-w-[70px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium hidden sm:inline text-sm">Stop</span>
                            <Square className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1">
                            <span className="font-medium hidden sm:inline text-sm">Ask AI</span>
                            <Send className="h-4 w-4" aria-hidden="true" />
                          </div>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
