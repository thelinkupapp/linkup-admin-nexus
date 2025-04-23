
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { UserLinkupActivity } from "@/components/dashboard/UserLinkupActivity";
import { UserLinkupChats } from "@/components/dashboard/UserLinkupChats";
import { DateRange } from "react-day-picker";

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
