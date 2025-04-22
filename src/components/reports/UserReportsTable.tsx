
import { Check, Search, ArrowUp, ArrowDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "@/hooks/use-toast";
import { formatJoinDate } from "@/utils/dateFormatting";

const mockReports = [
  {
    id: "1",
    reporter: {
      id: "r1",
      name: "Sarah Johnson",
      username: "sarahj",
      avatar: "/lovable-uploads/2e089ec4-e032-49e1-af97-37742c6d61ea.png"
    },
    reportedUser: {
      id: "ru1",
      name: "Michael Chen",
      username: "mikechen",
      avatar: "/lovable-uploads/13a7d777-aa40-4ae8-b11b-4fab740b73f1.png"
    },
    description: "Inappropriate behavior in chat",
    timestamp: "2025-04-22T11:30:00",
    isRead: false
  },
  {
    id: "2",
    reporter: {
      id: "r2",
      name: "David Williams",
      username: "davidw",
      avatar: "/lovable-uploads/photo-1582562124811-c09040d0a901"
    },
    reportedUser: {
      id: "ru2",
      name: "Emma Davis",
      username: "emmad",
      avatar: "/lovable-uploads/96315a2c-30e4-429b-a4de-b2f55e46e7bd.png"
    },
    description: "Suspicious activity during linkup",
    timestamp: "2025-04-21T16:45:00",
    isRead: true
  },
  {
    id: "3",
    reporter: {
      id: "r3",
      name: "Alex Thompson",
      username: "alext",
      avatar: "/lovable-uploads/e40b12e8-d278-4b67-8505-d39052f56458.png"
    },
    reportedUser: {
      id: "ru3",
      name: "Lisa Wang",
      username: "lisaw",
      avatar: "/lovable-uploads/e22f3ff4-2b21-42d3-9d5f-cc3b7cfba248.png"
    },
    description: "User exhibited concerning behavior during our scheduled meetup. They repeatedly made inappropriate comments about other participants and refused to follow community guidelines despite multiple warnings. When confronted about their behavior, they became defensive and started making false accusations against other members.",
    timestamp: "2025-04-20T09:15:00",
    isRead: false
  }
];

export function UserReportsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [filterStatus, setFilterStatus] = useState<"all" | "read" | "unread">("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [reports, setReports] = useState(mockReports);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredReports, setFilteredReports] = useState(reports);

  useEffect(() => {
    let results = reports.filter(report => {
      const searchLower = searchTerm.toLowerCase();
      if (searchTerm === "") return true;
      
      return (
        report.reporter.name.toLowerCase().includes(searchLower) ||
        report.reporter.username.toLowerCase().includes(searchLower) ||
        report.reportedUser.name.toLowerCase().includes(searchLower) ||
        report.reportedUser.username.toLowerCase().includes(searchLower) ||
        report.description.toLowerCase().includes(searchLower) ||
        new Date(report.timestamp).toLocaleString().toLowerCase().includes(searchLower)
      );
    });

    results = results.filter(report => {
      if (filterStatus === "read") return report.isRead;
      if (filterStatus === "unread") return !report.isRead;
      return true;
    });

    results = [...results].sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
    });

    setFilteredReports(results);
    setCurrentPage(1);
  }, [reports, searchTerm, filterStatus, sortDirection]);

  const handleMarkAsRead = (reportId: string) => {
    setReports(prevReports => 
      prevReports.map(report => 
        report.id === reportId ? { ...report, isRead: true } : report
      )
    );
    
    toast({
      title: "Report marked as read",
      description: "The report has been marked as read successfully.",
    });
  };

  const totalPages = Math.ceil(filteredReports.length / pageSize);
  const paginatedReports = filteredReports.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            placeholder="Search reports..."
            className="h-9"
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button size="sm" variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reporter</TableHead>
              <TableHead>Reported User</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="cursor-pointer" onClick={() => setSortDirection(d => d === "asc" ? "desc" : "asc")}>
                Date & Time {sortDirection === "desc" ? <ArrowDown className="inline h-4 w-4" /> : <ArrowUp className="inline h-4 w-4" />}
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedReports.length > 0 ? (
              paginatedReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={report.reporter.avatar} />
                        <AvatarFallback>{report.reporter.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <Link 
                          to={`/users/${report.reporter.id}`}
                          className="font-medium hover:underline"
                        >
                          {report.reporter.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          @{report.reporter.username}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={report.reportedUser.avatar} />
                        <AvatarFallback>{report.reportedUser.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <Link 
                          to={`/users/${report.reportedUser.id}`}
                          className="font-medium hover:underline"
                        >
                          {report.reportedUser.name}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          @{report.reportedUser.username}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="max-w-md">
                    <div className="truncate">
                      {report.description}
                    </div>
                    {report.description.length > 100 && (
                      <Button
                        variant="link"
                        className="text-xs p-0 h-auto mt-1"
                        onClick={() => {
                          toast({
                            title: "Report Description",
                            description: report.description,
                            duration: 10000,
                          });
                        }}
                      >
                        Read more
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>{formatJoinDate(report.timestamp)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={report.isRead 
                        ? "bg-green-100 text-green-800" 
                        : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {report.isRead ? "Read" : "Unread"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {!report.isRead && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleMarkAsRead(report.id)}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Mark as Read
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No reports found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#1A1F2C]">
            Showing{" "}
            <span className="text-[#9b87f5]">
              {filteredReports.length > 0 ? ((currentPage - 1) * pageSize) + 1 : 0}
            </span>
            {" "}of{" "}
            <span className="text-[#9b87f5]">{filteredReports.length}</span>{" "}
            <span className="text-[#1A1F2C]">reports</span>
          </span>
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {totalPages > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNum = i + 1;
                if (totalPages > 5) {
                  if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                }
                
                return (
                  <PaginationItem key={i}>
                    <PaginationLink
                      onClick={() => setCurrentPage(pageNum)}
                      isActive={currentPage === pageNum}
                      className="cursor-pointer"
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <PaginationItem>
                    <span className="flex h-9 w-9 items-center justify-center">...</span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      onClick={() => setCurrentPage(totalPages)}
                      className="cursor-pointer"
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
