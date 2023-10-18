import type { SupabaseClient } from "@supabase/supabase-js";

export async function googleSignIn(supabase: SupabaseClient) {
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
export async function signOut(supabase: SupabaseClient) {
	await supabase.auth.signOut();
}
