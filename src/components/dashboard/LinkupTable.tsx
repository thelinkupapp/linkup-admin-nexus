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
import { MoreHorizontal, DollarSign, sortAsc, sortDesc } from "lucide-react";
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
  const [earningsDropdownOpen, setEarningsDropdownOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const sortOptions = [
    { label: "Date", value: "date" },
    { label: "Created On", value: "created" },
    { label: "Earnings", value: "earnings" }
  ];

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

  function handleSortDropdown(option: string) {
    setSortDropdownOpen(false);
    if (option === "earnings") {
      setEarningsSort(prev =>
        prev === "none" ? "desc" : prev === "desc" ? "asc" : "none"
      );
      setSortConfig({ field: "date", direction: "desc" });
    } else {
      setSortConfig((prev) => ({
        field: option,
        direction: prev.field === option && prev.direction === "asc" ? "desc" : "asc",
      }));
      setEarningsSort("none");
    }
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
      <div className="flex flex-col gap-6">
        <div>
          <span className="flex items-center gap-2 text-lg font-semibold text-muted-foreground">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="2.5" y="5.5" width="6" height="13" rx="1.5" stroke="#8364e8" strokeWidth="1.5" />
              <rect x="15.5" y="5.5" width="6" height="13" rx="1.5" stroke="#8364e8" strokeWidth="1.5" />
              <rect x="3" y="2" width="18" height="5" rx="1.5" fill="#8364e8" stroke="#8364e8" strokeWidth="1.5" />
            </svg>
            <span className="text-xl font-bold" style={{ color: "#8364e8" }}>{filteredCount}</span>
            <span>total linkups</span>
          </span>
        </div>
        <div className="w-full flex flex-col gap-3 pb-2">
          <div className="w-full flex flex-wrap md:flex-nowrap gap-2 md:gap-4">
            <DropdownMenu open={sortDropdownOpen} onOpenChange={setSortDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center gap-2 min-w-[160px] text-base font-medium"
                >
                  <DollarSign className="w-5 h-5 mb-[2px]" />
                  Sort by
                  {earningsSort === "desc" && (
                    <span className="flex items-center text-base text-muted-foreground gap-1">
                      Earnings <sortDesc className="w-4 h-4" />
                    </span>
                  )}
                  {earningsSort === "asc" && (
                    <span className="flex items-center text-base text-muted-foreground gap-1">
                      Earnings <sortAsc className="w-4 h-4" />
                    </span>
                  )}
                  {earningsSort === "none" && (
                    <span className="text-base text-muted-foreground">Earnings</span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-white z-[100] shadow-md min-w-[200px]">
                <DropdownMenuItem
                  onClick={() => handleSortDropdown("earnings")}
                  className={earningsSort !== "none" ? "font-semibold bg-muted" : ""}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Sort by earnings
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleSortDropdown("date")}
                  className={sortConfig.field === "date" ? "font-semibold bg-muted" : ""}
                >
                  Date &amp; Time{" "}
                  {sortConfig.field === "date" && (
                    sortConfig.direction === "asc" ? <sortAsc className="ml-1 w-4 h-4" /> : <sortDesc className="ml-1 w-4 h-4" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleSortDropdown("created")}
                  className={sortConfig.field === "created" ? "font-semibold bg-muted" : ""}
                >
                  Created On{" "}
                  {sortConfig.field === "created" && (
                    sortConfig.direction === "asc" ? <sortAsc className="ml-1 w-4 h-4" /> : <sortDesc className="ml-1 w-4 h-4" />
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex-1">
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
            </div>
          </div>
        </div>
        <div className="border rounded-2xl bg-background overflow-x-auto shadow-sm">
          <Table className="w-full text-base">
            <TableHeader>
              <TableRow className="bg-softGray/70 h-14 text-[#36395A]">
                <TableHead className="w-10 border-none bg-transparent"></TableHead>
                <TableHead className="min-w-[220px] text-base font-semibold">Linkup Title</TableHead>
                <TableHead className="min-w-[150px] text-base font-semibold">Category</TableHead>
                <TableHead className="min-w-[220px] text-base font-semibold">Host</TableHead>
                <TableHead className="min-w-[180px] text-base font-semibold">Date &amp; Time</TableHead>
                <TableHead className="min-w-[160px] text-base font-semibold">Created On</TableHead>
                <TableHead className="min-w-[110px] text-base font-semibold">Status</TableHead>
                <TableHead className="min-w-[70px] text-base font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentLinkups.map(linkup => {
                const categoryObj = categories.find(c => c.id === linkup.category);
                return (
                  <React.Fragment key={linkup.id}>
                    <TableRow className="h-[70px] border-b border-[#ececf5]">
                      <TableCell className="w-10 px-2">
                        <button
                          onClick={() => toggleRowExpanded(linkup.id)}
                          aria-label={expandedRows[linkup.id] ? "Collapse details" : "Expand details"}
                          className="p-1 rounded hover:bg-muted transition"
                        >
                          {expandedRows[linkup.id] ? (
                            <span className="text-muted-foreground">&#8593;</span>
                          ) : (
                            <span className="text-muted-foreground">&#8595;</span>
                          )}
                        </button>
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/linkups/${linkup.id}`}
                          className="font-bold text-lg underline hover:text-primary cursor-pointer tracking-tight"
                        >
                          {linkup.title}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <span className="mr-2 text-xl">{categoryObj?.emoji}</span>
                        <span>{categoryObj?.name}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                            src={linkup.host.avatar}
                            alt={linkup.host.name}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                          <div>
                            <Link to={`/users/${linkup.host.id}`} className="font-semibold text-base underline hover:text-primary">
                              {linkup.host.name}
                            </Link>
                            <div className="text-sm text-muted-foreground">{linkup.host.username}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{formatDateTime(linkup.date)}</div>
                        <div className="text-muted-foreground">{formatDuration(linkup.date, linkup.endTime)}</div>
                      </TableCell>
                      <TableCell>
                        <div>{formatDateTime(linkup.createdAt)}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`text-base px-2 py-1 ${getStatusBadgeStyles(linkup.status)}`}>
                          {linkup.status.charAt(0).toUpperCase() + linkup.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
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
                      <TableRow className="bg-[#f7f7fc] border-b border-[#ececf5]">
                        <TableCell colSpan={8} className="p-0 pb-6">
                          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 px-10 py-5">
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Location</div>
                              <div className="text-base">{linkup.location}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Attendees</div>
                              <div className="text-base font-medium">{linkup.attendeeCount}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Visibility</div>
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <span className="text-base font-medium underline cursor-help">
                                    {linkup.isPublic ? "Public" : "Private"}
                                  </span>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                  <span>
                                    {linkup.isPublic
                                      ? "Linkup open to anyone"
                                      : "Linkup viewable by link only"}
                                  </span>
                                </HoverCardContent>
                              </HoverCard>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Join Method</div>
                              <HoverCard>
                                <HoverCardTrigger asChild>
                                  <span className="text-base font-medium underline cursor-help">
                                    {linkup.isOpen ? "Open" : "Closed"}
                                  </span>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                  <span>
                                    {linkup.isOpen
                                      ? "No approval needed"
                                      : "Approval needed"}
                                  </span>
                                </HoverCardContent>
                              </HoverCard>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Price</div>
                              <div className="text-base">
                                {linkup.isFree ? "Free" : `$${linkup.price}`}
                              </div>
                              {(!linkup.isFree && linkup.price && linkup.attendeeCount) ? (
                                <div className="mt-3">
                                  <div className="text-xs text-muted-foreground mb-1">Linkup earnings</div>
                                  <div className="flex items-center gap-1 font-bold text-green-800 text-base">
                                    <span className="flex items-center"><DollarSign className="w-4 h-4 mr-1" />${linkup.earnings}</span>
                                  </div>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                );
              })}
              {currentLinkups.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12">
                    <span className="text-lg text-muted-foreground">No linkups found.</span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
          <div className="flex items-center gap-3">
            <span className="text-base text-muted-foreground">
              Showing {(filteredCount === 0) ? 0 : (currentPage - 1) * perPage + 1}
              -
              {Math.min(currentPage * perPage, filteredCount)}
              &nbsp;of {filteredCount} linkups
            </span>
            <PaginationItemsPerPage>
              <span>Linkups per page:</span>
              <select
                value={perPage}
                onChange={e => {
                  setPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="rounded-md border border-input px-3 py-1.5 bg-background focus:outline-none focus:ring focus:ring-primary"
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
              {Array.from({ length: pageCount }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === i + 1}
                    onClick={e => { e.preventDefault(); setCurrentPage(i + 1); }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
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
