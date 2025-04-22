
import { useState, useEffect } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { LinkupTable } from "@/components/dashboard/LinkupTable";
import { Toaster } from "@/components/ui/toaster";

const LinkupManagement = () => {
  useEffect(() => {
    console.log("Linkup Management component mounted");
  }, []);

  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-10 w-full max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold mb-1 tracking-tight">Linkup Management</h1>
            <p className="text-muted-foreground text-lg">
              View and manage all linkups created on the app
            </p>
          </div>
          <LinkupTable />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default LinkupManagement;
