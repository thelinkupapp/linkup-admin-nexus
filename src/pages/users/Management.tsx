
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UserTable } from "@/components/dashboard/UserTable";
import { UserFilters } from "@/components/dashboard/UserFilters";
import { DataSort } from "@/components/dashboard/DataSort";

const UserManagement = () => {
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

        <div className="flex justify-between items-center mb-6">
          <UserFilters />
          <DataSort />
        </div>

        <UserTable />
      </div>
    </div>
  );
};

export default UserManagement;
