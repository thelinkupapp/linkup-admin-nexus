
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { LinkupTable } from "@/components/dashboard/LinkupTable";

const LinkupManagement = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="Linkup Management" />
        <main className="p-6">
          <LinkupTable />
        </main>
      </div>
    </div>
  );
};

export default LinkupManagement;
