/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchCalendar } from "@/utilities/api";
import type { CmoEvent } from "@/utilities/classes/CmoEvent";
import { useAuth } from "@/utilities/useAuth";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

type CalendarProviderProps = {
	children: React.ReactNode;
};

type CalValues = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	data: CmoEvent[] | undefined;
	handleStartChange: (startInput: Date) => void;
	handleEndChange: (endInput: Date) => void;
};

export const CalendarContext = React.createContext({} as CalValues);

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
	children,
}) => {
	const queryClient = useQueryClient();
	const [startDate, setStartDate] = useState(moment());
	const [endDate, setEndDate] = useState(moment().add(2, "M"));
	const { session } = useAuth();
	const { data, isLoading: calLoading } = useQuery(
		["calendarEvents", "initial"],
		fetchData,
		{
			enabled: !!session,
		}
	);

	async function fetchData() {
		const result = await fetchCalendar(
			session,
			startDate.toISOString(),
			endDate.toISOString()
		);
		return result;
	}

	function handleStartChange(startInput: Date) {
		const start = moment(startInput);
		const outOfBounds = start.isBefore(startDate, "d");
		if (outOfBounds) {
			const end = startDate.subtract(1, "d");
			extendCalendar(start.toISOString(), end.toISOString(), true);
			setStartDate(start);
		}
	}
	function handleEndChange(endInput: Date) {
		const end = moment(endInput);
		const outOfBounds = end.isAfter(endDate, "d");
		if (outOfBounds) {
			const start = endDate.add(1, "d");
			extendCalendar(start.toISOString(), end.toISOString(), false);
			setEndDate(end);
		}
	}

	function checkExistingData() {
		const existingData = queryClient.getQueryData([
			"calendarEvents",
			"initial",
		]);
	}

	async function extendCalendar(
		startDate: string,
		endDate: string,
		inFront: boolean
	) {
		const additionalData = await fetchCalendar(session, startDate, endDate);
		const existingData = queryClient.getQueryData([
			"calendarEvents",
			"initial",
		]);
	}

	useEffect(() => {}, []);

	const value = {
		data,
		calLoading,
		handleStartChange,
		handleEndChange,
		checkExistingData,
	};
	// if (calLoading) return <SimpleLoading />;
	return (
		<CalendarContext.Provider value={value}>
			{children}
		</CalendarContext.Provider>
	);
};
