export const HAWAII_TZ = "Pacific/Honolulu";

export type CalendarEvent = {
  id: string;
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  isFullDay: boolean;
  isRecurring: boolean;
};

export async function fetchCalendarEvents(
  from: Date,
  to: Date
): Promise<CalendarEvent[]> {
  const params = new URLSearchParams({
    from: from.toISOString(),
    to: to.toISOString(),
  });
  const res = await fetch(`/api/calendar?${params}`);
  if (!res.ok) throw new Error(`calendar fetch failed: ${res.status}`);
  const data = (await res.json()) as { events: CalendarEvent[] };
  return data.events;
}

// Returns [from, to] covering the next 7 days in Hawaii time, starting at
// midnight HST today. Hawaii has no DST, so HST = UTC-10 year-round.
export function currentHawaiiWeek(now = new Date()): [Date, Date] {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: HAWAII_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const y = Number(get("year"));
  const m = Number(get("month"));
  const d = Number(get("day"));
  const start = new Date(Date.UTC(y, m - 1, d, 10, 0, 0));
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 7);
  return [start, end];
}

export function dayOfWeekHawaii(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    timeZone: HAWAII_TZ,
    weekday: "long",
  });
}

export function formatHawaiiTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    timeZone: HAWAII_TZ,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatHawaiiDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    timeZone: HAWAII_TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

import {
  Flag,
  Footprints,
  Mountain,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

type EventCategory = { label: string; icon: LucideIcon };

const CATEGORY_RULES: Array<{ pattern: RegExp } & EventCategory> = [
  { pattern: /tnt|tuesday night|training|interval|track/i, label: "Training", icon: Zap },
  { pattern: /long run|sunday/i, label: "Long Run", icon: Mountain },
  { pattern: /fireworks|potluck|social|banquet/i, label: "Social", icon: Sparkles },
  { pattern: /hoka|qk|kapiolani|run club/i, label: "Group Run", icon: Users },
  { pattern: /race|marathon|ultra|half/i, label: "Race", icon: Flag },
];

export function categoryForEvent(title: string): EventCategory {
  for (const rule of CATEGORY_RULES) {
    if (rule.pattern.test(title)) return { label: rule.label, icon: rule.icon };
  }
  return { label: "Run", icon: Footprints };
}

export function dayAbbr(iso: string): string {
  return new Date(iso)
    .toLocaleDateString("en-US", { timeZone: HAWAII_TZ, weekday: "short" })
    .toUpperCase();
}

export function monthDayHawaii(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    timeZone: HAWAII_TZ,
    month: "short",
    day: "numeric",
  });
}
