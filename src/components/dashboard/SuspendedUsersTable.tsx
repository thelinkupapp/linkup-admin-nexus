import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ReactivateUserDialog } from "./ReactivateUserDialog";
import { NotesModal } from "./NotesModal";
import { format } from "date-fns";
import { Search, ArrowDown, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const RAW_SUSPENDED_USERS = [
  {
    id: "0",
    avatar: "/lovable-uploads/a165dd8e-2635-4f3a-a050-ce01c92a0a6f.png",
    name: "Elie Abou Samra",
    username: "elieabousamra",
    suspendedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    reason: "Violation of community guidelines",
    notes: "Sent warning before suspension.",
  },
  {
    id: "1",
    avatar: "/lovable-uploads/1fa5e36a-9e47-4933-9b3c-d103bedaf3bf.png",
    name: "Harper Walker",
    username: "harper_walker62",
    suspendedAt: new Date(Date.now() - 1000 * 60 * 60 * 28),
    reason: "Harassment",
    notes: "Multiple users reported harassment via DMs.",
  },
  {
    id: "2",
    avatar: "/lovable-uploads/a93ddc8d-f2be-43b3-8df8-249da608a56d.png",
    name: "Sebastian Garcia",
    username: "sebastian_garcia42",
    suspendedAt: new Date(Date.now() - 1000 * 60 * 60 * 120),
    reason: "Fake account",
    notes: "Identity could not be validated.",
  },
  {
    id: "3",
    avatar: "/lovable-uploads/9d27b02b-295a-46a0-84a8-9bd77a2748f1.png",
    name: "David Williams",
    username: "davidwilliams",
    suspendedAt: new Date(Date.now() - 1000 * 60 * 60 * 36),
    reason: "Spam activity",
    notes: "Flagged for repetitive posting and spamming in linkups. This is a longer note that should trigger the read more functionality. The user was posting promotional content repeatedly despite warnings.",
  }
];

function formatSuspendedAt(date: Date) {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();
  
  if (isToday) {
    return `Today at ${format(date, "HH:mm")}`;
  }
  if (isYesterday) {
    return `Yesterday at ${format(date, "HH:mm")}`;
  }
  return `${format(date, "MMM d yyyy")}, ${format(date, "HH:mm")}`;
}

export default function SuspendedUsersTable() {
  const [users, setUsers] = useState(RAW_SUSPENDED_USERS);
  const [reactivateId, setReactivateId] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [notesModalContent, setNotesModalContent] = useState<string>("");

  const filteredUsers = users
    .filter(user => 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.reason.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.suspendedAt.getTime() - b.suspendedAt.getTime();
      } else {
        return b.suspendedAt.getTime() - a.suspendedAt.getTime();
      }
    });

  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalUsers);
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const getUserById = (id: string) => users.find(u => u.id === id);

  const shouldTruncateNotes = (notes: string) => notes.length > 50;
  const truncateNotes = (notes: string) => {
    if (shouldTruncateNotes(notes)) {
      return notes.substring(0, 50) + "...";
    }
    return notes;
  };

  const handleShowNotesModal = (notes: string) => {
    setNotesModalContent(notes);
    setShowNotesModal(true);
  };

  const handleReactivate = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    setReactivateId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
          <Info className="h-5 w-5 text-purple-600" />
        </div>
        <span className="text-lg text-purple-600 font-medium">
          {totalUsers} suspended {totalUsers === 1 ? "user" : "users"}
        </span>
      </div>
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search suspended users..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select 
          value={itemsPerPage.toString()} 
          onValueChange={(value) => {
            setItemsPerPage(parseInt(value));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[100px] ml-2">
            <SelectValue placeholder="25" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="25">25</SelectItem>
            <SelectItem value="50">50</SelectItem>
            <SelectItem value="100">100</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Suspended Users</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th 
                  className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                >
                  <div className="flex items-center">
                    <span>Suspended</span>
                    <ArrowDown className={`ml-1 h-4 w-4 transition-transform ${sortOrder === "asc" ? "rotate-180" : ""}`} />
                  </div>
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Additional Notes</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {currentUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    No suspended users found.
                  </td>
                </tr>
              ) : (
                currentUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 rounded-full">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <a
                            href={`/users/${user.username}`}
                            className="font-medium text-gray-900 hover:underline cursor-pointer"
                          >
                            {user.name}
                          </a>
                          <div className="text-sm text-gray-500">@{user.username}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatSuspendedAt(user.suspendedAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                        {user.reason}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-[300px]">
                      {shouldTruncateNotes(user.notes) ? (
                        <div>
                          {truncateNotes(user.notes)}
                          <button 
                            className="ml-1 text-purple-600 hover:text-purple-800 font-medium text-xs underline"
                            onClick={() => handleShowNotesModal(user.notes)}
                          >
                            Read more
                          </button>
                        </div>
                      ) : (
                        user.notes
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <Button
                        className="bg-[#F5F3FF] hover:bg-[#ede9fe] text-[#9b87f5] border border-[#8b5cf6] font-medium rounded-full text-sm px-5 py-2 inline-flex items-center transition-shadow hover:shadow"
                        onClick={() => setReactivateId(user.id)}
                      >
                        <span className="flex items-center font-semibold">
                          Reactivate Account
                        </span>
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {filteredUsers.length > 0 && (
          <div className="px-6 py-4 bg-white border-t flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-sm text-gray-500">
                Showing {totalUsers === 0 ? 0 : startIndex + 1}-{endIndex} of {totalUsers} {totalUsers === 1 ? "user" : "users"}
              </p>
              <Select 
                value={itemsPerPage.toString()} 
                onValueChange={(value) => {
                  setItemsPerPage(parseInt(value));
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[100px] ml-2">
                  <SelectValue placeholder="25" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
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
                  if (pageNumber < 1 || pageNumber > totalPages) return null;
                  return (
                    <PaginationItem key={i}>
                      <PaginationLink
                        isActive={pageNumber === currentPage}
                        onClick={() => setCurrentPage(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      <NotesModal
        open={showNotesModal}
        onClose={() => setShowNotesModal(false)}
        title="Additional Notes"
        notes={notesModalContent}
      />

      <ReactivateUserDialog
        isOpen={!!reactivateId}
        onClose={() => setReactivateId(null)}
        userName={getUserById(reactivateId || "")?.name ?? ""}
        username={getUserById(reactivateId || "")?.username ?? ""}
        userAvatar={getUserById(reactivateId || "")?.avatar ?? ""}
        onConfirm={() => {
          if (reactivateId) handleReactivate(reactivateId);
        }}
        actionButtonColor="#8b5cf6"
      />
    </div>
  );
}
