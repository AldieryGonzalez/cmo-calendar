import { getMonthMatrix } from "@/utilities/dateUtils";

const Calendar = () => {
  return (
    <button
      onClick={() => {
        getMonthMatrix();
      }}
    >
      Calendar
    </button>
  );
};

export default Calendar;
