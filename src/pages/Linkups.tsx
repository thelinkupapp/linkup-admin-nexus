
import { Navigate } from "react-router-dom";
import { UserLinkupActivity } from "@/components/dashboard/UserLinkupActivity";
import { UserLinkupChats } from "@/components/dashboard/UserLinkupChats";

const Linkups = () => {
  return (
    <div className="space-y-8">
      <UserLinkupActivity />
      <UserLinkupChats />
    </div>
  );
};

export default Linkups;
