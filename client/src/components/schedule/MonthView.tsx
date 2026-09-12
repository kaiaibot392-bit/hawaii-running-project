import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  CalendarEvent,
  buildMonthGrid,
  categoryForEvent,
  fetchCalendarEvents,
  formatHawaiiTime,
  fullDateHawaii,
  hawaiiDayKey,
  hawaiiToday,
  monthGridRange,
  monthLabel,
  splitRhythm,
} from "@/lib/calendar";
import EventRow from "./EventRow";
import ScheduleStatus from "./ScheduleStatus";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MAX_DOTS = 3;

const monthKey = (year: number, month: number) =>
  `${year}-${String(month + 1).padStart(2, "0")}`;

const MonthView = () => {
  const today = useMemo(() => hawaiiToday(), []);
  const [view, setView] = useState({ year: today.year, month: today.month });
  const [selected, setSelected] = useState<string | null>(null);
  const [events, setEvents] = useState<CalendarEvent[] | null>(null);
  const [error, setError] = useState(false);
  // Months already fetched, so paging back to one is instant.
  const cache = useRef(new Map<string, CalendarEvent[]>());
  const agendaRef = useRef<HTMLDivElement>(null);

  // Below lg the agenda sits under the grid, so a tap would otherwise look
  // like nothing happened.
  const selectDay = (day: string | null) => {
    setSelected(day);
    // A padding day belongs to the neighbouring month; follow it there rather
    // than showing a dot that does nothing.
    if (day) {
      const [y, m] = day.split("-").map(Number);
      setView((v) => (y === v.year && m - 1 === v.month ? v : { year: y, month: m - 1 }));
    }
    if (day && !window.matchMedia("(min-width: 1024px)").matches) {
      agendaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const key = monthKey(view.year, view.month);
  const isCurrentMonth = view.year === today.year && view.month === today.month;

  useEffect(() => {
    const cached = cache.current.get(key);
    if (cached) {
      setEvents(cached);
      return;
    }

    let cancelled = false;
    setEvents(null);
    setError(false);
    const [from, to] = monthGridRange(view.year, view.month);
    fetchCalendarEvents(from, to)
      .then((fetched) => {
        cache.current.set(key, fetched);
        if (!cancelled) setEvents(fetched);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [key, view.year, view.month]);

  const cells = useMemo(
    () => buildMonthGrid(view.year, view.month),
    [view.year, view.month]
  );

  const byDay = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();
    for (const event of events ?? []) {
      const day = hawaiiDayKey(event.start);
      if (!map.has(day)) map.set(day, []);
      map.get(day)!.push(event);
    }
    return map;
  }, [events]);

  const inMonth = useMemo(
    () => (events ?? []).filter((e) => hawaiiDayKey(e.start).startsWith(key)),
    [events, key]
  );

  const { rhythm, special } = useMemo(() => splitRhythm(inMonth), [inMonth]);

  // The weekly rhythm, collapsed to one line per standing run.
  const rhythmSummary = useMemo(() => {
    const seen = new Map<string, CalendarEvent>();
    for (const event of rhythm) {
      const title = event.title.trim().toLowerCase();
      if (!seen.has(title)) seen.set(title, event);
    }
    return [...seen.values()].sort(
      (a, b) =>
        new Date(a.start).getUTCDay() - new Date(b.start).getUTCDay() ||
        a.start.localeCompare(b.start)
    );
  }, [rhythm]);

  const upcomingSpecial = useMemo(
    () =>
      special.filter((e) => !isCurrentMonth || hawaiiDayKey(e.start) >= today.key),
    [special, isCurrentMonth, today.key]
  );

  // With no day picked, the agenda is the rest of the month — the look-ahead.
  const agenda = useMemo(() => {
    if (selected) return byDay.get(selected) ?? [];
    return inMonth.filter(
      (e) => !isCurrentMonth || hawaiiDayKey(e.start) >= today.key
    );
  }, [selected, byDay, inMonth, isCurrentMonth, today.key]);

  const agendaByDay = useMemo(() => {
    const groups: Array<{ day: string; events: CalendarEvent[] }> = [];
    for (const event of agenda) {
      const day = hawaiiDayKey(event.start);
      const last = groups[groups.length - 1];
      if (last && last.day === day) last.events.push(event);
      else groups.push({ day, events: [event] });
    }
    return groups;
  }, [agenda]);

  // Steps off the previous state, not the render's copy, so rapid clicks on the
  // arrows each advance a month instead of collapsing into one.
  const step = (delta: number) => {
    setView((v) => {
      const next = new Date(Date.UTC(v.year, v.month + delta, 1));
      return { year: next.getUTCFullYear(), month: next.getUTCMonth() };
    });
    setSelected(null);
  };

  const goToday = () => {
    setView({ year: today.year, month: today.month });
    setSelected(null);
  };

  return (
    <div className="border-t border-border pt-10">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-4 mb-6">
              <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
                {monthLabel(view.year, view.month)}
              </h2>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous month"
                  className="h-9 w-9 grid place-items-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next month"
                  className="h-9 w-9 grid place-items-center border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 mb-2">
              {WEEKDAYS.map((day, i) => (
                <div key={i} className="eyebrow text-center py-2">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 border-t border-l border-border">
              {cells.map((cell) => {
                const dayEvents = byDay.get(cell.key) ?? [];
                const isToday = cell.key === today.key;
                const isSelected = cell.key === selected;
                const hasEvents = dayEvents.length > 0;

                const content = (
                  <>
                    <span
                      className={[
                        "text-sm tabular-nums",
                        isSelected
                          ? "text-primary-foreground font-semibold"
                          : isToday
                            ? "text-primary font-semibold"
                            : cell.inMonth
                              ? "text-foreground"
                              : "text-muted-foreground/40",
                      ].join(" ")}
                    >
                      {cell.day}
                    </span>
                    <span className="flex items-center gap-1 h-1.5 mt-1.5">
                      {dayEvents.slice(0, MAX_DOTS).map((event) => (
                        <span
                          key={event.id}
                          className={[
                            "h-1.5 w-1.5 rounded-full",
                            isSelected
                              ? "bg-primary-foreground/70"
                              : categoryForEvent(event.title).dot,
                          ].join(" ")}
                        />
                      ))}
                    </span>
                  </>
                );

                const base =
                  "aspect-square min-h-[46px] flex flex-col items-center justify-center border-r border-b border-border";

                if (!hasEvents) {
                  return (
                    <div
                      key={cell.key}
                      className={`${base} ${isToday ? "bg-primary-muted/40" : ""}`}
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <button
                    key={cell.key}
                    type="button"
                    aria-pressed={isSelected}
                    aria-label={`${fullDateHawaii(dayEvents[0].start)} — ${dayEvents.length} event${dayEvents.length > 1 ? "s" : ""}`}
                    onClick={() => selectDay(isSelected ? null : cell.key)}
                    className={[
                      base,
                      "transition-colors",
                      isSelected
                        ? "bg-primary"
                        : isToday
                          ? "bg-primary-muted/40 hover:bg-primary-muted"
                          : "hover:bg-muted",
                    ].join(" ")}
                  >
                    {content}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 text-sm">
              <button
                type="button"
                onClick={goToday}
                className="text-primary font-medium hover:underline disabled:text-muted-foreground disabled:no-underline"
                disabled={isCurrentMonth && !selected}
              >
                Jump to today
              </button>
              {selected && (
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Show whole month
                </button>
              )}
            </div>

            {rhythmSummary.length > 0 && (
              <div className="mt-10 pt-8 border-t border-border">
                <p className="eyebrow mb-4">Every week</p>
                <ul className="space-y-2 text-sm">
                  {rhythmSummary.map((event) => {
                    const category = categoryForEvent(event.title);
                    return (
                      <li key={event.id} className="flex items-baseline gap-3">
                        <span
                          className={`h-1.5 w-1.5 rounded-full flex-shrink-0 translate-y-[-2px] ${category.dot}`}
                        />
                        <span className="text-foreground">{event.title}</span>
                        <span className="text-muted-foreground ml-auto whitespace-nowrap">
                          {new Date(event.start).toLocaleDateString("en-US", {
                            timeZone: "Pacific/Honolulu",
                            weekday: "short",
                          })}{" "}
                          {formatHawaiiTime(event.start)}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-7 scroll-mt-24" ref={agendaRef}>
          {upcomingSpecial.length > 0 && (
            <div className="mb-10 pb-10 border-b border-border">
              <p className="eyebrow mb-4">Races &amp; one-offs this month</p>
              <ul className="space-y-3">
                {upcomingSpecial.map((event) => (
                  <li key={event.id}>
                    <button
                      type="button"
                      onClick={() => selectDay(hawaiiDayKey(event.start))}
                      className="group text-left flex items-baseline gap-4 w-full"
                    >
                      <span className="font-display text-sm font-semibold text-accent tabular-nums whitespace-nowrap">
                        {new Date(event.start).toLocaleDateString("en-US", {
                          timeZone: "Pacific/Honolulu",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {(error || events === null || agenda.length === 0) && (
            <ScheduleStatus
              error={error}
              loading={events === null}
              loadingLabel="Loading the calendar…"
              emptyLabel={
                selected
                  ? "Nothing scheduled on this day."
                  : isCurrentMonth
                    ? "Nothing left on the calendar this month."
                    : "Nothing on the calendar this month yet."
              }
            />
          )}

          {!error && events !== null && agenda.length > 0 && (
            <div>
              {agendaByDay.map((group) => (
                <section key={group.day} className="mb-4 last:mb-0">
                  <h3 className="font-display text-lg font-semibold text-primary pb-3 border-b border-border">
                    {fullDateHawaii(group.events[0].start)}
                  </h3>
                  {group.events.map((event) => (
                    <EventRow key={event.id} event={event} showDate={false} />
                  ))}
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthView;
