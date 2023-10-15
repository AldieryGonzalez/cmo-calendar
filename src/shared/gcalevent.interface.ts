export interface GCalEvent {
	created: string;
	creator: { email: string };
	description: string;
	end: { dateTime: string; timeZone: string };
	etag: string;
	eventType: "default";
	htmlLink: string;
	iCalUID: string;
	id: string;
	kind: "calendar#event";
	location: string;
	organizer: {
		email: string;
		displayName: string;
		self: boolean;
	};
	reminders: { useDefault: boolean };
	sequence: number;
	start: {
		dateTime: string;
		timeZone: "America/Chicago";
	};
	status: "confirmed";
	summary: string;
	updated: string;
}
