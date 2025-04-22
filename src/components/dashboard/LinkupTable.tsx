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

interface LinkupTableProps {
  onCountChange?: (counts: { filtered: number; total: number }) => void;
  filterCountries?: { id: string; label: string; value: string; emoji: string; }[];
}

export function LinkupTable({ onCountChange, filterCountries }: LinkupTableProps) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedVisibility, setSelectedVisibility] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedJoinMethod, setSelectedJoinMethod] = useState("");
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ field: string; direction: "asc" | "desc" }>({
    field: "date",
    direction: "desc",
  });
  const [earningsSort, setEarningsSort] = useState<"none" | "desc" | "asc">("none");
  const [attendeesSort, setAttendeesSort] = useState<"none" | "desc" | "asc">("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(PER_PAGE_OPTIONS[0]);
  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);
  const [linkupToRemove, setLinkupToRemove] = useState<{ id: string; title: string } | null>(null);
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const linkupsWithEarnings = linkups.map(l => ({
    ...l,
    earnings: l.isFree ? 0 : (l.price ?? 0) * l.attendeeCount
  }));

  const allLocations = useMemo(() => {
    return Array.from(new Set(linkups.map(l => l.location))).sort();
  }, []);

  const filteredLinkups = useMemo(() => {
    let filtered = [...linkupsWithEarnings]
      .filter(linkup => {
        if (searchValue && !linkup.title.toLowerCase().includes(searchValue.toLowerCase())) {
          return false;
        }
        if (selectedCategories.length > 0 && !selectedCategories.includes(linkup.category)) {
          return false;
        }
        if (selectedStatuses.length > 0 && !selectedStatuses.includes(linkup.status)) {
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
        if (selectedLocations.length > 0 && !selectedLocations.includes(linkup.location)) {
          return false;
        }
        return true;
      });
    if (earningsSort !== "none") {
      filtered = filtered.sort((a, b) =>
        earningsSort === "desc" ? b.earnings - a.earnings : a.earnings - b.earnings
      );
    } else if (attendeesSort !== "none") {
      filtered = filtered.sort((a, b) =>
        attendeesSort === "desc" ? b.attendeeCount - a.attendeeCount : a.attendeeCount - b.attendeeCount
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
  }, [searchValue, selectedCategories, selectedStatuses, selectedVisibility, selectedPrice, selectedJoinMethod, selectedLocations, sortConfig, earningsSort, attendeesSort]);

  React.useEffect(() => {
    if (onCountChange) {
      onCountChange({ filtered: filteredLinkups.length, total: linkups.length });
    }
  }, [filteredLinkups.length, linkups.length, onCountChange]);

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
    setAttendeesSort("none");
  }

  function handleEarningsDropdown(value: "desc" | "asc") {
    setEarningsSort(value);
    setSortConfig({ field: "date", direction: "desc" });
    setAttendeesSort("none");
  }

  function handleAttendeesDropdown(value: "desc" | "asc") {
    setAttendeesSort(value);
    setSortConfig({ field: "date", direction: "desc" });
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
      <LinkupFilters
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        selectedStatuses={selectedStatuses}
        setSelectedStatuses={setSelectedStatuses}
        selectedVisibility={selectedVisibility}
        setSelectedVisibility={setSelectedVisibility}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
        selectedJoinMethod={selectedJoinMethod}
        setSelectedJoinMethod={setSelectedJoinMethod}
        selectedLocations={selectedLocations}
        setSelectedLocations={setSelectedLocations}
        allLocations={allLocations}
        dateRange={undefined}
        setDateRange={() => {}}
        earningsSort={earningsSort}
        setEarningsSort={(val) => {
          if (val === earningsSort) {
            setEarningsSort("none");
          } else {
            setEarningsSort(val as "desc" | "asc");
            setSortConfig({ field: "date", direction: "desc" });
            setAttendeesSort("none");
          }
        }}
        attendeesSort={attendeesSort}
        setAttendeesSort={(val) => {
          if (val === attendeesSort) {
            setAttendeesSort("none");
          } else {
            setAttendeesSort(val as "desc" | "asc");
            setSortConfig({ field: "date", direction: "desc" });
            setEarningsSort("none");
          }
        }}
      />
      <div className="rounded-xl border shadow-xs overflow-hidden mt-2">
        <Table className="w-full text-[14px]">
          <TableHeader>
            <TableRow className="bg-soft-gray/40">
              <TableHead className="w-[34px] p-1.5"></TableHead>
              <TableHead
                className="w-[180px] font-bold cursor-pointer py-2 px-2 select-none"
                onClick={() => handleSort("title")}
                style={{ fontSize: 15 }}
              >
                <div className="flex items-center gap-1 text-gray-800">
                  Linkup Title
                </div>
              </TableHead>
              <TableHead className="w-[104px] font-bold py-2 px-2" style={{ fontSize: 15 }}>Category</TableHead>
              <TableHead className="w-[190px] font-bold py-2 px-2" style={{ fontSize: 15 }}>Host</TableHead>
              <TableHead
                className="w-[168px] font-bold cursor-pointer py-2 px-2 select-none"
                onClick={() => handleSort("date")}
                style={{ fontSize: 15 }}
              >
                <div className="flex items-center gap-1 text-gray-800">
                  Date &amp; Time
                  {sortConfig.field === "date" &&
                    (sortConfig.direction === "asc" ? (
                      <SortAsc className="ml-1 w-3 h-3" />
                    ) : (
                      <SortDesc className="ml-1 w-3 h-3" />
                    ))}
                </div>
              </TableHead>
              <TableHead
                className="w-[154px] font-bold cursor-pointer py-2 px-2 select-none"
                onClick={() => handleSort("created")}
                style={{ fontSize: 15 }}
              >
                <div className="flex items-center gap-1 text-gray-800">
                  Created On
                  {sortConfig.field === "created" &&
                    (sortConfig.direction === "asc" ? (
                      <SortAsc className="ml-1 w-3 h-3" />
                    ) : (
                      <SortDesc className="ml-1 w-3 h-3" />
                    ))}
                  {sortConfig.field !== "created" && (
                    <SortAsc className="ml-1 w-3 h-3 opacity-50" />
                  )}
                </div>
              </TableHead>
              <TableHead className="w-[98px] font-bold py-2 px-2" style={{ fontSize: 15 }}>Status</TableHead>
              <TableHead className="w-[74px] text-base text-right px-2"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentLinkups.map(linkup => {
              const categoryObj = categories.find(c => c.id === linkup.category);
              return (
                <React.Fragment key={linkup.id}>
                  <TableRow className="hover:bg-soft-gray/30" style={{ fontSize: '15px', height: 40 }}>
                    <TableCell className="p-1">
                      <button
                        onClick={() => toggleRowExpanded(linkup.id)}
                        aria-label={expandedRows[linkup.id] ? "Collapse details" : "Expand details"}
                        className="p-1 rounded hover:bg-muted transition"
                        style={{ fontSize: "18px", lineHeight: "18px" }}
                      >
                        {expandedRows[linkup.id] ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                      </button>
                    </TableCell>
                    <TableCell className="py-1 px-2 font-semibold truncate max-w-[160px]">
                      <Link
                        to={`/linkups/${linkup.id}`}
                        className="hover:underline hover:text-primary text-[15px]"
                      >
                        {linkup.title}
                      </Link>
                    </TableCell>
                    <TableCell className="py-1 px-2">
                      <span className="mr-1">{categoryObj?.emoji}</span>
                      <span className="text-[12px]">{categoryObj?.name}</span>
                    </TableCell>
                    <TableCell className="py-1 px-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={linkup.host.avatar}
                          alt={linkup.host.name}
                          className="h-5 w-5 rounded-full object-cover"
                        />
                        <div>
                          <Link to={`/users/${linkup.host.id}`} className="font-semibold text-[15px] hover:underline hover:text-primary">
                            {linkup.host.name}
                          </Link>
                          <div className="text-[12px] text-muted-foreground">{linkup.host.username}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-1 px-2">
                      <div className="text-xs font-medium">{formatDateTime(linkup.date)}</div>
                      <div className="text-xs text-muted-foreground">{formatDuration(linkup.date, linkup.endTime)}</div>
                    </TableCell>
                    <TableCell className="py-1 px-2">
                      <div className="text-xs">{formatDateTime(linkup.createdAt)}</div>
                    </TableCell>
                    <TableCell className="py-1 px-2">
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
                            onClick={() => {
                              setRemoveDialogOpen(true);
                              setLinkupToRemove({ id: linkup.id, title: linkup.title });
                            }}
                          >
                            Remove Linkup
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  {expandedRows[linkup.id] && (
                    <TableRow className="bg-muted/20">
                      <TableCell colSpan={8} className="py-2 px-4">
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
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mt-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Showing {(filteredCount === 0) ? 0 : (currentPage - 1) * perPage + 1}
            -
            {Math.min(currentPage * perPage, filteredCount)}
            &nbsp;of {filteredCount} linkups
          </span>
          <PaginationItemsPerPage>
            <span className="text-xs">Per page:</span>
            <select
              value={perPage}
              onChange={e => {
                setPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="text-xs rounded-md border border-input px-2 py-1 bg-background"
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
