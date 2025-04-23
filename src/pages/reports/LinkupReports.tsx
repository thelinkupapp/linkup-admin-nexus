
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { LinkupReportsTable } from "@/components/reports/LinkupReportsTable";

const LinkupReports = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="Linkup Reports" subtitle="Review and manage reported linkups" />
        <main className="p-6">
          <LinkupReportsTable />
        </main>
      </div>
    </div>
  );
};

export default LinkupReports;
