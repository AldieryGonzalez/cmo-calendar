import React from "react";
import { GCalEvent } from "../App";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import moment from "moment";
type Props = {
	event: GCalEvent;
};

const Event: React.FC<Props> = ({ event }) => {
	const startTime = moment(event.start.dateTime).format("h:mm A");
	const endTime = moment(event.end.dateTime).format("h:mm A");
	return (
		<>
			<Card className='gap-2'>
				<CardHeader>
					<CardTitle>{event.summary}</CardTitle>
					<CardDescription>
						{`${startTime} - ${endTime}`}
					</CardDescription>
				</CardHeader>
				{/* <p className='whitespace-pre-wrap'>
					{event.description
						.replaceAll("<br>", "\n")
						.replaceAll("</span>", "")
						.replaceAll("<span>", "")}
				</p> */}
			</Card>
		</>
	);
};

export default Event;
