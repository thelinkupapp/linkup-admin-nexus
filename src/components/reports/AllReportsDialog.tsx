
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Report {
  id: string;
  reporterId: string;
  reporterName: string;
  reporterUsername?: string;
  reporterAvatar: string;
  reportedUserId?: string;
  reportedUserName?: string;
  reportedUserUsername?: string;
  reportedUserAvatar?: string;
  description: string;
  timestamp: string;
  isRead?: boolean;
}

interface AllReportsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reports: Report[];
  title: string;
  showMarkAsRead?: boolean;
}

export const AllReportsDialog = ({
  open,
  onOpenChange,
  reports,
  title,
  showMarkAsRead = false
}: AllReportsDialogProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return reports.slice(start, end);
  }, [reports, currentPage]);

  const totalPages = Math.ceil(reports.length / pageSize);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
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
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                        report.isRead 
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {report.isRead ? "Read" : "Unread"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {!report.isRead && (
                        <button 
                          className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1"
                          onClick={() => {/* Handle mark as read */}}
                        >
                          Mark as Read
                        </button>
                      )}
                    </TableCell>
                  </>
                ) : (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {totalPages > 1 && (
          <div className="mt-4 flex justify-center">
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
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
