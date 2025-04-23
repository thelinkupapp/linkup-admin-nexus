
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { UserLinkupActivity } from "@/components/dashboard/UserLinkupActivity";
import { UserLinkupChats } from "@/components/dashboard/UserLinkupChats";

const Linkups = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <UserLinkupActivity dateRange={dateRange} setDateRange={setDateRange} />
      <UserLinkupChats />
    </div>
  );
};

export default Linkups;
