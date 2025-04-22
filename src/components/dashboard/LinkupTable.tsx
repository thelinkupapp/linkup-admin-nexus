import React, { useState, useMemo } from "react";
import { format, differenceInHours, differenceInMinutes, isToday, isTomorrow, isThisYear } from "date-fns";
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
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import { LinkupFilters } from "./LinkupFilters";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationItemsPerPage } from "@/components/ui/pagination";
import RemoveLinkupDialog from "./RemoveLinkupDialog";
import { toast } from "@/components/ui/sonner";

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

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return format(date, "dd/MM/yyyy");
}
function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return format(date, "HH:mm");
}
function formatDateTime(dateStr: string) {
  const date = new Date(dateStr);
  return `${formatDate(dateStr)} ${formatTime(dateStr)}`;
}
function formatDuration(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const hours = differenceInHours(endDate, startDate);
  const minutes = differenceInMinutes(endDate, startDate) % 60;
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

  const filteredLinkups = useMemo(() => {
    return [...linkups]
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
        }
        return 0;
      });
  }, [searchValue, selectedCategories, selectedStatus, selectedVisibility, selectedPrice, selectedJoinMethod, sortConfig]);

  const totalCount = linkups.length;
  const filteredCount = filteredLinkups.length;
  const pageCount = Math.ceil(filteredCount / perPage);
  const currentLinkups = filteredLinkups.slice((currentPage - 1) * perPage, currentPage * perPage);

  function handleSort(field: string) {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
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
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl font-semibold text-[#8364e8]">
            {filteredCount !== totalCount
              ? `Showing ${filteredCount} of ${totalCount} linkups`
              : `${totalCount} total linkups`}
          </span>
        </div>
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
          dateRange={undefined}
          setDateRange={() => {}}
          filteredCount={filteredCount}
          totalCount={totalCount}
        />
        <div className="border rounded-lg bg-background overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10" />
                <TableHead className="min-w-[210px] text-base font-semibold">Linkup Title</TableHead>
                <TableHead className="min-w-[120px] text-base font-semibold">Category</TableHead>
                <TableHead className="min-w-[200px] text-base font-semibold">Host</TableHead>
                <TableHead
                  className="cursor-pointer min-w-[160px] text-base font-semibold select-none"
                  onClick={() => handleSort("date")}
                >
                  <span>Date &amp; Time</span>
                  <span className="ml-1 text-muted-foreground">
                    {sortConfig.field === "date" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                  </span>
                </TableHead>
                <TableHead
                  className="cursor-pointer min-w-[140px] text-base font-semibold select-none"
                  onClick={() => handleSort("created")}
                >
                  <span>Created On</span>
                  <span className="ml-1 text-muted-foreground">
                    {sortConfig.field === "created" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                  </span>
                </TableHead>
                <TableHead className="min-w-[110px] text-base font-semibold">Status</TableHead>
                <TableHead className="min-w-[70px] text-base font-semibold text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentLinkups.map(linkup => {
                const categoryObj = categories.find(c => c.id === linkup.category);
                return (
                  <React.Fragment key={linkup.id}>
                    <TableRow>
                      <TableCell className="w-10 px-2">
                        <button
                          onClick={() => toggleRowExpanded(linkup.id)}
                          aria-label={expandedRows[linkup.id] ? "Collapse details" : "Expand details"}
                          className="p-1 rounded hover:bg-muted transition"
                        >
                          {expandedRows[linkup.id] ? (
                            <ChevronUp className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-muted-foreground" />
                          )}
                        </button>
                      </TableCell>
                      <TableCell>
                        <span className="font-semibold text-lg">{linkup.title}</span>
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
                        <div className="font-medium">{formatDate(linkup.date)}, {formatTime(linkup.date)}</div>
                        <div className="text-muted-foreground">{formatDuration(linkup.date, linkup.endTime)}</div>
                      </TableCell>
                      <TableCell>
                        <div>{formatDate(linkup.createdAt)}</div>
                        <div className="text-muted-foreground">{formatTime(linkup.createdAt)}</div>
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
                          <DropdownMenuContent align="end">
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
                      <TableRow className="bg-muted/40">
                        <TableCell colSpan={8} className="p-0 pb-3">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-8 py-4">
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
                              <div className="text-base">{linkup.isPublic ? "Public" : "Private"}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Join Method</div>
                              <div className="text-base">{linkup.isOpen ? "Open" : "Closed"}</div>
                            </div>
                            <div>
                              <div className="text-xs text-muted-foreground mb-1">Price</div>
                              <div className="text-base">
                                {linkup.isFree ? "Free" : `$${linkup.price}`}
                              </div>
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
