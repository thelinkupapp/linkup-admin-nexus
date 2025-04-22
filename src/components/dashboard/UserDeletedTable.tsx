
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { ArrowDown, ArrowUp, Ios, Android } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, differenceInDays, parseISO } from "date-fns";

// --- Sample/Mock deleted users ---
// FORMAT: { id, deletedDate, platform, createdDate }
const deletedUsers = [
  {
    id: "user_9871",
    deletedDate: "2024-03-15",
    createdDate: "2024-01-20",
    platform: "ios" as "ios" | "android",
  },
  {
    id: "user_23984",
    deletedDate: "2024-04-01",
    createdDate: "2023-12-15",
    platform: "android" as "ios" | "android",
  },
  {
    id: "user_51236",
    deletedDate: "2024-02-10",
    createdDate: "2023-09-28",
    platform: "ios" as "ios" | "android",
  },
  {
    id: "user_19283",
    deletedDate: "2024-02-28",
    createdDate: "2024-01-15",
    platform: "android" as "ios" | "android",
  },
  {
    id: "user_66372",
    deletedDate: "2024-03-22",
    createdDate: "2023-05-31",
    platform: "ios" as "ios" | "android",
  },
];

// Helper: get nice platform label & icon
const platformLabel = {
  ios: (
    <span className="flex items-center gap-1 font-medium text-[#7E69AB]">
      <Ios size={16} className="text-[#8B5CF6]" /> iOS
    </span>
  ),
  android: (
    <span className="flex items-center gap-1 font-medium text-green-700">
      <Android size={16} className="text-[#34C759]" /> Android
    </span>
  ),
};

const getAccountAge = (created: string, deleted: string) =>
  differenceInDays(parseISO(deleted), parseISO(created));

// --- Main deleted users table ---
const UserDeletedTable = () => {
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [platformFilter, setPlatformFilter] = useState<"all" | "ios" | "android">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filtered + sorted users
  const filteredUsers = deletedUsers
    .filter(user => platformFilter === "all" || user.platform === platformFilter)
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return parseISO(a.deletedDate).getTime() - parseISO(b.deletedDate).getTime();
      } else {
        return parseISO(b.deletedDate).getTime() - parseISO(a.deletedDate).getTime();
      }
    });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  // --- Custom Platform Filter button like Membership reference ---
  function PlatformFilter() {
    return (
      <Select value={platformFilter} onValueChange={val => {
        setPlatformFilter(val as "all" | "ios" | "android");
        setCurrentPage(1);
      }}>
        <SelectTrigger className={cn(
          "w-[160px] h-10 px-4 rounded-md border border-[#DED8F3] bg-white font-semibold text-[#222] text-base shadow-none hover:border-[#C4BEEA] hover:bg-[#F1F0FB]",
        )}>
          <SelectValue>
            <span className="flex items-center gap-2">
              {platformFilter === "all" && <>Platform</>}
              {platformFilter === "ios" && platformLabel.ios}
              {platformFilter === "android" && platformLabel.android}
            </span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="rounded-lg border border-[#DED8F3] bg-white shadow-lg z-50 mt-2">
          <SelectItem value="all" className="font-semibold text-[#222]">All Platforms</SelectItem>
          <SelectItem value="ios" className="font-semibold text-[#7E69AB]">
            <span className="flex items-center gap-2">{platformLabel.ios}</span>
          </SelectItem>
          <SelectItem value="android" className="font-semibold text-green-700">
            <span className="flex items-center gap-2">{platformLabel.android}</span>
          </SelectItem>
        </SelectContent>
      </Select>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top summary */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#222]">Deleted Users</h2>
          <div className="text-[#8E9196] mt-1">Total deleted users: <span className="font-bold text-[#8B5CF6]">{filteredUsers.length}</span></div>
        </div>
        {/* Platform filter at the top right (like Membership dropdown) */}
        <div>
          <PlatformFilter />
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[220px] text-[#8E9196] text-xs uppercase">Deleted User ID</TableHead>
              <TableHead
                className={cn("w-[180px] text-[#8E9196] text-xs uppercase cursor-pointer select-none")}
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                <span className="flex items-center gap-1 font-semibold">
                  Deletion Date
                  {sortOrder === "asc" ? (
                    <ArrowUp className="h-4 w-4 text-[#8B5CF6]" />
                  ) : (
                    <ArrowDown className="h-4 w-4 text-[#8B5CF6]" />
                  )}
                </span>
              </TableHead>
              <TableHead className="w-[150px] text-[#8E9196] text-xs uppercase">
                Platform
              </TableHead>
              <TableHead className="w-[130px] text-[#8E9196] text-xs uppercase">
                Account Age
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-16 text-[#8E9196]">
                  No deleted users found
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono font-medium text-[#1A1F2C]">{user.id}</TableCell>
                  <TableCell>
                    {format(parseISO(user.deletedDate), "MMM d yyyy")}
                  </TableCell>
                  <TableCell>
                    {platformLabel[user.platform]}
                  </TableCell>
                  <TableCell>
                    {getAccountAge(user.createdDate, user.deletedDate)} days
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination + Items per page at the bottom */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#8E9196]">Items per page</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={val => {
              setItemsPerPage(Number(val));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[70px] h-8 px-2 rounded border border-[#DED8F3] bg-white text-[#222] text-sm">
              <SelectValue placeholder="10" />
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-[#DED8F3] bg-white shadow z-50">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-[#8E9196]">
            Showing {filteredUsers.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length}
          </span>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(cur => Math.max(1, cur - 1))}
                className={cn(
                  "cursor-pointer",
                  currentPage === 1 && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              let pageNum = (totalPages <= 5)
                ? i + 1
                : currentPage <= 3
                  ? i + 1
                  : currentPage >= totalPages - 2
                    ? totalPages - 4 + i
                    : currentPage - 2 + i;

              if (pageNum < 1 || pageNum > totalPages) return null;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNum)}
                    isActive={currentPage === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(cur => Math.min(totalPages, cur + 1))}
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
