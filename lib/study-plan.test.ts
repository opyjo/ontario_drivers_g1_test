import { describe, expect, it } from "vitest";
import {
  buildStudyPlanCalendar,
  daysUntilTest,
  parseStudyPlan,
  type StudyPlan,
} from "./study-plan";

const plan: StudyPlan = {
  version: 1,
  testDate: "2026-09-01",
  reminderTime: "19:30",
  dailyMinutes: 30,
};

describe("study plan", () => {
  it("parses only supported versioned values", () => {
    expect(parseStudyPlan(JSON.stringify(plan))).toEqual(plan);
    expect(parseStudyPlan(JSON.stringify({ ...plan, reminderTime: "25:00" }))).toBeNull();
    expect(parseStudyPlan("broken")).toBeNull();
  });

  it("calculates calendar days remaining", () => {
    expect(daysUntilTest("2026-09-01", new Date(2026, 7, 28, 21))).toBe(4);
  });

  it("builds a calendar with study and test reminders", () => {
    const calendar = buildStudyPlanCalendar(plan, new Date(2026, 7, 28));
    expect(calendar).toContain("DTSTART:20260828T193000");
    expect(calendar).toContain("RRULE:FREQ=DAILY;UNTIL=20260901T235959");
    expect(calendar).toContain("TRIGGER:-PT10M");
    expect(calendar).toContain("TRIGGER:-P1D");
    expect(calendar).toContain("SUMMARY:Ontario G1 test day");
  });
});
