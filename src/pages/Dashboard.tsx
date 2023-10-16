import { DatePickerWithRange } from "@/components/DateRangePicker";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/utilities/useAuth";
import axios from "axios";
import { addDays } from "date-fns";
import React from "react";
import { DateRange } from "react-day-picker";
import { useQuery } from "react-query";
import DashboardAnalytics from "@/components/Dashboard/DashboardAnalytics";
import DashboardReports from "@/components/Dashboard/DashboardReports";
import DashboardNotifications from "@/components/Dashboard/DashboardNotifications";

const Dashboard = () => {
	const { session, isLoading: sessionLoading } = useAuth();
	const [date, setDate] = React.useState<DateRange | undefined>({
		from: new Date(),
		to: addDays(new Date(), 14),
	});

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

	const handleDateChange = (dateRange: DateRange | undefined) => {
		setDate(dateRange);
		console.log(dateRange);
	};

	if (sessionLoading || !data) return <h1>Loading ...</h1>;

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
				<DashboardOverview shifts={data.items} date={date} />
				<DashboardAnalytics />
				<DashboardReports />
				<DashboardNotifications />
			</Tabs>
		</div>
	);
};

export default Dashboard;
