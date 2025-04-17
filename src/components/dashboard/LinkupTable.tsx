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
  CheckCircle2,
  XCircle,
  ArrowUpCircle,
  DoorOpen,
  DoorClosed,
  Eye,
  EyeOff,
  Timer
} from "lucide-react";

import { DataSort } from "./DataSort";
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

const linkups = [
  {
    id: "1",
    title: "Coffee Meetup",
    emoji: "☕",
    category: "coffee-chats",
    host: {
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?u=sarah"
    },
    date: "2025-04-25T14:30:00Z",
    endTime: "2025-04-25T16:30:00Z",
    location: "Brew Café",
    attendeeCount: 4,
    status: "upcoming",
    isPublic: true,
    isOpen: true,
    isFree: true,
    price: 0
  },
  {
    id: "2",
    title: "Hiking Adventure",
    emoji: "🏞️",
    category: "outdoors",
    host: {
      name: "Mike Richards",
      avatar: "https://i.pravatar.cc/150?u=mike"
    },
    date: "2025-04-20T09:00:00Z",
    endTime: "2025-04-20T14:00:00Z",
    location: "Forest Trail Park",
    attendeeCount: 8,
    status: "upcoming",
    isPublic: true,
    isOpen: false,
    isFree: false,
    price: 25
  },
  {
    id: "3",
    title: "Wine Tasting",
    emoji: "🍷",
    category: "drinks",
    host: {
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/150?u=emma"
    },
    date: "2025-03-15T18:00:00Z",
    location: "Vintage Winery",
    attendeeCount: 12,
    status: "happened",
    isPublic: false,
    isOpen: false,
    isFree: false
  },
  {
    id: "4",
    title: "Tech Networking",
    emoji: "💻",
    category: "tech",
    host: {
      name: "David Chen",
      avatar: "https://i.pravatar.cc/150?u=david"
    },
    date: "2025-04-30T17:30:00Z",
    location: "Innovation Hub",
    attendeeCount: 20,
    status: "upcoming",
    isPublic: true,
    isOpen: true,
    isFree: false
  },
  {
    id: "5",
    title: "Book Club",
    emoji: "📚",
    category: "learning",
    host: {
      name: "Lisa Patel",
      avatar: "https://i.pravatar.cc/150?u=lisa"
    },
    date: "2025-03-22T19:00:00Z",
    location: "Central Library",
    attendeeCount: 6,
    status: "cancelled",
    isPublic: true,
    isOpen: false,
    isFree: true
  }
];

const countries = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "Japan",
  "All Locations"
];

export function LinkupTable() {
  const [searchValue, setSearchValue] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedVisibility, setSelectedVisibility] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedJoinMethod, setSelectedJoinMethod] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const getDateRangeForPeriod = (period: string) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    switch (period) {
      case "today":
        return { from: today, to: today };
      case "tomorrow":
        return { from: tomorrow, to: tomorrow };
      case "thisWeek":
        return { from: startOfWeek(today), to: endOfWeek(today) };
      case "nextWeek":
        return { from: startOfWeek(addWeeks(today, 1)), to: endOfWeek(addWeeks(today, 1)) };
      case "nextMonth":
        return { from: startOfMonth(addMonths(today, 1)), to: endOfMonth(addMonths(today, 1)) };
      default:
        return { from: undefined, to: undefined };
    }
  };

  const formatDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const hours = differenceInHours(end, start);
    const minutes = differenceInMinutes(end, start) % 60;
    
    if (hours === 0) {
      return `${minutes}min`;
    }
    return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}min`;
  };

  const filteredLinkups = [...linkups]
    .filter(linkup => {
      if (searchValue && !linkup.title.toLowerCase().includes(searchValue.toLowerCase())) return false;
      if (selectedCategory && linkup.category !== selectedCategory) return false;
      if (selectedLocation !== "All Locations" && linkup.location !== selectedLocation) return false;
      if (selectedStatus && linkup.status !== selectedStatus.toLowerCase()) return false;
      if (selectedVisibility) {
        if (selectedVisibility === "Public" && !linkup.isPublic) return false;
        if (selectedVisibility === "Private" && linkup.isPublic) return false;
      }
      if (selectedPrice) {
        if (selectedPrice === "Free" && !linkup.isFree) return false;
        if (selectedPrice === "Paid" && linkup.isFree) return false;
      }
      if (selectedJoinMethod) {
        if (selectedJoinMethod === "Open" && !linkup.isOpen) return false;
        if (selectedJoinMethod === "Closed" && linkup.isOpen) return false;
      }
      if (dateRange.from && dateRange.to) {
        const linkupDate = new Date(linkup.date);
        if (linkupDate < dateRange.from || linkupDate > dateRange.to) return false;
      }
      return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortDirection === "asc" ? dateA - dateB : dateB - dateA;
    });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search linkups..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9 w-full sm:w-80"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  <div className="flex items-center gap-2">
                    <span>{category.emoji}</span>
                    <span>{category.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Upcoming">
                <div className="flex items-center gap-2">
                  <ArrowUpCircle className="h-4 w-4" />
                  <span>Upcoming</span>
                </div>
              </SelectItem>
              <SelectItem value="Happened">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Happened</span>
                </div>
              </SelectItem>
              <SelectItem value="Cancelled">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  <span>Cancelled</span>
                </div>
              </SelectItem>
              <SelectItem value="Removed">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4" />
                  <span>Removed</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[180px]">
                <Calendar className="mr-2 h-4 w-4" />
                {dateRange.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  "Select Date Range"
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[320px] p-0" align="start">
              <div className="p-2 space-y-2">
                <DropdownMenuItem onClick={() => setDateRange(getDateRangeForPeriod("today"))}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Today
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateRange(getDateRangeForPeriod("tomorrow"))}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Tomorrow
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateRange(getDateRangeForPeriod("thisWeek"))}>
                  <Calendar className="mr-2 h-4 w-4" />
                  This Week
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateRange(getDateRangeForPeriod("nextWeek"))}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Next Week
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDateRange(getDateRangeForPeriod("nextMonth"))}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Next Month
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <div className="p-2">
                  <CalendarComponent
                    initialFocus
                    mode="range"
                    defaultMonth={dateRange.from}
                    selected={dateRange}
                    onSelect={(range: { from: Date; to: Date | undefined }) => {
                      setDateRange({ from: range.from, to: range.to || range.from });
                    }}
                    numberOfMonths={2}
                  />
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <Select value={selectedVisibility} onValueChange={setSelectedVisibility}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Public">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>Public</span>
                </div>
              </SelectItem>
              <SelectItem value="Private">
                <div className="flex items-center gap-2">
                  <EyeOff className="h-4 w-4" />
                  <span>Private</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedPrice} onValueChange={setSelectedPrice}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Prices" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Free">
                <div className="flex items-center gap-2">
                  <CircleDollarSign className="h-4 w-4" />
                  <span>Free</span>
                </div>
              </SelectItem>
              <SelectItem value="Paid">
                <div className="flex items-center gap-2">
                  <CircleDollarSign className="h-4 w-4" />
                  <span>Paid</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedJoinMethod} onValueChange={setSelectedJoinMethod}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Join Methods" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">
                <div className="flex items-center gap-2">
                  <DoorOpen className="h-4 w-4" />
                  <span>Open</span>
                </div>
              </SelectItem>
              <SelectItem value="Closed">
                <div className="flex items-center gap-2">
                  <DoorClosed className="h-4 w-4" />
                  <span>Closed</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>

          <DataSort
            sortDirection={sortDirection}
            onSortChange={setSortDirection}
          />
        </div>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Linkup</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Host</TableHead>
              <TableHead>Date & Time</TableHead>
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
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(linkup.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">
                        {new Date(linkup.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(linkup.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Timer className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-sm">
                        Duration: {formatDuration(linkup.date, linkup.endTime)}
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
                      linkup.status === "upcoming" && "bg-status-upcoming/10 text-status-upcoming border-status-upcoming/20",
                      linkup.status === "happened" && "bg-status-active/10 text-status-active border-status-active/20",
                      linkup.status === "cancelled" && "bg-status-cancelled/10 text-status-cancelled border-status-cancelled/20"
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
