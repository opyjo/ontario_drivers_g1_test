"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Minimize2,
  Maximize2,
  BookOpen,
  Globe,
  Loader2,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { trackAIUsage } from "@/lib/ai/analytics";

interface Message {
  id: string;
  role: "user" | "assistant";
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

interface AIAssistantProps {
  className?: string;
}

// Message formatting utilities
const formatAIResponse = (content: string) => {
  const paragraphs = content.split("\n\n").filter((p) => p.trim());

  return paragraphs.map((paragraph, index) => {
    // Handle numbered lists
    if (/^\d+\./.test(paragraph.trim())) {
      const lines = paragraph.split("\n");
      return (
        <div key={index} className="space-y-2 my-4">
          {lines.map((line, lineIndex) => {
            const match = line.match(/^(\d+\.)\s*(.*)$/);
            if (match) {
              const [, number, text] = match;
              return (
                <div key={lineIndex} className="flex items-start space-x-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-sm font-bold">
                    {number.replace(".", "")}
                  </span>
                  <div className="flex-1 text-sm leading-relaxed">
                    {formatInlineText(text)}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      );
    }

    // Handle bullet points
    if (paragraph.includes("•") || paragraph.includes("-")) {
      const lines = paragraph.split("\n");
      return (
        <div key={index} className="space-y-2 my-4">
          {lines.map((line, lineIndex) => {
            if (line.trim().startsWith("•") || line.trim().startsWith("-")) {
              const cleanLine = line.replace(/^[•-]\s*/, "");
              return (
                <div key={lineIndex} className="flex items-start space-x-3">
                  <span className="text-blue-500 font-bold mt-1">•</span>
                  <span className="text-sm leading-relaxed">
                    {formatInlineText(cleanLine)}
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>
      );
    }

    // Regular paragraphs
    return (
      <p key={index} className="text-sm leading-relaxed mb-4">
        {formatInlineText(paragraph)}
      </p>
    );
  });
};

const formatInlineText = (text: string) => {
  // Handle bold text (**text**)
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className="font-semibold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

export function AIAssistant({ className }: AIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: `Welcome to DriveTest Pro! I'm your AI driving instructor assistant powered by official MTO documents. Ask me anything about Ontario driving rules, road signs, procedures, and more!

Try asking:
• "What are the speed limits in Ontario?"
• "How do I handle a 4-way stop?"
• "What should I do during a collision?"`,
        type: "mto_answer",
        confidence: "high",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const question = input.trim();
    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      content: question,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Add temporary loading message
    const loadingId = uuidv4();
    const loadingMessage: Message = {
      id: loadingId,
      role: "assistant",
      content: "Searching MTO documents and generating response...",
      type: "mto_answer",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, loadingMessage]);

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
        const errorData = await response.json();
        throw new Error(
          errorData.error || `Request failed with status ${response.status}`
        );
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

      // Replace loading message with actual response
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId
            ? {
                ...msg,
                content: data.content,
                type: data.type,
                confidence: data.confidence,
                sources: data.sources,
              }
            : msg
        )
      );
    } catch (error: any) {
      console.error("AI Assistant error:", error);

      // Track error
      trackAIUsage.error(error.message, "AI Assistant Chat");

      // Replace loading message with error
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === loadingId
            ? {
                ...msg,
                content:
                  "I apologize, but I'm having trouble processing your request right now. Please try again in a moment, or rephrase your question.",
                type: "error",
              }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className || ""}`}>
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg transition-all duration-300 hover:scale-105"
        >
          <MessageCircle className="h-6 w-6 mr-2" />
          AI Assistant
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className || ""}`}>
      <Card
        className={`w-80 md:w-96 bg-white shadow-2xl border-0 transition-all duration-300 ${
          isMinimized ? "h-16" : "h-[32rem]"
        }`}
      >
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6" />
              <CardTitle className="text-lg">AI Assistant</CardTitle>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 text-xs"
              >
                MTO Powered
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-white hover:bg-blue-800 p-1 h-8 w-8"
              >
                {isMinimized ? (
                  <Maximize2 className="h-4 w-4" />
                ) : (
                  <Minimize2 className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-blue-800 p-1 h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-full p-0">
            <ScrollArea className="flex-1 p-4 h-80">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : message.type === "error"
                          ? "bg-red-50 border border-red-200 text-red-800"
                          : "bg-gray-50 border text-gray-800"
                      }`}
                    >
                      {/* Message Header for AI responses */}
                      {message.role === "assistant" && (
                        <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
                          <div className="flex items-center space-x-2">
                            <Bot className="h-4 w-4 text-blue-500" />
                            <span className="text-xs font-semibold text-gray-600">
                              AI Assistant
                            </span>

                            {message.type === "mto_answer" && (
                              <div className="flex items-center space-x-1 bg-green-100 px-2 py-0.5 rounded-full">
                                <BookOpen className="h-3 w-3 text-green-600" />
                                <span className="text-xs text-green-700 font-medium">
                                  MTO Content
                                </span>
                              </div>
                            )}

                            {message.type === "general_answer" && (
                              <div className="flex items-center space-x-1 bg-blue-100 px-2 py-0.5 rounded-full">
                                <Globe className="h-3 w-3 text-blue-600" />
                                <span className="text-xs text-blue-700 font-medium">
                                  General
                                </span>
                              </div>
                            )}

                            {message.confidence && (
                              <div
                                className={`flex items-center space-x-1 px-2 py-0.5 rounded-full ${
                                  message.confidence === "high"
                                    ? "bg-green-100 text-green-700"
                                    : message.confidence === "medium"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : "bg-gray-100 text-gray-700"
                                }`}
                              >
                                <CheckCircle className="h-3 w-3" />
                                <span className="text-xs font-medium">
                                  {message.confidence}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      {/* User Message Header */}
                      {message.role === "user" && (
                        <div className="flex items-center space-x-2 mb-2">
                          <User className="h-4 w-4 opacity-90" />
                          <span className="text-xs font-medium opacity-90">
                            You
                          </span>
                        </div>
                      )}

                      {/* Message Content */}
                      <div className="text-sm leading-relaxed">
                        {message.role === "assistant" &&
                        message.type !== "error" ? (
                          <div className="prose prose-sm max-w-none">
                            {formatAIResponse(message.content)}
                          </div>
                        ) : (
                          <div className="whitespace-pre-wrap">
                            {message.content}
                          </div>
                        )}
                      </div>

                      {/* Sources */}
                      {message.sources && message.sources.length > 0 && (
                        <div className="mt-3 pt-2 border-t border-gray-200">
                          <div className="text-xs text-gray-600 font-medium mb-1">
                            Sources:
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {message.sources.map((source, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                              >
                                {source.document_title}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Timestamp */}
                      <div className="mt-2 text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Loading Indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-50 border rounded-lg p-3 max-w-[85%]">
                      <div className="flex items-center space-x-3">
                        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                        <span className="text-sm text-gray-600">
                          Searching MTO documents...
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t p-4 bg-gray-50 rounded-b-lg">
              <div className="flex items-end space-x-2">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about Ontario driving rules..."
                  disabled={isLoading}
                  className="min-h-[40px] max-h-32 resize-none text-sm border-gray-200 focus:border-blue-300"
                  rows={1}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !input.trim()}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-2 h-10"
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>

              <div className="mt-2 text-center">
                <p className="text-xs text-gray-500">
                  💡 Powered by official MTO documents
                </p>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
