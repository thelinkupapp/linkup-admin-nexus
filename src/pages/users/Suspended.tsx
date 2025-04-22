
import { Sidebar } from "@/components/dashboard/Sidebar";
import SuspendedUsersTable from "@/components/dashboard/SuspendedUsersTable";
import { AlertTriangle } from "lucide-react";

const UserSuspended = () => {
  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Suspended Users</h1>
          <p className="text-muted-foreground">
            View and manage users who have been suspended from the platform
          </p>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                These users have been suspended for violating platform policies. Review each case carefully before taking any action.
              </p>
            </div>
          </div>
        </div>

        <SuspendedUsersTable />
      </div>
    </div>
  );
};

export default UserSuspended;
