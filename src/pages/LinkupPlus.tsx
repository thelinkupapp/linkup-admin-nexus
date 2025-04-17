
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { SubscribersTable } from "@/components/linkup-plus/SubscribersTable";

const LinkupPlus = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="Linkup Plus Subscribers" />
        <main className="p-6">
          <SubscribersTable />
        </main>
      </div>
    </div>
  );
};

export default LinkupPlus;
