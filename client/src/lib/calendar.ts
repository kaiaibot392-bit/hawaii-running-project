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
