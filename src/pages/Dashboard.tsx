import { useCalendar } from "@/utilities/useCalendar";
import SimpleLoading from "@/layouts/SimpleLoading";
import UpcomingShifts from "@/components/Dashboard/UpcomingShifts";

const Dashboard = () => {
  const { data } = useCalendar();
  if (!data) return <SimpleLoading />;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="mb-5 flex flex-col gap-2 ">
        <h3 className="text-xl font-normal">Upocming Shifts</h3>
        <UpcomingShifts events={data} />
      </div>
    </div>
  );
};

export default Dashboard;
