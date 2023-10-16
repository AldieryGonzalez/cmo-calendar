import EventList from "@/components/EventList";
import { fetchCalendar } from "@/utilities/api";
import { useAuth } from "@/utilities/useAuth";
import { useQuery } from "react-query";

const Shifts = () => {
	const { session, isLoading: sessionLoading } = useAuth();
	const { data } = useQuery("calQuery", fetchData, {
		enabled: !!session,
	});

	async function fetchData() {
		const today = new Date().toISOString();
		const result = await fetchCalendar(session, today);
		return result;
	}
	if (sessionLoading || !data) return <h1>Loading ...</h1>;
	return <EventList events={data} />;
};

export default Shifts;
