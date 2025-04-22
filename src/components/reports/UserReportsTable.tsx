
import { Check, Filter, Search, ArrowUp, ArrowDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { toast } from "@/hooks/use-toast";

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
      avatar: "/lovable-uploads/1d844ea0-52cc-4ed0-b8d2-cb250bf887d2.png"
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
      avatar: "/lovable-uploads/3a92fc9e-fe93-44e4-8c0e-0b14a7085082.png"
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
  }
];

export function UserReportsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [filterStatus, setFilterStatus] = useState<"all" | "read" | "unread">("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [reports] = useState(mockReports);

  const handleMarkAsRead = (reportId: string) => {
    toast({
      title: "Report marked as read",
      description: "The report has been marked as read successfully.",
    });
  };

  const filteredReports = reports.filter(report => {
    if (filterStatus === "read") return report.isRead;
    if (filterStatus === "unread") return !report.isRead;
    return true;
  }).sort((a, b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
  });

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
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
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
            {paginatedReports.map((report) => (
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
                <TableCell>{report.description}</TableCell>
                <TableCell>{new Date(report.timestamp).toLocaleString()}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            setPageSize(Number(value));
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Items per page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="25">25 per page</SelectItem>
            <SelectItem value="50">50 per page</SelectItem>
            <SelectItem value="100">100 per page</SelectItem>
          </SelectContent>
        </Select>

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}

