import axios from "axios";
import { useAuth } from "./utilities/useAuth";
import { useQuery } from "react-query";

import { signOut, googleSignIn } from "./utilities/supabase";

import EventList from "./components/EventList";
import Navbar from "./components/Navbar";

function App() {
	const { session, isLoading: sessionLoading } = useAuth();
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
	if (sessionLoading) return <h1>Loading ...</h1>;
	return (
		<div>
			{session && data ? (
				<div className='m-auto'>
					<Navbar />
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
