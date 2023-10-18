import moment from "moment";
import { CmoEvent } from "./classes/CmoEvent";

type EventByDayObj = { [day: string]: CmoEvent[] };

export function groupEventsByDay(
	events: CmoEvent[],
	startDate: Date | undefined,
	endDate: Date | undefined
) {
	const eventsByDay: EventByDayObj = {};
	const start = moment(startDate);
	const end = moment(endDate);

	for (const event of events) {
		const eventDate = event.start;

		if (eventDate.isBetween(start, end, "day", "[]")) {
			const eventDay = event.longDateString;

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
