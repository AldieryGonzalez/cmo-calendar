import React, { useEffect } from "react";
import {
	useSessionContext,
	useSupabaseClient,
} from "@supabase/auth-helpers-react";

import type { Session, SupabaseClient, AuthError } from "@supabase/supabase-js";

type AuthProviderProps = {
	children: React.ReactNode;
};

type AuthValues = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	supabase: SupabaseClient<any, "public", any>;
	session: Session | null;
	error: AuthError | null;
	isLoading: boolean;
};

export const AuthContext = React.createContext({} as AuthValues);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const supabase = useSupabaseClient();
	const { session, error, isLoading } = useSessionContext();

	useEffect(() => {}, []);

	const value = {
		supabase,
		session,
		error,
		isLoading,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
