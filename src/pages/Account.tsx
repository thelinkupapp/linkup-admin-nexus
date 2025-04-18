
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
    <div className="container max-w-4xl py-6">
      <div className="flex items-center gap-4 mb-6">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/lovable-uploads/2025b415-79e2-4d69-8a16-54c1f4fffc9e.png" 
                alt="Profile" 
                className="h-16 w-16 rounded-full object-cover"
              />
              <Button size="sm">Change Avatar</Button>
            </div>

            <div className="grid gap-4 grid-cols-2">
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
            <Button type="submit" size="sm">Update Profile</Button>
          </form>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <form onSubmit={handleEmailUpdate} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="email">Email address</Label>
                <Button type="submit" size="sm">Update Email</Button>
              </div>
              <Input 
                id="email" 
                type="email" 
                defaultValue="jack@linkupapp.io"
              />
              <p className="text-xs text-muted-foreground">
                You'll need to verify your new email address
              </p>
            </form>
          </Card>

          <Card className="p-6">
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <Label>Password settings</Label>
                <Button type="submit" size="sm">Update Password</Button>
              </div>
              <div className="space-y-4">
                <Input type="password" placeholder="Current password" />
                <Input type="password" placeholder="New password" />
                <Input type="password" placeholder="Confirm password" />
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}
