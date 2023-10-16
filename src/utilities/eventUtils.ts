import { GCalEvent } from "@/shared/gcalevent.interface";

export const normalizeApiEvents = (events: GCalEvent[]) => {
	const normalized = events.map((event) => {
		const pattern =
			/([A-Z][a-z]+ [A-Z]\.) \(([^)]+)\): (\d{1,2}:\d{2}[ap]m-\d{1,2}:\d{2}[ap]m) \([A-Z]+ confirmed (\d{1,2}\/\d{1,2}\/\d{2,4})\)/;
		const people = event.description.split("\n").map((line) => {
			console.log(line, line.match(pattern));
			return "";
		});
		return people;
	});
	console.log(normalized);
	return events;
};
