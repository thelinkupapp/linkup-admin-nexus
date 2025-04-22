import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, DollarSign, ArrowUp, ArrowDown } from "lucide-react";
import { LinkupFilters } from "./LinkupFilters";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationItemsPerPage } from "@/components/ui/pagination";
import RemoveLinkupDialog from "./RemoveLinkupDialog";
import { toast } from "@/components/ui/sonner";
import { formatJoinDate } from "@/utils/dateFormatting";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { format } from "date-fns";

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
  { id: "other", name: "Other", emoji: "🎯" },
];

const linkups = [
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

function formatDuration(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;
  if (hours === 0) return `(${minutes}min)`;
  return minutes === 0 ? `(${hours}hr)` : `(${hours}hr ${minutes}min)`;
}

function getStatusBadgeStyles(status: string) {
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
}

const PER_PAGE_OPTIONS = [25, 50, 100];

function formatDateTime(dt: string) {
  return format(new Date(dt), "MMM d, yyyy, h:mm a");
}

export function LinkupTable() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedVisibility, setSelectedVisibility] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedJoinMethod, setSelectedJoinMethod] = useState("");
  const [sortConfig, setSortConfig] = useState<{ field: string; direction: "asc" | "desc" }>({
    field: "date",
    direction: "desc",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE_OPTIONS[0]);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [linkupToRemove, setLinkupToRemove] = useState<{ id: string; title: string } | null>(null);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});
  const [earningsSort, setEarningsSort] = useState<"none" | "desc" | "asc">("none");

  const linkupsWithEarnings = linkups.map(l => ({
    ...l,
    earnings: l.isFree ? 0 : (l.price ?? 0) * l.attendeeCount
  }));

  const filteredLinkups = useMemo(() => {
    let filtered = [...linkupsWithEarnings]
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
        return true;
      });
    if (earningsSort !== "none") {
      filtered = filtered.sort((a,b) =>
        earningsSort === "desc" ? b.earnings - a.earnings : a.earnings - b.earnings
      );
    } else {
      filtered = filtered.sort((a, b) => {
        if (sortConfig.field === 'date') {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
        } else if (sortConfig.field === 'created') {
          const createdA = new Date(a.createdAt).getTime();
          const createdB = new Date(b.createdAt).getTime();
          return sortConfig.direction === 'asc' ? createdA - createdB : createdB - createdA;
        }
        return 0;
      });
    }
    return filtered;
  }, [searchValue, selectedCategories, selectedStatus, selectedVisibility, selectedPrice, selectedJoinMethod, sortConfig, earningsSort]);

  const totalCount = linkups.length;
  const filteredCount = filteredLinkups.length;
  const pageCount = Math.ceil(filteredCount / perPage);
  const currentLinkups = filteredLinkups.slice((currentPage - 1) * perPage, currentPage * perPage);

  function handleSort(field: string) {
    if (field === "earnings") {
      setEarningsSort(prev =>
        prev === "none" ? "desc" : prev === "desc" ? "asc" : "none"
      );
      return;
    }
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
    setEarningsSort("none");
  }

  function handleRemove(linkup: { id: string; title: string }) {
    setRemoveDialogOpen(true);
    setLinkupToRemove(linkup);
  }

  function confirmRemoveLinkup() {
    toast.success(`"${linkupToRemove?.title}" removed`);
    setRemoveDialogOpen(false);
    setLinkupToRemove(null);
  }

  function cancelRemoveLinkup() {
    setRemoveDialogOpen(false);
    setLinkupToRemove(null);
  }

  function toggleRowExpanded(id: string) {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <LinkupFilters
            layout="inline"
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
            dateRange={undefined}
            setDateRange={() => {}}
            filteredCount={filteredCount}
            totalCount={totalCount}
          />
          <Button
            variant="outline"
            className="flex items-center gap-2 font-medium"
            onClick={() => handleSort("earnings")}
          >
            <DollarSign className="w-4 h-4" />
            {earningsSort === "asc" && "Earnings ↑"}
            {earningsSort === "desc" && "Earnings ↓"}
            {earningsSort === "none" && "Sort by Earnings"}
          </Button>
        </div>
        
        <div className="rounded-lg border shadow-sm overflow-hidden">
          <Table className="w-full text-sm">
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-5 p-2"></TableHead>
                <TableHead 
                  className="w-1/6 font-medium cursor-pointer hover:bg-gray-50"
                >
                  Linkup Title
                </TableHead>
                <TableHead className="w-[10%] font-medium">Category</TableHead>
                <TableHead className="w-[15%] font-medium">Host</TableHead>
                <TableHead 
                  className="w-[15%] font-medium cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center">
                    Date & Time
                    {sortConfig.field === "date" && (
                      sortConfig.direction === "asc" 
                        ? <ArrowUp className="ml-1 h-4 w-4" />
                        : <ArrowDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead 
                  className="w-[15%] font-medium cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("created")}
                >
                  <div className="flex items-center">
                    Created On
                    {sortConfig.field === "created" && (
                      sortConfig.direction === "asc" 
                        ? <ArrowUp className="ml-1 h-4 w-4" />
                        : <ArrowDown className="ml-1 h-4 w-4" />
                    )}
                  </div>
                </TableHead>
                <TableHead className="w-[10%] font-medium">Status</TableHead>
                <TableHead className="w-10 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentLinkups.map(linkup => {
                const categoryObj = categories.find(c => c.id === linkup.category);
                return (
                  <React.Fragment key={linkup.id}>
                    <TableRow className="hover:bg-muted/50">
                      <TableCell className="p-2">
                        <button
                          onClick={() => toggleRowExpanded(linkup.id)}
                          aria-label={expandedRows[linkup.id] ? "Collapse details" : "Expand details"}
                          className="p-1 rounded hover:bg-muted transition"
                        >
                          {expandedRows[linkup.id] ? "↑" : "↓"}
                        </button>
                      </TableCell>
                      <TableCell className="py-2">
                        <Link
                          to={`/linkups/${linkup.id}`}
                          className="font-medium text-sm hover:underline hover:text-primary"
                        >
                          {linkup.title}
                        </Link>
                      </TableCell>
                      <TableCell className="py-2">
                        <span className="mr-1">{categoryObj?.emoji}</span>
                        <span className="text-xs">{categoryObj?.name}</span>
                      </TableCell>
                      <TableCell className="py-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={linkup.host.avatar}
                            alt={linkup.host.name}
                            className="h-6 w-6 rounded-full object-cover"
                          />
                          <div>
                            <Link to={`/users/${linkup.host.id}`} className="font-medium text-sm hover:underline hover:text-primary">
                              {linkup.host.name}
                            </Link>
                            <div className="text-xs text-muted-foreground">{linkup.host.username}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-2">
                        <div className="text-xs font-medium">{formatDateTime(linkup.date)}</div>
                        <div className="text-xs text-muted-foreground">{formatDuration(linkup.date, linkup.endTime)}</div>
                      </TableCell>
                      <TableCell className="py-2">
                        <div className="text-xs">{formatDateTime(linkup.createdAt)}</div>
                      </TableCell>
                      <TableCell className="py-2">
                        <Badge variant="outline" className={`text-xs px-1.5 py-0.5 ${getStatusBadgeStyles(linkup.status)}`}>
                          {linkup.status.charAt(0).toUpperCase() + linkup.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right p-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white z-[100]">
                            <DropdownMenuItem asChild>
                              <Link to={`/linkups/${linkup.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleRemove({ id: linkup.id, title: linkup.title })}
                            >
                              Remove Linkup
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                    {expandedRows[linkup.id] && (
                      <TableRow className="bg-muted/20">
                        <TableCell colSpan={8} className="py-3 px-6">
                          <div className="grid grid-cols-4 gap-4 text-xs">
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Location</div>
                              <div className="text-sm">{linkup.location}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Attendees</div>
                              <div className="text-sm font-medium">{linkup.attendeeCount}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Visibility</div>
                              <div className="text-sm">
                                {linkup.isPublic ? "Public" : "Private"}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Join Method</div>
                              <div className="text-sm">
                                {linkup.isOpen ? "Open" : "Closed"}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Price</div>
                              <div className="text-sm">
                                {linkup.isFree ? "Free" : `$${linkup.price}`}
                              </div>
                            </div>
                            {(!linkup.isFree && linkup.price && linkup.attendeeCount) ? (
                              <div>
                                <div className="text-xs text-muted-foreground mb-1">Earnings</div>
                                <div className="flex items-center gap-1 font-medium text-green-700 text-sm">
                                  <span className="flex items-center"><DollarSign className="w-3 h-3 mr-0.5" />${linkup.earnings}</span>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
              {currentLinkups.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6">
                    <span className="text-sm text-muted-foreground">No linkups found.</span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Showing {(filteredCount === 0) ? 0 : (currentPage - 1) * perPage + 1}
              -
              {Math.min(currentPage * perPage, filteredCount)}
              &nbsp;of {filteredCount} linkups
            </span>
            <PaginationItemsPerPage>
              <span className="text-sm">Per page:</span>
              <select
                value={perPage}
                onChange={e => {
                  setPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="text-sm rounded-md border border-input px-2 py-1 bg-background"
              >
                {PER_PAGE_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </PaginationItemsPerPage>
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={e => { e.preventDefault(); setCurrentPage(c => Math.max(1, c - 1)); }}
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>
              {Array.from({ length: Math.min(5, pageCount) }, (_, i) => {
                let pageToShow;
                if (pageCount <= 5) {
                  pageToShow = i + 1;
                } else if (currentPage <= 3) {
                  pageToShow = i + 1;
                } else if (currentPage >= pageCount - 2) {
                  pageToShow = pageCount - 4 + i;
                } else {
                  pageToShow = currentPage - 2 + i;
                }
                
                return (
                  <PaginationItem key={pageToShow}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === pageToShow}
                      onClick={e => { e.preventDefault(); setCurrentPage(pageToShow); }}
                    >
                      {pageToShow}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={e => { e.preventDefault(); setCurrentPage(c => Math.min(pageCount, c + 1)); }}
                  aria-disabled={currentPage === pageCount}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
      <RemoveLinkupDialog
        open={removeDialogOpen}
        linkupTitle={linkupToRemove?.title || ""}
        onConfirm={confirmRemoveLinkup}
        onCancel={cancelRemoveLinkup}
      />
    </>
  );
}
