
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { LinkupTable } from "@/components/dashboard/LinkupTable";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const LinkupManagement = () => {
  const [filteredCount, setFilteredCount] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  // Only display top count (no duplicate)
  const handleCountChange = (counts: { filtered: number; total: number }) => {
    setFilteredCount(counts.filtered);
    setTotalCount(counts.total);
  };

  useEffect(() => {
    console.log("Linkup Management component mounted");
  }, []);

  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-6 w-full max-w-[1300px] mx-auto">
          <div className="mb-0 pb-0">
            <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
              Linkup Management
            </h1>
            <p className="text-muted-foreground text-sm mb-4">
              View and manage all linkups created on the app
            </p>
            <div className="flex items-center gap-2 mt-1 mb-2">
              <svg width="28" height="28" fill="none" stroke="#9b87f5" strokeWidth="2" viewBox="0 0 24 24"><circle cx="9" cy="7" r="4"/><path d="M17 11v-.5A4.5 4.5 0 0 0 12.5 6h-.5"/><path d="M17 14h.01M21 17c0-2.21-3.58-4-8-4s-8 1.79-8 4m16 0v3a2 2 0 0 1-2 2h-2"/></svg>
              <span className="text-xl font-bold">
                {filteredCount !== null && totalCount !== null && filteredCount !== totalCount ? (
                  <>
                    <span className="text-[#9b87f5] font-bold">{filteredCount}</span>
                    <span className="text-gray-700 font-medium ml-2">
                      of <span className="font-bold text-[#9b87f5]">{totalCount}</span> linkups
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[#9b87f5] font-bold">{totalCount ?? 0}</span>
                    <span className="text-gray-700 font-medium ml-2">total linkups</span>
                  </>
                )}
              </span>
            </div>
          </div>
          <ErrorBoundary fallback={<div className="p-4 border border-red-200 rounded-md bg-red-50 text-red-800">There was an error loading the Linkup table. Please refresh the page or contact support.</div>}>
            <LinkupTable onCountChange={handleCountChange} />
          </ErrorBoundary>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default LinkupManagement;
