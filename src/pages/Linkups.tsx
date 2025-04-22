
import { Navigate } from "react-router-dom";
import { UserLinkupActivity } from "@/components/dashboard/UserLinkupActivity";
import { UserLinkupChats } from "@/components/dashboard/UserLinkupChats";

const Linkups = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <UserLinkupActivity />
      <UserLinkupChats />
    </div>
  );
};

export default Linkups;
