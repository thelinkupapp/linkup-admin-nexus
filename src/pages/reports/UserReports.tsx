
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UserReportsTable } from "@/components/reports/UserReportsTable";
import { AllReportsDialog } from "@/components/reports/AllReportsDialog";

const UserReports = () => {
  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">User Reports</h1>
            <p className="text-muted-foreground">
              View and manage reports submitted against users on the platform
            </p>
          </div>
        </div>

        <UserReportsTable />
      </div>
    </div>
  );
};

export default UserReports;
