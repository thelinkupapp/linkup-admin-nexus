
import { useState } from "react";
import { Link } from "react-router-dom";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addWeeks, addMonths, differenceInHours, differenceInMinutes } from "date-fns";
import { 
  Search, 
  MoreVertical, 
  ChevronRight,
  Calendar,
  MapPin,
  Users as UsersIcon,
  Globe,
  Lock,
  CircleDollarSign,
  Clock,
  Filter,
  Tag,
  CheckCircle,
  XCircle,
  ArrowUpCircle,
  DoorOpen,
  DoorClosed,
  Eye,
  EyeOff,
  Timer,
  Map,
  ArrowUpDown
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LinkupFilters } from "./LinkupFilters";
import { DateRange } from "react-day-picker";

interface Host {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

interface Linkup {
  id: string;
  title: string;
  emoji: string;
  category: string;
  host: Host;
  createdAt: string;
  date: string;
  endTime: string;
  location: string;
  attendeeCount: number;
  status: "upcoming" | "happening" | "happened" | "cancelled";
  isPublic: boolean;
  isOpen: boolean;
  isFree: boolean;
  price?: number;
}

const categories = [
  { id: "drinks", name: "Drinks", emoji: "🍸" },
  { id: "food", name: "Food", emoji: "🍔" },
  { id: "music", name: "Music", emoji: "🎵" },
  { id: "adventure", name: "Adventure", emoji: "🏃" },
  { id: "outdoors", name: "Outdoors", emoji: "🌲" },
  { id: "wellness", name: "Wellness", emoji: "🧘" },
  { id: "art-culture", name: "Art & Culture", emoji: "🎨" },
  { id: "movies-tv", name: "Movies & TV", emoji: "🎬" },
  { id: "shopping", name: "Shopping", emoji: "🛍️" },
  { id: "co-working", name: "Co-Working", emoji: "💼" },
  { id: "learning", name: "Learning", emoji: "📚" },
  { id: "nightlife", name: "Nightlife", emoji: "🌙" },
  { id: "coffee-chats", name: "Coffee & Chats", emoji: "☕" },
  { id: "travel", name: "Travel & Exploration", emoji: "✈️" },
  { id: "fitness", name: "Fitness", emoji: "🏆" },
  { id: "networking", name: "Networking", emoji: "💼" },
  { id: "content-creation", name: "Content Creation", emoji: "🎥" },
  { id: "tech", name: "Tech", emoji: "💻" },
  { id: "deep-talks", name: "Deep Talks", emoji: "🧠" },
  { id: "other", name: "Other", emoji: "🎯" }
];

// Sample data for linkups
const linkups: Linkup[] = [
  {
    id: "1",
    title: "Tech Networking",
    emoji: "💻",
    category: "tech",
    host: {
      id: "user1",
      name: "David Chen",
      username: "@davidchen",
      avatar: "https://i.pravatar.cc/150?u=david"
    },
    createdAt: "2025-04-15T10:30:00Z",
    date: "2025-04-30T18:30:00Z",
    endTime: "2025-04-30T21:30:00Z",
    location: "Innovation Hub",
    attendeeCount: 20,
    status: "upcoming",
    isPublic: true,
    isOpen: true,
    isFree: false,
    price: 25
  },
  {
    id: "2",
    title: "Coffee Meetup",
    emoji: "☕",
    category: "coffee-chats",
    host: {
      id: "user2",
      name: "Sarah Johnson",
      username: "@sarahj",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    createdAt: "2025-04-10T14:30:00Z",
    date: "2025-04-25T15:30:00Z",
    endTime: "2025-04-25T17:30:00Z",
    location: "Brew Café",
    attendeeCount: 4,
    status: "upcoming",
    isPublic: true,
    isOpen: true,
    isFree: true
  },
  {
    id: "3",
    title: "Hiking Adventure",
    emoji: "🏞️",
    category: "outdoors",
    host: {
      id: "user3",
      name: "Mike Richards",
      username: "@mikerichard",
      avatar: "https://i.pravatar.cc/150?u=mike"
    },
    createdAt: "2025-03-25T09:15:00Z",
    date: "2025-04-20T10:00:00Z",
    endTime: "2025-04-20T15:00:00Z",
    location: "Forest Trail Park",
    attendeeCount: 8,
    status: "upcoming",
    isPublic: true,
    isOpen: false,
    isFree: false,
    price: 15
  },
  {
    id: "4",
    title: "Book Club",
    emoji: "📚",
    category: "learning",
    host: {
      id: "user4",
      name: "Lisa Patel",
      username: "@lisap",
      avatar: "https://i.pravatar.cc/150?u=lisa"
    },
    createdAt: "2025-02-15T19:00:00Z",
    date: "2025-03-22T19:00:00Z",
    endTime: "2025-03-22T21:00:00Z",
    location: "Central Library",
    attendeeCount: 6,
    status: "cancelled",
    isPublic: true,
    isOpen: false,
    isFree: true
  },
  {
    id: "5",
    title: "Wine Tasting",
    emoji: "🍷",
    category: "drinks",
    host: {
      id: "user5",
      name: "Emma Wilson",
      username: "@emmaw",
      avatar: "https://i.pravatar.cc/150?u=emma"
    },
    createdAt: "2025-02-10T18:00:00Z",
    date: "2025-03-15T18:00:00Z",
    endTime: "2025-03-15T20:00:00Z",
    location: "Vintage Winery",
    attendeeCount: 12,
    status: "happened",
    isPublic: false,
    isOpen: false,
    isFree: false,
    price: 30
  }
];

export function LinkupTable() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedVisibility, setSelectedVisibility] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedJoinMethod, setSelectedJoinMethod] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [sortConfig, setSortConfig] = useState<{ field: string, direction: 'asc' | 'desc' }>({
    field: 'date',
    direction: 'desc'
  });

  const formatDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const hours = differenceInHours(end, start);
    const minutes = differenceInMinutes(end, start) % 60;
    
    if (hours === 0) {
      return `(${minutes}min)`;
    }
    return minutes === 0 ? `(${hours}hr)` : `(${hours}hr ${minutes}min)`;
  };

  const filteredLinkups = [...linkups]
    .filter(linkup => {
      if (searchValue && !linkup.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return false;
      }

      if (selectedCategories.length > 0 && !selectedCategories.includes(linkup.category)) {
        return false;
      }

      if (selectedStatus && linkup.status !== selectedStatus) {
        return false;
      }

      if (selectedVisibility) {
        if (selectedVisibility === "public" && !linkup.isPublic) return false;
        if (selectedVisibility === "private" && linkup.isPublic) return false;
      }

      if (selectedPrice) {
        if (selectedPrice === "free" && !linkup.isFree) return false;
        if (selectedPrice === "paid" && linkup.isFree) return false;
      }

      if (selectedJoinMethod) {
        if (selectedJoinMethod === "open" && !linkup.isOpen) return false;
        if (selectedJoinMethod === "closed" && linkup.isOpen) return false;
      }

      if (dateRange?.from && dateRange?.to) {
        const linkupDate = new Date(linkup.date);
        if (linkupDate < dateRange.from || linkupDate > dateRange.to) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      if (sortConfig.field === 'date') {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
      } else if (sortConfig.field === 'created') {
        const createdA = new Date(a.createdAt).getTime();
        const createdB = new Date(b.createdAt).getTime();
        return sortConfig.direction === 'asc' ? createdA - createdB : createdB - createdA;
      } else if (sortConfig.field === 'name') {
        return sortConfig.direction === 'asc' 
          ? a.title.localeCompare(b.title) 
          : b.title.localeCompare(a.title);
      }
      return 0;
    });

  const handleSort = (field: string) => {
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const getStatusBadgeStyles = (status: Linkup["status"]) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "happening":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "happened":
        return "bg-green-50 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="space-y-4">
      <LinkupFilters 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedVisibility={selectedVisibility}
        setSelectedVisibility={setSelectedVisibility}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        selectedJoinMethod={selectedJoinMethod}
        setSelectedJoinMethod={setSelectedJoinMethod}
        dateRange={dateRange}
        setDateRange={setDateRange}
        filteredCount={filteredLinkups.length}
        totalCount={linkups.length}
      />

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center gap-1">
                  Linkup
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Host</TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('created')}
              >
                <div className="flex items-center gap-1">
                  Created On
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-1">
                  Date & Time
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Join Method</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLinkups.map((linkup) => (
              <TableRow key={linkup.id}>
                <TableCell>
                  <Link to={`/linkups/${linkup.id}`} className="hover:underline">
                    <div className="flex items-center gap-2">
                      <div className="text-xl">{linkup.emoji}</div>
                      <div className="font-medium">{linkup.title}</div>
                    </div>
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">
                      {categories.find(cat => cat.id === linkup.category)?.name || linkup.category}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={linkup.host.avatar} alt={linkup.host.name} />
                      <AvatarFallback>{linkup.host.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <Link to={`/users/${linkup.host.id}`} className="text-sm font-medium hover:underline">
                        {linkup.host.name}
                      </Link>
                      <span className="text-xs text-muted-foreground">{linkup.host.username}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {new Date(linkup.createdAt).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(linkup.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <div className="text-sm">
                      {new Date(linkup.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span>
                        {new Date(linkup.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {" "}
                        {formatDuration(linkup.date, linkup.endTime)}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">{linkup.location}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {linkup.isPublic ? (
                      <Globe className="h-3.5 w-3.5 text-muted-foreground" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                    )}
                    <span className="text-sm">{linkup.isPublic ? "Public" : "Private"}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {linkup.isOpen ? "Open" : "Closed"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <CircleDollarSign className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">
                      {linkup.isFree ? "Free" : `$${linkup.price}`}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      getStatusBadgeStyles(linkup.status)
                    )}
                  >
                    {linkup.status.charAt(0).toUpperCase() + linkup.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={`/linkups/${linkup.id}`}>
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
                        <DropdownMenuItem asChild>
                          <Link to={`/linkups/${linkup.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit Linkup</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remove Linkup</DropdownMenuItem>
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
