"use client";

import { useState, useEffect, useCallback } from "react";

export interface SectionProgress {
  completed: boolean;
  completedAt?: string;
  readingTimeSeconds?: number;
  lastReadAt?: string;
}

export interface ChapterProgress {
  [sectionId: string]: SectionProgress;
}

export interface StudyProgress {
  [chapterId: string]: ChapterProgress;
}

const STORAGE_KEY = "studyGuideProgress";

export function calculateStudyProgress(
  progress: StudyProgress,
  chapterSections: Record<string, string[]>
) {
  let completedChapters = 0;
  let completedSections = 0;
  let totalSections = 0;

  Object.entries(chapterSections).forEach(([chapterId, sectionIds]) => {
    totalSections += sectionIds.length;
    const chapterCompletedSections = sectionIds.filter(
      (sectionId) => progress[chapterId]?.[sectionId]?.completed
    ).length;
    completedSections += chapterCompletedSections;

    if (
      chapterCompletedSections === sectionIds.length &&
      sectionIds.length > 0
    ) {
      completedChapters += 1;
    }
  });

  return {
    completedChapters,
    completedSections,
    totalPercentage:
      totalSections > 0
        ? Math.round((completedSections / totalSections) * 100)
        : 0,
  };
}

export const useStudyProgress = () => {
  const [progress, setProgress] = useState<StudyProgress>({});
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load progress from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          setProgress(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to load study progress:", error);
      } finally {
        setIsLoaded(true);
      }
    }
  }, []);

  // Cross-tab sync via storage event
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        try {
          const next = event.newValue ? JSON.parse(event.newValue) : {};
          setProgress(next);
        } catch (error) {
          console.error(
            "Failed to parse study progress from storage event:",
            error
          );
        }
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Refresh from storage when tab becomes visible (helps when switching tabs)
  useEffect(() => {
    if (typeof document === "undefined") return;

    const refreshFromStorage = () => {
      if (document.visibilityState === "visible") {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            const parsed = JSON.parse(stored);
            setProgress(parsed);
          }
        } catch (error) {
          console.error(
            "Failed to refresh study progress on visibility:",
            error
          );
        }
      }
    };

    document.addEventListener("visibilitychange", refreshFromStorage);
    return () =>
      document.removeEventListener("visibilitychange", refreshFromStorage);
  }, []);

  // Mark section as completed
  const markSectionCompleted = useCallback(
    (chapterId: string, sectionId: string) => {
      setProgress((currentProgress) => {
        const timestamp = new Date().toISOString();
        const chapterProgress = { ...currentProgress[chapterId] };
        chapterProgress[sectionId] = {
          completed: true,
          completedAt: timestamp,
          lastReadAt: timestamp,
        };
        const newProgress = {
          ...currentProgress,
          [chapterId]: chapterProgress,
        };

        // Save to localStorage
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
          } catch (error) {
            console.error("Failed to save study progress:", error);
          }
        }

        return newProgress;
      });
    },
    []
  );

  // Mark section as in progress (started reading)
  const markSectionInProgress = useCallback(
    (chapterId: string, sectionId: string) => {
      setProgress((currentProgress) => {
        const timestamp = new Date().toISOString();
        const chapterProgress = { ...currentProgress[chapterId] };

        if (!chapterProgress[sectionId]) {
          chapterProgress[sectionId] = {
            completed: false,
            lastReadAt: timestamp,
          };
        } else {
          chapterProgress[sectionId] = {
            ...chapterProgress[sectionId],
            lastReadAt: timestamp,
          };
        }
        const newProgress = {
          ...currentProgress,
          [chapterId]: chapterProgress,
        };

        // Save to localStorage
        if (typeof window !== "undefined") {
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
          } catch (error) {
            console.error("Failed to save study progress:", error);
          }
        }

        return newProgress;
      });
    },
    []
  );

  // Get section progress
  const getSectionProgress = useCallback(
    (chapterId: string, sectionId: string): SectionProgress | null => {
      return progress[chapterId]?.[sectionId] || null;
    },
    [progress]
  );

  // Check if section is completed
  const isSectionCompleted = useCallback(
    (chapterId: string, sectionId: string): boolean => {
      return progress[chapterId]?.[sectionId]?.completed || false;
    },
    [progress]
  );

  // Check if section is in progress (started but not completed)
  const isSectionInProgress = useCallback(
    (chapterId: string, sectionId: string): boolean => {
      const sectionProgress = progress[chapterId]?.[sectionId];
      return sectionProgress
        ? !sectionProgress.completed && !!sectionProgress.lastReadAt
        : false;
    },
    [progress]
  );

  // Get chapter completion percentage
  const getChapterCompletionPercentage = useCallback(
    (chapterId: string, totalSections: number): number => {
      const chapterProgress = progress[chapterId];
      if (!chapterProgress) return 0;

      const completedSections = Object.values(chapterProgress).filter(
        (section) => section.completed
      ).length;

      return Math.round((completedSections / totalSections) * 100);
    },
    [progress]
  );

  // Get total progress across all chapters
  const getTotalProgress = useCallback(
    (chapterSections: Record<string, string[]>): {
      completedChapters: number;
      completedSections: number;
      totalPercentage: number;
    } => {
      return calculateStudyProgress(progress, chapterSections);
    },
    [progress]
  );

  // Clear all progress (for testing or reset)
  const clearProgress = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
    setProgress({});
  }, []);

  return {
    progress,
    isLoaded,
    markSectionCompleted,
    markSectionInProgress,
    getSectionProgress,
    isSectionCompleted,
    isSectionInProgress,
    getChapterCompletionPercentage,
    getTotalProgress,
    clearProgress,
  };
};
