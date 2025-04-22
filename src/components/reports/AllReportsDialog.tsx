
import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, Search, ArrowDown } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  DialogHeader 
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";

interface BaseReport {
  id: string;
  description: string;
  timestamp: string;
}

interface ReportReceived extends BaseReport {
  reporterId: string;
  reporterName: string;
  reporterUsername?: string;
  reporterAvatar: string;
  isRead?: boolean;
}

interface ReportMade extends BaseReport {
  reportedUserId?: string;
  reportedUserName?: string;
  reportedUserUsername?: string;
  reportedUserAvatar?: string;
}

type Report = ReportReceived | ReportMade;

interface AllReportsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reports: Report[];
  title: string;
  showMarkAsRead?: boolean;
  onMarkAsRead?: (reportId: string) => void;
}

export const AllReportsDialog = ({
  open,
  onOpenChange,
  reports,
  title,
  showMarkAsRead = false,
  onMarkAsRead
}: AllReportsDialogProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filterStatus, setFilterStatus] = useState<"all" | "read" | "unread">("all");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [localReports, setLocalReports] = useState<Report[]>(reports);

  useEffect(() => {
    setLocalReports(reports);
  }, [reports]);

  const isReportReceived = (report: Report): report is ReportReceived => {
    return 'reporterId' in report;
  };

  const filteredReports = useMemo(() => {
    let filtered = [...localReports];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(report => {
        if (isReportReceived(report)) {
          return (
            report.reporterName.toLowerCase().includes(query) ||
            report.reporterUsername?.toLowerCase().includes(query) ||
            report.description.toLowerCase().includes(query)
          );
        }
        return false;
      });
    }

    if (showMarkAsRead) {
      filtered = filtered.filter(report => {
        if (!isReportReceived(report)) return false;
        if (filterStatus === "read") return report.isRead;
        if (filterStatus === "unread") return !report.isRead;
        return true;
      });
    }

    return filtered.sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortDirection === "desc" ? dateB - dateA : dateA - dateB;
    });
  }, [localReports, filterStatus, sortDirection, searchQuery, showMarkAsRead]);

  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredReports.slice(start, start + pageSize);
  }, [filteredReports, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredReports.length / pageSize);
  const unreadCount = localReports.filter(r => isReportReceived(r) && !r.isRead).length;

  // Generate page numbers for pagination
  const generatePaginationItems = () => {
    let pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if there are few
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Calculate start and end of middle pages
      let startPage = Math.max(2, currentPage - 1);
      let endPage = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust if we're near the start
      if (currentPage <= 3) {
        endPage = 4;
      }
      
      // Adjust if we're near the end
      if (currentPage >= totalPages - 2) {
        startPage = totalPages - 3;
      }
      
      // Add ellipsis if needed at the beginning
      if (startPage > 2) {
        pages.push('ellipsis-start');
      }
      
      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed at the end
      if (endPage < totalPages - 1) {
        pages.push('ellipsis-end');
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  const handleMarkAsRead = (reportId: string) => {
    setLocalReports(prev => prev.map(report => {
      if (report.id === reportId && isReportReceived(report)) {
        return { ...report, isRead: true };
      }
      return report;
    }));
    
    onMarkAsRead?.(reportId);
    
    toast({
      title: "Report marked as read",
      description: "The report has been marked as read successfully.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-3">
              <DialogTitle>{title}</DialogTitle>
              {showMarkAsRead && unreadCount > 0 && (
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
            <div className="absolute right-0">
              {showMarkAsRead && (
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
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Search by name, username, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Button size="icon" variant="outline">
            <Search className="h-4 w-4" />
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              {showMarkAsRead ? (
                <>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-muted/50 flex items-center"
                    onClick={() => setSortDirection(d => d === "asc" ? "desc" : "asc")}
                  >
                    Date & Time 
                    <ArrowDown 
                      className={`inline h-4 w-4 ml-1 ${sortDirection === "desc" ? "rotate-180" : ""}`} 
                    />
                  </TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </>
              ) : (
                <>
                  <TableHead>Reported User</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date & Time</TableHead>
                </>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedReports.map((report) => (
              <TableRow key={report.id}>
                {showMarkAsRead ? (
                  <>
                    {isReportReceived(report) && (
                      <>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={report.reporterAvatar} />
                              <AvatarFallback>{report.reporterName[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <Link 
                                to={`/users/${report.reporterId}`}
                                className="font-medium hover:underline"
                              >
                                {report.reporterName}
                              </Link>
                              <p className="text-sm text-muted-foreground">
                                @{report.reporterUsername}
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
                      </>
                    )}
                  </>
                ) : (
                  <>
                    {!isReportReceived(report) && (
                      <>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={report.reportedUserAvatar} />
                              <AvatarFallback>{report.reportedUserName?.[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <Link 
                                to={`/users/${report.reportedUserId}`}
                                className="font-medium hover:underline"
                              >
                                {report.reportedUserName}
                              </Link>
                              <p className="text-sm text-muted-foreground">
                                @{report.reportedUserUsername}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{report.description}</TableCell>
                        <TableCell>{new Date(report.timestamp).toLocaleString()}</TableCell>
                      </>
                    )}
                  </>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Items per page:</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => {
                setPageSize(Number(value));
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder="Items per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
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
                
                {generatePaginationItems().map((page, index) => {
                  if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                    return (
                      <PaginationItem key={`ellipsis-${index}`}>
                        <span className="flex h-9 w-9 items-center justify-center">...</span>
                      </PaginationItem>
                    );
                  }
                  
                  return (
                    <PaginationItem key={index}>
                      <PaginationLink
                        onClick={() => setCurrentPage(Number(page))}
                        isActive={currentPage === Number(page)}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}
                
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
      </DialogContent>
    </Dialog>
  );
};
