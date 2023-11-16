import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import {
  getDateRangeFromSearchParams,
  getEventsBetween,
  groupEventsByDay,
} from "@/utilities/dateUtils";
import { CmoEvent } from "@/utilities/classes/CmoEvent";

type OverviewProps = {
  searchParams: URLSearchParams;
  events: CmoEvent[];
};

type DaySectionProps = {
  day: string;
  events: CmoEvent[];
};

type ShiftCardProps = {
  event: CmoEvent;
};

const DaySection: React.FC<DaySectionProps> = ({ day, events }) => {
  return (
    <div>
      <h3 className="text-xl font-semibold">{day}</h3>
      {events.map((event) => (
        <ShiftCard key={event.id} event={event} />
      ))}
    </div>
  );
};

const ShiftCard: React.FC<ShiftCardProps> = ({ event }) => {
  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.timeRangeString}</CardDescription>
      </CardHeader>
    </Card>
  );
};

const MyShifts: React.FC<OverviewProps> = ({ searchParams, events }) => {
  const dateRange = getDateRangeFromSearchParams(searchParams);
  const inRangeEvents = getEventsBetween(
    events,
    dateRange?.from,
    dateRange?.to,
  );
  const searchedEvents = inRangeEvents.filter((event) => {
    if (!searchParams.get("search")) return true;
    return (
      event.hasSearchTerm(searchParams.get("search") as string) ||
      event.hasFilledRoleSearchTerm(
        searchParams.get("search") as string,
        "Aldi G.",
      )
      //   &&
      // event.location.toLowerCase() ==
      //   (searchParams.get("where")?.toLowerCase() as string)
    );
  });
  const myEvents = groupEventsByDay(
    searchedEvents.filter((event) => event.inEvent("Aldi G.")),
  );
  return (
    <TabsContent value="myShifts" className="space-y-4">
      <div className="mx-2 mb-5 flex flex-col gap-2 ">
        <h3 className="text-3xl font-bold">Your Shifts</h3>
        {myEvents.map((day) => {
          return <DaySection key={day.day} day={day.day} events={day.events} />;
        })}
      </div>
    </TabsContent>
  );
};

export default MyShifts;
