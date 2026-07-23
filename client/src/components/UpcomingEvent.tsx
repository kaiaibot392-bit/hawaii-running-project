import { useEffect, useState } from "react";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  CalendarEvent,
  categoryForEvent,
  dayAbbr,
  fetchCalendarEvents,
  formatHawaiiDate,
  formatHawaiiTime,
  monthDayHawaii,
} from "@/lib/calendar";

const UpcomingEvent = () => {
  const [event, setEvent] = useState<CalendarEvent | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const now = new Date();
    const to = new Date(now);
    to.setDate(to.getDate() + 14);
    fetchCalendarEvents(now, to)
      .then((events) => {
        const next = events.find((e) => new Date(e.start) >= now) ?? null;
        setEvent(next);
      })
      .catch(() => setEvent(null))
      .finally(() => setLoaded(true));
  }, []);

  if (!loaded || !event) return null;

  const category = categoryForEvent(event.title);
  const CategoryIcon = category.icon;

  return (
    <section className="section-padding bg-muted/40 border-y border-border">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4">
            <p className="eyebrow mb-4">Next up</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight">
              Come meet us at the next run.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Pulled live from our calendar. Show up a few minutes early and
              say hi.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-card border border-border p-8 md:p-10">
              <div className="flex items-center gap-8 pb-8 border-b border-border">
                <div className="flex flex-col items-center justify-center h-20 w-20 border border-primary text-primary flex-shrink-0">
                  <span className="font-display text-2xl font-semibold leading-none">
                    {dayAbbr(event.start)}
                  </span>
                  <span className="text-xs mt-1 tracking-wider">
                    {monthDayHawaii(event.start).toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="eyebrow mb-2 flex items-center gap-2">
                    <CategoryIcon className="h-3.5 w-3.5" />
                    {category.label}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-semibold text-foreground leading-tight truncate">
                    {event.title}
                  </h3>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 py-8 text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">
                      {formatHawaiiTime(event.start)}
                    </p>
                    <p className="text-muted-foreground">
                      {formatHawaiiDate(event.start)}
                    </p>
                  </div>
                </div>
                {event.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <p className="text-foreground">{event.location}</p>
                  </div>
                )}
              </div>

              {event.description && (
                <p className="pt-2 pb-8 text-muted-foreground leading-relaxed whitespace-pre-wrap line-clamp-3">
                  {event.description}
                </p>
              )}

              <Link to="/schedule">
                <Button className="gap-2">
                  See full schedule
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvent;
