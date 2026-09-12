import { useEffect, useState } from "react";
import {
  CalendarEvent,
  currentHawaiiWeek,
  fetchCalendarEvents,
} from "@/lib/calendar";
import EventRow from "./EventRow";
import ScheduleStatus from "./ScheduleStatus";

const WeekView = () => {
  const [events, setEvents] = useState<CalendarEvent[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const [from, to] = currentHawaiiWeek();
    fetchCalendarEvents(from, to)
      .then(setEvents)
      .catch(() => setError(true));
  }, []);

  if (error || events === null || events.length === 0) {
    return (
      <ScheduleStatus
        error={error}
        loading={events === null}
        loadingLabel="Loading this week's runs…"
        emptyLabel="No runs scheduled this week. Check back soon."
      />
    );
  }

  return (
    <div className="border-t border-border">
      {events.map((event) => (
        <EventRow key={event.id} event={event} />
      ))}
    </div>
  );
};

export default WeekView;
