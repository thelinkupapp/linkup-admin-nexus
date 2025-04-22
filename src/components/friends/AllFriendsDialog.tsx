
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Friend, FriendRequest } from "@/components/friends/UserFriendsList";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowUp, ArrowDown } from "lucide-react";
import { formatJoinDate } from "@/utils/dateFormatting";

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
              />
            </TabsContent>

            <TabsContent value="sent" className="mt-4">
              <FriendsTable 
                data={sentRequests}
                sortDirection={sortDirection}
                onSortChange={onSortChange}
                dateColumnName={dateColumnName}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <FriendsTable 
            data={data}
            sortDirection={sortDirection}
            onSortChange={onSortChange}
            dateColumnName={dateColumnName}
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
  dateColumnName 
}: { 
  data: (Friend | FriendRequest)[], 
  sortDirection: 'asc' | 'desc',
  onSortChange: () => void,
  dateColumnName: string 
}) => {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-40">
        <p className="text-muted-foreground">No data to display</p>
      </div>
    );
  }

  return (
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
          {data.map((item) => (
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
  );
};
