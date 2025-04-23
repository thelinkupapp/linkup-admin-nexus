import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, UserPlus } from "lucide-react";
import { User } from "@/types/user";
import { useToast } from "@/hooks/use-toast";

// Mock data from User Management
const mockUsers: User[] = [
  {
    id: "1",
    firstName: "Sarah",
    lastName: "Wilson",
    username: "@sarah",
    avatar: "/lovable-uploads/0a1432b0-c905-4dd9-a32d-0d42660de0f6.png",
    email: "sarah@example.com",
    age: 28,
    joinDate: "2024-01-15",
    location: "New York",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "American",
    gender: "Female",
    hostedLinkups: 5,
    attendedLinkups: 12,
    totalEarnings: 1500
  },
  {
    id: "2",
    firstName: "Mike",
    lastName: "Johnson",
    username: "@mike",
    avatar: "/lovable-uploads/1d844ea0-52cc-4ed0-b8d2-cb250bf887d2.png",
    email: "mike@example.com",
    age: 32,
    joinDate: "2024-02-01",
    location: "Los Angeles",
    isLinkupPlus: false,
    isVerified: true,
    nationality: "American",
    gender: "Male",
    hostedLinkups: 3,
    attendedLinkups: 8,
    totalEarnings: 800
  }
];

type SelectedUser = Pick<User, 'id' | 'firstName' | 'lastName' | 'username' | 'avatar'>;

export function AddStaffDialog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<SelectedUser | null>(null);
  const [role, setRole] = useState("");
  const { toast } = useToast();

  const filteredUsers = searchQuery
    ? mockUsers.filter(
        user => 
          `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleAddStaff = (close: () => void) => {
    if (selectedUser && role) {
      const newStaffMember = {
        id: selectedUser.id,
        name: `${selectedUser.firstName} ${selectedUser.lastName}`,
        username: selectedUser.username,
        avatar: selectedUser.avatar,
        role: role
      };
      
      // Dispatch event to add staff member
      window.dispatchEvent(new CustomEvent('addStaffMember', { 
        detail: newStaffMember 
      }));
      
      toast({
        title: "Staff Member Added",
        description: `${selectedUser.firstName} ${selectedUser.lastName} has been added as ${role}`,
      });
      
      close();
      setSelectedUser(null);
      setRole("");
      setSearchQuery("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-[#8B5CF6] hover:bg-[#7C3AED]">
          <UserPlus className="h-4 w-4" />
          Add Staff Member
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Staff Member</DialogTitle>
        </DialogHeader>

        {!selectedUser ? (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users by name or username..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery && (
              <div className="rounded-md border">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 hover:bg-muted/50 cursor-pointer"
                    onClick={() => setSelectedUser({
                      id: user.id,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      username: user.username,
                      avatar: user.avatar
                    })}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
                        <AvatarFallback>{user.firstName[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.firstName} {user.lastName}</div>
                        <div className="text-sm text-muted-foreground">{user.username}</div>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredUsers.length === 0 && (
                  <div className="p-4 text-center text-muted-foreground">
                    No users found
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 rounded-md border">
              <Avatar>
                <AvatarImage src={selectedUser.avatar} alt={`${selectedUser.firstName} ${selectedUser.lastName}`} />
                <AvatarFallback>{selectedUser.firstName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{selectedUser.firstName} {selectedUser.lastName}</div>
                <div className="text-sm text-muted-foreground">{selectedUser.username}</div>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium">
                Role
              </label>
              <Input
                id="role"
                placeholder="Enter staff member role..."
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                Back
              </Button>
              <Button 
                onClick={(e) => {
                  const closeButton = e.currentTarget.closest('[role="dialog"]')?.querySelector('[data-radix-collection-item]') as HTMLButtonElement;
                  if (closeButton) {
                    handleAddStaff(() => closeButton.click());
                  }
                }} 
                className="bg-[#8B5CF6] hover:bg-[#7C3AED]" 
                disabled={!role}
              >
                Add Staff Member
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
