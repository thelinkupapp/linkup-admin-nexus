import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { formatLinkupDateTime, formatJoinDate } from "@/utils/dateFormatting";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Linkup {
  id: string;
  name: string;
  emoji: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "happened" | "happening" | "cancelled" | "deleted" | "removed";
  type: "hosted" | "attended";
  createdAt?: string;
  joinedAt?: string;
}

const linkups: Linkup[] = [
  {
    id: "1",
    name: "Bali Digital Nomad Retreat",
    emoji: "🌴",
    startDate: "2024-08-01T18:00:00Z",
    endDate: "2024-08-03T22:00:00Z",
    status: "upcoming",
    type: "hosted",
    createdAt: "2024-03-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Evening Social Mixer",
    emoji: "🍷",
    startDate: "2024-04-19T20:00:00Z",
    endDate: "2024-04-19T22:00:00Z",
    status: "upcoming",
    type: "hosted",
    createdAt: "2024-04-01T14:20:00Z"
  },
  {
    id: "3",
    name: "Afternoon Workshop",
    emoji: "💻",
    startDate: "2024-04-20T12:00:00Z",
    endDate: "2024-04-20T15:00:00Z",
    status: "upcoming",
    type: "attended",
    joinedAt: "2024-04-05T09:15:00Z"
  },
  {
    id: "4",
    name: "Monday Tech Meetup",
    emoji: "🚀",
    startDate: "2024-04-22T15:00:00Z",
    endDate: "2024-04-22T21:00:00Z",
    status: "upcoming",
    type: "hosted",
    createdAt: "2024-04-08T11:00:00Z"
  },
  {
    id: "5",
    name: "Beach Cleanup Event",
    emoji: "🏖️",
    startDate: "2024-04-15T19:00:00Z",
    endDate: "2024-04-15T23:00:00Z",
    status: "happened",
    type: "hosted",
    createdAt: "2024-03-28T16:45:00Z"
  },
  {
    id: "6",
    name: "Weekend Mountain Retreat",
    emoji: "⛰️",
    startDate: "2024-05-24T15:00:00Z",
    endDate: "2024-05-26T12:00:00Z",
    status: "upcoming",
    type: "hosted",
    createdAt: "2024-04-12T13:00:00Z"
  }
];

const getStatusBadgeStyles = (status: Linkup["status"]) => {
  switch (status) {
    case "upcoming":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "happening":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "happened":
      return "bg-green-50 text-green-700 border-green-200";
    case "cancelled":
      return "bg-red-50 text-red-700 border-red-200";
    case "deleted":
      return "bg-gray-50 text-gray-700 border-gray-200";
    default:
      return "bg-blue-50 text-blue-700 border-blue-200";
  }
};

const LinkupsTable = ({ data, preview = false }: { data: Linkup[], preview?: boolean }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Linkup</TableHead>
        <TableHead>Date & Time</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Type</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {(preview ? data.slice(0, 3) : data).map((linkup) => (
        <TableRow key={linkup.id}>
          <TableCell>
            <div className="space-y-1">
              <Link 
                to={`/linkups/${linkup.id}`} 
                className="flex items-center gap-2 hover:underline"
              >
                <span className="text-xl">{linkup.emoji}</span>
                <span className="font-medium">{linkup.name}</span>
              </Link>
              <div className="text-xs text-muted-foreground">
                {linkup.type === "hosted" ? 
                  `Created on ${formatJoinDate(linkup.createdAt || "")}` :
                  `Joined on ${formatJoinDate(linkup.joinedAt || "")}`
                }
              </div>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex flex-col gap-1 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{formatLinkupDateTime(linkup.startDate, linkup.endDate)}</span>
              </div>
            </div>
          </TableCell>
          <TableCell>
            <Badge
              variant="outline"
              className={getStatusBadgeStyles(linkup.status)}
            >
              {linkup.status.charAt(0).toUpperCase() + linkup.status.slice(1)}
            </Badge>
          </TableCell>
          <TableCell>
            <Badge variant="outline">
              {linkup.type === "hosted" ? "👑 Host" : "👋 Attendee"}
            </Badge>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

export function UserLinkupsTable() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const filteredLinkups = (type?: "hosted" | "attended") => {
    let filtered = linkups;
    
    if (type) {
      filtered = filtered.filter(linkup => linkup.type === type);
    }
    
    if (selectedStatus) {
      filtered = filtered.filter(linkup => linkup.status === selectedStatus.toLowerCase());
    }
    
    return filtered;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Linkups</h2>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="happened">Happened</SelectItem>
              <SelectItem value="happening">Happening</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
              <SelectItem value="removed">Removed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="outline" onClick={() => setIsDialogOpen(true)}>
          View All
        </Button>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="hosted">Host</TabsTrigger>
          <TabsTrigger value="attended">Attendee</TabsTrigger>
        </TabsList>

        {["all", "hosted", "attended"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <LinkupsTable 
              data={filteredLinkups(tab === "all" ? undefined : tab as "hosted" | "attended")} 
              preview={true}
            />
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>All Linkups</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[600px] pr-4">
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="hosted">Host</TabsTrigger>
                <TabsTrigger value="attended">Attendee</TabsTrigger>
              </TabsList>

              {["all", "hosted", "attended"].map((tab) => (
                <TabsContent key={tab} value={tab}>
                  <LinkupsTable 
                    data={filteredLinkups(tab === "all" ? undefined : tab as "hosted" | "attended")} 
                    preview={false}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
