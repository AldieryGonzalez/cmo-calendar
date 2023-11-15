import { useCalendar } from "@/utilities/useCalendar";
import SimpleLoading from "@/layouts/SimpleLoading";
import { CmoEvent } from "@/utilities/classes/CmoEvent";

type ShiftCardProps = {
  event: CmoEvent;
};

const ShiftCard: React.FC<ShiftCardProps> = ({ event }) => {
  return (
    <div className="relative inline-flex h-28 w-72 items-start justify-start gap-4 rounded-md border border-gray-200 py-2.5 pl-2 shadow transition">
      <div className="inline-flex flex-col items-start justify-start gap-1 pr-[59px]">
        <div className="w-[200px] text-sm font-semibold leading-tight text-slate-900">
          Stage Manager
        </div>
        <div className="w-[200px] text-[11px] font-normal leading-tight text-slate-900">
          {event.title}
        </div>
        <div className="inline-flex w-[200px] items-center justify-start gap-1">
          <div className="w-[200px] text-[10px] font-normal leading-none text-slate-500">
            Wednesday November 31, 3:45pm - 10:15
          </div>
        </div>
      </div>
      <button className="transition-all">
        <div className="absolute bottom-0 right-0 top-0 inline-flex w-1/6 flex-col items-center justify-center gap-2.5 rounded-br-md rounded-tr-md bg-purple-900 px-[5px] py-2.5 transition-all hover:w-full hover:rounded-md hover:bg-purple-800">
          <div className="w-10 text-center text-xs font-semibold leading-tight text-white">
            Go to <br />
            Event
          </div>
        </div>
      </button>
    </div>
  );
};

const Dashboard = () => {
  const { data } = useCalendar();
  if (!data) return <SimpleLoading />;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="mx-6 mb-5 flex flex-col gap-2 ">
        {data.map((event) => {
          return <ShiftCard key={event.id} event={event} />;
        })}
      </div>
    </div>
  );
};

export default Dashboard;
