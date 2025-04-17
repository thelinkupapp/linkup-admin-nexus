import { useState } from "react";
import { Search, User as UserIcon, Coins, CalendarDays, Users, MapPin, MoreHorizontal, Ban, Filter, Flag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserFilters } from "./UserFilters";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

const users: User[] = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/150?img=1",
    name: "Emma Thompson",
    username: "emma_t",
    email: "emma@example.com",
    age: 28,
    joinDate: "2023-03-15",
    location: "London, UK",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "UK",
    gender: "Female",
    hostedLinkups: 15,
    attendedLinkups: 23,
    totalEarnings: 1250.50
  },
  // ... Add more mock users with similar structure
];

const UserTable = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [selectedNationalities, setSelectedNationalities] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState([18, 100]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showLinkupPlusOnly, setShowLinkupPlusOnly] = useState(false);

  const [earningsSortDirection, setEarningsSortDirection] = useState<"asc" | "desc" | null>(null);
  const [hostedSortDirection, setHostedSortDirection] = useState<"asc" | "desc" | null>(null);
  const [attendedSortDirection, setAttendedSortDirection] = useState<"asc" | "desc" | null>(null);

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const handleUserAction = (action: string, userId: string) => {
    switch (action) {
      case 'view':
        navigate(`/users/${userId}`);
        break;
      case 'edit':
        navigate(`/users/${userId}/edit`);
        break;
      case 'suspend':
        console.log(`Suspend user ${userId}`);
        // Implement suspension logic
        break;
      default:
        break;
    }
  };

  const handleSort = (type: "earnings" | "hosted" | "attended") => {
    if (type !== "earnings") setEarningsSortDirection(null);
    if (type !== "hosted") setHostedSortDirection(null);
    if (type !== "attended") setAttendedSortDirection(null);

    switch (type) {
      case "earnings":
        setEarningsSortDirection(prev => prev === "asc" ? "desc" : "asc");
        break;
      case "hosted":
        setHostedSortDirection(prev => prev === "asc" ? "desc" : "asc");
        break;
      case "attended":
        setAttendedSortDirection(prev => prev === "asc" ? "desc" : "asc");
        break;
    }
  };

  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchValue.toLowerCase());
      const matchesNationality = selectedNationalities.length === 0 || 
                                selectedNationalities.includes(user.nationality);
      const matchesGender = selectedGenders.length === 0 || 
                           selectedGenders.includes(user.gender.toLowerCase());
      const matchesLocation = selectedLocations.length === 0 || 
                             selectedLocations.includes(user.location);
      const matchesAge = user.age >= ageRange[0] && user.age <= ageRange[1];
      const matchesVerified = !showVerifiedOnly || user.isVerified;
      const matchesLinkupPlus = !showLinkupPlusOnly || user.isLinkupPlus;
      
      return matchesSearch && matchesNationality && matchesGender && 
             matchesLocation && matchesAge && matchesVerified && matchesLinkupPlus;
    })
    .sort((a, b) => {
      if (earningsSortDirection) {
        return earningsSortDirection === "asc" 
          ? a.totalEarnings - b.totalEarnings
          : b.totalEarnings - a.totalEarnings;
      }
      if (hostedSortDirection) {
        return hostedSortDirection === "asc"
          ? a.hostedLinkups - b.hostedLinkups
          : b.hostedLinkups - a.hostedLinkups;
      }
      if (attendedSortDirection) {
        return attendedSortDirection === "asc"
          ? a.attendedLinkups - b.attendedLinkups
          : b.attendedLinkups - a.attendedLinkups;
      }
      return 0;
    });

  return (
    <div className="space-y-4">
      <UserFilters
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        selectedNationalities={selectedNationalities}
        setSelectedNationalities={setSelectedNationalities}
        selectedGenders={selectedGenders}
        setSelectedGenders={setSelectedGenders}
        selectedLocations={selectedLocations}
        setSelectedLocations={setSelectedLocations}
        showVerifiedOnly={showVerifiedOnly}
        setShowVerifiedOnly={setShowVerifiedOnly}
        showLinkupPlusOnly={showLinkupPlusOnly}
        setShowLinkupPlusOnly={setShowLinkupPlusOnly}
        ageRange={ageRange}
        setAgeRange={setAgeRange}
      />

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Nationality</TableHead>
              <TableHead>
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleSort("hosted")}
                >
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span>Hosted</span>
                  <ArrowUpDown className={cn(
                    "h-4 w-4",
                    hostedSortDirection && "text-primary"
                  )} />
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleSort("attended")}
                >
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Attended</span>
                  <ArrowUpDown className={cn(
                    "h-4 w-4",
                    attendedSortDirection && "text-primary"
                  )} />
                </div>
              </TableHead>
              <TableHead>
                <div 
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleSort("earnings")}
                >
                  <Coins className="h-4 w-4 text-muted-foreground" />
                  <span>Total Earnings</span>
                  <ArrowUpDown className={cn(
                    "h-4 w-4",
                    earningsSortDirection && "text-primary"
                  )} />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div 
                    className="flex items-center gap-3 cursor-pointer hover:opacity-80"
                    onClick={() => handleUserClick(user.id)}
                  >
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
                <TableCell>{user.age}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{user.location}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Flag className="h-4 w-4 text-muted-foreground" />
                    <span>{user.nationality}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    <span>{user.hostedLinkups}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{user.attendedLinkups}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Coins className="h-4 w-4 text-muted-foreground" />
                    <span>£{user.totalEarnings.toFixed(2)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {user.isVerified && (
                      <Badge variant="outline" className="bg-status-verified/10 text-status-verified border-status-verified/20">
                        Verified
                      </Badge>
                    )}
                    {user.isLinkupPlus && (
                      <Badge variant="outline" className="bg-linkup-purple/10 text-linkup-purple border-linkup-purple/20">
                        Plus
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleUserAction('view', user.id)}>
                        <UserIcon className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUserAction('edit', user.id)}>
                        <Filter className="mr-2 h-4 w-4" />
                        Edit Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleUserAction('suspend', user.id)}
                        className="text-destructive"
                      >
                        <Ban className="mr-2 h-4 w-4" />
                        Suspend User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserTable;
