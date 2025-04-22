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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DollarSign,
  SortAsc,
  SortDesc,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { LinkupFilters } from "./LinkupFilters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationItemsPerPage,
} from "@/components/ui/pagination";
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
  const [earningsSort, setEarningsSort] = useState<"none" | "desc" | "asc">("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE_OPTIONS[0]);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [linkupToRemove, setLinkupToRemove] = useState<{ id: string; title: string } | null>(null);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

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
    setSortConfig(prev => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
    setEarningsSort("none");
  }

  function handleEarningsDropdown(value: "desc" | "asc") {
    setEarningsSort(value);
    setSortConfig({ field: "date", direction: "desc" });
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
      <div className="mb-1 mt-2 mr-8 flex items-center gap-3">
        <svg width="28" height="28" fill="none" stroke="#9b87f5" strokeWidth="2" viewBox="0 0 24 24" className="mr-1"><circle cx="9" cy="7" r="4"/><path d="M17 11v-.5A4.5 4.5 0 0 0 12.5 6h-.5"/><path d="M17 14h.01M21 17c0-2.21-3.58-4-8-4s-8 1.79-8 4m16 0v3a2 2 0 0 1-2 2h-2"/></svg>
        <span className="text-xl font-bold">
          <span className="text-[#9b87f5] font-bold">{totalCount}</span>
          <span className="text-gray-700 font-medium ml-2">total linkups</span>
        </span>
      </div>

      <div className="flex flex-col gap-0 mb-1">
        <div className="flex flex-wrap items-center gap-2">
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-9 text-xs px-4 gap-1 font-medium flex items-center"
                style={{ minWidth: 165 }}
                aria-label="Sort by earnings"
              >
                <DollarSign className="w-4 h-4" />
                Earnings
                {earningsSort === "desc" && <SortDesc className="w-4 h-4 ml-1" />}
                {earningsSort === "asc" && <SortAsc className="w-4 h-4 ml-1" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="z-[100] min-w-[120px]">
              <DropdownMenuItem
                onClick={() => handleEarningsDropdown("desc")}
                className={earningsSort === "desc" ? "font-semibold text-primary" : ""}
              >
                <SortDesc className="w-4 h-4 mr-2" /> Highest
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleEarningsDropdown("asc")}
                className={earningsSort === "asc" ? "font-semibold text-primary" : ""}
              >
                <SortAsc className="w-4 h-4 mr-2" /> Lowest
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="text-base font-medium text-[#222] mt-2 flex items-center gap-1">
          <svg width="21" height="21" fill="none" stroke="#8E9196" strokeWidth="1.7" viewBox="0 0 24 24" className="mr-1 -ml-1"><circle cx="9" cy="7" r="4"/><path d="M17 11v-.5A4.5 4.5 0 0 0 12.5 6h-.5"/><path d="M17 14h.01M21 17c0-2.21-3.58-4-8-4s-8 1.79-8 4m16 0v3a2 2 0 0 1-2 2h-2"/></svg>
          Showing&nbsp;
          <span className="font-bold text-[#9b87f5]">{filteredCount}</span>
          &nbsp;of&nbsp;
          <span className="font-bold text-[#9b87f5]">{totalCount}</span>
          &nbsp;linkups
        </div>
      </div>

      <div className="rounded-xl border shadow-xs overflow-hidden mt-3">
        <Table className="w-full text-[15px]">
          <TableHeader>
            <TableRow className="bg-soft-gray/40">
              <TableHead className="w-5 p-2"></TableHead>
              <TableHead
                className="w-44 font-bold cursor-pointer text-base py-3 px-3 select-none"
                onClick={() => handleSort("title")}
              >
                <div className="flex items-center gap-1 text-gray-800">
                  Linkup Title
                </div>
              </TableHead>
              <TableHead className="w-36 font-bold text-base py-3 px-3">Category</TableHead>
              <TableHead className="w-56 font-bold text-base py-3 px-3">Host</TableHead>
              <TableHead
                className="w-56 font-bold cursor-pointer text-base py-3 px-3 select-none"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center gap-[2px] text-gray-800">
                  Date &amp; Time
                  {sortConfig.field === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <SortAsc className="ml-1 w-4 h-4" />
                    ) : (
                      <SortDesc className="ml-1 w-4 h-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="w-44 font-bold cursor-pointer text-base py-3 px-3 select-none"
                onClick={() => handleSort("created")}
              >
                <div className="flex items-center gap-[2px] text-gray-800">
                  Created On
                  {sortConfig.field === "created" &&
                    (sortConfig.direction === "asc" ? (
                      <SortAsc className="ml-1 w-4 h-4" />
                    ) : (
                      <SortDesc className="ml-1 w-4 h-4" />
                    ))}
                </div>
              </TableHead>
              <TableHead className="w-28 font-bold text-base py-3 px-3">Status</TableHead>
              <TableHead className="w-24 text-base text-right px-3">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentLinkups.map(linkup => {
              const categoryObj = categories.find(c => c.id === linkup.category);
              return (
                <React.Fragment key={linkup.id}>
                  <TableRow className="hover:bg-soft-gray/30" style={{ fontSize: '15px', height: 44 }}>
                    <TableCell className="p-1">
                      <button
                        onClick={() => toggleRowExpanded(linkup.id)}
                        aria-label={expandedRows[linkup.id] ? "Collapse details" : "Expand details"}
                        className="p-1 rounded hover:bg-muted transition"
                        style={{ fontSize: "20px", lineHeight: "20px" }}
                      >
                        {expandedRows[linkup.id] ? "↑" : "↓"}
                      </button>
                    </TableCell>
                    <TableCell className="py-1.5 px-3 font-semibold text-base truncate max-w-[170px]">
                      <Link
                        to={`/linkups/${linkup.id}`}
                        className="hover:underline hover:text-primary"
                      >
                        {linkup.title}
                      </Link>
                    </TableCell>
                    <TableCell className="py-1.5 px-3">
                      <span className="mr-1">{categoryObj?.emoji}</span>
                      <span className="text-xs">{categoryObj?.name}</span>
                    </TableCell>
                    <TableCell className="py-1.5 px-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={linkup.host.avatar}
                          alt={linkup.host.name}
                          className="h-6 w-6 rounded-full object-cover"
                        />
                        <div>
                          <Link to={`/users/${linkup.host.id}`} className="font-semibold text-base hover:underline hover:text-primary">
                            {linkup.host.name}
                          </Link>
                          <div className="text-xs text-muted-foreground">{linkup.host.username}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-1.5 px-3">
                      <div className="text-xs font-medium">{formatDateTime(linkup.date)}</div>
                      <div className="text-xs text-muted-foreground">{formatDuration(linkup.date, linkup.endTime)}</div>
                    </TableCell>
                    <TableCell className="py-1.5 px-3">
                      <div className="text-xs">{formatDateTime(linkup.createdAt)}</div>
                    </TableCell>
                    <TableCell className="py-1.5 px-3">
                      <Badge variant="outline" className={`text-xs px-2 py-0.5 ${getStatusBadgeStyles(linkup.status)}`}>
                        {linkup.status.charAt(0).toUpperCase() + linkup.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right p-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="6" r="2" fill="#555"/><circle cx="12" cy="12" r="2" fill="#555"/><circle cx="12" cy="18" r="2" fill="#555"/></svg>
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
                      <TableCell colSpan={8} className="py-2 px-6">
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
      <RemoveLinkupDialog
        open={removeDialogOpen}
        linkupTitle={linkupToRemove?.title || ""}
        onConfirm={confirmRemoveLinkup}
        onCancel={cancelRemoveLinkup}
      />
    </>
  );
}
