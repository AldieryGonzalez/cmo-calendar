import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CalendarProvider } from "./contexts/CalendarContext.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const supabase = createClient(
	"https://kawwnybalhujdmtujcgo.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imthd3dueWJhbGh1amRtdHVqY2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyNzIzODksImV4cCI6MjAxMjg0ODM4OX0.iseFC6a7zlbjjoLP59jA2sjK3r9P31uIz9gVAwTmOTY"
);
const queryClient = new QueryClient();

root.render(
	<React.StrictMode>
		<SessionContextProvider supabaseClient={supabase}>
			<QueryClientProvider client={queryClient}>
				<AuthProvider>
					<CalendarProvider>
						<App />
					</CalendarProvider>
				</AuthProvider>
			</QueryClientProvider>
		</SessionContextProvider>
	</React.StrictMode>
);
