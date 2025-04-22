import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowUp, ArrowDown } from "lucide-react";

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
  const { toast } = useToast();

  const isReportReceived = (report: Report): report is ReportReceived => {
    return 'reporterId' in report;
  };

  const filteredReports = useMemo(() => {
    let filtered = [...reports];

    if (showMarkAsRead) {
      filtered = reports.filter(report => {
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
  }, [reports, filterStatus, sortDirection, showMarkAsRead]);

  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredReports.slice(start, start + pageSize);
  }, [filteredReports, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredReports.length / pageSize);
  const unreadCount = reports.filter(r => isReportReceived(r) && !r.isRead).length;

  const handleMarkAsRead = (reportId: string) => {
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DialogTitle>{title}</DialogTitle>
              {showMarkAsRead && unreadCount > 0 && (
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                  {unreadCount} unread
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4">
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSortDirection(d => d === "asc" ? "desc" : "asc")}
                className="flex items-center gap-2"
              >
                Sort by Date
                {sortDirection === "desc" ? (
                  <ArrowDown className="h-4 w-4" />
                ) : (
                  <ArrowUp className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Table>
          <TableHeader>
            <TableRow>
              {showMarkAsRead ? (
                <>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date & Time</TableHead>
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
          <Select
            value={pageSize.toString()}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select page size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 per page</SelectItem>
              <SelectItem value="10">10 per page</SelectItem>
              <SelectItem value="15">15 per page</SelectItem>
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
      </DialogContent>
    </Dialog>
  );
};
