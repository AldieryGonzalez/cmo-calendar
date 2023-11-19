import { isAfter, isBefore, addYears, startOfDay, endOfDay } from "date-fns";
import { CmoEvent } from "./classes/CmoEvent";
import { DateRange } from "react-day-picker";

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

export const getDateRangeFromSearchParams = (searchParams: URLSearchParams) => {
  return {
    from: searchParams.get("start")
      ? new Date(searchParams.get("start") as string)
      : undefined,
    to: searchParams.get("end")
      ? new Date(searchParams.get("end") as string)
      : undefined,
  } as DateRange | undefined;
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

export const getMonthMatrix = (date: Date = new Date()) => {
  const year = date.getFullYear();
  const firstDay = new Date(year, date.getMonth(), 1).getDay();
  let currentDay = 0 - firstDay;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentDay++;
      const newDate = new Date(year, date.getMonth(), currentDay);
      return newDate;
    });
  });
  console.table(daysMatrix);
  return daysMatrix;
};
