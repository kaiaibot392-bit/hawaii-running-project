import { useEffect, useState } from "react";
import { Clock, MapPin, Mail } from "lucide-react";
import {
  CalendarEvent,
  categoryForEvent,
  currentHawaiiWeek,
  dayAbbr,
  dayOfWeekHawaii,
  fetchCalendarEvents,
  formatHawaiiTime,
  monthDayHawaii,
  renderDescription,
} from "@/lib/calendar";

const WeeklySchedule = () => {
  const [events, setEvents] = useState<CalendarEvent[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const [from, to] = currentHawaiiWeek();
    fetchCalendarEvents(from, to)
      .then(setEvents)
      .catch((err) => setError(err instanceof Error ? err.message : String(err)));
  }, []);

  const renderRow = (event: CalendarEvent) => {
    const day = dayOfWeekHawaii(event.start);
    const time = formatHawaiiTime(event.start);
    const category = categoryForEvent(event.title);

    return (
      <article
        key={event.id}
        className="grid md:grid-cols-12 gap-6 md:gap-10 items-start py-10 border-b border-border last:border-0"
      >
        <div className="md:col-span-2 flex md:flex-col items-baseline md:items-start gap-3 md:gap-1">
          <span className="font-display text-3xl font-semibold text-primary">
            {dayAbbr(event.start)}
          </span>
          <span className="text-sm text-muted-foreground">
            {monthDayHawaii(event.start)}
          </span>
        </div>

        <div className="md:col-span-7">
          <p className="eyebrow mb-3 flex items-center gap-2">
            <category.icon className="h-3.5 w-3.5" />
            {category.label}
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-semibold leading-tight text-foreground">
            {event.title}
          </h3>
          {event.description && (
            <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl break-words">
              {renderDescription(event.description)}
            </p>
          )}
        </div>

        <div className="md:col-span-3 space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <Clock className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-foreground font-medium">{time}</p>
              <p className="text-muted-foreground">{day}</p>
            </div>
          </div>
          {event.location && (
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
              <p className="text-foreground">{event.location}</p>
            </div>
          )}
        </div>
      </article>
    );
  };

  return (
    <section className="section-padding">
      <div className="section-container">
        <header className="max-w-3xl mb-16">
          <p className="eyebrow mb-4">Schedule</p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
            This week's runs.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Our calendar updates live. All runs are free and open to everyone —
            show up, lace up, and we'll see you out there.
          </p>
        </header>

        {error && (
          <div className="py-16 border-y border-border text-center text-destructive">
            Couldn't load the schedule right now. Please try again later.
          </div>
        )}
        {!error && events === null && (
          <div className="py-16 border-y border-border text-center text-muted-foreground">
            Loading this week's runs…
          </div>
        )}
        {!error && events && events.length === 0 && (
          <div className="py-16 border-y border-border text-center text-muted-foreground">
            No runs scheduled this week. Check back soon.
          </div>
        )}

        {!error && events && events.length > 0 && (
          <div className="border-t border-border">
            {events.map(renderRow)}
          </div>
        )}

        <div className="mt-20 pt-12 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="eyebrow mb-2">Questions</p>
            <p className="text-foreground text-lg">
              New to running? Returning after a break? Reach out — we've got you.
            </p>
          </div>
          <a
            href="mailto:hawaiirunningproject@gmail.com"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <Mail className="h-4 w-4" />
            hawaiirunningproject@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
};

export default WeeklySchedule;
