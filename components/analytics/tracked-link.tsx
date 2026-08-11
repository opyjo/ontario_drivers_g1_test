"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import { trackEvent } from "@/lib/analytics/events";

type TrackedLinkProps = ComponentProps<typeof Link> & {
  eventName: string;
  eventData?: Record<string, string | number | boolean | undefined>;
};

export function TrackedLink({ eventName, eventData, onClick, ...props }: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent(eventName, eventData);
        onClick?.(event);
      }}
    />
  );
}
