import type { Session } from "@supabase/supabase-js";
import axios from "axios";
import { normalizeApiEvents } from "./eventUtils";

export async function fetchCalendar(
	session: Session | null,
	startTime = new Date().toISOString(),
	endTime: string
) {
	endTime = `&timeMax=${new Date(endTime).toISOString()}`;
	const url = `https://www.googleapis.com/calendar/v3/calendars/hi538hiha983mftk127v1q7mco@group.calendar.google.com/events?timeMin=${startTime}${endTime}&orderBy=startTime&singleEvents=true`;
	const response = await axios.get(url, {
		headers: {
			Authorization: `Bearer ${session?.provider_token}`,
		},
	});
	return normalizeApiEvents(response.data.items);
}
