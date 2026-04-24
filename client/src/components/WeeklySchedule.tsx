import { useEffect, useState } from "react";
import { Calendar, Clock, MapPin, Users, Star, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CalendarEvent,
  currentHawaiiWeek,
  dayOfWeekHawaii,
  fetchCalendarEvents,
  formatHawaiiTime,
  styleForEvent,
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

  const renderCard = (event: CalendarEvent) => {
    const { icon, color } = styleForEvent(event.title);
    const day = dayOfWeekHawaii(event.start);
    const time = formatHawaiiTime(event.start);

    return (
      <Card key={event.id} className="card-float p-0 overflow-hidden">
        <div className="grid lg:grid-cols-12 gap-0">
          <div
            className={`lg:col-span-3 ${color} p-6 text-white flex flex-col justify-center items-center text-center`}
          >
            <div className="text-4xl mb-2">{icon}</div>
            <h3 className="text-2xl font-display font-bold mb-2">{day}</h3>
            <div className="flex items-center text-xl font-semibold">
              <Clock className="w-5 h-5 mr-2" />
              {time}
            </div>
          </div>

          <div className="lg:col-span-9 p-6">
            <h4 className="text-2xl font-display font-bold text-foreground mb-4">
              {event.title}
            </h4>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {event.location && (
                  <div className="flex items-start mb-3">
                    <MapPin className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <p className="font-semibold text-foreground">
                      {event.location}
                    </p>
                  </div>
                )}
                {event.description && (
                  <div className="flex items-start mb-3">
                    <Calendar className="w-5 h-5 text-secondary mt-0.5 mr-3 flex-shrink-0" />
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {event.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <section
      id="schedule"
      className="section-padding bg-gradient-to-b from-background to-muted/30"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-gradient-ocean mb-6">
            This Week's Runs
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-accent text-accent-foreground text-lg px-4 py-2">
              <Users className="w-4 h-4 mr-2" />
              Everyone welcome
            </Badge>
            <Badge className="bg-primary text-primary-foreground text-lg px-4 py-2">
              <Star className="w-4 h-4 mr-2" />
              All levels
            </Badge>
            <Badge className="bg-secondary text-secondary-foreground text-lg px-4 py-2">
              💚 Free!
            </Badge>
          </div>
          <p className="text-muted-foreground mb-4 text-sm">
            Live from our Google Calendar
          </p>
        </div>

        <div className="grid gap-8 mb-16">
          {error && (
            <Card className="card-float p-6 text-center text-destructive">
              Couldn't load the schedule right now. Please try again later.
            </Card>
          )}
          {!error && events === null && (
            <Card className="card-float p-6 text-center text-muted-foreground">
              Loading this week's runs…
            </Card>
          )}
          {!error && events && events.length === 0 && (
            <Card className="card-float p-6 text-center text-muted-foreground">
              No runs scheduled this week. Check back soon!
            </Card>
          )}
          {!error && events?.map(renderCard)}
        </div>

        <div className="text-center">
          <Card className="card-float p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
            <h3 className="text-2xl font-display font-bold mb-4 text-foreground">
              Questions?
            </h3>
            <div className="flex items-center justify-center space-x-2 text-lg">
              <Mail className="h-5 w-5 text-accent" />
              <span className="text-muted-foreground">Email us at:</span>
              <a
                href="mailto:hawaiirunningproject@gmail.com"
                className="text-primary hover:text-primary/80 font-semibold transition-colors"
              >
                hawaiirunningproject@gmail.com
              </a>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WeeklySchedule;
