import { StudyGuideOverview } from "@/components/study-guide/study-guide-overview";
import { studyGuideData } from "@/data/study-guide";

export default function StudyGuidePage() {
  const chapters = studyGuideData.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
    description: chapter.description,
    icon: chapter.icon,
    estimatedTime: chapter.estimatedTime,
    sections: chapter.sections.map((section) => ({
      id: section.id,
      title: section.title,
    })),
  }));

  return <StudyGuideOverview chapters={chapters} />;
}
