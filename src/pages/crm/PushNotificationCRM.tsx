
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { PushPreferencesTable } from "@/components/crm/PushPreferencesTable";

const PushNotificationCRM = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="Push Notification Preferences" />
        <main className="p-6">
          <PushPreferencesTable />
        </main>
      </div>
    </div>
  );
};

export default PushNotificationCRM;
