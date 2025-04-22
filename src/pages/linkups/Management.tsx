
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { LinkupFilters } from "@/components/dashboard/LinkupFilters";
import { LinkupTable } from "@/components/dashboard/LinkupTable";
import { Toaster } from "@/components/ui/toaster";

const LinkupManagement = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    console.log("Linkup Management component mounted");
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-6 w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Linkup Management</h1>
            <p className="text-muted-foreground">
              View and manage all linkups created on the app
            </p>
          </div>

          {isLoaded ? (
            <LinkupTable />
          ) : (
            <div className="flex justify-center items-center h-64">
              <p>Loading linkup data...</p>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default LinkupManagement;
