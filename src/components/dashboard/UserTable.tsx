import React, { useState } from "react";
import { 
  Search, 
  User as UserIcon, 
  Coins, 
  Crown, 
  Users, 
  MapPin, 
  MoreHorizontal, 
  Ban, 
  Filter, 
  Flag, 
  ArrowUpDown,
  CalendarDays,
  UserRound,
  CheckCircle2,
  Calendar
} from "lucide-react";
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
import { nationalities } from "@/constants/filterOptions";
import type { User } from "@/types/user";
import { formatJoinDate } from "@/utils/dateFormatting";

export const users: User[] = [
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
  {
    id: "2",
    avatar: "https://i.pravatar.cc/150?img=2",
    name: "Liam Chen",
    username: "liam_c",
    email: "liam@example.com",
    age: 32,
    joinDate: "2023-04-20",
    location: "Toronto, Canada",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "Canada",
    gender: "Male",
    hostedLinkups: 25,
    attendedLinkups: 18,
    totalEarnings: 2350.75
  },
  {
    id: "3",
    avatar: "https://i.pravatar.cc/150?img=3",
    name: "Sophie Martin",
    username: "sophie_m",
    email: "sophie@example.com",
    age: 26,
    joinDate: "2023-05-10",
    location: "Paris, France",
    isLinkupPlus: false,
    isVerified: true,
    nationality: "France",
    gender: "Female",
    hostedLinkups: 12,
    attendedLinkups: 30,
    totalEarnings: 950.25
  },
  {
    id: "4",
    avatar: "https://i.pravatar.cc/150?img=4",
    name: "Marco Rossi",
    username: "marco_r",
    email: "marco@example.com",
    age: 35,
    joinDate: "2023-06-01",
    location: "Rome, Italy",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "Italy",
    gender: "Male",
    hostedLinkups: 40,
    attendedLinkups: 15,
    totalEarnings: 4500.00
  },
  {
    id: "5",
    avatar: "https://i.pravatar.cc/150?img=5",
    name: "Yuki Tanaka",
    username: "yuki_t",
    email: "yuki@example.com",
    age: 29,
    joinDate: "2023-07-15",
    location: "Tokyo, Japan",
    isLinkupPlus: false,
    isVerified: true,
    nationality: "Japan",
    gender: "Female",
    hostedLinkups: 8,
    attendedLinkups: 20,
    totalEarnings: 750.50
  },
  {
    id: "6",
    avatar: "https://i.pravatar.cc/150?img=6",
    name: "Luis García",
    username: "luis_g",
    email: "luis@example.com",
    age: 31,
    joinDate: "2023-08-01",
    location: "Madrid, Spain",
    isLinkupPlus: true,
    isVerified: false,
    nationality: "Spain",
    gender: "Male",
    hostedLinkups: 22,
    attendedLinkups: 28,
    totalEarnings: 1850.25
  },
  {
    id: "7",
    avatar: "https://i.pravatar.cc/150?img=7",
    name: "Anna Schmidt",
    username: "anna_s",
    email: "anna@example.com",
    age: 27,
    joinDate: "2023-09-10",
    location: "Berlin, Germany",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "Germany",
    gender: "Female",
    hostedLinkups: 35,
    attendedLinkups: 42,
    totalEarnings: 3750.00
  },
  {
    id: "8",
    avatar: "https://i.pravatar.cc/150?img=8",
    name: "Oliver Wilson",
    username: "oliver_w",
    email: "oliver@example.com",
    age: 33,
    joinDate: "2023-10-20",
    location: "Sydney, Australia",
    isLinkupPlus: false,
    isVerified: true,
    nationality: "Australia",
    gender: "Male",
    hostedLinkups: 18,
    attendedLinkups: 25,
    totalEarnings: 1650.75
  },
  {
    id: "9",
    avatar: "https://i.pravatar.cc/150?img=9",
    name: "Maria Silva",
    username: "maria_s",
    email: "maria@example.com",
    age: 30,
    joinDate: "2023-11-05",
    location: "Singapore",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "Singapore",
    gender: "Female",
    hostedLinkups: 28,
    attendedLinkups: 33,
    totalEarnings: 2850.50
  },
  {
    id: "10",
    avatar: "https://i.pravatar.cc/150?img=10",
    name: "James Brown",
    username: "james_b",
    email: "james@example.com",
    age: 34,
    joinDate: "2023-12-15",
    location: "New York, USA",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "USA",
    gender: "Male",
    hostedLinkups: 45,
    attendedLinkups: 38,
    totalEarnings: 5250.25
  }
];

const getCountryEmoji = (country: string) => {
  const emojiMap: { [key: string]: string } = {
    'UK': '🇬🇧',
    'USA': '🇺🇸',
    'Canada': '🇨🇦',
    'Australia': '🇦🇺',
    'France': '🇫🇷',
    'Germany': '🇩🇪',
    'Italy': '🇮🇹',
    'Spain': '🇪🇸',
    'Japan': '🇯🇵',
    'Singapore': '🇸🇬'
  };
  return emojiMap[country] || '';
};

const formatCurrency = (amount: number) => {
  return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

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
  const [joinDateSortDirection, setJoinDateSortDirection] = useState<"asc" | "desc" | null>(null);

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

  const handleSort = (type: "earnings" | "hosted" | "attended" | "joined") => {
    if (type !== "earnings") setEarningsSortDirection(null);
    if (type !== "hosted") setHostedSortDirection(null);
    if (type !== "attended") setAttendedSortDirection(null);
    if (type !== "joined") setJoinDateSortDirection(null);

    switch (type) {
      case "joined":
        setJoinDateSortDirection(prev => prev === "asc" ? "desc" : "asc");
        break;
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
      if (joinDateSortDirection) {
        const dateA = new Date(a.joinDate).getTime();
        const dateB = new Date(b.joinDate).getTime();
        return joinDateSortDirection === "asc" 
          ? dateA - dateB
          : dateB - dateA;
      }
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
              <TableHead>
                <div className="flex items-center gap-2">
                  <UserRound className="h-4 w-4 text-muted-foreground" />
                  <span>User</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span>Age</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Location</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2">
                  <Flag className="h-4 w-4 text-muted-foreground" />
                  <span>Nationality</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSort("hosted")}>
                  <Crown className="h-4 w-4 text-muted-foreground" />
                  <span>Hosted</span>
                  <ArrowUpDown className={cn("h-4 w-4", hostedSortDirection && "text-primary")} />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSort("attended")}>
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>Attended</span>
                  <ArrowUpDown className={cn("h-4 w-4", attendedSortDirection && "text-primary")} />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSort("earnings")}>
                  <Coins className="h-4 w-4 text-muted-foreground" />
                  <span>Total Earnings</span>
                  <ArrowUpDown className={cn("h-4 w-4", earningsSortDirection && "text-primary")} />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSort("joined")}>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Joined</span>
                  <ArrowUpDown className={cn("h-4 w-4", joinDateSortDirection && "text-primary")} />
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
                  {getCountryEmoji(user.nationality)} {user.location}
                </TableCell>
                <TableCell>
                  {getCountryEmoji(user.nationality)} {nationalities.find(n => n.id === user.nationality.toLowerCase())?.label || user.nationality}
                </TableCell>
                <TableCell>{user.hostedLinkups}</TableCell>
                <TableCell>{user.attendedLinkups}</TableCell>
                <TableCell>{formatCurrency(user.totalEarnings)}</TableCell>
                <TableCell>{formatJoinDate(user.joinDate)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={cn(
                      user.isVerified 
                        ? "bg-status-verified/10 text-status-verified border-status-verified/20"
                        : "bg-destructive/10 text-destructive border-destructive/20"
                    )}>
                      {user.isVerified ? (
                        <div className="flex items-center gap-1">
                          Verified
                          <CheckCircle2 className="h-3 w-3 ml-1" />
                        </div>
                      ) : "Not Verified"}
                    </Badge>
                    <Badge variant="outline" className={cn(
                      user.isLinkupPlus 
                        ? "bg-linkup-purple/10 text-linkup-purple border-linkup-purple/20"
                        : "bg-muted/50 text-muted-foreground border-muted-foreground/20"
                    )}>
                      {user.isLinkupPlus ? (
                        <div className="flex items-center gap-1">
                          Plus
                          <Crown className="h-3 w-3 ml-1" />
                        </div>
                      ) : "Free User"}
                    </Badge>
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
