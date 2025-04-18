
import { Sidebar } from "@/components/dashboard/Sidebar";
import { UserDeletedTable } from "@/components/dashboard/UserDeletedTable";

const UserDeleted = () => {
  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Deleted Users</h1>
          <p className="text-muted-foreground">
            View and manage all deleted user accounts
          </p>
        </div>

        <UserDeletedTable />
      </div>
    </div>
  );
};

export default UserDeleted;
