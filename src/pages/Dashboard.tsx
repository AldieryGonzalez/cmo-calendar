import { DatePickerWithRange } from "@/components/DateRangePicker";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { addMonths } from "date-fns";
import React from "react";
import { DateRange } from "react-day-picker";
import DashboardAnalytics from "@/components/Dashboard/DashboardAnalytics";
import DashboardReports from "@/components/Dashboard/DashboardReports";
import DashboardNotifications from "@/components/Dashboard/DashboardNotifications";
import { useCalendar } from "@/utilities/useCalendar";
import SimpleLoading from "@/layouts/SimpleLoading";

const Dashboard = () => {
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
			<Tabs defaultValue='overview' className='space-y-4'>
				<TabsList>
					<TabsTrigger value='overview'>Overview</TabsTrigger>
					<TabsTrigger value='analytics'>Analytics</TabsTrigger>
					<TabsTrigger value='reports'>Reports</TabsTrigger>
					<TabsTrigger value='notifications'>
						Notifications
					</TabsTrigger>
				</TabsList>
				<DashboardOverview events={data} date={date} />
				<DashboardAnalytics />
				<DashboardReports />
				<DashboardNotifications />
			</Tabs>
		</div>
	);
};

export default Dashboard;
