import { Clock, MapPin } from "lucide-react";
import {
  CalendarEvent,
  categoryForEvent,
  dayAbbr,
  dayOfWeekHawaii,
  formatHawaiiTime,
  monthDayHawaii,
  renderDescription,
} from "@/lib/calendar";

type Props = {
  event: CalendarEvent;
  /** Week view leads each row with its own date; the agenda groups by day. */
  showDate?: boolean;
};

const EventRow = ({ event, showDate = true }: Props) => {
  const category = categoryForEvent(event.title);

  const time = (
    <div className="flex items-start gap-3">
      <Clock className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
      <div>
        <p className="text-foreground font-medium">
          {formatHawaiiTime(event.start)}
        </p>
        <p className="text-muted-foreground">{dayOfWeekHawaii(event.start)}</p>
      </div>
    </div>
  );

  const place = event.location && (
    <div className="flex items-start gap-3">
      <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
      <p className="text-foreground">{event.location}</p>
    </div>
  );

  // In the agenda the row sits in a narrower column, so the meta reads better
  // as a line under the event than as a squeezed third column.
  if (!showDate) {
    return (
      <article className="py-8 border-b border-border last:border-0">
        <p className="eyebrow mb-3 flex items-center gap-2">
          <category.icon className="h-3.5 w-3.5" />
          {category.label}
        </p>
        <h3 className="font-display text-2xl font-semibold leading-tight text-foreground">
          {event.title}
        </h3>
        {event.description && (
          <p className="mt-3 text-muted-foreground leading-relaxed break-words">
            {renderDescription(event.description)}
          </p>
        )}
        <div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {time}
          {place}
        </div>
      </article>
    );
  }

  return (
    <article className="grid md:grid-cols-12 gap-6 md:gap-10 items-start py-10 border-b border-border last:border-0">
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
        {time}
        {place}
      </div>
    </article>
  );
};

export default EventRow;
