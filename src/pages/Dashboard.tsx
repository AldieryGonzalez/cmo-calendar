import { useCalendar } from "@/utilities/useCalendar";
import SimpleLoading from "@/layouts/SimpleLoading";
import UpcomingShifts from "@/components/Dashboard/UpcomingShifts";
import PastShifts from "@/components/Dashboard/PastShifts";

const Dashboard = () => {
  const { data } = useCalendar();
  if (!data) return <SimpleLoading />;

  return (
    <div className="flex h-full flex-col space-y-4 p-8 pb-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="mb-5 flex flex-col gap-2">
        <h3 className="text-xl font-normal">Upocming Shifts</h3>
        <UpcomingShifts events={data} />
      </div>
      <div className="flex flex-grow overflow-y-auto bg-red-300 p-2">
        <div className="grow bg-blue-300">1</div>
        {/* <PastShifts events={data} /> */}
      </div>
    </div>
  );
};

export default Dashboard;
