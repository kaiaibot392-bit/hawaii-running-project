import { useEffect, useState } from "react";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CalendarEvent,
  fetchCalendarEvents,
  formatHawaiiDate,
  formatHawaiiTime,
  styleForEvent,
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

  const { icon, color } = styleForEvent(event.title);

  return (
    <section className="section-padding bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">
            Next Up
          </h2>
          <p className="text-muted-foreground">
            Our next run on the calendar — come join us!
          </p>
        </div>

        <Card className="card-float p-0 overflow-hidden">
          <div className="grid md:grid-cols-12 gap-0">
            <div
              className={`md:col-span-4 ${color} p-8 text-white flex flex-col justify-center items-center text-center`}
            >
              <div className="text-5xl mb-3">{icon}</div>
              <h3 className="text-xl font-display font-bold mb-1">
                {formatHawaiiDate(event.start)}
              </h3>
              <div className="flex items-center text-lg font-semibold">
                <Clock className="w-5 h-5 mr-2" />
                {formatHawaiiTime(event.start)}
              </div>
            </div>

            <div className="md:col-span-8 p-8 flex flex-col justify-center">
              <h4 className="text-2xl font-display font-bold text-foreground mb-3">
                {event.title}
              </h4>
              {event.location && (
                <div className="flex items-start mb-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
              )}
              {event.description && (
                <p className="text-muted-foreground whitespace-pre-wrap mb-4 line-clamp-3">
                  {event.description}
                </p>
              )}
              <div>
                <Link to="/schedule">
                  <Button className="bg-green-700 text-white hover:bg-green-600 transition-colors">
                    See Full Schedule
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default UpcomingEvent;
