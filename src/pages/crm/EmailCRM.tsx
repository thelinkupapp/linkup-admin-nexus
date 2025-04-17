
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { EmailSubscribersTable } from "@/components/crm/EmailSubscribersTable";

const EmailCRM = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="Email Marketing CRM" />
        <main className="p-6">
          <EmailSubscribersTable />
        </main>
      </div>
    </div>
  );
};

export default EmailCRM;
