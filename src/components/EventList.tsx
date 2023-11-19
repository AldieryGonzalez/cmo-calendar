import Event from "./Event";
import { CmoEvent } from "@/utilities/classes/CmoEvent";

type Props = {
  events: CmoEvent[];
};

export const EventList: React.FC<Props> = ({ events }) => {
  let curDate = "null";
  return (
    <div className="mx-6 mb-5 flex flex-col gap-2 ">
      {events.map((event) => {
        const date = event.longDateString;
        const newDate = curDate !== date;
        if (newDate) {
          curDate = date;
        }
        return (
          <div key={event.id}>
            {newDate && (
              <>
                <h1 className="mt-6 text-xl font-bold">{date}</h1>
                <hr></hr>
              </>
            )}
            <Event key={event.id} event={event} />
          </div>
        );
      })}
    </div>
  );
};

export default EventList;
