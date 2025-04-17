
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { UserTable } from "@/components/dashboard/UserTable";

const Users = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="User Management" />
        <main className="p-6">
          <UserTable />
        </main>
      </div>
    </div>
  );
};

export default Users;
