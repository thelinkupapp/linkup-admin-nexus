
import { Sidebar } from "@/components/dashboard/Sidebar";
import UserTable from "@/components/dashboard/UserTable";

const UserManagement = () => {
  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      {/* Adding width calc and overflow handling to prevent content from being cut off */}
      <div className="flex-1 ml-64 overflow-x-auto">
        {/* Changed to a fixed width that considers the sidebar width */}
        <div className="py-8 px-8 w-full max-w-[calc(100vw-16rem-2rem)]">
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
