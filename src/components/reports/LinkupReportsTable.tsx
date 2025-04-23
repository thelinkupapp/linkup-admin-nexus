import React, { useState, useMemo, useEffect } from "react";
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
import { Check, Search, AlertCircle, ArrowUp, ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
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
    host: {
      id: string;
      name: string;
      firstName: string;
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
      image: "/lovable-uploads/e208023e-8fa0-4565-9605-f87d64c4e47e.png",
      host: {
        id: "h1",
        name: "Michael Chen",
        firstName: "Michael",
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
      image: "/lovable-uploads/8f65bd0d-e464-49b1-84c8-14fb868ca62d.png",
      host: {
        id: "h2",
        name: "Emma Davis",
        firstName: "Emma",
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
      image: "/lovable-uploads/df3018c9-b4f4-4774-9991-6e2cc286e145.png",
      host: {
        id: "h3",
        name: "Alex Thompson",
        firstName: "Alex",
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

  const sortedReports = useMemo(() => {
    return [...reports].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    });
  }, [reports, sortDirection]);

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

  const paginatedReports = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredReports.slice(startIndex, endIndex);
  }, [filteredReports, currentPage, itemsPerPage]);

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
  const showingText = selectedStatus === "all" 
    ? `${unreadCount} reports` 
    : `Showing ${filteredReports.length} of ${totalReports} reports`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[42px] font-bold tracking-tight text-[#23252b] mb-2">
          Linkup Reports
        </h1>
        <p className="text-[#6B7280] text-lg font-normal">
          Review and manage reported linkups
        </p>
        <div className="flex items-center gap-2 mt-6">
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100">
            <AlertCircle className="h-5 w-5 text-violet-700" />
          </span>
          <span className="text-xl text-[#23252b]">
            {showingText}
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
                    <div className="h-10 w-10 overflow-hidden rounded-lg">
                      <img 
                        src={report.linkup.image} 
                        alt={report.linkup.title}
                        className="h-full w-full object-cover aspect-[9/16]" 
                      />
                    </div>
                    <div className="flex flex-col">
                      <Link to={`/linkups/${report.linkup.id}`} className="font-medium hover:underline">
                        {report.linkup.title}
                      </Link>
                      <span className="text-sm text-muted-foreground">
                        Hosted by{" "}
                        <Link 
                          to={`/users/${report.linkup.host.id}`} 
                          className="font-medium hover:underline"
                        >
                          {report.linkup.host.firstName}
                        </Link>
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

      <div className="flex items-center justify-between">
        <PaginationItemsPerPage>
          Showing {filteredReports.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, filteredReports.length)} of {filteredReports.length} reports
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => {
              setItemsPerPage(Number(value));
              setCurrentPage(1);
            }}
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
            <PaginationContent className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  size="sm"
                  className="min-w-[40px]"
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              ))}

              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
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
