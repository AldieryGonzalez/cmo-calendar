import { useCalendar } from "@/utilities/useCalendar";
import SimpleLoading from "@/layouts/SimpleLoading";
import UpcomingShifts from "@/components/Dashboard/UpcomingShifts";
import PastShifts from "@/components/Dashboard/PastShifts";
import DashboardMessages from "@/components/Dashboard/DashboardMessages";

const Dashboard = () => {
  const { data } = useCalendar();
  if (!data) return <SimpleLoading />;

  return (
    <div className="row-span-1 grid h-full grid-cols-1 grid-rows-[max-content_max-content_1fr] px-8 pt-3">
      <div className="">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="w-full">
        <h3 className="text-xl font-normal">Upcoming Shifts</h3>
        <UpcomingShifts events={data} />
      </div>
      <div className="flex gap-4 overflow-auto p-2">
        <DashboardMessages />
        <PastShifts events={data} />
      </div>
    </div>
  );
};

export default Dashboard;
