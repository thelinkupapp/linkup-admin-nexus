
import { useState } from "react";
import { Shield, Mail, UserPlus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminList } from "@/components/settings/AdminList";
import { AddAdminForm } from "@/components/settings/AddAdminForm";
import { toast } from "sonner";

export default function AdminManagement() {
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);

  // Mock super admin check - replace with actual auth check
  const isSuperAdmin = true;

  if (!isSuperAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <AlertTriangle className="h-12 w-12 text-yellow-500" />
        <h2 className="text-2xl font-semibold">Access Restricted</h2>
        <p className="text-muted-foreground">
          Only super administrators can access this page.
        </p>
      </div>
    );
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">Admin Management</h2>
          <p className="text-muted-foreground">
            Manage administrator access and permissions
          </p>
        </div>
        <Button onClick={() => setIsAddingAdmin(true)} className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add Admin
        </Button>
      </div>

      <AdminList />
      
      <AddAdminForm 
        open={isAddingAdmin} 
        onOpenChange={setIsAddingAdmin}
      />
    </div>
  );
}
