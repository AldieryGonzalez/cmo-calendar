import {
	useSessionContext,
	useSupabaseClient,
} from "@supabase/auth-helpers-react";
import axios from "axios";
import { useQuery } from "react-query";
import { EventList } from "./components/EventList";

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

function App() {
	const supabase = useSupabaseClient();
	const { session, isLoading: sessionLoading } = useSessionContext();
	const { data, isLoading: calLoading } = useQuery(
		"calQuery",
		fetchCalendar,
		{ enabled: !sessionLoading }
	);

	async function googleSignIn() {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: {
				scopes: "https://www.googleapis.com/auth/calendar",
			},
		});
		if (error) {
			alert("Error logging in to Google");
			console.log(error);
		}
	}
	async function signOut() {
		await supabase.auth.signOut();
	}
	async function fetchCalendar() {
		const today = new Date().toISOString();
		console.log(today);
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

	if (sessionLoading || calLoading) return <h1>Loading ...</h1>;
	return (
		<div className='container'>
			{session ? (
				<div className='m-auto'>
					<h2>Hey there {session.user.email}</h2>
					<button
						className='bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
						onClick={() => signOut()}>
						Sign out
					</button>
					<EventList events={data.items} />
				</div>
			) : (
				<div className='p-5 mx-auto w-full flex flex-col items-center'>
					<button
						className='bg-white hover:bg-gray-100 mx-auto text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
						onClick={() => googleSignIn()}>
						Sign in with Google
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
