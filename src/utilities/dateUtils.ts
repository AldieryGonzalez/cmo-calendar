import { GCalEvent } from "@/shared/gcalevent.interface";
import moment from "moment";

type EventByDayObj = { [day: string]: GCalEvent[] };

export function groupEventsByDay(
	events: GCalEvent[],
	startDate: Date | undefined,
	endDate: Date | undefined
) {
	const eventsByDay: EventByDayObj = {};
	const start = moment(startDate);
	const end = moment(endDate);

	for (const event of events) {
		const eventDate = moment(event.start.dateTime);

		if (eventDate.isBetween(start, end, "day", "[]")) {
			const eventDay = eventDate.format("dddd, MMMM Do YYYY");

			if (!eventsByDay[eventDay]) {
				eventsByDay[eventDay] = [];
			}

			eventsByDay[eventDay].push(event);
		}
	}
	const groupedEventsArray = Object.entries(eventsByDay).map(
		([day, events]) => ({
			day,
			events,
		})
	);

	return groupedEventsArray;
}
