
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Search, X } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Report {
  id: string;
  reporter: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  linkup: {
    id: string;
    title: string;
    host: {
      id: string;
      name: string;
      username: string;
      avatar: string;
    };
  };
  reason: string;
  timestamp: string;
  status: "unread" | "read";
}

const SAMPLE_REPORTS: Report[] = [
  {
    id: "1",
    reporter: {
      id: "r1",
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    linkup: {
      id: "l1",
      title: "Coffee Chat Meetup",
      host: {
        id: "h1",
        name: "Michael Chen",
        username: "mikec",
        avatar: "https://i.pravatar.cc/150?img=2"
      }
    },
    reason: "Inappropriate behavior in chat during the meetup. Multiple instances of harassment.",
    timestamp: "2025-04-22T11:30:00Z",
    status: "unread"
  },
  {
    id: "2",
    reporter: {
      id: "r2",
      name: "David Williams",
      username: "davidw",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    linkup: {
      id: "l2",
      title: "Beach Volleyball",
      host: {
        id: "h2",
        name: "Emma Davis",
        username: "emmad",
        avatar: "https://i.pravatar.cc/150?img=4"
      }
    },
    reason: "The location provided was incorrect and several attendees couldn't find the venue.",
    timestamp: "2025-04-21T16:45:00Z",
    status: "read"
  }
];

const MAX_DESCRIPTION_LENGTH = 65;

export function LinkupReportsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const reports = SAMPLE_REPORTS;
  const totalReports = reports.length;
  const unreadCount = reports.filter(r => r.status === "unread").length;

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      const matchesSearch = searchQuery === "" || 
        report.reporter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.reporter.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.linkup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.reason.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === "all" || 
        (selectedStatus === "unread" && report.status === "unread") ||
        (selectedStatus === "read" && report.status === "read");

      return matchesSearch && matchesStatus;
    });
  }, [reports, searchQuery, selectedStatus]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const distance = formatDistanceToNow(date, { addSuffix: true });
    
    if (distance.includes("about") || distance.includes("less")) {
      return distance.replace("about ", "").replace("less than ", "");
    }
    return format(date, "MMM d 'at' HH:mm");
  };

  const truncateDescription = (text: string) => {
    if (text.length <= MAX_DESCRIPTION_LENGTH) return text;
    return `${text.slice(0, MAX_DESCRIPTION_LENGTH)}...`;
  };

  const handleMarkAsRead = (reportId: string) => {
    // Here you would typically update the status in your backend
    console.log("Marking report as read:", reportId);
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Linkup Reports</h1>
        <p className="text-muted-foreground mb-4">
          View and manage reports submitted for linkups on the app
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span className="flex items-center gap-2">
            <span className="inline-block w-5 h-5 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center">
              {unreadCount}
            </span>
            <span className="text-muted-foreground">reports</span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 max-w-md"
          />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="All Reports" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reports</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Reporter</TableHead>
              <TableHead className="w-[200px]">Reported Linkup</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[150px]">Date & Time</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={report.reporter.avatar} alt={report.reporter.name} />
                      <AvatarFallback>{report.reporter.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <Link to={`/users/${report.reporter.id}`} className="font-medium hover:underline">
                        {report.reporter.name}
                      </Link>
                      <span className="text-sm text-muted-foreground">
                        @{report.reporter.username}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={report.linkup.host.avatar} alt={report.linkup.host.name} />
                      <AvatarFallback>{report.linkup.host.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <Link to={`/linkups/${report.linkup.id}`} className="font-medium hover:underline">
                        {report.linkup.title}
                      </Link>
                      <span className="text-sm text-muted-foreground">
                        @{report.linkup.host.username}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-start gap-2">
                    <span className="text-sm">
                      {truncateDescription(report.reason)}
                      {report.reason.length > MAX_DESCRIPTION_LENGTH && (
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="ml-1 text-violet-500 hover:text-violet-600"
                        >
                          Read more
                        </button>
                      )}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {formatTimestamp(report.timestamp)}
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={report.status === "read" 
                      ? "bg-green-50 text-green-700 hover:bg-green-50"
                      : "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
                    }
                  >
                    {report.status === "read" ? "Read" : "Unread"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {report.status === "unread" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-600 hover:text-green-700 gap-1.5"
                      onClick={() => handleMarkAsRead(report.id)}
                    >
                      <Check className="h-4 w-4" />
                      Mark as Read
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filteredReports.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Showing {filteredReports.length} of {totalReports} reports</span>
      </div>

      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
            <DialogDescription>
              {selectedReport?.reason}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
