
import { useState } from "react";
import { Shield, Mail, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminList } from "@/components/settings/AdminList";
import { AddAdminForm } from "@/components/settings/AddAdminForm";

export default function AdminManagement() {
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);

  // Mock super admin check - replace with actual auth check
  const isSuperAdmin = true;

  if (!isSuperAdmin) {
    return (
      <div className="rounded-lg border p-4">
        <p className="text-sm text-muted-foreground">
          Only super administrators can access these settings.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Manage administrator access and permissions
        </p>
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
