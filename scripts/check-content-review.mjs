import { readFile } from "node:fs/promises";

const sourcePath = new URL("../data/study-guide-sources.json", import.meta.url);
const records = JSON.parse(await readFile(sourcePath, "utf8"));
const today = new Date();
const overdue = Object.entries(records).filter(([, record]) => new Date(`${record.reviewBy}T23:59:59Z`) < today);

if (overdue.length > 0) {
  console.error("Study-guide content review is overdue for:");
  for (const [chapterId, record] of overdue) console.error(`- ${chapterId} (due ${record.reviewBy})`);
  process.exitCode = 1;
} else {
  console.log(`Content review dates are current for ${Object.keys(records).length} chapters.`);
}
