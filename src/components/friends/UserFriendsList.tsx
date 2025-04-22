
import { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatJoinDate } from "@/utils/dateFormatting";
import { Separator } from "@/components/ui/separator";

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  friendsSince: string;
}

interface FriendRequest {
  id: string;
  name: string;
  username: string;
  avatar: string;
  requestDate: string;
}

interface UserFriendsListProps {
  friends: Friend[];
  receivedRequests: FriendRequest[];
  sentRequests: FriendRequest[];
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
                    <span className="font-medium">{item.name}</span>
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

export function UserFriendsList({ friends, receivedRequests, sentRequests }: UserFriendsListProps) {
  const [friendsSortDirection, setFriendsSortDirection] = useState<'asc' | 'desc'>('desc');
  const [receivedSortDirection, setReceivedSortDirection] = useState<'asc' | 'desc'>('desc');
  const [sentSortDirection, setSentSortDirection] = useState<'asc' | 'desc'>('desc');

  const sortData = <T extends { friendsSince?: string; requestDate?: string }>(
    data: T[],
    direction: 'asc' | 'desc'
  ) => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a.friendsSince || a.requestDate || '').getTime();
      const dateB = new Date(b.friendsSince || b.requestDate || '').getTime();
      return direction === 'asc' ? dateA - dateB : dateB - dateA;
    });
  };

  const toggleFriendsSort = () => {
    setFriendsSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const toggleReceivedSort = () => {
    setReceivedSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const toggleSentSort = () => {
    setSentSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const sortedFriends = sortData(friends, friendsSortDirection);
  const sortedReceivedRequests = sortData(receivedRequests, receivedSortDirection);
  const sortedSentRequests = sortData(sentRequests, sentSortDirection);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-baseline justify-between">
            <div>
              <CardTitle>Friends</CardTitle>
              <CardDescription>
                {friends.length === 0 
                  ? "This user has no friends"
                  : `${friends.length} friend${friends.length === 1 ? '' : 's'}`}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <FriendsTable 
            data={sortedFriends} 
            sortDirection={friendsSortDirection}
            onSortChange={toggleFriendsSort}
            dateColumnName="Friends Since"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Friend Requests</CardTitle>
          <CardDescription>
            {receivedRequests.length + sentRequests.length === 0 
              ? "No pending friend requests"
              : `${receivedRequests.length + sentRequests.length} pending request${
                  receivedRequests.length + sentRequests.length === 1 ? '' : 's'
                }`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Received Requests</h3>
            <FriendsTable 
              data={sortedReceivedRequests} 
              sortDirection={receivedSortDirection}
              onSortChange={toggleReceivedSort}
              dateColumnName="Request Date"
            />
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-4">Sent Requests</h3>
            <FriendsTable 
              data={sortedSentRequests} 
              sortDirection={sentSortDirection}
              onSortChange={toggleSentSort}
              dateColumnName="Request Date"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
