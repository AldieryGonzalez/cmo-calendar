import { isAfter, isBefore, addYears, startOfDay, endOfDay } from "date-fns";
import { CmoEvent } from "./classes/CmoEvent";

type EventByDayObj = { [day: string]: CmoEvent[] };
const isBetween = (eventDate: Date, start: Date, end: Date) => {
  start = startOfDay(start);
  end = endOfDay(end);
  return isAfter(eventDate, start) && isBefore(eventDate, end);
};

export const getEventsBetween = (
  events: CmoEvent[],
  start = new Date(),
  end = addYears(new Date(), 1),
) => {
  return events.filter((event) => isBetween(event.start, start, end));
};

export function groupEventsByDay(events: CmoEvent[]) {
  const eventsByDay: EventByDayObj = {};

  for (const event of events) {
    const eventDay = event.longDateString;
    if (!eventsByDay[eventDay]) {
      eventsByDay[eventDay] = [];
    }

    eventsByDay[eventDay].push(event);
  }

  const groupedEventsArray = Object.entries(eventsByDay).map(
    ([day, events]) => ({
      day,
      events,
    }),
  );

  return groupedEventsArray;
}
