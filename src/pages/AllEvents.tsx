import EventList from "@/components/EventList";
import SimpleLoading from "@/layouts/SimpleLoading";
import { useCalendar } from "@/utilities/useCalendar";

const Shifts = () => {
	const { data } = useCalendar();

	if (!data) return <SimpleLoading />;
	return <EventList events={data} />;
};

export default Shifts;
