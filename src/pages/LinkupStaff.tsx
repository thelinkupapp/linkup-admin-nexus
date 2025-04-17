
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { LinkupStaffTable } from "@/components/dashboard/LinkupStaffTable";

const LinkupStaff = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="Linkup Staff Management" />
        <main className="p-6">
          <LinkupStaffTable />
        </main>
      </div>
    </div>
  );
};

export default LinkupStaff;
