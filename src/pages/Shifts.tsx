import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { addMonths } from "date-fns";
import React from "react";
import { DateRange } from "react-day-picker";
import { useCalendar } from "@/utilities/useCalendar";
import SimpleLoading from "@/layouts/SimpleLoading";
import MyShifts from "@/components/Shifts/MyShifts";
import OpenShifts from "@/components/Shifts/OpenShifts";

import SearchBar from "@/components/Shifts/SearchBar";

const Shifts = () => {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(),
		to: addMonths(new Date(), 2),
	});

	const { data } = useCalendar();

	const handleDateChange = (dateRange: DateRange | undefined) => {
		setDate(dateRange);
	};

	if (!data) return <SimpleLoading />;

	return (
		<div className='flex-1 space-y-4 p-5 pt-6'>
			<Tabs defaultValue='myShifts' className='space-y-4'>
				<div className='flex flex-col md:flex-row items-center gap-6 justify-between space-x-2'>
					<TabsList>
						<TabsTrigger value='myShifts'>My Shifts</TabsTrigger>
						<TabsTrigger value='openShifts'>
							Open Shifts
						</TabsTrigger>
						<TabsTrigger value='allShifts'>All Shifts</TabsTrigger>
						{/* Admin Only */}
						{/* <TabsTrigger value='requests'>Requests</TabsTrigger> */}
					</TabsList>
					<SearchBar
						date={date}
						handleDateChange={handleDateChange}
					/>
				</div>
				<MyShifts events={data} date={date} />
				<OpenShifts events={data} date={date} />
			</Tabs>
		</div>
	);
};

export default Shifts;
