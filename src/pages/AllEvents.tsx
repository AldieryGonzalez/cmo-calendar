import EventList from "@/components/EventList";
import { fetchCalendar } from "@/utilities/api";
import { useAuth } from "@/utilities/useAuth";
import { useQuery } from "react-query";

const Shifts = () => {
	const { isLoading: sessionLoading } = useAuth();
	// eslint-disable-next-line no-constant-condition
	if (true || sessionLoading || !data) return <h1>Loading ...</h1>;
	return <EventList events={data} />;
};

export default Shifts;
