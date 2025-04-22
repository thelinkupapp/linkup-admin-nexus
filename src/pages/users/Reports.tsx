
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UserReportsTable } from "@/components/reports/UserReportsTable";
import { Users } from "lucide-react";

const UserReports = () => {
  const totalReports = 3; // Hardcoded for now, you might want to calculate this dynamically later

  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Reports</h1>
          <p className="text-muted-foreground">
            View and manage reports submitted against users on the platform
          </p>
          
          <div className="mt-4 flex items-center gap-2 text-muted-foreground">
            <Users className="h-6 w-6 text-primary/70" />
            <span className="text-lg font-semibold">
              {totalReports} total reports
            </span>
          </div>
        </div>

        <UserReportsTable />
      </div>
    </div>
  );
};

export default UserReports;
