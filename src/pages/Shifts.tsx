import EventList from "@/components/EventList";
import { useAuth } from "@/utilities/useAuth";
import axios from "axios";
import { useQuery } from "react-query";

const Shifts = () => {
	const { session, isLoading: sessionLoading } = useAuth();
	const { data } = useQuery("calQuery", fetchCalendar, {
		enabled: !!session,
	});

	async function fetchCalendar() {
		const today = new Date().toISOString();
		const response = await axios.get(
			`https://www.googleapis.com/calendar/v3/calendars/hi538hiha983mftk127v1q7mco@group.calendar.google.com/events?timeMin=${today}&orderBy=startTime&singleEvents=true`,
			{
				headers: {
					Authorization: `Bearer ${session?.provider_token}`,
				},
			}
		);
		return response.data;
	}
	if (sessionLoading || !data) return <h1>Loading ...</h1>;
	return <EventList events={data.items} />;
};

export default Shifts;
