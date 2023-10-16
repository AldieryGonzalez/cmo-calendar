import { DatePickerWithRange } from "@/components/DateRangePicker";
import { addDays } from "date-fns";
import React from "react";
import { DateRange } from "react-day-picker";

const Schedule = () => {
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(),
		to: addDays(new Date(), 14),
	});

	const handleDateChange = (dateRange: DateRange | undefined) => {
		setDate(dateRange);
		console.log(dateRange);
	};

	return (
		<div className='flex-1 space-y-4 p-8 pt-6'>
			<div className='flex items-center justify-between space-y-2'>
				<h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>
				<div className='flex items-center space-x-2'>
					<DatePickerWithRange
						date={date}
						handleDateChange={handleDateChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default Schedule;
