
import { Sidebar } from "@/components/dashboard/Sidebar";
import UserTable from "@/components/dashboard/UserTable";

const UserManagement = () => {
  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      {/* Added overflow-x-hidden and max-w-full to prevent horizontal scroll */}
      <div className="flex-1 ml-64 overflow-x-hidden max-w-full">
        {/* Added px-8 instead of p-8 and adjusted width to prevent content from being too close to the edge */}
        <div className="py-8 px-8 w-[calc(100vw-16rem)]">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">User Management</h1>
            <p className="text-muted-foreground">
              View and manage all users registered on the platform
            </p>
          </div>

          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
