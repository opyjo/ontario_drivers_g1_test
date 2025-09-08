// MTO Document Ingestion Script for AI RAG System
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@supabase/supabase-js";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import fs from "fs";
import path from "path";

// Configuration
const MTO_DOCS_PATH = "public/MTO_section_content";
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// MTO Document mapping for better metadata
const MTO_DOCUMENTS = {
  "challenging conditions and situations.pdf": {
    title: "Challenging Conditions and Situations",
    category: "Advanced Driving",
    topic: "challenging_conditions",
  },
  "Changing directions and position.pdf": {
    title: "Changing Directions and Position",
    category: "Vehicle Control",
    topic: "changing_directions",
  },
  "emergwncy procedure and collision.pdf": {
    title: "Emergency Procedures and Collision Response",
    category: "Emergency Procedures",
    topic: "emergency_collision",
  },
  "Getting_your_license.pdf": {
    title: "Getting Your License",
    category: "Licensing Process",
    topic: "getting_license",
  },
  "instesections & right of way.pdf": {
    title: "Intersections and Right of Way",
    category: "Traffic Rules",
    topic: "intersections_right_of_way",
  },
  "Legal responsibility and license maintenance.pdf": {
    title: "Legal Responsibility and License Maintenance",
    category: "Legal Requirements",
    topic: "legal_responsibility",
  },
  "parking and roadside procedures.pdf": {
    title: "Parking and Roadside Procedures",
    category: "Parking and Procedures",
    topic: "parking_procedures",
  },
  "safe_and_responsible_driving.pdf": {
    title: "Safe and Responsible Driving",
    category: "Driving Fundamentals",
    topic: "safe_driving",
  },
  "sharing)_the_road_with_others.pdf": {
    title: "Sharing the Road with Others",
    category: "Sharing the Road",
    topic: "sharing_road",
  },
  "Traffic_signs.pdf": {
    title: "Traffic Signs, Lights and Markings",
    category: "Traffic Signs",
    topic: "traffic_signs",
  },
  "weather and night driving.pdf": {
    title: "Weather and Night Driving",
    category: "Challenging Conditions",
    topic: "weather_night_driving",
  },
};

// Validation
console.log("🚀 Starting MTO Document Ingestion for AI RAG System");
console.log("=".repeat(60));

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY || !OPENAI_API_KEY) {
  console.error("❌ Missing required environment variables:");
  if (!SUPABASE_URL) console.error("   - NEXT_PUBLIC_SUPABASE_URL");
  if (!SUPABASE_SERVICE_KEY) console.error("   - SUPABASE_SERVICE_ROLE_KEY");
  if (!OPENAI_API_KEY) console.error("   - OPENAI_API_KEY");
  console.error("\nPlease set these in your .env.local file");
  process.exit(1);
}

if (!fs.existsSync(MTO_DOCS_PATH)) {
  console.error(`❌ MTO documents directory not found: ${MTO_DOCS_PATH}`);
  process.exit(1);
}

// Initialize services
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
const embeddings = new OpenAIEmbeddings({
  openAIApiKey: OPENAI_API_KEY,
  modelName: "text-embedding-ada-002",
});

// Text sanitization function
function sanitizeText(text) {
  if (!text) return "";
  return text
    .replace(/\u0000/g, "")
    .replace(/\x00/g, "")
    .trim();
}

// Clear existing documents (optional - for fresh ingestion)
async function clearExistingDocuments() {
  console.log("🗑️  Clearing existing documents from database...");
  try {
    const { error } = await supabaseAdmin
      .from("documents")
      .delete()
      .neq("id", 0);
    if (error) throw error;
    console.log("✅ Existing documents cleared");
  } catch (error) {
    console.warn(
      "⚠️  Warning: Could not clear existing documents:",
      error.message
    );
  }
}

// Process a single MTO document
async function processMTODocument(filename) {
  const filePath = path.join(MTO_DOCS_PATH, filename);
  const docInfo = MTO_DOCUMENTS[filename];

  if (!docInfo) {
    console.warn(`⚠️  Unknown document: ${filename} - using generic metadata`);
  }

  console.log(`\n📖 Processing: ${docInfo?.title || filename}`);
  console.log(`   Category: ${docInfo?.category || "Unknown"}`);
  console.log(`   Path: ${filePath}`);

  try {
    // 1. Load PDF
    const loader = new PDFLoader(filePath);
    const documents = await loader.load();

    if (documents.length === 0) {
      throw new Error(`No content extracted from ${filename}`);
    }

    console.log(`   ✅ Loaded ${documents.length} pages`);

    // 2. Sanitize content and add metadata
    const sanitizedDocs = documents.map((doc, index) => ({
      ...doc,
      pageContent: sanitizeText(doc.pageContent),
      metadata: {
        ...doc.metadata,
        source_file: filename,
        document_title: docInfo?.title || filename.replace(".pdf", ""),
        category: docInfo?.category || "MTO Content",
        topic:
          docInfo?.topic ||
          filename.replace(".pdf", "").replace(/[^a-zA-Z0-9]/g, "_"),
        page_number: index + 1,
        total_pages: documents.length,
        ingestion_date: new Date().toISOString(),
      },
    }));

    // 3. Split into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000, // Size of each chunk
      chunkOverlap: 200, // Overlap between chunks for context
      separators: ["\n\n", "\n", ".", "!", "?", ",", " ", ""],
    });

    const chunks = await textSplitter.splitDocuments(sanitizedDocs);

    if (chunks.length === 0) {
      throw new Error(`No chunks created from ${filename}`);
    }

    console.log(`   ✂️  Created ${chunks.length} chunks`);

    // 4. Add chunk-specific metadata
    const enrichedChunks = chunks.map((chunk, index) => ({
      ...chunk,
      metadata: {
        ...chunk.metadata,
        chunk_index: index,
        total_chunks: chunks.length,
        chunk_id: `${docInfo?.topic || "unknown"}_${index}`,
      },
    }));

    return {
      filename,
      chunks: enrichedChunks,
      docInfo,
    };
  } catch (error) {
    console.error(`   ❌ Error processing ${filename}:`, error.message);
    throw error;
  }
}

// Store documents in vector database
async function storeDocuments(allChunks) {
  console.log(
    `\n🔮 Generating embeddings and storing ${allChunks.length} chunks...`
  );

  try {
    await SupabaseVectorStore.fromDocuments(allChunks, embeddings, {
      client: supabaseAdmin,
      tableName: "documents",
      queryName: "match_documents",
    });

    console.log("✅ All documents stored successfully!");

    // Verify storage
    const { count, error } = await supabaseAdmin
      .from("documents")
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    console.log(`📊 Total chunks in database: ${count}`);
  } catch (error) {
    console.error("❌ Storage failed:", error);
    throw error;
  }
}

// Main ingestion function
async function ingestMTODocuments() {
  const startTime = Date.now();

  try {
    // Get list of PDF files
    const pdfFiles = fs
      .readdirSync(MTO_DOCS_PATH)
      .filter((file) => file.endsWith(".pdf"))
      .sort();

    if (pdfFiles.length === 0) {
      throw new Error("No PDF files found in MTO_section_content directory");
    }

    console.log(`📚 Found ${pdfFiles.length} MTO documents to process:`);
    pdfFiles.forEach((file, index) => {
      const docInfo = MTO_DOCUMENTS[file];
      console.log(`   ${index + 1}. ${docInfo?.title || file}`);
    });

    // Clear existing documents (optional)
    await clearExistingDocuments();

    // Process each document
    const allChunks = [];
    const processedDocs = [];

    for (let i = 0; i < pdfFiles.length; i++) {
      const filename = pdfFiles[i];
      console.log(`\n[${i + 1}/${pdfFiles.length}] Processing document...`);

      try {
        const result = await processMTODocument(filename);
        allChunks.push(...result.chunks);
        processedDocs.push(result);

        console.log(
          `   ✅ Successfully processed: ${result.docInfo?.title || filename}`
        );
      } catch (error) {
        console.error(`   ❌ Failed to process: ${filename}`);
        console.error(`      Error: ${error.message}`);
        // Continue with other files
      }
    }

    if (allChunks.length === 0) {
      throw new Error("No chunks created from any documents");
    }

    // Store all chunks at once
    await storeDocuments(allChunks);

    // Summary
    const endTime = Date.now();
    const duration = Math.round((endTime - startTime) / 1000);

    console.log("\n" + "=".repeat(60));
    console.log("🎉 MTO DOCUMENT INGESTION COMPLETE!");
    console.log("=".repeat(60));
    console.log(`📊 SUMMARY:`);
    console.log(
      `   • Documents processed: ${processedDocs.length}/${pdfFiles.length}`
    );
    console.log(`   • Total chunks created: ${allChunks.length}`);
    console.log(`   • Processing time: ${duration}s`);
    console.log(
      `   • Average chunks per doc: ${Math.round(
        allChunks.length / processedDocs.length
      )}`
    );

    console.log(`\n📋 PROCESSED DOCUMENTS:`);
    processedDocs.forEach((doc, index) => {
      console.log(
        `   ${index + 1}. ${doc.docInfo?.title || doc.filename} (${
          doc.chunks.length
        } chunks)`
      );
    });

    console.log(`\n🚀 Your AI assistant can now answer questions about:`);
    const categories = [
      ...new Set(
        processedDocs.map((doc) => doc.docInfo?.category).filter(Boolean)
      ),
    ];
    categories.forEach((category) => console.log(`   • ${category}`));

    console.log(`\n🎯 Next steps:`);
    console.log(`   1. Set up your OpenAI API key in .env.local`);
    console.log(`   2. Create the RAG API endpoint`);
    console.log(`   3. Update your chat interface`);
    console.log(`   4. Test with MTO-related questions!`);
  } catch (error) {
    console.error("\n❌ INGESTION FAILED:", error.message);
    console.error("Stack trace:", error.stack);
    process.exit(1);
  }
}

// Run the ingestion
console.log("Starting ingestion process...\n");
ingestMTODocuments();
