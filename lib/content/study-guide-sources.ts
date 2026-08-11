import sourceData from "../../data/study-guide-sources.json";

export type StudyGuideSource = { title: string; url: string };
export type StudyGuideSourceRecord = {
  reviewedAt: string;
  reviewBy: string;
  sources: StudyGuideSource[];
};

const records = sourceData as Record<string, StudyGuideSourceRecord>;

export function getStudyGuideSourceRecord(chapterId: string) {
  return records[chapterId];
}

export const studyGuideSourceRecords = records;
