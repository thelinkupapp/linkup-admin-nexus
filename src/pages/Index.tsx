
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { RecentUsers } from "@/components/dashboard/RecentUsers";
import { RecentLinkups } from "@/components/dashboard/RecentLinkups";
import { RecentVerifications } from "@/components/dashboard/RecentVerifications";
import { RecentUserReports } from "@/components/dashboard/RecentUserReports";
import { RecentLinkupReports } from "@/components/dashboard/RecentLinkupReports";

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="Dashboard Overview" />
        <main className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-8 auto-rows-fr">
            <RecentUsers />
            <RecentVerifications />
            <RecentLinkups />
            <RecentUserReports />
            <RecentLinkupReports />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
