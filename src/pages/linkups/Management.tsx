
import { useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { LinkupTable } from "@/components/dashboard/LinkupTable";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const LinkupManagement = () => {
  useEffect(() => {
    console.log("Linkup Management component mounted");
  }, []);

  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-6 w-full max-w-[1400px] mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1 tracking-tight">Linkup Management</h1>
            <p className="text-muted-foreground text-sm">
              View and manage all linkups created on the app
            </p>
          </div>
          <ErrorBoundary fallback={<div className="p-4 border border-red-200 rounded-md bg-red-50 text-red-800">There was an error loading the Linkup table. Please refresh the page or contact support.</div>}>
            <LinkupTable />
          </ErrorBoundary>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default LinkupManagement;
