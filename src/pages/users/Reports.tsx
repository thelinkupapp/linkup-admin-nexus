
import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UserReportsTable } from "@/components/reports/UserReportsTable";
import { AllReportsDialog } from "@/components/reports/AllReportsDialog";
import { Button } from "@/components/ui/button";

const UserReports = () => {
  const [isAllReportsOpen, setIsAllReportsOpen] = useState(false);
  
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
          <Button 
            onClick={() => setIsAllReportsOpen(true)}
            className="bg-purple-500 hover:bg-purple-600"
          >
            View All Reports
          </Button>
        </div>

        <UserReportsTable />
        
        <AllReportsDialog
          open={isAllReportsOpen}
          onOpenChange={setIsAllReportsOpen}
          reports={[]}
          title="All User Reports"
          showMarkAsRead
        />
      </div>
    </div>
  );
};

export default UserReports;
