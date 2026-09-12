export const HAWAII_TZ = "Pacific/Honolulu";

export type CalendarEvent = {
  id: string;
  /** UID of the recurring series this instance belongs to. */
  seriesId: string;
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

import { Fragment, type ReactNode, createElement } from "react";
import {
  Flag,
  Footprints,
  Mountain,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

// `dot` colours the month-grid marker. Races get the lone accent colour so a
// race week is the one thing that breaks the green weekly rhythm.
type EventCategory = { label: string; icon: LucideIcon; dot: string };

// Order matters: the weekly "Kapiolani Park 5K Run" must match Group Run
// before the Race rule sees the "5K" in its title.
const CATEGORY_RULES: Array<{ pattern: RegExp } & EventCategory> = [
  { pattern: /tnt|tuesday night|training|interval|track/i, label: "Training", icon: Zap, dot: "bg-primary/55" },
  { pattern: /long run|sunday/i, label: "Long Run", icon: Mountain, dot: "bg-primary" },
  { pattern: /fireworks|potluck|social|banquet/i, label: "Social", icon: Sparkles, dot: "bg-accent/50" },
  { pattern: /hoka|qk|kapiolani|run club/i, label: "Group Run", icon: Users, dot: "bg-primary/35" },
  { pattern: /race|marathon|ultra|half|relay|ekiden/i, label: "Race", icon: Flag, dot: "bg-accent" },
];

export function categoryForEvent(title: string): EventCategory {
  for (const rule of CATEGORY_RULES) {
    if (rule.pattern.test(title)) {
      return { label: rule.label, icon: rule.icon, dot: rule.dot };
    }
  }
  return { label: "Run", icon: Footprints, dot: "bg-muted-foreground/35" };
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

// Google Calendar descriptions come back as HTML. Render only <br> and <a>
// (with a scheme-checked href) so we never hand raw markup to
// dangerouslySetInnerHTML. Bare URLs are typed as plain text just as often as
// they arrive wrapped in <a>, so linkify those too.
export function renderDescription(html: string): ReactNode {
  if (typeof window === "undefined" || typeof DOMParser === "undefined") {
    return html.replace(/<[^>]+>/g, "");
  }
  const doc = new DOMParser().parseFromString(`<div>${html}</div>`, "text/html");
  const root = doc.body.firstChild as HTMLElement | null;
  if (!root) return null;
  return createElement(
    Fragment,
    null,
    ...Array.from(root.childNodes).map((n, i) => renderNode(n, i, false))
  );
}

const LINK_CLASS =
  // overflow-wrap:anywhere (not break-words) so a long URL also shrinks the
  // grid track's min-content width instead of widening the row past the screen.
  "text-primary font-medium underline underline-offset-4 decoration-primary/40 hover:decoration-primary [overflow-wrap:anywhere]";

const URL_PATTERN = /((?:https?:\/\/|www\.)[^\s<]+|[^\s<@]+@[^\s<@]+\.[a-z]{2,})/gi;

// Trailing punctuation usually belongs to the sentence, not the URL.
function splitTrailingPunctuation(match: string): [string, string] {
  const trailing = match.match(/[.,;:!?)\]}'"]+$/);
  if (!trailing) return [match, ""];
  let cut = trailing[0];
  // Keep a closing paren that pairs with one inside the URL, e.g. wiki links.
  while (
    cut.startsWith(")") &&
    (match.slice(0, match.length - cut.length).match(/\(/g) ?? []).length >
      (match.slice(0, match.length - cut.length).match(/\)/g) ?? []).length
  ) {
    cut = cut.slice(1);
  }
  return cut ? [match.slice(0, match.length - cut.length), cut] : [match, ""];
}

function linkify(text: string, key: number): ReactNode {
  if (!URL_PATTERN.test(text)) return text;
  URL_PATTERN.lastIndex = 0;
  const parts: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  while ((match = URL_PATTERN.exec(text))) {
    const [url, trailing] = splitTrailingPunctuation(match[0]);
    if (!url) continue;
    if (match.index > last) parts.push(text.slice(last, match.index));
    const href = url.startsWith("www.")
      ? `https://${url}`
      : url.includes("@") && !/^https?:/i.test(url)
        ? `mailto:${url}`
        : url;
    parts.push(
      createElement(
        "a",
        {
          key: `${key}-${i++}`,
          href,
          target: "_blank",
          rel: "noopener noreferrer",
          className: LINK_CLASS,
        },
        url
      )
    );
    if (trailing) parts.push(trailing);
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return createElement(Fragment, { key }, ...parts);
}

function renderNode(node: Node, key: number, inLink: boolean): ReactNode {
  if (node.nodeType === 3) {
    const text = node.textContent ?? "";
    return inLink ? text : linkify(text, key);
  }
  if (node.nodeType !== 1) return null;
  const el = node as HTMLElement;
  const tag = el.tagName.toLowerCase();
  if (tag === "br") return createElement("br", { key });
  const isLink = inLink || tag === "a";
  const children = Array.from(el.childNodes).map((c, i) =>
    renderNode(c, i, isLink)
  );
  if (tag === "a") {
    const href = el.getAttribute("href") ?? "";
    const safeHref = /^(https?:|mailto:)/i.test(href) ? href : undefined;
    if (!safeHref) return createElement(Fragment, { key }, ...children);
    return createElement(
      "a",
      {
        key,
        href: safeHref,
        target: "_blank",
        rel: "noopener noreferrer",
        className: LINK_CLASS,
      },
      ...children
    );
  }
  return createElement(Fragment, { key }, ...children);
}

// --- Month grid helpers -----------------------------------------------------
// Hawaii has no DST, so HST midnight is always 10:00 UTC on the same calendar
// date. Every cell below is keyed by its HST calendar date ("YYYY-MM-DD") so
// grid cells and event timestamps can be matched without re-deriving offsets.

export type MonthCell = {
  key: string;
  day: number;
  inMonth: boolean;
  start: Date;
};

export function hawaiiDayKey(iso: string | Date): string {
  const d = typeof iso === "string" ? new Date(iso) : iso;
  return d.toLocaleDateString("en-CA", { timeZone: HAWAII_TZ });
}

export function hawaiiToday(now = new Date()): { year: number; month: number; key: string } {
  const key = hawaiiDayKey(now);
  const [y, m] = key.split("-").map(Number);
  return { year: y, month: m - 1, key };
}

function hstMidnight(year: number, month: number, day: number): Date {
  return new Date(Date.UTC(year, month, day, 10, 0, 0));
}

function keyOf(year: number, month: number, day: number): string {
  const d = new Date(Date.UTC(year, month, day));
  return d.toISOString().slice(0, 10);
}

// Sunday-first grid padded with the neighbouring months' days, so the calendar
// always renders whole weeks.
export function buildMonthGrid(year: number, month: number): MonthCell[] {
  const leading = new Date(Date.UTC(year, month, 1)).getUTCDay();
  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const weeks = Math.ceil((leading + daysInMonth) / 7);
  const cells: MonthCell[] = [];

  for (let i = 0; i < weeks * 7; i++) {
    const dayNumber = i - leading + 1;
    const d = new Date(Date.UTC(year, month, dayNumber));
    cells.push({
      key: keyOf(year, month, dayNumber),
      day: d.getUTCDate(),
      inMonth: dayNumber >= 1 && dayNumber <= daysInMonth,
      start: hstMidnight(year, month, dayNumber),
    });
  }

  return cells;
}

// The [from, to) range covering every cell the grid will render, so one fetch
// fills the whole visible month including its padding days.
export function monthGridRange(year: number, month: number): [Date, Date] {
  const cells = buildMonthGrid(year, month);
  const to = new Date(cells[cells.length - 1].start);
  to.setUTCDate(to.getUTCDate() + 1);
  return [cells[0].start, to];
}

export function monthLabel(year: number, month: number): string {
  return new Date(Date.UTC(year, month, 1, 10)).toLocaleDateString("en-US", {
    timeZone: HAWAII_TZ,
    month: "long",
    year: "numeric",
  });
}

export function fullDateHawaii(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    timeZone: HAWAII_TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

// A run belongs to the club's standing rhythm if its series turns up on three
// or more dates in the window. Cadence rather than title, because the weekly
// runs get detail appended ("Sunday Long Run 7 miles easy") and title matching
// would read every one of those as a one-off.
//
// The exception is a recurrence override that renames a single instance — a
// race dropped into the weekly slot. Titles that merely extend the series'
// usual name stay part of the rhythm; a genuinely different one is special.
export function splitRhythm(events: CalendarEvent[]): {
  rhythm: CalendarEvent[];
  special: CalendarEvent[];
} {
  const series = new Map<string, { dates: Set<string>; titles: Map<string, number> }>();
  for (const e of events) {
    let entry = series.get(e.seriesId);
    if (!entry) {
      entry = { dates: new Set(), titles: new Map() };
      series.set(e.seriesId, entry);
    }
    entry.dates.add(hawaiiDayKey(e.start));
    const title = e.title.trim();
    entry.titles.set(title, (entry.titles.get(title) ?? 0) + 1);
  }

  const usualTitle = new Map<string, string>();
  for (const [id, entry] of series) {
    const [top] = [...entry.titles].sort((a, b) => b[1] - a[1]);
    usualTitle.set(id, top?.[0] ?? "");
  }

  const isRhythm = (e: CalendarEvent) => {
    const entry = series.get(e.seriesId);
    if (!entry || entry.dates.size < 3) return false;
    const usual = usualTitle.get(e.seriesId) ?? "";
    const title = e.title.trim();
    return title === usual || title.startsWith(usual);
  };

  return {
    rhythm: events.filter(isRhythm),
    special: events.filter((e) => !isRhythm(e)),
  };
}
