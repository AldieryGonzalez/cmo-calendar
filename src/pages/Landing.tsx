import { googleSignIn } from "@/utilities/supabase";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const Landing = () => {
	const supabase = useSupabaseClient();
	return (
		<div className='p-5 mx-auto w-full flex flex-col items-center text-center'>
			<div className='my-4 text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-'>
				Sign in to access this site
			</div>
			<p className='mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400'>
				You must be an employee of the Northwestern Concert Management
				Office at Bienen to gain access
			</p>
			<button
				className='bg-white hover:bg-gray-100 mx-auto text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
				onClick={() => googleSignIn(supabase)}>
				Sign in with Google
			</button>
		</div>
	);
};

export default Landing;
