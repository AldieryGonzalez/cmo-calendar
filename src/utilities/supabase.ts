import { supabase } from "@/main";

export async function googleSignIn() {
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
export async function signOut() {
	await supabase.auth.signOut();
}
