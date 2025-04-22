
import { useState } from "react";
import { 
  Trash2, 
  Search, 
  RotateCcw, 
  MoreHorizontal, 
  Filter,
  Calendar
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatJoinDate } from "@/utils/dateFormatting";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import type { User } from "@/types/user";

// Sample deleted users for the table
const deletedUsers: (User & { deletedDate: string, reasonForDeletion: string })[] = [
  {
    id: "101",
    avatar: "https://i.pravatar.cc/150?img=33",
    firstName: "Sophie",
    lastName: "Wilson",
    username: "sophie_w",
    email: "sophie@example.com",
    age: 29,
    joinDate: "2023-05-15",
    deletedDate: "2024-02-10",
    reasonForDeletion: "Account inactive",
    location: "Edinburgh, UK",
    isLinkupPlus: false,
    isVerified: true,
    nationality: "UK",
    gender: "Female",
    hostedLinkups: 7,
    attendedLinkups: 15,
    totalEarnings: 550.25
  },
  {
    id: "102",
    avatar: "https://i.pravatar.cc/150?img=45",
    firstName: "Miguel",
    lastName: "Rodriguez",
    username: "miguel_r",
    email: "miguel@example.com",
    age: 34,
    joinDate: "2023-07-22",
    deletedDate: "2024-03-05",
    reasonForDeletion: "User requested deletion",
    location: "Barcelona, Spain",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "Spain",
    gender: "Male",
    hostedLinkups: 22,
    attendedLinkups: 30,
    totalEarnings: 1850.75
  },
  {
    id: "103",
    avatar: "https://i.pravatar.cc/150?img=22",
    firstName: "Jessica",
    lastName: "Park",
    username: "jessica_p",
    email: "jessica@example.com",
    age: 26,
    joinDate: "2023-09-08",
    deletedDate: "2024-03-15",
    reasonForDeletion: "Violation of terms",
    location: "Seoul, South Korea",
    isLinkupPlus: false,
    isVerified: false,
    nationality: "South Korea",
    gender: "Female",
    hostedLinkups: 3,
    attendedLinkups: 12,
    totalEarnings: 120.50
  },
  {
    id: "104",
    avatar: "https://i.pravatar.cc/150?img=53",
    firstName: "Thomas",
    lastName: "Müller",
    username: "thomas_m",
    email: "thomas@example.com",
    age: 31,
    joinDate: "2023-06-13",
    deletedDate: "2024-03-22",
    reasonForDeletion: "User requested deletion",
    location: "Munich, Germany",
    isLinkupPlus: true,
    isVerified: true,
    nationality: "Germany",
    gender: "Male",
    hostedLinkups: 15,
    attendedLinkups: 20,
    totalEarnings: 1250.00
  },
  {
    id: "105",
    avatar: "https://i.pravatar.cc/150?img=26",
    firstName: "Olivia",
    lastName: "Johnson",
    username: "olivia_j",
    email: "olivia@example.com",
    age: 24,
    joinDate: "2023-10-05",
    deletedDate: "2024-04-01",
    reasonForDeletion: "Account inactive",
    location: "Sydney, Australia",
    isLinkupPlus: false,
    isVerified: true,
    nationality: "Australia",
    gender: "Female",
    hostedLinkups: 8,
    attendedLinkups: 22,
    totalEarnings: 680.25
  }
];

const UserDeletedTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [deletionReasonFilter, setDeletionReasonFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter users based on search input and deletion reason
  const filteredUsers = deletedUsers.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`;
    const matchesSearch = fullName.toLowerCase().includes(searchValue.toLowerCase()) || 
                         user.username.toLowerCase().includes(searchValue.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchValue.toLowerCase());
    
    const matchesDeletionReason = deletionReasonFilter === "all" || 
                                user.reasonForDeletion.toLowerCase().includes(deletionReasonFilter.toLowerCase());
    
    return matchesSearch && matchesDeletionReason;
  });

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRestoreUser = (userId: string) => {
    console.log(`Restoring user with ID: ${userId}`);
    // Logic to restore user would go here
  };

  const handlePermanentDelete = (userId: string) => {
    console.log(`Permanently deleting user with ID: ${userId}`);
    // Logic to permanently delete user would go here
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name, username, or email..."
              className="pl-8 w-full"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <Select
            value={deletionReasonFilter}
            onValueChange={setDeletionReasonFilter}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by reason" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reasons</SelectItem>
              <SelectItem value="account inactive">Account Inactive</SelectItem>
              <SelectItem value="user requested">User Requested</SelectItem>
              <SelectItem value="violation">Terms Violation</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">User</TableHead>
              <TableHead className="w-[180px]">Deleted On</TableHead>
              <TableHead className="w-[220px]">Reason</TableHead>
              <TableHead className="w-[150px]">Join Date</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Trash2 className="h-8 w-8 mb-2" />
                    <p>No deleted users found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              paginatedUsers.map((user) => {
                const fullName = `${user.firstName} ${user.lastName}`;
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={fullName} />
                          <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{fullName}</p>
                          <div className="flex flex-col text-sm text-muted-foreground">
                            <span>@{user.username}</span>
                            <span>{user.email}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {formatJoinDate(user.deletedDate)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-normal">
                        {user.reasonForDeletion}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatJoinDate(user.joinDate)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleRestoreUser(user.id)}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Restore User
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handlePermanentDelete(user.id)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Permanent Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {filteredUsers.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <p className="text-sm text-muted-foreground">Items per page</p>
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
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length}
            </p>
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
      )}
    </div>
  );
};

export default UserDeletedTable;
