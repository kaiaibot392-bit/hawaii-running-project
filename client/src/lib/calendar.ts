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

const ICON_RULES: Array<{ pattern: RegExp; icon: string; color: string }> = [
  { pattern: /tnt|tuesday night/i, icon: "🔥", color: "bg-orange-500" },
  { pattern: /hoka/i, icon: "🏃‍♀️", color: "bg-blue-500" },
  { pattern: /fireworks|potluck/i, icon: "🎆", color: "bg-purple-500" },
  { pattern: /kapiolani|qk/i, icon: "🏨", color: "bg-green-700" },
  { pattern: /sunday|long run/i, icon: "☀️", color: "bg-yellow-500" },
  { pattern: /race|5k|10k|marathon/i, icon: "🏁", color: "bg-red-500" },
];

export function styleForEvent(title: string): { icon: string; color: string } {
  for (const rule of ICON_RULES) {
    if (rule.pattern.test(title)) {
      return { icon: rule.icon, color: rule.color };
    }
  }
  return { icon: "🏃", color: "bg-primary" };
}
