
import { useState, useMemo, useEffect } from "react";
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
import { Check, Search, ArrowUp, ArrowDown, AlertCircle } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LinkupImage } from "@/components/linkups/LinkupImage";
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
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationItemsPerPage,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { toast } from "sonner";

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
    image: string;
    imageSource: "uploaded" | "ai-generated" | "stock";
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
      image: "https://i.pravatar.cc/150?img=60",
      imageSource: "uploaded",
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
      image: "https://i.pravatar.cc/150?img=61",
      imageSource: "stock",
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
  },
  {
    id: "3",
    reporter: {
      id: "r3",
      name: "Lisa Hernandez",
      username: "lisah",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    linkup: {
      id: "l3",
      title: "Book Club Discussion",
      image: "https://i.pravatar.cc/150?img=62",
      imageSource: "ai-generated",
      host: {
        id: "h3",
        name: "Alex Thompson",
        username: "alext",
        avatar: "https://i.pravatar.cc/150?img=6"
      }
    },
    reason: "Host canceled without notice and didn't refund the participation fee.",
    timestamp: "2025-04-20T09:15:00Z",
    status: "unread"
  }
];

const MAX_DESCRIPTION_LENGTH = 65;
const ITEMS_PER_PAGE_OPTIONS = [25, 50, 100];

export function LinkupReportsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [reports, setReports] = useState(SAMPLE_REPORTS);

  const totalReports = reports.length;
  const unreadCount = reports.filter(r => r.status === "unread").length;

  // Sort reports by timestamp
  const sortedReports = useMemo(() => {
    return [...reports].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [reports, sortDirection]);

  // Filter reports based on search and status
  const filteredReports = useMemo(() => {
    return sortedReports.filter(report => {
      const matchesSearch = searchQuery === "" || 
        report.reporter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.reporter.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.linkup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.linkup.host.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.linkup.host.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.reason.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = selectedStatus === "all" || 
        (selectedStatus === "unread" && report.status === "unread") ||
        (selectedStatus === "read" && report.status === "read");

      return matchesSearch && matchesStatus;
    });
  }, [sortedReports, searchQuery, selectedStatus]);

  // Pagination
  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredReports.slice(startIndex, endIndex);
  }, [filteredReports, currentPage, itemsPerPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedStatus, itemsPerPage]);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return format(date, "MMM d 'at' HH:mm");
  };

  const truncateDescription = (text: string) => {
    if (text.length <= MAX_DESCRIPTION_LENGTH) return text;
    return `${text.slice(0, MAX_DESCRIPTION_LENGTH)}...`;
  };

  const handleMarkAsRead = (reportId: string) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId ? { ...report, status: "read" } : report
      )
    );
    
    toast.success("Report marked as read", {
      description: "The report has been updated successfully",
      duration: 3000,
    });
  };

  const toggleSort = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight mb-2 hidden">Linkup Reports</h1>
        <p className="text-muted-foreground mb-4 hidden">
          View and manage reports submitted for linkups on the app
        </p>
        <div className="flex items-center text-sm">
          <span className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 text-violet-700">
              <AlertCircle className="h-4 w-4" />
            </span>
            <span className="text-xl font-medium">{unreadCount} reports</span>
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
              <TableHead 
                className="w-[150px] cursor-pointer hover:text-foreground" 
                onClick={toggleSort}
              >
                <div className="flex items-center gap-2">
                  Date & Time
                  <div className="flex flex-col">
                    <ArrowUp className={`h-3 w-3 ${sortDirection === 'asc' ? 'text-foreground' : 'text-muted-foreground/30'}`} />
                    <ArrowDown className={`h-3 w-3 ${sortDirection === 'desc' ? 'text-foreground' : 'text-muted-foreground/30'}`} />
                  </div>
                </div>
              </TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead className="w-[120px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedReports.map((report) => (
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
                    <LinkupImage 
                      url={report.linkup.image} 
                      source={report.linkup.imageSource} 
                      size="small"
                      className="rounded-md h-10 w-10" 
                    />
                    <div className="flex flex-col">
                      <Link to={`/linkups/${report.linkup.id}`} className="font-medium hover:underline">
                        {report.linkup.title}
                      </Link>
                      <span className="text-sm text-muted-foreground">
                        Hosted by <Link to={`/users/${report.linkup.host.id}`} className="hover:underline">@{report.linkup.host.username}</Link>
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
            {paginatedReports.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <PaginationItemsPerPage>
          Showing {filteredReports.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, filteredReports.length)} of {filteredReports.length} reports
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => setItemsPerPage(Number(value))}
          >
            <SelectTrigger className="w-[80px] h-8">
              <SelectValue>{itemsPerPage}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {ITEMS_PER_PAGE_OPTIONS.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </PaginationItemsPerPage>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                let pageNum = i + 1;
                
                // Adjust page numbers for when current page is near the end
                if (currentPage > 3 && totalPages > 5) {
                  if (i === 0) {
                    pageNum = 1;
                  } else if (i === 1 && currentPage > 3) {
                    return (
                      <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  } else {
                    pageNum = Math.min(currentPage + i - 2, totalPages);
                    if (pageNum === totalPages && i !== 4) {
                      return null;
                    }
                  }
                }
                
                // Add ellipsis at the end if needed
                if (i === 4 && totalPages > 5 && currentPage < totalPages - 2) {
                  return (
                    <PaginationItem key="ellipsis-end">
                      <PaginationEllipsis />
                    </PaginationItem>
                  );
                }
                
                // Don't show pages beyond total
                if (pageNum > totalPages) return null;
                
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      isActive={pageNum === currentPage}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
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
