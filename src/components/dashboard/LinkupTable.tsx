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

function formatUserManagementDate(dt: string) {
  // Matches "Yesterday at 13:31", "Fri 18 at 11:30", "Apr 6 at 11:13"
  // Reuse formatJoinDate from dateFormatting, fallback to "MMM d at HH:mm"
  try {
    // Slightly edited to strictly match User Management's formats
    const date = new Date(dt);
    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
    if (isToday) {
      return `Today at ${date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false })}`;
    }
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return `Yesterday at ${date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", hour12: false })}`;
    }
    // If this week: "Fri 18 at 11:30"
    if (now.getFullYear() === date.getFullYear()) {
      // If within this week
      const nowDay = now.getDay() || 7;
      const diff =
        (now.setHours(0, 0, 0, 0) - date.setHours(0, 0, 0, 0)) /
        (1000 * 60 * 60 * 24);
      if (diff < 7) {
        // Use "EEE d at HH:mm" e.g. "Fri 18 at 11:30"
        return `${date.toLocaleDateString(undefined, {
          weekday: "short",
        })} ${date.getDate()} at ${date
          .toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
          .replace(/^0/, "")}`;
      }
    }
    // Default: "MMM d at HH:mm"
    return `${date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    })} at ${date
      .toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/^0/, "")}`;
  } catch {
    return dt;
  }
}

function formatDateTimeWithDuration(start: string, end: string) {
  return {
    main: formatUserManagementDate(start),
    duration: formatDuration(start, end),
  };
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
      <div className="rounded-xl border shadow-xs overflow-hidden mt-2 bg-white">
        <Table className="w-full text-[15px] font-normal">
          <TableHeader className="bg-[#f8f8fa]">
            <TableRow className="bg-[#f8f8fa] border-b-[1.5px] border-[#e6e8ec]">
              <TableHead className="w-[34px] p-1.5 bg-transparent" />
              <TableHead className="w-[180px] py-2 px-2 font-semibold text-[#1A1F2C] text-[14.5px] tracking-tight">
                Linkup Title
              </TableHead>
              <TableHead className="w-[104px] py-2 px-2 font-semibold text-[#1A1F2C] text-[14.5px] tracking-tight">
                Category
              </TableHead>
              <TableHead className="w-[190px] py-2 px-2 font-semibold text-[#1A1F2C] text-[14.5px] tracking-tight">
                Host
              </TableHead>
              <TableHead className="w-[168px] py-2 px-2 font-semibold text-[#1A1F2C] text-[14.5px] tracking-tight">
                Date &amp; Time
              </TableHead>
              <TableHead className="w-[154px] py-2 px-2 font-semibold text-[#1A1F2C] text-[14.5px] tracking-tight">
                Created On
              </TableHead>
              <TableHead className="w-[98px] py-2 px-2 font-semibold text-[#1A1F2C] text-[14.5px] tracking-tight">
                Status
              </TableHead>
              <TableHead className="w-[74px] text-base text-right px-2 bg-transparent" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentLinkups.map(linkup => {
              const categoryObj = categories.find(c => c.id === linkup.category);
              const dateTime = formatDateTimeWithDuration(linkup.date, linkup.endTime);
              const createdOn = formatUserManagementDate(linkup.createdAt);
              return (
                <React.Fragment key={linkup.id}>
                  <TableRow
                    className="hover:bg-[#f2f2f7] transition bg-white border-b border-[#e6e8ee] h-[52px]"
                    style={{ fontSize: '15px' }}
                  >
                    <TableCell className="p-1" />
                    <TableCell className="py-1 px-2 font-semibold max-w-[160px]">
                      <Link
                        to={`/linkups/${linkup.id}`}
                        className="hover:underline hover:text-primary text-[15px] font-semibold"
                      >
                        {linkup.title}
                      </Link>
                    </TableCell>
                    <TableCell className="py-1 px-2 whitespace-nowrap text-[15px]">
                      <span className="mr-1">{categoryObj?.emoji}</span>
                      <span className="text-neutral-700">{categoryObj?.name}</span>
                    </TableCell>
                    <TableCell className="py-1 px-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={linkup.host.avatar}
                          alt={linkup.host.name}
                          className="h-7 w-7 rounded-full object-cover border-[1.5px] border-[#e6e8ee]"
                        />
                        <div>
                          <Link to={`/users/${linkup.host.id}`} className="font-semibold text-[15px] hover:underline hover:text-[#9b87f5]">
                            {linkup.host.name}
                          </Link>
                          <div className="text-[13px] text-[#878C91] leading-tight">{linkup.host.username}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-1 px-2 whitespace-nowrap">
                      <div className="flex flex-col leading-tight">
                        <span className="text-[15px] font-semibold text-[#212336]">{dateTime.main}</span>
                        <span className="text-xs text-[#8E9196] font-medium">
                          {dateTime.duration}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="py-1 px-2 whitespace-nowrap">
                      <span className="text-[15px] font-semibold text-[#212336]">{createdOn}</span>
                    </TableCell>
                    <TableCell className="py-1 px-2 whitespace-nowrap">
                      <Badge variant="outline" className={`text-xs px-2 py-0.5 rounded-2xl border border-[#E0E1E2] bg-[#f2f3f7] font-semibold ${getStatusBadgeStyles(linkup.status)}`}>
                        {linkup.status.charAt(0).toUpperCase() + linkup.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right p-2" />
                  </TableRow>
                </React.Fragment>
              );
            })}
            {currentLinkups.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-6 text-[15px] text-[#8E9196]">
                  No linkups found.
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
