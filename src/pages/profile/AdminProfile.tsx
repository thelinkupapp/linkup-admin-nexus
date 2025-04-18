
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Camera, KeyRound, Shield, Bell } from "lucide-react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";

export default function AdminProfile() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="My Profile" />
        <main className="p-6">
          <div className="max-w-5xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage 
                        src="/lovable-uploads/2025b415-79e2-4d69-8a16-54c1f4fffc9e.png" 
                        alt="Profile" 
                      />
                      <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                      <Button variant="outline" className="gap-2">
                        <Camera className="h-4 w-4" />
                        Change Photo
                      </Button>
                      <p className="text-sm text-muted-foreground">
                        JPG, GIF or PNG. Max size of 2MB
                      </p>
                    </div>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" defaultValue="Jack Peagam" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="jack@linkupapp.io" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input id="role" defaultValue="Admin" disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="joined">Joined Date</Label>
                      <Input id="joined" defaultValue="March 15, 2023" disabled />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="security" className="w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="permissions">Permissions</TabsTrigger>
              </TabsList>
              <TabsContent value="security" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <KeyRound className="h-5 w-5" />
                      Password & Authentication
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    <Button>Update Password</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="notifications" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Notification preferences would go here */}
                    <p className="text-sm text-muted-foreground">
                      Notification preferences section coming soon
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="permissions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Access & Permissions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Permissions information would go here */}
                    <p className="text-sm text-muted-foreground">
                      Permissions section coming soon
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}
