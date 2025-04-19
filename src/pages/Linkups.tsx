
import { Navigate } from "react-router-dom";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { UserLinkupsTable } from "@/components/dashboard/UserLinkupsTable";

const Linkups = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="Linkups" />
        <main className="p-6">
          <UserLinkupsTable />
        </main>
      </div>
    </div>
  );
};

export default Linkups;
