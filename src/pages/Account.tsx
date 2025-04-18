
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Account() {
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Email verification sent - please check your inbox");
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password reset email sent - please check your inbox");
  };

  return (
    <div className="container py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Account</h2>
          <p className="text-muted-foreground">
            Manage your account settings
          </p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <img 
                src="/lovable-uploads/2025b415-79e2-4d69-8a16-54c1f4fffc9e.png" 
                alt="Profile" 
                className="h-20 w-20 rounded-full object-cover"
              />
              <Button>Change Avatar</Button>
            </div>

            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input id="firstName" defaultValue="Jack" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" defaultValue="Peagam" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value="Super Admin" disabled />
              </div>
              <Button type="submit">Update Profile</Button>
            </form>
          </div>
        </Card>

        <Card className="p-6">
          <form onSubmit={handleEmailUpdate} className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Email Settings</h3>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input 
                id="email" 
                type="email" 
                defaultValue="jack@linkupapp.io"
              />
              <p className="text-sm text-muted-foreground">
                You'll need to verify your new email address
              </p>
            </div>
            <Button type="submit">Update Email</Button>
          </form>
        </Card>

        <Card className="p-6">
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Password Settings</h3>
            <div className="space-y-2">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input id="confirm" type="password" />
            </div>
            <Button type="submit">Update Password</Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
