import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import { DateRange } from "react-day-picker";
import { groupEventsByDay } from "@/utilities/dateUtils";
import { CmoEvent } from "@/utilities/classes/CmoEvent";

type OverviewProps = {
	date: DateRange | undefined;
	events: CmoEvent[];
};

type DaySectionProps = {
	day: string;
	events: CmoEvent[];
};

type ShiftCardProps = {
	event: CmoEvent;
};

const DaySection: React.FC<DaySectionProps> = ({ day, events }) => {
	return (
		<div>
			<h3 className='text-xl font-semibold'>{day}</h3>
			{events.map((event) => (
				<ShiftCard key={event.id} event={event} />
			))}
		</div>
	);
};

const ShiftCard: React.FC<ShiftCardProps> = ({ event }) => {
	return (
		<Card className='gap-2'>
			<CardHeader>
				<CardTitle>{event.title}</CardTitle>
				<CardDescription>{event.timeRangeString}</CardDescription>
			</CardHeader>
		</Card>
	);
};

const OpenShifts: React.FC<OverviewProps> = ({ date, events }) => {
	const myEvents = groupEventsByDay(
		events.filter((event) => event.hasOpenShifts),
		date?.from,
		date?.to
	);

	return (
		<TabsContent value='openShifts' className='space-y-4'>
			<div className='mx-6 mb-5 flex flex-col gap-2 '>
				<h3 className='text-3xl font-bold'>Open Shifts</h3>
				{myEvents.map((day) => {
					return (
						<DaySection
							key={day.day}
							day={day.day}
							events={day.events}
						/>
					);
				})}
			</div>
		</TabsContent>
	);
};

export default OpenShifts;
