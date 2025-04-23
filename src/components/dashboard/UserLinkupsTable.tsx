
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Info, Filter } from "lucide-react";
import { format, differenceInHours, differenceInDays } from "date-fns";

interface Linkup {
  id: string;
  name: string;
  emoji: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "happening" | "happened" | "cancelled";
  type: "hosted" | "attended" | "cohost";
  createdDate?: string;
  joinedDate?: string;
}

const UserLinkupsTable: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const mockLinkups: Linkup[] = [
    {
      id: "1",
      name: "Beach Volleyball",
      emoji: "🏐",
      startDate: "2025-04-25T15:00:00Z",
      endDate: "2025-04-25T17:00:00Z",
      status: "upcoming",
      type: "hosted",
      createdDate: "2025-04-10T09:30:00Z"
    },
    {
      id: "2",
      name: "Coffee & Chat",
      emoji: "☕",
      startDate: "2025-04-24T10:00:00Z",
      endDate: "2025-04-24T11:30:00Z",
      status: "upcoming",
      type: "attended",
      joinedDate: "2025-04-15T14:20:00Z"
    },
    {
      id: "3",
      name: "Hiking Adventure",
      emoji: "⛰️",
      startDate: "2025-04-22T08:00:00Z",
      endDate: "2025-04-22T16:00:00Z",
      status: "happened",
      type: "attended",
      joinedDate: "2025-04-05T11:45:00Z"
    },
    {
      id: "4",
      name: "Movie Night",
      emoji: "🎬",
      startDate: "2025-04-21T19:00:00Z",
      endDate: "2025-04-21T22:00:00Z",
      status: "happened",
      type: "cohost",
      joinedDate: "2025-04-10T15:30:00Z"
    },
    {
      id: "5",
      name: "Board Games Evening",
      emoji: "🎲",
      startDate: "2025-04-23T18:00:00Z",
      endDate: "2025-04-23T22:00:00Z",
      status: "cancelled",
      type: "hosted",
      createdDate: "2025-04-08T10:15:00Z"
    },
    {
      id: "6",
      name: "Yoga in the Park",
      emoji: "🧘",
      startDate: "2025-04-26T09:00:00Z",
      endDate: "2025-04-26T10:30:00Z",
      status: "upcoming",
      type: "hosted",
      createdDate: "2025-04-12T08:45:00Z"
    },
    {
      id: "7",
      name: "Photography Walk",
      emoji: "📸",
      startDate: "2025-04-28T15:30:00Z",
      endDate: "2025-04-28T18:30:00Z",
      status: "happening",
      type: "attended",
      joinedDate: "2025-04-18T17:10:00Z"
    },
    {
      id: "8",
      name: "Cooking Class",
      emoji: "👨‍🍳",
      startDate: "2025-04-26T14:00:00Z",
      endDate: "2025-04-26T17:00:00Z",
      status: "upcoming",
      type: "cohost",
      joinedDate: "2025-04-14T12:20:00Z"
    }
  ];

  const statusOptions = [
    { value: "all", label: "All Statuses" },
    { value: "upcoming", label: "Upcoming" },
    { value: "happening", label: "Happening" },
    { value: "happened", label: "Happened" },
    { value: "cancelled", label: "Cancelled" }
  ];

  const typeOptions = [
    { value: "all", label: "All Types" },
    { value: "hosted", label: "Hosted" },
    { value: "cohost", label: "Co-Host" },
    { value: "attended", label: "Attended" }
  ];

  const filteredLinkups = mockLinkups.filter(linkup => {
    const matchesStatus = statusFilter === "all" || linkup.status === statusFilter;
    const matchesType = typeFilter === "all" || linkup.type === typeFilter;
    return matchesStatus && matchesType;
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "happening":
        return "bg-green-100 text-green-800";
      case "happened":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDateDuration = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    // Calculate duration
    const hoursDiff = differenceInHours(end, start);
    const daysDiff = differenceInDays(end, start);
    
    // Format duration string
    let durationStr;
    if (hoursDiff > 23) {
      durationStr = `${daysDiff}d`;
    } else {
      durationStr = `${hoursDiff}hr`;
    }
    
    return `${format(start, "MMM d, yyyy, h:mm a")} (${durationStr})`;
  };

  const typeBadgeVariant = (type: string) => {
    switch (type) {
      case "hosted":
        return "bg-purple-100 text-purple-800";
      case "cohost":
        return "bg-indigo-100 text-indigo-800";
      case "attended":
        return "bg-teal-100 text-teal-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>User Linkups</CardTitle>
            <CardDescription>View all linkups this user has been involved with</CardDescription>
          </div>
          <div className="flex gap-2">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                {typeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Linkup</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLinkups.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No linkups found matching the selected filters
                </TableCell>
              </TableRow>
            ) : (
              filteredLinkups.map((linkup) => (
                <TableRow key={linkup.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{linkup.emoji}</span>
                      <span className="font-medium">{linkup.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={typeBadgeVariant(linkup.type)} variant="outline">
                      {linkup.type.charAt(0).toUpperCase() + linkup.type.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatDateDuration(linkup.startDate, linkup.endDate)}
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeVariant(linkup.status)} variant="outline">
                      {linkup.status.charAt(0).toUpperCase() + linkup.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={`/linkups/${linkup.id}`}>
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        View
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserLinkupsTable;
