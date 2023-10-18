import { GCalEvent } from "@/shared/gcalevent.interface";
import { CmoEvent } from "./classes/CmoEvent";

export const normalizeApiEvents = (events: GCalEvent[]) => {
	const normalized = events.map((event) => {
		return new CmoEvent(event);
	});
	return normalized;
};
