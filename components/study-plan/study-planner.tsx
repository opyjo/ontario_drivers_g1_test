"use client";

import { FormEvent, useEffect, useState } from "react";
import { CalendarDays, Clock3, Download, HardDrive, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  buildStudyPlanCalendar,
  daysUntilTest,
  parseStudyPlan,
  STUDY_PLAN_STORAGE_KEY,
  type StudyPlan,
} from "@/lib/study-plan";

const DEFAULT_MINUTES: StudyPlan["dailyMinutes"] = 30;

export function StudyPlanner() {
  const [testDate, setTestDate] = useState("");
  const [reminderTime, setReminderTime] = useState("19:00");
  const [dailyMinutes, setDailyMinutes] =
    useState<StudyPlan["dailyMinutes"]>(DEFAULT_MINUTES);
  const [minimumDate, setMinimumDate] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const today = new Date();
    setMinimumDate(
      `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`
    );
    const plan = parseStudyPlan(
      window.localStorage.getItem(STUDY_PLAN_STORAGE_KEY)
    );
    if (plan) {
      setTestDate(plan.testDate);
      setReminderTime(plan.reminderTime);
      setDailyMinutes(plan.dailyMinutes);
      setSaved(true);
    }
  }, []);

  const plan: StudyPlan | null = testDate
    ? { version: 1, testDate, reminderTime, dailyMinutes }
    : null;
  const remainingDays = plan ? daysUntilTest(plan.testDate) : null;

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!plan || remainingDays === null || remainingDays < 0) return;
    window.localStorage.setItem(STUDY_PLAN_STORAGE_KEY, JSON.stringify(plan));
    setSaved(true);
  };

  const downloadReminders = () => {
    if (!plan) return;
    const file = new Blob([buildStudyPlanCalendar(plan)], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "g1-study-plan.ics";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-primary" aria-hidden="true" />
            Set your G1 test date
          </CardTitle>
          <CardDescription>
            Your plan stays in this browser. No account or calendar access is required.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" onSubmit={handleSave}>
            <div className="space-y-2">
              <Label htmlFor="test-date">Planned test date</Label>
              <Input
                id="test-date"
                type="date"
                min={minimumDate}
                value={testDate}
                onChange={(event) => {
                  setTestDate(event.target.value);
                  setSaved(false);
                }}
                required
                className="min-h-11"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="daily-minutes">Daily study goal</Label>
                <Select
                  value={String(dailyMinutes)}
                  onValueChange={(value) => {
                    setDailyMinutes(Number(value) as StudyPlan["dailyMinutes"]);
                    setSaved(false);
                  }}
                >
                  <SelectTrigger id="daily-minutes" className="min-h-11 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[15, 30, 45, 60].map((minutes) => (
                      <SelectItem key={minutes} value={String(minutes)}>
                        {minutes} minutes
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reminder-time">Preferred study time</Label>
                <Input
                  id="reminder-time"
                  type="time"
                  value={reminderTime}
                  onChange={(event) => {
                    setReminderTime(event.target.value);
                    setSaved(false);
                  }}
                  required
                  className="min-h-11"
                />
              </div>
            </div>

            {remainingDays !== null && remainingDays < 0 ? (
              <p role="alert" className="text-sm font-medium text-destructive">
                Choose today or a future date.
              </p>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" disabled={!plan || Boolean(remainingDays !== null && remainingDays < 0)}>
                <HardDrive className="h-4 w-4" aria-hidden="true" />
                {saved ? "Plan saved" : "Save plan on this device"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={downloadReminders}
                disabled={!saved || !plan}
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                Download calendar reminders
              </Button>
            </div>
            <p className="text-xs leading-5 text-muted-foreground">
              The calendar file creates a study block and test-day alert. Review
              the imported dates and appointment details in your calendar app.
            </p>
          </form>
        </CardContent>
      </Card>

      <Card aria-live="polite">
        <CardHeader>
          <CardTitle>Your countdown</CardTitle>
          <CardDescription>A simple target you can adjust at any time.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 text-center">
            <p className="text-4xl font-extrabold text-primary">
              {remainingDays === null ? "—" : Math.max(remainingDays, 0)}
            </p>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              {remainingDays === 1 ? "day remaining" : "days remaining"}
            </p>
          </div>
          <ul className="space-y-3 text-sm leading-6">
            <li className="flex gap-2">
              <Clock3 className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              Study for {dailyMinutes} minutes at {reminderTime}.
            </li>
            <li className="flex gap-2">
              <Target className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              Alternate signs, rules, and full simulations to cover both test sections.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
