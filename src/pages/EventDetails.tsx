import { cn } from "@/lib/utils";
import { useCalendar } from "@/utilities/useCalendar";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useCalendar();
  if (!data) return null;
  const event = data.find((event) => event.id === id);
  if (!event) return null;
  const roleInEvent = event.roleInEvent("Aldi G.");
  return (
    <div className="my-8 px-6">
      <section className="flex flex-col space-y-2">
        <h1 className="text-2xl font-semibold">{event.title}</h1>
        <p className="text-gray-600">{event.longTimeRangeString}</p>
        <p>{event.location}</p>
        <div>
          <label className="text-lg font-medium">Shifts</label>
          <hr className="p-0.5"></hr>
          <ul className="w-fit">
            {event.allShifts.map((shift, index) => {
              return (
                <li
                  key={shift.stringify + index}
                  className={cn({
                    ["w-full rounded-full px-4 py-1"]: true,
                    ["bg-zinc-500/25 font-medium"]: roleInEvent == shift.role,
                  })}
                >
                  {shift.stringify}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default EventDetails;
