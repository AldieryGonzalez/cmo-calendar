import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import { DateRange } from "react-day-picker";
import { getEventsBetween, groupEventsByDay } from "@/utilities/dateUtils";
import { CmoEvent } from "@/utilities/classes/CmoEvent";

type OverviewProps = {
  dateRange: DateRange | undefined;
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

const MyShifts: React.FC<OverviewProps> = ({ dateRange, events }) => {
  const inRangeEvents = getEventsBetween(
    events,
    dateRange?.from,
    dateRange?.to,
  );
  const myEvents = groupEventsByDay(
    inRangeEvents.filter((event) => event.inEvent("Aldi G.")),
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
