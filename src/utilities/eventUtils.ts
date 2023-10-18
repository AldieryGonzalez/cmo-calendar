/* eslint-disable @typescript-eslint/no-unused-vars */
import { GCalEvent } from "@/shared/gcalevent.interface";

export const normalizeApiEvents = (events: GCalEvent[]) => {
	const pattern =
		/^([A-Z][a-z]+ [A-Z]\.)\s\(([^)]+)\):\s((\d{1,2}:\d{2}[ap]m)-(\d{1,2}:\d{2}[ap]m|[Cc]lose))\s(\([A-Z]+ confirmed \d{1,2}\/\d{1,2}\/\d{2,4}[^)]*\))$/;
	const descLines = events[0].description.split("\n");
	const myShift = descLines[0];
	console.log(events[0]);
	const normalized = events.map((event) => {
		// const people = event.description.split("\n").map((line) => {
		// 	console.log(line, line.match(pattern));
		// 	return "";
		// });
		// return people;
	});
	return events;
};
