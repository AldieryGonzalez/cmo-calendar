import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { CalendarProvider } from "./contexts/CalendarContext.tsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PrivateRoutes from "./utilities/PrivateRoutes.tsx";
import Landing from "./pages/Landing.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Shifts from "./pages/Shifts.tsx";
import EventDetails from "./pages/EventDetails.tsx";
import { Calendar } from "lucide-react";
import Cart from "./pages/Cart.tsx";
import Wildcard from "./pages/Wildcard.tsx";

const root = ReactDOM.createRoot(document.getElementById("root")!);

const supabase = createClient(
  "https://kawwnybalhujdmtujcgo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imthd3dueWJhbGh1amRtdHVqY2dvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyNzIzODksImV4cCI6MjAxMjg0ODM4OX0.iseFC6a7zlbjjoLP59jA2sjK3r9P31uIz9gVAwTmOTY",
);
const queryClient = new QueryClient();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/" element={<PrivateRoutes auth={false} />}>
        <Route index element={<Landing />}></Route>
      </Route>
      <Route path="/" element={<Landing />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/home" element={<Dashboard />}></Route>
        <Route path="/shifts" element={<Shifts />}></Route>
        <Route path="/shifts/:id" element={<EventDetails />}></Route>
        <Route path="/calendar" element={<Calendar />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Route>
      <Route path="*" element={<Wildcard />} />
    </Route>,
  ),
);

root.render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CalendarProvider>
            <RouterProvider router={router} />
          </CalendarProvider>
        </AuthProvider>
      </QueryClientProvider>
    </SessionContextProvider>
  </React.StrictMode>,
);
