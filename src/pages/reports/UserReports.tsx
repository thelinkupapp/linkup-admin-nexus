
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { UserReportsTable } from "@/components/reports/UserReportsTable";

const UserReports = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="User Reports" />
        <main className="p-6">
          <UserReportsTable />
        </main>
      </div>
    </div>
  );
};

export default UserReports;
