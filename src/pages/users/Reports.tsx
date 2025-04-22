
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UserReportsTable } from "@/components/reports/UserReportsTable";
import { AlertCircle } from "lucide-react";

const UserReports = () => {
  const [totalReports, setTotalReports] = useState(3); // Total reports count
  const [filteredCount, setFilteredCount] = useState(3); // Filtered reports count
  const [currentFilter, setCurrentFilter] = useState<"all" | "read" | "unread">("all");
  
  useEffect(() => {
    // Listen for custom events from UserReportsTable component
    const handleReportsFiltered = (e: CustomEvent) => {
      setTotalReports(e.detail.total);
      setFilteredCount(e.detail.filtered);
      setCurrentFilter(e.detail.filterType);
    };
    
    window.addEventListener('reportsFiltered', handleReportsFiltered as EventListener);
    
    return () => {
      window.removeEventListener('reportsFiltered', handleReportsFiltered as EventListener);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-[#1A1F2C]">User Reports</h1>
          <p className="text-muted-foreground">
            View and manage reports submitted against users on the app
          </p>
          
          <div className="mt-4 flex items-center gap-2">
            <AlertCircle className="h-6 w-6 text-[#9b87f5]" />
            {currentFilter === "all" ? (
              <span className="text-lg font-semibold">
                <span className="text-[#9b87f5]">{totalReports}</span>{" "}
                <span className="text-[#1A1F2C]">reports</span>
              </span>
            ) : (
              <span className="text-lg font-semibold">
                <span className="text-[#9b87f5]">Showing {filteredCount}</span>{" "}
                <span className="text-[#1A1F2C]">of {totalReports} reports</span>
              </span>
            )}
          </div>
        </div>

        <UserReportsTable />
      </div>
    </div>
  );
};

export default UserReports;
