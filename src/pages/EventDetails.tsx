import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Shift } from "@/utilities/classes/Shift";
import { useCalendar } from "@/utilities/useCalendar";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, ShoppingCart, XCircle } from "lucide-react";
import { useParams } from "react-router-dom";

interface ShiftButtonProps {
  shift: Shift;
  isMine: boolean;
}
const ShiftButton: React.FC<ShiftButtonProps> = ({ shift, isMine }) => {
  return (
    <li
      className={cn({
        ["relative w-full rounded-full border-2 py-1 pl-4 pr-10 shadow-lg"]:
          true,
        ["border-black/50 font-medium"]: isMine,
      })}
    >
      {shift.stringify}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="absolute bottom-0 right-0 top-0 rounded-e-full bg-purple-800 px-2">
            <MoreHorizontal className="mx-auto text-white" size={16} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          alignOffset={-26}
          side="bottom"
          className="w-full rounded-lg bg-white px-3 py-2.5"
        >
          {shift.isUnfilled && (
            <DropdownMenuItem asChild>
              <>
                <button className="flex w-52 items-center gap-3 text-left">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <DropdownMenuSeparator />
              </>
            </DropdownMenuItem>
          )}
          {isMine && (
            <DropdownMenuItem asChild>
              <>
                <button className="flex w-52 items-center gap-2 text-left text-red-700">
                  <XCircle size={20} />
                  Request Shift Sub
                </button>
                <DropdownMenuSeparator />
              </>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem>Go to contact</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </li>
  );
};

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useCalendar();
  if (!data) return null;
  const event = data.find((event) => event.id === id);
  if (!event) return null;
  const roleInEvent = event.roleInEvent("Aldi G.");
  return (
    <div className="container py-8">
      <section className="flex flex-col space-y-2">
        <h1 className="text-xl font-medium md:text-2xl">{event.title}</h1>
        <div className="flex flex-col text-sm text-gray-600 sm:flex-row">
          <p>{event.longTimeRangeString}</p>
          <p>{`@${event.location}`}</p>
        </div>
        <div>
          <label className="text-lg font-medium">Shifts</label>
          <hr className="p-0.5"></hr>
          <ul className="w-fit space-y-1">
            {event.allShifts.map((shift, index) => {
              return (
                <ShiftButton
                  key={shift.stringify + index}
                  shift={shift}
                  isMine={
                    roleInEvent === shift.role && shift.filledBy === "Aldi G."
                  }
                />
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default EventDetails;
