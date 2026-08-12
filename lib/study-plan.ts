export const STUDY_PLAN_STORAGE_KEY = "drivetest-pro:study-plan:v1";

export interface StudyPlan {
  version: 1;
  testDate: string;
  reminderTime: string;
  dailyMinutes: 15 | 30 | 45 | 60;
}

function isDateInput(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isTimeInput(value: unknown): value is string {
  return typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}

export function parseStudyPlan(raw: string | null): StudyPlan | null {
  if (!raw) return null;
  try {
    const plan = JSON.parse(raw) as Partial<StudyPlan>;
    if (
      plan.version !== 1 ||
      !isDateInput(plan.testDate) ||
      !isTimeInput(plan.reminderTime) ||
      ![15, 30, 45, 60].includes(plan.dailyMinutes ?? 0)
    ) {
      return null;
    }
    return plan as StudyPlan;
  } catch {
    return null;
  }
}

function localDateFromInput(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function daysUntilTest(testDate: string, today = new Date()) {
  const test = localDateFromInput(testDate);
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.ceil((test.getTime() - start.getTime()) / 86_400_000);
}

function icsEscape(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;")
    .replace(/\n/g, "\\n");
}

function compactDate(value: string) {
  return value.replaceAll("-", "");
}

function dateInputFromDate(value: Date) {
  return `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
}

function nextDateInput(value: string) {
  const date = localDateFromInput(value);
  date.setDate(date.getDate() + 1);
  return dateInputFromDate(date);
}

function compactTime(value: string) {
  return `${value.replace(":", "")}00`;
}

export function buildStudyPlanCalendar(plan: StudyPlan, today = new Date()) {
  const date = compactDate(plan.testDate);
  const firstStudyDate = compactDate(dateInputFromDate(today));
  const testEndDate = compactDate(nextDateInput(plan.testDate));
  const startTime = compactTime(plan.reminderTime);
  const uidBase = `drivetest-pro-${date}-${startTime}`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "PRODID:-//DriveTest Pro//G1 Study Plan//EN",
    "BEGIN:VEVENT",
    `UID:${uidBase}-study@driverguide.ca`,
    `DTSTART:${firstStudyDate}T${startTime}`,
    `DURATION:PT${plan.dailyMinutes}M`,
    `RRULE:FREQ=DAILY;UNTIL=${date}T235959`,
    `SUMMARY:${icsEscape("G1 study session")}`,
    `DESCRIPTION:${icsEscape(`Spend ${plan.dailyMinutes} minutes reviewing Ontario G1 material in DriveTest Pro.`)}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "TRIGGER:-PT10M",
    "DESCRIPTION:G1 study session starts in 10 minutes",
    "END:VALARM",
    "END:VEVENT",
    "BEGIN:VEVENT",
    `UID:${uidBase}-test@driverguide.ca`,
    `DTSTART;VALUE=DATE:${date}`,
    `DTEND;VALUE=DATE:${testEndDate}`,
    `SUMMARY:${icsEscape("Ontario G1 test day")}`,
    `DESCRIPTION:${icsEscape("Bring accepted identification and arrive early. Confirm your appointment details with the official test provider.")}`,
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    "TRIGGER:-P1D",
    "DESCRIPTION:Ontario G1 test is tomorrow",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `${lines.join("\r\n")}\r\n`;
}
