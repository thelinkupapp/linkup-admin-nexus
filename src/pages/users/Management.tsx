
import { Sidebar } from "@/components/dashboard/Sidebar";
import UserTable from "@/components/dashboard/UserTable";
import { DataSort } from "@/components/dashboard/DataSort";
import { useState } from "react";

const UserManagement = () => {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">
            View and manage all users registered on the platform
          </p>
        </div>

        <div className="flex justify-end items-center mb-6">
          <DataSort 
            sortDirection={sortDirection}
            onSortChange={(direction) => setSortDirection(direction)}
          />
        </div>

        <UserTable />
      </div>
    </div>
  );
};

export default UserManagement;
