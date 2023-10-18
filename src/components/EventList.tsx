import React from "react";
import type { GCalEvent } from "../shared/gcalevent.interface";
import Event from "./Event";
import moment from "moment";

type Props = {
	events: GCalEvent[];
};

export const EventList: React.FC<Props> = ({ events }) => {
	let curDate = "null";
	console.log(events);
	return (
		<div className='mx-6 mb-5 flex flex-col gap-2 '>
			{events.map((event) => {
				const date = moment(event.start.dateTime).format(
					"dddd, MMMM Do YYYY"
				);
				const newDate = curDate !== date;
				if (newDate) {
					curDate = date;
				}
				return (
					<div key={event.id}>
						{newDate && (
							<>
								<h1 className='mt-6 font-bold text-xl'>
									{date}
								</h1>
								<hr></hr>
							</>
						)}
						<Event key={event.id} event={event} />
					</div>
				);
			})}
		</div>
	);
};

export default EventList;
