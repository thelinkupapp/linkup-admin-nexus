
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ChevronDown, 
  ChevronRight,
  Calendar,
  MapPin,
  Users as UsersIcon
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

// Mock data for linkups
const linkups = [
  {
    id: "1",
    title: "Sunset Beach Volleyball",
    emoji: "🏐",
    host: {
      name: "Emma Thompson",
      username: "emma_t",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    date: "2024-05-15T18:00:00",
    status: "upcoming",
    attendeeCount: 12,
    category: "Sports",
    location: "Santa Monica Beach, CA"
  },
  {
    id: "2",
    title: "Downtown Art Gallery Opening",
    emoji: "🎨",
    host: {
      name: "Michael Chen",
      username: "mike_chen",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    date: "2024-05-10T19:00:00",
    status: "happened",
    attendeeCount: 35,
    category: "Arts",
    location: "Downtown Gallery, NY"
  },
  {
    id: "3",
    title: "Rooftop Yoga Session",
    emoji: "🧘",
    host: {
      name: "Sophia Rodriguez",
      username: "sophia_r",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    date: "2024-05-20T08:00:00",
    status: "upcoming",
    attendeeCount: 8,
    category: "Fitness",
    location: "Skyline Rooftop, Miami, FL"
  },
  {
    id: "4",
    title: "Live Jazz Night",
    emoji: "🎷",
    host: {
      name: "James Wilson",
      username: "james_w",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    date: "2024-05-05T20:00:00",
    status: "cancelled",
    attendeeCount: 0,
    category: "Music",
    location: "Blue Note Club, Chicago, IL"
  },
  {
    id: "5",
    title: "Tech Startup Mixer",
    emoji: "💻",
    host: {
      name: "Olivia Johnson",
      username: "olivia_j",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    date: "2024-05-18T17:30:00",
    status: "upcoming",
    attendeeCount: 45,
    category: "Networking",
    location: "Innovation Hub, Austin, TX"
  },
];

export function LinkupTable() {
  const [searchValue, setSearchValue] = useState("");
  
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
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
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
            {linkups.map((linkup) => (
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
