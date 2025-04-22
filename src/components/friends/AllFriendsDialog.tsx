
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Friend, FriendRequest } from "@/components/friends/UserFriendsList";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, ArrowDown } from "lucide-react";
import { formatJoinDate } from "@/utils/dateFormatting";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationItemsPerPage } from "@/components/ui/pagination";
import { useState } from "react";

interface AllFriendsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  data: Friend[] | FriendRequest[];
  type: 'friends' | 'requests';
  sortDirection: 'asc' | 'desc';
  onSortChange: () => void;
  dateColumnName: string;
  receivedRequests?: FriendRequest[];
  sentRequests?: FriendRequest[];
}

export function AllFriendsDialog({
  open,
  onOpenChange,
  title,
  data,
  type,
  sortDirection,
  onSortChange,
  dateColumnName,
  receivedRequests,
  sentRequests
}: AllFriendsDialogProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        {type === 'requests' && receivedRequests && sentRequests ? (
          <Tabs defaultValue="received">
            <TabsList>
              <TabsTrigger value="received">
                Received Requests ({receivedRequests.length})
              </TabsTrigger>
              <TabsTrigger value="sent">
                Sent Requests ({sentRequests.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="received" className="mt-4">
              <FriendsTable 
                data={receivedRequests}
                sortDirection={sortDirection}
                onSortChange={onSortChange}
                dateColumnName={dateColumnName}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </TabsContent>

            <TabsContent value="sent" className="mt-4">
              <FriendsTable 
                data={sentRequests}
                sortDirection={sortDirection}
                onSortChange={onSortChange}
                dateColumnName={dateColumnName}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
                onItemsPerPageChange={handleItemsPerPageChange}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <FriendsTable 
            data={data}
            sortDirection={sortDirection}
            onSortChange={onSortChange}
            dateColumnName={dateColumnName}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

const FriendsTable = ({ 
  data, 
  sortDirection, 
  onSortChange, 
  dateColumnName,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}: { 
  data: (Friend | FriendRequest)[], 
  sortDirection: 'asc' | 'desc',
  onSortChange: () => void,
  dateColumnName: string,
  currentPage: number,
  itemsPerPage: number,
  onPageChange: (page: number) => void,
  onItemsPerPageChange: (value: string) => void
}) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-muted-foreground">No data to display</p>
      </div>
    );
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead 
                className="cursor-pointer hover:text-foreground transition-colors"
                onClick={onSortChange}
              >
                <div className="flex items-center gap-2">
                  {dateColumnName}
                  <div className="flex flex-col">
                    <ArrowUp className={`h-3 w-3 ${sortDirection === 'asc' ? 'text-foreground' : 'text-muted-foreground/30'}`} />
                    <ArrowDown className={`h-3 w-3 ${sortDirection === 'desc' ? 'text-foreground' : 'text-muted-foreground/30'}`} />
                  </div>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={item.avatar} />
                      <AvatarFallback>{item.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <Link 
                        to={`/users/${item.id}`} 
                        className="font-medium hover:underline"
                      >
                        {item.name}
                      </Link>
                      <span className="text-sm text-muted-foreground">@{item.username}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatJoinDate('friendsSince' in item ? item.friendsSince : item.requestDate)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <PaginationItemsPerPage>
          <span>Show</span>
          <Select value={itemsPerPage.toString()} onValueChange={onItemsPerPageChange}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="15">15</SelectItem>
            </SelectContent>
          </Select>
          <span>per page</span>
        </PaginationItemsPerPage>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => onPageChange(currentPage - 1)}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => onPageChange(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => onPageChange(currentPage + 1)}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
