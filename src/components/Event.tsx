import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CmoEvent } from "@/utilities/classes/CmoEvent";
type Props = {
	event: CmoEvent;
};

const Event: React.FC<Props> = ({ event }) => {
	return (
		<>
			<Card className='gap-2'>
				<CardHeader>
					<CardTitle>{event.title}</CardTitle>
					<CardDescription>{event.timeRangeString}</CardDescription>
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
