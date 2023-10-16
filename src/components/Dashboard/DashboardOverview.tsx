import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GCalEvent } from "@/shared/gcalevent.interface";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import { DateRange } from "react-day-picker";
import Event from "../Event";

type Props = {
	date: DateRange | undefined;
	shifts: GCalEvent[];
};

const DashboardOverview: React.FC<Props> = ({ date, shifts }) => {
	const inShift = (shift: GCalEvent, employeeName: string) => {
		const lines = shift.description.split("\n");
		// const [first, lastInit, role, timeEh] = lines[1].split(" ");
		for (const line of lines) {
			if (line.startsWith(employeeName)) {
				return true;
			}
		}
		return false;
	};
	const myShifts = shifts.filter((shift) => inShift(shift, "Aldi G."));

	return (
		<TabsContent value='overview' className='space-y-4'>
			<div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Total Shifts
						</CardTitle>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							className='h-4 w-4 text-muted-foreground'>
							<path d='M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6' />
						</svg>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>
							{myShifts.length}
						</div>
						<p className='text-xs text-muted-foreground'>
							+20.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Subscriptions
						</CardTitle>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							className='h-4 w-4 text-muted-foreground'>
							<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
							<circle cx='9' cy='7' r='4' />
							<path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
						</svg>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>+2350</div>
						<p className='text-xs text-muted-foreground'>
							+180.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Sales
						</CardTitle>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							className='h-4 w-4 text-muted-foreground'>
							<rect width='20' height='14' x='2' y='5' rx='2' />
							<path d='M2 10h20' />
						</svg>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>+12,234</div>
						<p className='text-xs text-muted-foreground'>
							+19% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
						<CardTitle className='text-sm font-medium'>
							Active Now
						</CardTitle>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							className='h-4 w-4 text-muted-foreground'>
							<path d='M22 12h-4l-3 9L9 3l-3 9H2' />
						</svg>
					</CardHeader>
					<CardContent>
						<div className='text-2xl font-bold'>+573</div>
						<p className='text-xs text-muted-foreground'>
							+201 since last hour
						</p>
					</CardContent>
				</Card>
			</div>
			<div className='mx-6 mb-5 flex flex-col gap-2 '>
				<h3 className='text-3xl font-bold'>Your Shifts</h3>
				{myShifts.map((event) => {
					return (
						<div key={event.id}>
							<Event key={event.id} event={event} />
						</div>
					);
				})}
			</div>
		</TabsContent>
	);
};

export default DashboardOverview;
