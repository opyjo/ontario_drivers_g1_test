// RAG API Endpoint for MTO Document-Based AI Assistant
import { openai } from "@ai-sdk/openai";
import { generateText, CoreMessage } from "ai";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";

// Configuration
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY!;

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !OPENAI_API_KEY) {
  console.error("Missing required environment variables for AI API");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: OPENAI_API_KEY,
  modelName: "text-embedding-ada-002",
});

const vectorStore = new SupabaseVectorStore(embeddings, {
  client: supabase,
  tableName: "documents",
  queryName: "match_documents",
});

// Special marker for context not found
const CONTEXT_NOT_FOUND = "[[ANSWER_NOT_FOUND_IN_MTO_CONTEXT]]";

interface AIResponse {
  type: "mto_answer" | "general_answer" | "error";
  content: string;
  sources?: Array<{
    document_title: string;
    category: string;
    topic: string;
    chunk_id: string;
  }>;
  confidence?: "high" | "medium" | "low";
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { question, conversationHistory } = await req.json();

    if (!question?.trim()) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    console.log(`[MTO-RAG] Processing question: "${question}"`);

    // Step 1: Retrieve relevant MTO content
    let retrievedContext = "";
    let sources: AIResponse["sources"] = [];
    let contextFound = false;

    try {
      // Search for relevant chunks in MTO documents
      const relevantChunks = await vectorStore.similaritySearchWithScore(
        question,
        4, // Number of chunks to retrieve
        {
          threshold: 0.78, // Similarity threshold
        }
      );

      if (relevantChunks?.length > 0) {
        // Filter by similarity score and extract content
        const highQualityChunks = relevantChunks.filter(
          ([_, score]) => score >= 0.78
        );

        if (highQualityChunks.length > 0) {
          retrievedContext = highQualityChunks
            .map(([chunk, score]) => {
              // Extract source information
              if (chunk.metadata) {
                sources.push({
                  document_title:
                    chunk.metadata.document_title || "Unknown Document",
                  category: chunk.metadata.category || "MTO Content",
                  topic: chunk.metadata.topic || "general",
                  chunk_id: chunk.metadata.chunk_id || "unknown",
                });
              }
              return `[Source: ${
                chunk.metadata?.document_title || "MTO Document"
              }]\n${chunk.pageContent}`;
            })
            .join("\n\n---\n\n");

          contextFound = true;
          console.log(
            `[MTO-RAG] Found ${highQualityChunks.length} relevant MTO chunks`
          );
          console.log(
            `[MTO-RAG] Sources: ${sources
              .map((s) => s.document_title)
              .join(", ")}`
          );
        }
      }
    } catch (searchError: any) {
      console.error("[MTO-RAG] Search error:", searchError);
      return NextResponse.json(
        {
          error: "Failed to search MTO knowledge base",
          details: searchError.message,
        },
        { status: 500 }
      );
    }

    // Step 2: If no MTO context found, use general driving knowledge
    if (!contextFound) {
      console.log(
        "[MTO-RAG] No MTO context found, using general driving knowledge"
      );
      return await generateGeneralDrivingResponse(question);
    }

    // Step 3: Generate contextual response using MTO content
    const mtoResponse = await generateMTOContextualResponse(
      question,
      retrievedContext,
      conversationHistory
    );

    // Step 4: Fallback to general if MTO context insufficient
    if (mtoResponse.content === CONTEXT_NOT_FOUND) {
      console.log(
        "[MTO-RAG] MTO context insufficient, falling back to general driving knowledge"
      );
      return await generateGeneralDrivingResponse(question);
    }

    // Add sources to response
    mtoResponse.sources = sources;
    mtoResponse.confidence =
      sources.length >= 2 ? "high" : sources.length === 1 ? "medium" : "low";

    return NextResponse.json(mtoResponse);
  } catch (error: any) {
    console.error("[MTO-RAG API] Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

async function generateMTOContextualResponse(
  question: string,
  context: string,
  conversationHistory: Array<{ role: string; content: string }> = []
): Promise<AIResponse> {
  // Build conversation context
  const conversationContext =
    conversationHistory
      ?.slice(-3) // Keep last 3 exchanges for context
      ?.map((msg) => `${msg.role}: ${msg.content}`)
      ?.join("\n") || "";

  const systemPrompt = `You are an AI driving instructor assistant specializing in Ontario driving education. You help users prepare for their G1 and G2 driving tests using official Ministry of Transportation Ontario (MTO) content.

INSTRUCTIONS:
1. Use ONLY the provided MTO context to answer questions about driving rules, procedures, and regulations
2. If the MTO context contains relevant information, provide a comprehensive and helpful response
3. If the MTO context does NOT contain sufficient information to answer the question, respond with EXACTLY: "${CONTEXT_NOT_FOUND}"
4. Do not mix partial answers with the special marker phrase
5. Always be encouraging and educational in your tone
6. Reference specific MTO guidelines when applicable
7. Format your response clearly with bullet points or numbered lists when helpful

${
  conversationContext
    ? `Previous conversation context:\n${conversationContext}\n\n`
    : ""
}

MTO Document Context:
${context}`;

  const messages: CoreMessage[] = [
    { role: "system", content: systemPrompt },
    {
      role: "user",
      content: `Question: ${question}\n\nProvide your answer based on the MTO context above. Be helpful, accurate, and encouraging for someone learning to drive in Ontario.`,
    },
  ];

  const { text } = await generateText({
    model: openai("gpt-4o"),
    messages,
    temperature: 0.1, // Lower temperature for more consistent, factual responses
  });

  return {
    type: "mto_answer",
    content: text.trim(),
  };
}

async function generateGeneralDrivingResponse(
  question: string
): Promise<Response> {
  const systemPrompt = `You are a helpful AI driving instructor assistant for Ontario, Canada. Since the specific question cannot be answered from official MTO documents, provide general driving knowledge that applies to Ontario/Canadian driving rules.

IMPORTANT:
- Focus on safe driving practices applicable to Ontario
- Mention that this is general guidance, not official MTO information
- Encourage the user to check official MTO sources for authoritative information
- Be helpful and educational
- If the question is completely unrelated to driving, politely redirect to driving topics`;

  const { text } = await generateText({
    model: openai("gpt-4o"),
    system: systemPrompt,
    prompt: question,
    temperature: 0.2,
  });

  return NextResponse.json({
    type: "general_answer",
    content: text,
    confidence: "low",
  });
}

// Health check endpoint
export async function GET() {
  try {
    // Test database connection
    const { data, error } = await supabase
      .from("documents")
      .select("count", { count: "exact", head: true });

    if (error) throw error;

    return NextResponse.json({
      status: "healthy",
      message: "MTO RAG AI Assistant API is running",
      documentsCount: data?.length || 0,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "unhealthy",
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
