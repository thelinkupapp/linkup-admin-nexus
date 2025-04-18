import { ArrowLeft, Lock, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { ProfilePicture } from "@/components/profile/ProfilePicture";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function Account() {
  const [profilePic, setProfilePic] = useState("/lovable-uploads/2025b415-79e2-4d69-8a16-54c1f4fffc9e.png");
  const [newEmail, setNewEmail] = useState("");
  const [showEmailConfirm, setShowEmailConfirm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };

  const handleEmailUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmail) {
      toast.error("Please enter a new email address");
      return;
    }
    setShowEmailConfirm(true);
  };

  const confirmEmailUpdate = async () => {
    toast.success("Email verification sent - please check your inbox");
    setShowEmailConfirm(false);
    setNewEmail("");
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    toast.success("Password reset email sent - please check your inbox");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="container max-w-6xl py-4">
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Account Settings</h2>
          <p className="text-muted-foreground">
            Manage your profile and security preferences
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-5 w-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold">Profile Information</h3>
          </div>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <ProfilePicture 
              currentImage={profilePic}
              onImageChange={setProfilePic}
            />
            
            <div className="grid gap-4 sm:grid-cols-2">
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
            <Button type="submit" size="sm" className="w-full">Save Changes</Button>
          </form>
        </Card>

        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Email Address</h3>
            </div>
            <form onSubmit={handleEmailUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Current email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value="jack@linkupapp.io"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newEmail">New email address</Label>
                <Input 
                  id="newEmail" 
                  type="email" 
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Enter new email address"
                />
              </div>
              <Button type="submit" size="sm" className="w-full">Update Email</Button>
            </form>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Password</h3>
            </div>
            <form onSubmit={handlePasswordUpdate} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current password</Label>
                <Input 
                  id="currentPassword" 
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New password</Label>
                <Input 
                  id="newPassword" 
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm new password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <Button type="submit" size="sm" className="w-full">Change Password</Button>
            </form>
          </Card>
        </div>
      </div>

      <AlertDialog open={showEmailConfirm} onOpenChange={setShowEmailConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Email Change</AlertDialogTitle>
            <AlertDialogDescription>
              We'll send a verification link to {newEmail}. You'll need to click the link to confirm your new email address.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setShowEmailConfirm(false)}>
              Cancel
            </Button>
            <Button onClick={confirmEmailUpdate}>
              Send Verification Email
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
