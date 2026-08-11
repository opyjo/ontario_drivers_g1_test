import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createOpenAI } from "@ai-sdk/openai";
import { embedMany } from "ai";
import { createClient } from "@supabase/supabase-js";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import pdfParse from "pdf-parse";

const DOCUMENTS_PATH = "public/MTO_section_content";
const CHUNK_SIZE = 1_000;
const CHUNK_OVERLAP = 200;
const EMBEDDING_BATCH_SIZE = 50;
const INSERT_BATCH_SIZE = 100;

const documentMetadata = {
  "challenging conditions and situations.pdf": [
    "Challenging Conditions and Situations",
    "Advanced Driving",
    "challenging_conditions",
  ],
  "Changing directions and position.pdf": [
    "Changing Directions and Position",
    "Vehicle Control",
    "changing_directions",
  ],
  "emergwncy procedure and collision.pdf": [
    "Emergency Procedures and Collision Response",
    "Emergency Procedures",
    "emergency_collision",
  ],
  "Getting_your_license.pdf": [
    "Getting Your License",
    "Licensing Process",
    "getting_license",
  ],
  "instesections & right of way.pdf": [
    "Intersections and Right of Way",
    "Traffic Rules",
    "intersections_right_of_way",
  ],
  "Legal responsibility and license maintenance.pdf": [
    "Legal Responsibility and License Maintenance",
    "Legal Requirements",
    "legal_responsibility",
  ],
  "parking and roadside procedures.pdf": [
    "Parking and Roadside Procedures",
    "Parking and Procedures",
    "parking_procedures",
  ],
  "safe_and_responsible_driving.pdf": [
    "Safe and Responsible Driving",
    "Driving Fundamentals",
    "safe_driving",
  ],
  "sharing)_the_road_with_others.pdf": [
    "Sharing the Road with Others",
    "Sharing the Road",
    "sharing_road",
  ],
  "Traffic_signs.pdf": [
    "Traffic Signs, Lights and Markings",
    "Traffic Signs",
    "traffic_signs",
  ],
  "weather and night driving.pdf": [
    "Weather and Night Driving",
    "Challenging Conditions",
    "weather_night_driving",
  ],
};

const sourceUrls = {
  challenging_conditions: "https://www.ontario.ca/document/official-mto-drivers-handbook/safe-and-responsible-driving",
  changing_directions: "https://www.ontario.ca/document/official-mto-drivers-handbook/changing-directions",
  emergency_collision: "https://www.ontario.ca/document/official-mto-drivers-handbook/dealing-emergencies",
  getting_license: "https://www.ontario.ca/document/official-mto-drivers-handbook/getting-your-drivers-licence",
  intersections_right_of_way: "https://www.ontario.ca/document/official-mto-drivers-handbook/driving-through-intersections",
  legal_responsibility: "https://www.ontario.ca/document/official-mto-drivers-handbook",
  parking_procedures: "https://www.ontario.ca/document/official-mto-drivers-handbook/safe-and-responsible-driving",
  safe_driving: "https://www.ontario.ca/document/official-mto-drivers-handbook/safe-and-responsible-driving",
  sharing_road: "https://www.ontario.ca/document/official-mto-drivers-handbook/sharing-road-other-road-users",
  traffic_signs: "https://www.ontario.ca/document/official-mto-drivers-handbook/traffic-signs-and-lights",
  weather_night_driving: "https://www.ontario.ca/document/official-mto-drivers-handbook/safe-and-responsible-driving",
};

function requireEnvironment(name) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required`);
  return value;
}

function splitText(input) {
  const text = input
    .replace(/\u0000/g, "")
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const chunks = [];
  let start = 0;

  while (start < text.length) {
    let end = Math.min(start + CHUNK_SIZE, text.length);
    if (end < text.length) {
      const breakAt = Math.max(
        text.lastIndexOf("\n", end),
        text.lastIndexOf(". ", end),
        text.lastIndexOf(" ", end)
      );
      if (breakAt > start + CHUNK_SIZE / 2) end = breakAt + 1;
    }

    const content = text.slice(start, end).trim();
    if (content) chunks.push(content);
    if (end >= text.length) break;
    start = Math.max(end - CHUNK_OVERLAP, start + 1);
  }

  return chunks;
}

function batches(items, size) {
  const result = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

async function loadChunks() {
  const filenames = (await readdir(DOCUMENTS_PATH))
    .filter((filename) => filename.toLowerCase().endsWith(".pdf"))
    .sort();
  if (!filenames.length) throw new Error("No MTO PDF files were found");

  const chunks = [];
  for (const filename of filenames) {
    const pdf = await pdfParse(await readFile(path.join(DOCUMENTS_PATH, filename)));
    const [title, category, topic] = documentMetadata[filename] ?? [
      filename.replace(/\.pdf$/i, ""),
      "MTO Content",
      filename.replace(/\.pdf$/i, "").replace(/[^a-z0-9]+/gi, "_"),
    ];
    const documentChunks = splitText(pdf.text);

    documentChunks.forEach((content, index) => {
      chunks.push({
        content,
        metadata: {
          source_file: filename,
          document_title: title,
          category,
          topic,
          source_url:
            sourceUrls[topic] ||
            "https://www.ontario.ca/document/official-mto-drivers-handbook",
          chunk_index: index,
          total_chunks: documentChunks.length,
          chunk_id: `${topic}_${index}`,
          total_pages: pdf.numpages,
          ingestion_date: new Date().toISOString(),
        },
      });
    });
    console.log(`Prepared ${documentChunks.length} chunks from ${title}`);
  }

  return chunks;
}

async function main() {
  const replace = process.argv.includes("--replace");
  const append = process.argv.includes("--append");
  if (replace === append) {
    throw new Error("Choose exactly one mode: --replace or --append");
  }

  const supabaseUrl =
    process.env.SUPABASE_URL ||
    requireEnvironment("NEXT_PUBLIC_SUPABASE_URL");
  const supabase = createClient(
    supabaseUrl,
    requireEnvironment("SUPABASE_SERVICE_ROLE_KEY"),
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
  const openai = createOpenAI({ apiKey: requireEnvironment("OPENAI_API_KEY") });
  const chunks = await loadChunks();
  const rows = [];

  for (const batch of batches(chunks, EMBEDDING_BATCH_SIZE)) {
    const { embeddings } = await embedMany({
      model: openai.embedding("text-embedding-ada-002"),
      values: batch.map((chunk) => chunk.content),
    });
    batch.forEach((chunk, index) => {
      rows.push({
        ...chunk,
        embedding: JSON.stringify(embeddings[index]),
      });
    });
    console.log(`Embedded ${rows.length}/${chunks.length} chunks`);
  }

  if (replace) {
    const { error } = await supabase.from("documents").delete().neq("id", 0);
    if (error) throw error;
  }

  for (const batch of batches(rows, INSERT_BATCH_SIZE)) {
    const { error } = await supabase.from("documents").insert(batch);
    if (error) throw error;
  }

  const { count, error } = await supabase
    .from("documents")
    .select("id", { count: "exact", head: true });
  if (error) throw error;
  console.log(`Ingestion complete. Database now contains ${count} chunks.`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
