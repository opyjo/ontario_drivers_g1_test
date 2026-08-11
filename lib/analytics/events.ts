"use client";

import { sendGAEvent } from "@next/third-parties/google";

type EventParameters = Record<string, string | number | boolean | undefined>;

export function trackEvent(name: string, parameters: EventParameters = {}) {
  if (!process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID) return;
  sendGAEvent("event", name, parameters);
}
