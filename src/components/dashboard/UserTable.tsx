import { 
  MoreVertical, 
  Ban,
  ArrowUpDown,
  Eye,
  Trash2
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { DataSort } from "@/components/dashboard/DataSort";
import { SuspendUserDialog } from "@/components/dashboard/SuspendUserDialog";
import { DeleteUserDialog } from "@/components/dashboard/DeleteUserDialog";

const mockUsers: User[] = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/150?img=1",
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    age: 30,
    joinDate: "2022-01-01",
    location: "New York, USA",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "American",
    gender: "Male",
    hostedLinkups: 5,
    attendedLinkups: 10,
    totalEarnings: 500,
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/150?img=2",
    name: "Jane Smith",
    username: "janesmith",
    email: "jane.smith@example.com",
    age: 25,
    joinDate: "2022-02-15",
    location: "Los Angeles, USA",
    isLinkupPlus: false,
    isVerified: false,
    nationality: "American",
    gender: "Female",
    hostedLinkups: 2,
    attendedLinkups: 7,
    totalEarnings: 250,
  },
  {
    id: "3",
    avatar: "https://i.pravatar.cc/150?img=3",
    name: "Alice Johnson",
    username: "alicejohnson",
    email: "alice.johnson@example.com",
    age: 28,
    joinDate: "2022-03-10",
    location: "Chicago, USA",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "American",
    gender: "Female",
    hostedLinkups: 8,
    attendedLinkups: 12,
    totalEarnings: 750,
  },
  {
    id: "4",
    avatar: "https://i.pravatar.cc/150?img=4",
    name: "Bob Williams",
    username: "bobwilliams",
    email: "bob.williams@example.com",
    age: 35,
    joinDate: "2022-04-05",
    location: "Houston, USA",
    isLinkupPlus: false,
    isVerified: true,
    nationality: "American",
    gender: "Male",
    hostedLinkups: 3,
    attendedLinkups: 9,
    totalEarnings: 300,
  },
  {
    id: "5",
    avatar: "https://i.pravatar.cc/150?img=5",
    name: "Emily Brown",
    username: "emilybrown",
    email: "emily.brown@example.com",
    age: 22,
    joinDate: "2022-05-20",
    location: "Phoenix, USA",
    isLinkupPlus: true,
    isVerified: false,
    nationality: "American",
    gender: "Female",
    hostedLinkups: 6,
    attendedLinkups: 11,
    totalEarnings: 600,
  },
  {
    id: "6",
    avatar: "https://i.pravatar.cc/150?img=6",
    name: "David Jones",
    username: "davidjones",
    email: "david.jones@example.com",
    age: 40,
    joinDate: "2022-06-15",
    location: "Philadelphia, USA",
    isLinkupPlus: false,
    isVerified: true,
    nationality: "American",
    gender: "Male",
    hostedLinkups: 4,
    attendedLinkups: 8,
    totalEarnings: 400,
  },
  {
    id: "7",
    avatar: "https://i.pravatar.cc/150?img=7",
    name: "Olivia Garcia",
    username: "oliviagarcia",
    email: "olivia.garcia@example.com",
    age: 27,
    joinDate: "2022-07-01",
    location: "San Antonio, USA",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "American",
    gender: "Female",
    hostedLinkups: 7,
    attendedLinkups: 13,
    totalEarnings: 800,
  },
  {
    id: "8",
    avatar: "https://i.pravatar.cc/150?img=8",
    name: "James Rodriguez",
    username: "jamesrodriguez",
    email: "james.rodriguez@example.com",
    age: 33,
    joinDate: "2022-08-10",
    location: "San Diego, USA",
    isLinkupPlus: false,
    isVerified: false,
    nationality: "American",
    gender: "Male",
    hostedLinkups: 1,
    attendedLinkups: 6,
    totalEarnings: 200,
  },
  {
    id: "9",
    avatar: "https://i.pravatar.cc/150?img=9",
    name: "Sophia Martinez",
    username: "sophiamartinez",
    email: "sophia.martinez@example.com",
    age: 29,
    joinDate: "2022-09-05",
    location: "Dallas, USA",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "American",
    gender: "Female",
    hostedLinkups: 9,
    attendedLinkups: 14,
    totalEarnings: 900,
  },
  {
    id: "10",
    avatar: "https://i.pravatar.cc/150?img=10",
    name: "Michael Anderson",
    username: "michaelanderson",
    email: "michael.anderson@example.com",
    age: 31,
    joinDate: "2022-10-20",
    location: "San Jose, USA",
    isLinkupPlus: false,
    isVerified: true,
    nationality: "American",
    gender: "Male",
    hostedLinkups: 2,
    attendedLinkups: 7,
    totalEarnings: 250,
  },
];

export default function UserTable() {
  const [users, setUsers] = useState<User[] | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();
  const [isSuspendDialogOpen, setSuspendDialogOpen] = useState(false);
  const [suspendUserId, setSuspendUserId] = useState("");
  const [suspendUsername, setSuspendUsername] = useState("");
  const [suspendUserAvatar, setSuspendUserAvatar] = useState("");
  const [suspendUserName, setSuspendUserName] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [deleteUsername, setDeleteUsername] = useState("");
  const [deleteUserAvatar, setDeleteUserAvatar] = useState("");
  const [deleteUserName, setDeleteUserName] = useState("");

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setUsers(mockUsers);
    }, 500);
  }, []);

  const handleUserAction = (action: string, userId: string, username?: string, avatar?: string, name?: string) => {
    switch (action) {
      case 'view':
        navigate(`/users/${userId}`);
        break;
      case 'suspend':
        setSuspendDialogOpen(true);
        setSuspendUserId(userId);
        setSuspendUsername(username || "");
        setSuspendUserAvatar(avatar || "");
        setSuspendUserName(name || "");
        break;
      case 'delete':
        setIsDeleteDialogOpen(true);
        setDeleteUserId(userId);
        setDeleteUsername(username || "");
        setDeleteUserAvatar(avatar || "");
        setDeleteUserName(name || "");
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <DataSort sortDirection={sortDirection} onSortChange={setSortDirection} />
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>
              Nationality
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users === null ? (
            // Render skeleton rows when data is loading
            [...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[150px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="h-8 w-[100px]" />
                </TableCell>
              </TableRow>
            ))
          ) : users.length > 0 ? (
            // Render user data when available
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  {user.name}
                  {user.isLinkupPlus && (
                    <Badge className="ml-2 badge-verified">Plus</Badge>
                  )}
                  {!user.isVerified && (
                    <Badge className="ml-2 badge-pending">Unverified</Badge>
                  )}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>@{user.username}</TableCell>
                <TableCell>{user.nationality}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <MoreVertical className="h-4 w-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleUserAction('view', user.id, user.username, user.avatar, user.name)}>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUserAction('suspend', user.id, user.username, user.avatar, user.name)}>
                        <Ban className="mr-2 h-4 w-4" />
                        <span>Suspend</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUserAction('delete', user.id, user.username, user.avatar, user.name)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            // Render message when no data is available
            <TableRow>
              <TableCell colSpan={6} className="text-center">No users found.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      <SuspendUserDialog
        isOpen={isSuspendDialogOpen}
        onClose={() => setSuspendDialogOpen(false)}
        userId={suspendUserId}
        username={suspendUsername}
        userAvatar={suspendUserAvatar}
        userName={suspendUserName}
      />
      
      <DeleteUserDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        userId={deleteUserId}
        username={deleteUsername}
        userAvatar={deleteUserAvatar}
        userName={deleteUserName}
      />
    </div>
  );
}
