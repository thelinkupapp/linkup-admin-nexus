
import { useState } from "react";
import { Calendar, AndroidIcon, Apple, ArrowDown, ArrowUp } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

// Dummy deleted users data (no actual personal info)
type DeletedUser = {
  id: string; // e.g. user_19283
  deletedDate: string; // ISO string
  platform: "iOS" | "Android";
  accountCreatedDate: string; // ISO string (to calculate account age)
};

const deletedUsers: DeletedUser[] = [
  {
    id: "user_10184",
    deletedDate: "2024-02-10T10:00:00Z",
    platform: "iOS",
    accountCreatedDate: "2023-12-29T10:00:00Z",
  },
  {
    id: "user_10273",
    deletedDate: "2024-03-05T11:10:00Z",
    platform: "Android",
    accountCreatedDate: "2023-10-25T15:33:00Z",
  },
  {
    id: "user_10312",
    deletedDate: "2024-03-15T18:45:00Z",
    platform: "Android",
    accountCreatedDate: "2023-07-01T18:05:00Z",
  },
  {
    id: "user_10503",
    deletedDate: "2024-04-01T08:35:00Z",
    platform: "iOS",
    accountCreatedDate: "2023-09-28T21:18:00Z",
  },
  {
    id: "user_10466",
    deletedDate: "2024-03-22T14:00:00Z",
    platform: "iOS",
    accountCreatedDate: "2023-09-29T13:11:00Z",
  }
];

// Helper for account age in days
function daysBetween(dateA: string, dateB: string) {
  const a = new Date(dateA);
  const b = new Date(dateB);
  return Math.max(1, Math.floor((a.getTime() - b.getTime()) / (1000 * 60 * 60 * 24)));
}

const PLATFORMS = ["all", "iOS", "Android"] as const;

const UserDeletedTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [platformFilter, setPlatformFilter] = useState<"all" | "iOS" | "Android">("all");
  const [sortMode, setSortMode] = useState<"newest" | "oldest">("newest");

  // Filtering by platform
  const filteredUsers = deletedUsers.filter(u => 
    platformFilter === "all" ? true : u.platform === platformFilter
  );

  // Sorting by deletion date (newest/oldest)
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortMode === "newest") {
      return new Date(b.deletedDate).getTime() - new Date(a.deletedDate).getTime();
    }
    return new Date(a.deletedDate).getTime() - new Date(b.deletedDate).getTime();
  });

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

  // UI handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // For filter UI
  function FilterChip({ label, value, selected, onClick, Icon }: { label: string, value: string, selected: boolean, onClick: () => void, Icon?: any }) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex items-center gap-1 px-3 py-1 rounded-md border transition text-sm font-medium",
          selected
            ? "bg-violet-100 border-violet-400 text-violet-900"
            : "bg-white border-gray-300 text-gray-500 hover:bg-violet-50"
        )}
      >
        {Icon && <Icon className="w-4 h-4" />}
        {label}
      </button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-4">
        <div>
          <h2 className="text-xl font-bold">
            <span className="text-violet-700">{deletedUsers.length}</span> Deleted Users
          </h2>
          <div className="text-muted-foreground text-sm mt-1">List of deleted accounts. All personally identifiable information has been removed.</div>
        </div>
        <div className="flex flex-row gap-2 mt-2 md:mt-0">
          <FilterChip
            label="All"
            value="all"
            selected={platformFilter === "all"}
            onClick={() => { setPlatformFilter("all"); setCurrentPage(1); }}
          />
          <FilterChip
            label="iOS"
            value="iOS"
            selected={platformFilter === "iOS"}
            onClick={() => { setPlatformFilter("iOS"); setCurrentPage(1); }}
            Icon={Apple}
          />
          <FilterChip
            label="Android"
            value="Android"
            selected={platformFilter === "Android"}
            onClick={() => { setPlatformFilter("Android"); setCurrentPage(1); }}
            Icon={AndroidIcon}
          />
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[180px]">Deleted User ID</TableHead>
              <TableHead
                className="w-[160px] cursor-pointer select-none flex gap-2 items-center"
                style={{ minWidth: 160 }}
              >
                <div
                  className="flex items-center gap-2"
                  onClick={() =>
                    setSortMode((x) => (x === "newest" ? "oldest" : "newest"))
                  }
                  role="button"
                  tabIndex={0}
                  aria-label="Sort by deletion date"
                >
                  Deletion Date
                  {sortMode === "newest" ? (
                    <ArrowDown className="h-4 w-4 opacity-80" />
                  ) : (
                    <ArrowUp className="h-4 w-4 opacity-80" />
                  )}
                </div>
              </TableHead>
              <TableHead className="w-[100px]">App</TableHead>
              <TableHead className="w-[110px]">Account Age</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground py-6">
                    <span className="font-medium">No deleted users found</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <span className="font-mono font-medium text-violet-700">{user.id}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {format(new Date(user.deletedDate), "MMM d yyyy")}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1 font-medium">
                      {user.platform === "iOS" ? (
                        <>
                          <Apple className="h-4 w-4 inline text-gray-500" />
                          iOS
                        </>
                      ) : (
                        <>
                          <AndroidIcon className="h-4 w-4 inline text-gray-500" />
                          Android
                        </>
                      )}
                    </span>
                  </TableCell>
                  <TableCell>
                    {daysBetween(user.deletedDate, user.accountCreatedDate)} days
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-4 mt-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground w-full sm:w-auto">
          <span>Items per page</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(parseInt(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span>
            Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length}
          </span>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(currentPage - 1)}
                className={cn(
                  "cursor-pointer",
                  currentPage === 1 && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 5) {
                pageNumber = i + 1;
              } else if (currentPage <= 3) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNumber = totalPages - 4 + i;
              } else {
                pageNumber = currentPage - 2 + i;
              }
              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    onClick={() => handlePageChange(pageNumber)}
                    isActive={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={cn(
                  "cursor-pointer",
                  currentPage === totalPages && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default UserDeletedTable;
