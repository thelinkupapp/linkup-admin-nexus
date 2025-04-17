
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { UserFeedbackTable } from "@/components/feedback/UserFeedbackTable";

const UserFeedback = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="User Feedback" />
        <main className="p-6">
          <UserFeedbackTable />
        </main>
      </div>
    </div>
  );
};

export default UserFeedback;
