import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { addMonths } from "date-fns";
import { useCalendar } from "@/utilities/useCalendar";
import SimpleLoading from "@/layouts/SimpleLoading";
import MyShifts from "@/components/Shifts/MyShifts";
import OpenShifts from "@/components/Shifts/OpenShifts";

import SearchBar from "@/components/Shifts/SearchBar";
import { useSearchParams } from "react-router-dom";

const Shifts = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    start: new Date().toISOString(),
    end: addMonths(new Date(), 2).toISOString(),
  });

  const { data } = useCalendar();

  console.table({
    start: searchParams.get("start"),
    end: searchParams.get("end"),
    search: searchParams.get("search"),
    where: searchParams.get("where"),
    setSearchParams,
  });
  if (!data) return <SimpleLoading />;

  return (
    <div className="flex-1 space-y-4 p-5 pt-6">
      <Tabs defaultValue="myShifts" className="space-y-4">
        <div className="flex flex-col items-center justify-between gap-6 space-x-2 md:flex-row">
          <TabsList>
            <TabsTrigger value="myShifts">My Shifts</TabsTrigger>
            <TabsTrigger value="openShifts">Open Shifts</TabsTrigger>
            <TabsTrigger value="allShifts">All Shifts</TabsTrigger>
          </TabsList>
          <SearchBar
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </div>
        <MyShifts events={data} searchParams={searchParams} />
        <OpenShifts events={data} searchParams={searchParams} />
      </Tabs>
    </div>
  );
};

export default Shifts;
