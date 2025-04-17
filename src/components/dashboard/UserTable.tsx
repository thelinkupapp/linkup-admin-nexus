import { useState } from "react";
import { Search, Filter, User as UserIcon, Languages, Tag, Coins, CalendarDays, Users, MapPin, MoreHorizontal, Ban, Shield, ShieldCheck, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataSort } from "./DataSort";
import { cn } from "@/lib/utils";
import { interests, languages, genderOptions } from "@/constants/filterOptions";
import type { User } from "@/types/user";
import { Switch } from "@/components/ui/switch";

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
    interests: ["photography", "travel"],
    languages: ["en", "es"],
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
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [sortField, setSortField] = useState<"earnings" | "hosted" | "attended">("earnings");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [ageRange, setAgeRange] = useState([18, 80]);
  const [minEarnings, setMinEarnings] = useState(0);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showLinkupPlusOnly, setShowLinkupPlusOnly] = useState(false);

  // Replace single sort state with individual sort states
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
        // Implement suspension logic
        console.log('Suspending user:', userId);
        break;
    }
  };

  const locations = Array.from(new Set(users.map(user => user.location))).sort();
  
  const filteredUsers = users
    .filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchValue.toLowerCase());
      const matchesInterests = selectedInterests.length === 0 || 
                              selectedInterests.some(interest => user.interests.includes(interest));
      const matchesLanguages = selectedLanguages.length === 0 || 
                              selectedLanguages.some(lang => user.languages.includes(lang));
      const matchesGender = !selectedGender || user.gender === selectedGender;
      const matchesLocation = !selectedLocation || user.location === selectedLocation;
      const matchesAge = user.age >= ageRange[0] && user.age <= ageRange[1];
      const matchesEarnings = user.totalEarnings >= minEarnings;
      const matchesVerified = !showVerifiedOnly || user.isVerified;
      const matchesLinkupPlus = !showLinkupPlusOnly || user.isLinkupPlus;
      
      return matchesSearch && matchesInterests && matchesLanguages && 
             matchesGender && matchesAge && matchesEarnings && matchesLocation &&
             matchesVerified && matchesLinkupPlus;
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

  const handleSort = (type: "earnings" | "hosted" | "attended") => {
    // Reset other sorts when one is selected
    if (type !== "earnings") setEarningsSortDirection(null);
    if (type !== "hosted") setHostedSortDirection(null);
    if (type !== "attended") setAttendedSortDirection(null);

    // Toggle sort direction for selected type
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
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={selectedInterests[0]}
            onValueChange={(value) => setSelectedInterests([value])}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Interests" />
            </SelectTrigger>
            <SelectContent>
              {interests.map((interest) => (
                <SelectItem key={interest.id} value={interest.id}>
                  <div className="flex items-center gap-2">
                    <span>{interest.emoji}</span>
                    <span>{interest.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{location}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedLanguages[0]}
            onValueChange={(value) => setSelectedLanguages([value])}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Languages" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.id} value={language.id}>
                  <div className="flex items-center gap-2">
                    <span>{language.emoji}</span>
                    <span>{language.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedGender} onValueChange={setSelectedGender}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              {genderOptions.map((option) => (
                <SelectItem key={option.id} value={option.label}>
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4" />
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="min-w-[200px]">
            <Slider
              min={18}
              max={80}
              step={1}
              value={ageRange}
              onValueChange={setAgeRange}
              className="w-full"
            />
            <div className="text-sm text-muted-foreground mt-1">
              Age: {ageRange[0]} - {ageRange[1]}
            </div>
          </div>

          <Select 
            value={sortField} 
            onValueChange={(value: "earnings" | "hosted" | "attended") => setSortField(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by Activity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="earnings">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4" />
                  <span>Total Earnings</span>
                </div>
              </SelectItem>
              <SelectItem value="hosted">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>Hosted Linkups</span>
                </div>
              </SelectItem>
              <SelectItem value="attended">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Attended Linkups</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <DataSort
            sortDirection={sortDirection}
            onSortChange={setSortDirection}
          />

          {/* Add new filter buttons with switches */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-sm">Verified Only</span>
            <Switch
              checked={showVerifiedOnly}
              onCheckedChange={setShowVerifiedOnly}
            />
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-lg border">
            <Shield className="h-4 w-4" />
            <span className="text-sm">Linkup Plus Only</span>
            <Switch
              checked={showLinkupPlusOnly}
              onCheckedChange={setShowLinkupPlusOnly}
            />
          </div>
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Location</TableHead>
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
