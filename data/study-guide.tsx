// Clean Ontario Driver's Study Guide Data
export interface StudyGuideSection {
  id: string;
  title: string;
  content: string;
  keyPoints: string[];
}

export interface StudyGuideChapter {
  id: string;
  title: string;
  description: string;
  icon: string;
  sections: StudyGuideSection[];
  estimatedTime: string;
}

// Import all chapters
import { gettingYourLicenseChapter } from "./study-guide/getting-your-license";
import { safeResponsibleDrivingFundamentalsChapter } from "./study-guide/safe-responsible-driving-fundamentals";
import { sharingRoadWithOthersChapter } from "./study-guide/sharing-road-with-others";
import { intersectionsRightOfWayChapter } from "./study-guide/intersections-right-of-way";
import { changingDirectionsPositionsChapter } from "./study-guide/changing-directions-positions";
import { parkingRoadsideProceduresChapter } from "./study-guide/parking-roadside-procedures";
import { emergencyProceduresCollisionResponseChapter } from "./study-guide/emergency-procedures-collision-response";
import { weatherNightDrivingChapter } from "./study-guide/weather-night-driving";
import { challengingConditionsSituationsChapter } from "./study-guide/challenging-conditions-situations";
import { legalResponsibilitiesLicenceMaintenanceChapter } from "./study-guide/legal-responsibilities-licence-maintenance";
import { trafficSignsLightsMarkingsChapter } from "./study-guide/traffic-signs-lights-markings";

export const studyGuideData: StudyGuideChapter[] = [
  gettingYourLicenseChapter,
  safeResponsibleDrivingFundamentalsChapter,
  sharingRoadWithOthersChapter,
  intersectionsRightOfWayChapter,
  changingDirectionsPositionsChapter,
  parkingRoadsideProceduresChapter,
  trafficSignsLightsMarkingsChapter,
  challengingConditionsSituationsChapter,
  legalResponsibilitiesLicenceMaintenanceChapter,
  emergencyProceduresCollisionResponseChapter,
  weatherNightDrivingChapter,
];

export function getChapterById(id: string): StudyGuideChapter | undefined {
  return studyGuideData.find((chapter) => chapter.id === id);
}

export function getSectionById(
  chapterId: string,
  sectionId: string
): StudyGuideSection | undefined {
  const chapter = getChapterById(chapterId);
  return chapter?.sections.find((section) => section.id === sectionId);
}
