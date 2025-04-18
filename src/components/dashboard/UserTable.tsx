import React, { useState } from 'react';
import { 
  MoreVertical, 
  Ban,
  ArrowUpDown,
  Eye,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Users,
  Crown
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
import { DeleteUserDialog } from "./DeleteUserDialog";
import { nationalities } from "@/constants/filterOptions";

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
    id: "0",
    avatar: "/lovable-uploads/a165dd8e-2635-4f3a-a050-ce01c92a0a6f.png",
    name: "Jack Peagam",
    username: "jackpeagam",
    email: "jack@example.com",
    age: 30,
    joinDate: "2025-02-21T18:30:00Z",
    location: "🇮🇩 Canggu, Indonesia",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "UK",
    gender: "Male",
    hostedLinkups: 50,
    attendedLinkups: 35,
    totalEarnings: 1000000.00
  },
  {
    id: "1",
    avatar: "/lovable-uploads/1fa5e36a-9e47-4933-9b3c-d103bedaf3bf.png",
    name: "Ben Whatson",
    username: "benwhatson",
    email: "ben@example.com",
    age: 31,
    joinDate: "2024-05-17T17:35:00Z",
    location: "🇮🇩 Canggu, Indonesia",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "UK",
    gender: "Non-binary",
    hostedLinkups: 49,
    attendedLinkups: 34,
    totalEarnings: 999999.00
  },
  {
    id: "2",
    avatar: "/lovable-uploads/f1cb2afb-e7ab-44e6-95c2-037da6ccad60.png",
    name: "Elie Abou Samra",
    username: "elieabousamra",
    email: "elie@example.com",
    age: 39,
    joinDate: "2025-04-21T12:31:00Z",
    location: "🇦🇪 Dubai, United Arab Emirates",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "🇱🇧",
    gender: "Male",
    hostedLinkups: 36,
    attendedLinkups: 21,
    totalEarnings: 999999.00
  },
  {
    id: "3",
    avatar: "https://i.pravatar.cc/150?img=62",
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
    id: "4",
    avatar: "https://i.pravatar.cc/150?img=45",
    name: "Emma Williams",
    username: "emma_w",
    email: "emma@example.com",
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
    id: "5",
    avatar: "https://i.pravatar.cc/150?img=68",
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
    id: "6",
    avatar: "https://i.pravatar.cc/150?img=33",
    name: "Isabella Rodriguez",
    username: "bella_r",
    email: "isabella@example.com",
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
    id: "7",
    avatar: "https://i.pravatar.cc/150?img=73",
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
    id: "8",
    avatar: "https://i.pravatar.cc/150?img=41",
    name: "Maria Silva",
    username: "maria_s",
    email: "maria@example.com",
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
    id: "9",
    avatar: "https://i.pravatar.cc/150?img=60",
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
    id: "10",
    avatar: "https://i.pravatar.cc/150?img=47",
    name: "Lucy Chen",
    username: "lucy_c",
    email: "lucy@example.com",
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
    id: "11",
    avatar: "https://i.pravatar.cc/150?img=63",
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
    id: "12",
    avatar: "https://i.pravatar.cc/150?img=39",
    name: "Alex Morgan",
    username: "alex_m",
    email: "alex@example.com",
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
    id: "13",
    avatar: "https://i.pravatar.cc/150?img=70",
    name: "William Wright",
    username: "will_w",
    email: "william@example.com",
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
    id: "14",
    avatar: "https://i.pravatar.cc/150?img=31",
    name: "Sofia Martinez",
    username: "sofia_m",
    email: "sofia@example.com",
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
    id: "15",
    avatar: "https://i.pravatar.cc/150?img=43",
    name: "Emily Thompson",
    username: "emily_t",
    email: "emily@example.com",
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
    id: "16",
    avatar: "https://i.pravatar.cc/150?img=64",
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

const renderLinkupPlusIcon = () => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex transition-transform duration-200 hover:scale-110 hover:rotate-6 cursor-help">
          <Crown className="text-amber-500" />
        </span>
      </TooltipTrigger>
      <TooltipContent>
        <p>Linkup Plus Member</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

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
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null);
  const [deleteUsername, setDeleteUsername] = useState<string>("");
  const [deleteUserAvatar, setDeleteUserAvatar] = useState<string>("");
  const [deleteUserName, setDeleteUserName] = useState<string>("");
  const [verificationStatus, setVerificationStatus] = useState("");
  const [membershipStatus, setMembershipStatus] = useState("");
  const [itemsPerPageOptions] = useState([25, 50, 100]);

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
      const matchesSearch = user.name.toLowerCase().includes(searchValue.toLowerCase()) || 
                            user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
                            user.email.toLowerCase().includes(searchValue.toLowerCase());
      
      const matchesNationality = selectedNationalities.length === 0 || 
                              selectedNationalities.some(natId => {
                                const nat = nationalities.find(n => n.id === natId);
                                return nat && getNationalityLabel(user.nationality) === nat.label;
                              });
      
      const matchesGender = selectedGenders.length === 0 || 
                           selectedGenders.includes(user.gender.toLowerCase());
      
      const matchesLocation = selectedLocations.length === 0 || 
                             selectedLocations.some(location => 
                               user.location.includes(location));
      
      const matchesAge = user.age >= ageRange[0] && user.age <= ageRange[1];
      
      const matchesVerification = verificationStatus === "" || 
        (verificationStatus === "verified" && user.isVerified) ||
        (verificationStatus === "unverified" && !user.isVerified);

      const matchesMembership = membershipStatus === "" ||
        (membershipStatus === "plus" && user.isLinkupPlus) ||
        (membershipStatus === "free" && !user.isLinkupPlus);
      
      return matchesSearch && matchesNationality && matchesGender && 
             matchesLocation && matchesAge && matchesVerification && matchesMembership;
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
        case 'joined': {
          const dateA = new Date(a.joinDate).getTime();
          const dateB = new Date(b.joinDate).getTime();
          
          return (dateA - dateB) * multiplier;
        }
        default:
          return 0;
      }
    });

  const totalUsers = users.length;
  const filteredUsersCount = filteredUsers.length;

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
        setDeleteUserId(userId);
        setDeleteUsername(username || "");
        setDeleteUserAvatar(avatar || "");
        setDeleteUserName(name || "");
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

  const handleCloseDeleteDialog = () => {
    setDeleteUserId(null);
    setDeleteUsername("");
    setDeleteUserAvatar("");
    setDeleteUserName("");
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
        verificationStatus={verificationStatus}
        setVerificationStatus={setVerificationStatus}
        membershipStatus={membershipStatus}
        setMembershipStatus={setMembershipStatus}
        ageRange={ageRange}
        setAgeRange={setAgeRange}
        filteredCount={filteredUsersCount}
        totalCount={totalUsers}
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
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-background flex items-center justify-center shadow-sm border border-border text-xs transition-all duration-200 hover:scale-110 hover:bg-primary/10 cursor-help">
                              {user.gender === 'Male' ? '💁‍♂️' : user.gender === 'Female' ? '💁‍♀️' : '💖'}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{user.gender} User</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="min-w-0">
                      <div 
                        className="font-medium hover:underline cursor-pointer"
                        onClick={() => handleUserClick(user.id)}
                      >
                        {user.name}
                      </div>
                      <div className="text-sm text-muted-foreground">@{user.username}</div>
                      <div className="flex items-center gap-1 mt-0.5">
                        {user.isVerified && (
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <span className="inline-flex transition-transform duration-200 hover:scale-110 hover:rotate-3 cursor-help">
                                  {(user.username === "jackpeagam" || 
                                    user.username === "benwhatson" || 
                                    user.username === "elieabousamra") ? (
                                    <img 
                                      src="/lovable-uploads/ce94f2b9-bb63-4eac-9d34-41eec7475422.png" 
                                      alt="Staff Member" 
                                      className="h-5 w-5" 
                                    />
                                  ) : (
                                    <img 
                                      src="/lovable-uploads/560d8a54-e5fd-4af3-84b1-62f333f56b27.png" 
                                      alt="Verified" 
                                      className="h-4 w-4" 
                                    />
                                  )}
                                </span>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>{(user.username === "jackpeagam" || 
                                  user.username === "benwhatson" || 
                                  user.username === "elieabousamra") ? "Staff Member" : "Verified User"}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        )}
                        {user.isLinkupPlus && renderLinkupPlusIcon()}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>
                  {user.nationality === "🇱🇧" ? "Lebanese" : getNationalityLabel(user.nationality)}
                </TableCell>
                <TableCell>{user.hostedLinkups}</TableCell>
                <TableCell>{user.attendedLinkups}</TableCell>
                <TableCell>{formatCurrency(user.totalEarnings)}</TableCell>
                <TableCell>
                  {formatJoinDate(user.joinDate)}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleUserAction('view', user.id)}>
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
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
          <span className="font-medium">
            {Math.min(startIndex + itemsPerPage, filteredUsers.length)}
          </span>{" "}
          of <span className="font-medium">{filteredUsers.length}</span> users
        </div>

        <div className="flex items-center space-x-6">
          <Select 
            value={itemsPerPage.toString()} 
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={itemsPerPage.toString()} />
            </SelectTrigger>
            <SelectContent side="top">
              {itemsPerPageOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className={cn(currentPage === 1 && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber = i + 1;
                
                if (totalPages > 5) {
                  if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }
                }
                
                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={() => handlePageChange(totalPages)}>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  className={cn(currentPage === totalPages && "pointer-events-none opacity-50")}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      
      {suspendUserId && (
        <SuspendUserDialog
          userId={suspendUserId}
          username={suspendUsername}
          avatar={suspendUserAvatar}
          name={suspendUserName}
          onClose={handleCloseSuspendDialog}
        />
      )}
      
      {deleteUserId && (
        <DeleteUserDialog
          userId={deleteUserId}
          username={deleteUsername}
          avatar={deleteUserAvatar} 
          name={deleteUserName}
          onClose={handleCloseDeleteDialog}
        />
      )}
    </div>
  );
}
