
import { Sidebar } from "@/components/dashboard/Sidebar";
import UserTable from "@/components/dashboard/UserTable";
import { Toaster } from "@/components/ui/toaster";
import { useEffect, useState } from "react";

const UserManagement = () => {
  console.log("Rendering User Management page");
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    console.log("UserManagement component mounted");
    setIsLoaded(true);
  }, []);
  
  return (
    <div className="flex min-h-screen bg-muted/10">
      <Sidebar />
      <div className="flex-1 ml-64">
        <div className="p-6 w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">User Management</h1>
            <p className="text-muted-foreground">
              View and manage all users registered on the app
            </p>
          </div>

          {isLoaded ? (
            <UserTable />
          ) : (
            <div className="flex justify-center items-center h-64">
              <p>Loading user data...</p>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default UserManagement;
