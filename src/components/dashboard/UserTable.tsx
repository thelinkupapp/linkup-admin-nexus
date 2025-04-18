import React, { useState } from "react";
import { 
  MoreVertical, 
  Ban,
  ArrowUpDown,
  Eye,
  Trash2
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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { UserFilters } from "@/components/dashboard/UserFilters";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatJoinDate } from "@/utils/dateFormatting";
import type { User } from "@/types/user";
import { SuspendUserDialog } from "./SuspendUserDialog";

const getNationalityLabel = (countryCode: string): string => {
  const nationalityMap: { [key: string]: string } = {
    'UK': 'British',
    'USA': 'American',
    'UAE': 'Emirati',
    'Ireland': 'Irish',
    'Singapore': 'Singaporean',
    'Spain': 'Spanish',
    'Japan': 'Japanese',
    'Australia': 'Australian',
    'Brazil': 'Brazilian',
    'Germany': 'German',
    'France': 'French',
    'Canada': 'Canadian',
    'Italy': 'Italian',
    'Netherlands': 'Dutch',
    'Norway': 'Norwegian',
    'Finland': 'Finnish',
    'Austria': 'Austrian',
    'Portugal': 'Portuguese',
    'Switzerland': 'Swiss',
    'Belgium': 'Belgian',
    'Sweden': 'Swedish',
    'Denmark': 'Danish'
  };
  return nationalityMap[countryCode] || countryCode;
};

const getCountryEmoji = (country: string) => {
  const emojiMap: { [key: string]: string } = {
    'UK': '🇬🇧',
    'USA': '🇺🇸',
    'UAE': '🇦🇪',
    'Ireland': '🇮🇪',
    'Singapore': '🇸🇬',
    'Spain': '🇪🇸',
    'Japan': '🇯🇵',
    'Australia': '🇦🇺',
    'Brazil': '🇧🇷',
    'Germany': '🇩🇪',
    'France': '🇫🇷',
    'Canada': '🇨🇦',
    'Italy': '🇮🇹',
    'Indonesia': '🇮🇩',
    'Portugal': '🇵🇹',
    'Netherlands': '🇳🇱',
    'Belgium': '🇧🇪',
    'Switzerland': '🇨🇭',
    'Austria': '🇦🇹',
    'Sweden': '🇸🇪',
    'Denmark': '🇩🇰',
    'Norway': '🇳🇴',
    'Finland': '🇫🇮'
  };
  return emojiMap[country] || '🌍';
};

const generateAdditionalUsers = (): User[] => {
  const additionalUsers: User[] = [];
  const citiesByCountry: { [key: string]: string[] } = {
    'France': ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Nice'],
    'Italy': ['Rome', 'Milan', 'Florence', 'Venice', 'Naples'],
    'Germany': ['Berlin', 'Munich', 'Hamburg', 'Frankfurt', 'Cologne'],
    'Spain': ['Madrid', 'Barcelona', 'Valencia', 'Seville', 'Bilbao'],
    'Portugal': ['Lisbon', 'Porto', 'Faro', 'Braga', 'Coimbra'],
    'Netherlands': ['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht', 'Eindhoven'],
    'Belgium': ['Brussels', 'Antwerp', 'Ghent', 'Bruges', 'Liege'],
    'Switzerland': ['Zurich', 'Geneva', 'Basel', 'Bern', 'Lausanne'],
    'Austria': ['Vienna', 'Salzburg', 'Innsbruck', 'Graz', 'Linz'],
    'Sweden': ['Stockholm', 'Gothenburg', 'Malmo', 'Uppsala', 'Vasteras'],
    'Denmark': ['Copenhagen', 'Aarhus', 'Odense', 'Aalborg', 'Esbjerg'],
    'Norway': ['Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Tromso'],
    'Finland': ['Helsinki', 'Tampere', 'Turku', 'Oulu', 'Espoo']
  };

  const firstNames = [
    'Emma', 'Liam', 'Sophia', 'Noah', 'Olivia', 'Lucas', 'Isabella', 'Mason',
    'Ava', 'Ethan', 'Mia', 'Oliver', 'Charlotte', 'Elijah', 'Amelia', 'William',
    'Harper', 'James', 'Evelyn', 'Alexander', 'Abigail', 'Benjamin', 'Emily',
    'Sebastian', 'Elizabeth', 'Jack', 'Sofia', 'Daniel', 'Avery', 'Samuel'
  ];

  const lastNames = [
    'Smith', 'Johnson', 'Brown', 'Taylor', 'Anderson', 'Wilson', 'Martinez',
    'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Hernandez', 'Lopez', 'Gonzalez',
    'Williams', 'Lee', 'Walker', 'Hall', 'Young', 'King', 'Wright', 'Scott',
    'Green', 'Baker', 'Adams', 'Nelson', 'Carter', 'Mitchell', 'Parker', 'Collins'
  ];

  const genders: Array<'Male' | 'Female' | 'Non-binary'> = ['Male', 'Female', 'Non-binary'];
  const nationalities = Object.keys(citiesByCountry);

  for (let i = 16; i <= 110; i++) {
    const nationality = nationalities[Math.floor(Math.random() * nationalities.length)];
    const cities = citiesByCountry[nationality];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const username = `${firstName.toLowerCase()}_${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}`;
    const gender = genders[Math.floor(Math.random() * genders.length)];
    
    additionalUsers.push({
      id: i.toString(),
      avatar: `https://i.pravatar.cc/150?u=${username}`,
      name: `${firstName} ${lastName}`,
      username: username,
      email: `${username}@example.com`,
      age: Math.floor(Math.random() * (50 - 20 + 1)) + 20,
      joinDate: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000)).toISOString(),
      location: `${getCountryEmoji(nationality)} ${city}, ${nationality}`,
      isLinkupPlus: Math.random() > 0.5,
      isVerified: Math.random() > 0.3,
      nationality: nationality,
      gender: gender,
      hostedLinkups: Math.floor(Math.random() * 30),
      attendedLinkups: Math.floor(Math.random() * 40),
      totalEarnings: Math.floor(Math.random() * 5000 * 100) / 100
    });
  }

  return additionalUsers;
};

export const users: User[] = [
  {
    id: "1",
    avatar: "https://i.pravatar.cc/150?u=olivia",
    name: "Olivia Parker",
    username: "olivia_p",
    email: "olivia@example.com",
    age: 24,
    joinDate: "2025-04-18T10:30:00Z",
    location: "🇮🇪 Dublin, Ireland",
    isLinkupPlus: false,
    isVerified: true,
    nationality: "Ireland",
    gender: "Female",
    hostedLinkups: 12,
    attendedLinkups: 15,
    totalEarnings: 850.00
  },
  {
    id: "2",
    avatar: "https://i.pravatar.cc/150?u=marcus",
    name: "Marcus Chen",
    username: "marcus_c",
    email: "marcus@example.com",
    age: 21,
    joinDate: "2024-12-23T00:00:00Z",
    location: "🇸🇬 Singapore",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "Singapore",
    gender: "Male",
    hostedLinkups: 8,
    attendedLinkups: 13,
    totalEarnings: 2555.00
  },
  {
    id: "3",
    avatar: "https://i.pravatar.cc/150?u=sophia",
    name: "Sophia Williams",
    username: "sophia_w",
    email: "sophia@example.com",
    age: 22,
    joinDate: "2024-12-22T00:00:00Z",
    location: "🇬🇧 London, UK",
    isLinkupPlus: false,
    isVerified: true,
    nationality: "UK",
    gender: "Female",
    hostedLinkups: 3,
    attendedLinkups: 19,
    totalEarnings: 1202.00
  },
  {
    id: "4",
    avatar: "https://i.pravatar.cc/150?u=raj",
    name: "Raj Patel",
    username: "raj_p",
    email: "raj@example.com",
    age: 37,
    joinDate: "2024-12-18T00:00:00Z",
    location: "🇦🇪 Dubai, UAE",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "UAE",
    gender: "Male",
    hostedLinkups: 21,
    attendedLinkups: 26,
    totalEarnings: 4499.00
  },
  {
    id: "5",
    avatar: "https://i.pravatar.cc/150?u=elena",
    name: "Elena Rodriguez",
    username: "elena_r",
    email: "elena@example.com",
    age: 28,
    joinDate: "2024-12-18T00:00:00Z",
    location: "🇪🇸 Barcelona, Spain",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "Spain",
    gender: "Female",
    hostedLinkups: 20,
    attendedLinkups: 12,
    totalEarnings: 2794.00
  },
  {
    id: "6",
    avatar: "https://i.pravatar.cc/150?u=thomas",
    name: "Thomas Anderson",
    username: "thomas_a",
    email: "thomas@example.com",
    age: 39,
    joinDate: "2024-11-28T00:00:00Z",
    location: "🇺🇸 New York, USA",
    isLinkupPlus: false,
    isVerified: false,
    nationality: "USA",
    gender: "Male",
    hostedLinkups: 25,
    attendedLinkups: 29,
    totalEarnings: 1774.00
  },
  {
    id: "7",
    avatar: "https://i.pravatar.cc/150?u=isabella",
    name: "Isabella Martinez",
    username: "isabella_m",
    email: "isabella@example.com",
    age: 21,
    joinDate: "2024-11-25T00:00:00Z",
    location: "🇮🇩 Canggu, Indonesia",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "Indonesia",
    gender: "Female",
    hostedLinkups: 4,
    attendedLinkups: 27,
    totalEarnings: 1417.00
  },
  {
    id: "8",
    avatar: "https://i.pravatar.cc/150?u=james",
    name: "James O'Connor",
    username: "james_o",
    email: "james@example.com",
    age: 25,
    joinDate: "2024-11-25T00:00:00Z",
    location: "🇦🇺 Sydney, Australia",
    isLinkupPlus: false,
    isVerified: true,
    nationality: "Australia",
    gender: "Male",
    hostedLinkups: 17,
    attendedLinkups: 6,
    totalEarnings: 137.00
  },
  {
    id: "9",
    avatar: "https://i.pravatar.cc/150?u=maria",
    name: "Maria Silva",
    username: "maria_s",
    email: "maria@example.com",
    age: 30,
    joinDate: "2023-11-05",
    location: "🇧🇷 São Paulo, Brazil",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "Brazil",
    gender: "Female",
    hostedLinkups: 28,
    attendedLinkups: 33,
    totalEarnings: 2850.50
  },
  {
    id: "10",
    avatar: "https://i.pravatar.cc/150?u=hans",
    name: "Hans Schmidt",
    username: "hans_s",
    email: "hans@example.com",
    age: 34,
    joinDate: "2023-12-15",
    location: "🇩🇪 Berlin, Germany",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "Germany",
    gender: "Male",
    hostedLinkups: 45,
    attendedLinkups: 38,
    totalEarnings: 5250.25
  },
  {
    id: "11",
    avatar: "https://i.pravatar.cc/150?u=yuki",
    name: "Yuki Tanaka",
    username: "yuki_t",
    email: "yuki@example.com",
    age: 24,
    joinDate: "2025-04-18T10:30:00Z",
    location: "🇯🇵 Tokyo, Japan",
    isLinkupPlus: false,
    isVerified: false,
    nationality: "Japan",
    gender: "Non-binary",
    hostedLinkups: 0,
    attendedLinkups: 0,
    totalEarnings: 0
  },
  {
    id: "12",
    avatar: "https://i.pravatar.cc/150?u=alexander",
    name: "Alexander Wright",
    username: "alex_w",
    email: "alexander@example.com",
    age: 29,
    joinDate: "2024-12-15T00:00:00Z",
    location: "🇨🇦 Vancouver, Canada",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "Canada",
    gender: "Male",
    hostedLinkups: 15,
    attendedLinkups: 22,
    totalEarnings: 1850.00
  },
  {
    id: "13",
    avatar: "https://i.pravatar.cc/150?u=isabella_m",
    name: "Isabella Martinez",
    username: "bella_m",
    email: "isabella@example.com",
    age: 26,
    joinDate: "2024-12-10T00:00:00Z",
    location: "🇪🇸 Madrid, Spain",
    isLinkupPlus: false,
    isVerified: true,
    nationality: "Spain",
    gender: "Female",
    hostedLinkups: 8,
    attendedLinkups: 16,
    totalEarnings: 920.00
  },
  {
    id: "14",
    avatar: "https://i.pravatar.cc/150?u=emma",
    name: "Emma Thompson",
    username: "emma_t",
    email: "emma@example.com",
    age: 29,
    joinDate: "2024-11-20T00:00:00Z",
    location: "🇫🇷 Paris, France",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "France",
    gender: "Female",
    hostedLinkups: 18,
    attendedLinkups: 25,
    totalEarnings: 1750.00
  },
  {
    id: "15",
    avatar: "https://i.pravatar.cc/150?u=luca",
    name: "Luca Rossi",
    username: "luca_r",
    email: "luca@example.com",
    age: 32,
    joinDate: "2024-10-15T00:00:00Z",
    location: "🇮🇹 Milan, Italy",
    isLinkupPlus: false,
    isVerified: true,
    nationality: "Italy",
    gender: "Male",
    hostedLinkups: 7,
    attendedLinkups: 12,
    totalEarnings: 450.50
  }
];

users.push(...generateAdditionalUsers());

const formatCurrency = (amount: number) => {
  return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

type SortField = 'hosted' | 'attended' | 'earnings' | 'joined';
type SortDirection = 'asc' | 'desc';

export default function UserTable() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [selectedNationalities, setSelectedNationalities] = useState<string[]>([]);
  const [selectedGenders, setSelectedGenders] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState([18, 100]);
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [showLinkupPlusOnly, setShowLinkupPlusOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortField, setSortField] = useState<SortField>('joined');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [suspendUserId, setSuspendUserId] = useState<string | null>(null);
  const [suspendUsername, setSuspendUsername] = useState<string>("");
  const [suspendUserAvatar, setSuspendUserAvatar] = useState<string>("");
  const [suspendUserName, setSuspendUserName] = useState<string>("");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
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
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      
      switch (sortField) {
        case 'hosted':
          return (a.hostedLinkups - b.hostedLinkups) * multiplier;
        case 'attended':
          return (a.attendedLinkups - b.attendedLinkups) * multiplier;
        case 'earnings':
          return (a.totalEarnings - b.totalEarnings) * multiplier;
        case 'joined':
          return (new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime()) * multiplier;
        default:
          return 0;
      }
    });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`);
  };

  const handleUserAction = (action: string, userId: string, username?: string, avatar?: string, name?: string) => {
    switch (action) {
      case 'view':
        navigate(`/users/${userId}`);
        break;
      case 'suspend':
        setSuspendUserId(userId);
        setSuspendUsername(username || "");
        setSuspendUserAvatar(avatar || "");
        setSuspendUserName(name || "");
        break;
      case 'delete':
        // For now, just log the deletion - you might want to add a confirmation dialog later
        console.log('Deleting user:', userId);
        break;
      default:
        break;
    }
  };

  const handleCloseSuspendDialog = () => {
    setSuspendUserId(null);
    setSuspendUsername("");
    setSuspendUserAvatar("");
    setSuspendUserName("");
  };

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
              <TableHead className="w-[20%]">User</TableHead>
              <TableHead className="w-[5%]">Age</TableHead>
              <TableHead className="w-[12%]">Location</TableHead>
              <TableHead className="w-[12%]">Nationality</TableHead>
              <TableHead className="w-[8%]">
                <button 
                  className="flex items-center space-x-1 hover:text-foreground focus:outline-none"
                  onClick={() => handleSort('hosted')}
                >
                  <span>Hosted</span>
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="w-[8%]">
                <button 
                  className="flex items-center space-x-1 hover:text-foreground focus:outline-none"
                  onClick={() => handleSort('attended')}
                >
                  <span>Attended</span>
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="w-[12%]">
                <button 
                  className="flex items-center space-x-1 hover:text-foreground focus:outline-none"
                  onClick={() => handleSort('earnings')}
                >
                  <span>Earnings</span>
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="w-[12%]">
                <button 
                  className="flex items-center space-x-1 hover:text-foreground focus:outline-none"
                  onClick={() => handleSort('joined')}
                >
                  <span>Joined</span>
                  <ArrowUpDown className="h-4 w-4" />
                </button>
              </TableHead>
              <TableHead className="w-[11%] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="max-w-0">
                  <div 
                    className="flex items-center gap-3 cursor-pointer hover:opacity-80"
                    onClick={() => handleUserClick(user.id)}
                  >
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="font-medium truncate">{user.name}</div>
                      <div className="text-sm text-muted-foreground truncate">@{user.username}</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {user.isVerified && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="inline-flex">
                                  <img 
                                    src="/lovable-uploads/560d8a54-e5fd-4af3-84b1-62f333f56b27.png" 
                                    alt="Verified" 
                                    className="h-4 w-4" 
                                  />
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Verified User</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        {user.isLinkupPlus && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="inline-flex text-amber-500">
                                  👑
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Linkup Plus Member</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell className="truncate">
                  <div className="truncate">{user.location}</div>
                </TableCell>
                <TableCell>
                  <div className="truncate">
                    {getCountryEmoji(user.nationality)} {getNationalityLabel(user.nationality)}
                  </div>
                </TableCell>
                <TableCell>{user.hostedLinkups}</TableCell>
                <TableCell>{user.attendedLinkups}</TableCell>
                <TableCell>{formatCurrency(user.totalEarnings)}</TableCell>
                <TableCell>{formatJoinDate(user.joinDate)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem 
                        onClick={() => handleUserAction('view', user.id)}
                        className="cursor-pointer hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground transition-colors duration-200"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleUserAction('suspend', user.id, user.username, user.avatar, user.name)}
                        className="cursor-pointer text-destructive hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground transition-colors duration-200"
                      >
                        <Ban className="mr-2 h-4 w-4" />
                        Suspend User
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleUserAction('delete', user.id)}
                        className="cursor-pointer text-destructive hover:bg-destructive hover:text-destructive-foreground focus:bg-destructive focus:text-destructive-foreground transition-colors duration-200"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <SuspendUserDialog
        isOpen={!!suspendUserId}
        onClose={handleCloseSuspendDialog}
        userId={suspendUserId || ""}
        username={suspendUsername}
        userAvatar={suspendUserAvatar}
        userName={suspendUserName}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <p className="text-sm text-muted-foreground">Items per page</p>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(parseInt(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder="25" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length}
          </p>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(currentPage - 1)}
                className={cn(
                  "cursor-pointer",
                  currentPage === 1 && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
            
            <PaginationItem>
              <PaginationLink
                onClick={() => handlePageChange(1)}
                isActive={currentPage === 1}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {Array.from({ length: 3 }, (_, i) => {
              const pageNum = currentPage - 1 + i;
              if (pageNum > 1 && pageNum < totalPages) {
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNum)}
                      isActive={currentPage === pageNum}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
              return null;
            })}

            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {totalPages > 1 && (
              <PaginationItem>
                <PaginationLink
                  onClick={() => handlePageChange(totalPages)}
                  isActive={currentPage === totalPages}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={cn(
                  "cursor-pointer",
                  currentPage === totalPages && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
