/* eslint-disable @typescript-eslint/no-unused-vars */
import { fetchCalendar } from "@/utilities/api";
import type { CmoEvent } from "@/utilities/classes/CmoEvent";
import { useAuth } from "@/utilities/useAuth";
import { startOfMonth } from "date-fns";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

type CalendarProviderProps = {
  children: React.ReactNode;
};

type CalValues = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: CmoEvent[] | undefined;
  calLoading: boolean;
};

export const CalendarContext = React.createContext({} as CalValues);

export const CalendarProvider: React.FC<CalendarProviderProps> = ({
  children,
}) => {
  const { session } = useAuth();
  const { data, isLoading: calLoading } = useQuery(
    ["calendarEvents", "initial"],
    fetchData,
    {
      enabled: !!session,
    },
  );

  async function fetchData() {
    const startDate = startOfMonth(new Date(2023, 9));
    const endDate = startOfMonth(new Date(2024, 3));
    const result = await fetchCalendar(
      session,
      startDate.toISOString(),
      endDate.toISOString(),
    );
    return result;
  }

  useEffect(() => {}, []);

  const value = {
    data,
    calLoading,
  };
  // if (calLoading) return <SimpleLoading />;
  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};
