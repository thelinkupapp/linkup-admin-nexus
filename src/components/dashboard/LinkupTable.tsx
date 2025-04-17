
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter,
  MoreVertical, 
  ChevronRight,
  Calendar,
  MapPin,
  Users as UsersIcon,
  Globe,
  Lock,
  CircleDollarSign,
  Clock
} from "lucide-react";
import { DataSort } from "./DataSort";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

// Categories with their emojis
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

// Sample linkups data
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
    location: "Brew Café",
    attendeeCount: 4,
    status: "upcoming",
    isPublic: true,
    isOpen: true,
    isFree: true
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
    location: "Forest Trail Park",
    attendeeCount: 8,
    status: "upcoming",
    isPublic: true,
    isOpen: false,
    isFree: true
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

export function LinkupTable() {
  const [searchValue, setSearchValue] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [selectedCategory, setSelectedCategory] = useState("");
  
  // Status filters
  const [upcomingFilter, setUpcomingFilter] = useState(false);
  const [happenedFilter, setHappenedFilter] = useState(false);
  const [cancelledFilter, setCancelledFilter] = useState(false);
  const [deletedFilter, setDeletedFilter] = useState(false);
  const [removedFilter, setRemovedFilter] = useState(false);
  
  // Access filters
  const [publicFilter, setPublicFilter] = useState(false);
  const [privateFilter, setPrivateFilter] = useState(false);
  
  // Availability filters
  const [openFilter, setOpenFilter] = useState(false);
  const [closedFilter, setClosedFilter] = useState(false);
  
  // Price filters
  const [freeFilter, setFreeFilter] = useState(false);
  const [paidFilter, setPaidFilter] = useState(false);

  // Filter linkups based on selected filters
  const filteredLinkups = [...linkups]
    .filter(linkup => {
      if (selectedCategory && linkup.category !== selectedCategory) return false;
      
      // Status filters
      if (upcomingFilter && linkup.status !== "upcoming") return false;
      if (happenedFilter && linkup.status !== "happened") return false;
      if (cancelledFilter && linkup.status !== "cancelled") return false;
      if (deletedFilter && linkup.status !== "deleted") return false;
      if (removedFilter && linkup.status !== "removed") return false;
      
      // Access filters
      if (publicFilter && !linkup.isPublic) return false;
      if (privateFilter && linkup.isPublic) return false;
      
      // Availability filters
      if (openFilter && !linkup.isOpen) return false;
      if (closedFilter && linkup.isOpen) return false;
      
      // Price filters
      if (freeFilter && !linkup.isFree) return false;
      if (paidFilter && linkup.isFree) return false;
      
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
          {/* Category Dropdown */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px] h-9">
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

          {/* Status Filters */}
          <Toggle 
            pressed={upcomingFilter}
            onPressedChange={setUpcomingFilter}
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Clock className="h-4 w-4" />
            Upcoming
          </Toggle>
          
          <Toggle 
            pressed={happenedFilter}
            onPressedChange={setHappenedFilter}
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Calendar className="h-4 w-4" />
            Happened
          </Toggle>

          {/* Access Filters */}
          <Toggle 
            pressed={publicFilter}
            onPressedChange={setPublicFilter}
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Globe className="h-4 w-4" />
            Public
          </Toggle>

          <Toggle 
            pressed={privateFilter}
            onPressedChange={setPrivateFilter}
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <Lock className="h-4 w-4" />
            Private
          </Toggle>

          {/* Price Filters */}
          <Toggle 
            pressed={freeFilter}
            onPressedChange={setFreeFilter}
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <CircleDollarSign className="h-4 w-4" />
            Free
          </Toggle>

          <Toggle 
            pressed={paidFilter}
            onPressedChange={setPaidFilter}
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5"
          >
            <CircleDollarSign className="h-4 w-4" />
            Paid
          </Toggle>

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
              <TableHead>Host</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Attendees</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLinkups.map((linkup) => (
              <TableRow key={linkup.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="text-xl">{linkup.emoji}</div>
                    <div className="font-medium">{linkup.title}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={linkup.host.avatar} alt={linkup.host.name} />
                      <AvatarFallback>{linkup.host.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">{linkup.host.name}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">
                      {new Date(linkup.date).toLocaleDateString()} at {new Date(linkup.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
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
                    <UsersIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">{linkup.attendeeCount}</span>
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
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
