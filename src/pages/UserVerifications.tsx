
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { VerificationsTable } from "@/components/verifications/VerificationsTable";
import { Toaster } from "@/components/ui/toaster";

const UserVerifications = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="User Verifications" />
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">User Verifications</h1>
            <p className="text-muted-foreground">
              Manage user identity verification requests
            </p>
          </div>
          <VerificationsTable />
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default UserVerifications;
