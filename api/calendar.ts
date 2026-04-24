import type { IncomingMessage, ServerResponse } from 'http';
import ical from 'node-ical';

const CAL_ID = 'obdkgat2rso9nje3ivec5p1m4g@group.calendar.google.com';
const ICS_URL = `https://calendar.google.com/calendar/ical/${encodeURIComponent(CAL_ID)}/public/basic.ics`;

type OutEvent = {
  id: string;
  title: string;
  description: string;
  location: string;
  start: string;
  end: string;
  isFullDay: boolean;
  isRecurring: boolean;
};

function paramValue(v: unknown): string {
  if (v == null) return '';
  if (typeof v === 'string') return v;
  if (typeof v === 'object' && v !== null && 'val' in (v as Record<string, unknown>)) {
    return String((v as { val: unknown }).val ?? '');
  }
  return String(v);
}

export async function fetchEvents(from: Date, to: Date): Promise<OutEvent[]> {
  const data = await ical.async.fromURL(ICS_URL);
  const out: OutEvent[] = [];

  for (const key of Object.keys(data)) {
    const item = data[key];
    if (!item || item.type !== 'VEVENT') continue;

    const instances = ical.expandRecurringEvent(item, { from, to });
    for (const inst of instances) {
      out.push({
        id: `${item.uid}_${inst.start.toISOString()}`,
        title: paramValue(inst.summary) || paramValue(item.summary),
        description: paramValue(inst.event.description),
        location: paramValue(inst.event.location),
        start: inst.start.toISOString(),
        end: inst.end.toISOString(),
        isFullDay: inst.isFullDay,
        isRecurring: inst.isRecurring,
      });
    }
  }

  out.sort((a, b) => a.start.localeCompare(b.start));
  return out;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const now = new Date();
    const defaultFrom = new Date(now);
    defaultFrom.setHours(0, 0, 0, 0);
    const defaultTo = new Date(defaultFrom);
    defaultTo.setDate(defaultTo.getDate() + 14);

    const fromParam = url.searchParams.get('from');
    const toParam = url.searchParams.get('to');
    const from = fromParam ? new Date(fromParam) : defaultFrom;
    const to = toParam ? new Date(toParam) : defaultTo;

    const events = await fetchEvents(from, to);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
    res.statusCode = 200;
    res.end(JSON.stringify({ events, from: from.toISOString(), to: to.toISOString() }));
  } catch (err) {
    console.error('calendar api error', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ error: 'Failed to fetch calendar', message: err instanceof Error ? err.message : String(err) }));
  }
}
