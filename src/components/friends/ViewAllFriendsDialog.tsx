
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { formatJoinDate } from "@/utils/dateFormatting";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationItemsPerPage
} from "@/components/ui/pagination";
import { useState } from "react";

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  friendsSince: string;
}

interface ViewAllFriendsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  friends: Friend[];
  title: string;
}

export function ViewAllFriendsDialog({
  open,
  onOpenChange,
  friends,
  title
}: ViewAllFriendsDialogProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const totalPages = Math.ceil(friends.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentFriends = friends.slice(startIndex, endIndex);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentFriends.map((friend) => (
                <TableRow key={friend.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>{friend.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <Link 
                          to={`/users/${friend.id}`}
                          className="font-medium hover:underline"
                        >
                          {friend.name}
                        </Link>
                        <span className="text-sm text-muted-foreground">@{friend.username}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatJoinDate(friend.friendsSince)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="flex items-center justify-between">
            <PaginationItemsPerPage 
              className="flex-1"
              onChange={(value) => {
                setItemsPerPage(value);
                setCurrentPage(1);
              }}
              value={itemsPerPage}
              options={[5, 10, 15]}
            />
            
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => setCurrentPage(page)}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
