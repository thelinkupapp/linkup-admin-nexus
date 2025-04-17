
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  CheckCircle, 
  Crown, 
  MoreVertical, 
  Search, 
  Filter,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock data for users
const users = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/150?img=1",
    name: "Emma Thompson",
    username: "emma_t",
    email: "emma@example.com",
    age: 28,
    joinDate: "2023-03-15",
    location: "Los Angeles, CA",
    isLinkupPlus: true,
    isVerified: true
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/150?img=2",
    name: "Michael Chen",
    username: "mike_chen",
    email: "michael@example.com",
    age: 32,
    joinDate: "2023-01-22",
    location: "New York, NY",
    isLinkupPlus: false,
    isVerified: true
  },
  {
    id: "3",
    avatar: "https://i.pravatar.cc/150?img=3",
    name: "Sophia Rodriguez",
    username: "sophia_r",
    email: "sophia@example.com",
    age: 25,
    joinDate: "2023-05-07",
    location: "Miami, FL",
    isLinkupPlus: true,
    isVerified: false
  },
  {
    id: "4",
    avatar: "https://i.pravatar.cc/150?img=4",
    name: "James Wilson",
    username: "james_w",
    email: "james@example.com",
    age: 30,
    joinDate: "2023-02-18",
    location: "Chicago, IL",
    isLinkupPlus: false,
    isVerified: false
  },
  {
    id: "5",
    avatar: "https://i.pravatar.cc/150?img=5",
    name: "Olivia Johnson",
    username: "olivia_j",
    email: "olivia@example.com",
    age: 27,
    joinDate: "2023-04-30",
    location: "Austin, TX",
    isLinkupPlus: true,
    isVerified: true
  },
];

export function UserTable() {
  const [searchValue, setSearchValue] = useState("");
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9 w-full sm:w-80"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
          <Button size="sm">Add User</Button>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">@{user.username}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {user.isVerified && (
                      <Badge variant="outline" className="bg-status-verified/10 text-status-verified border-status-verified/20">
                        <CheckCircle className="h-3 w-3 mr-1" /> Verified
                      </Badge>
                    )}
                    {user.isLinkupPlus && (
                      <Badge variant="outline" className="bg-linkup-purple/10 text-linkup-purple border-linkup-purple/20">
                        <Crown className="h-3 w-3 mr-1" /> Plus
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/users/${user.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Suspend User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
