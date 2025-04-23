
import { useState } from "react";
import { Check, Search, ArrowUp, ArrowDown, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Link } from "react-router-dom";

interface Report {
  id: string;
  reporter: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  reason: string;
  timestamp: string;
  resolved: boolean;
}

interface LinkupReportsListProps {
  reports: Report[];
  onMarkAsRead: (reportId: string) => void;
}

const MAX_DESCRIPTION_LENGTH = 100;

export function LinkupReportsList({ reports, onMarkAsRead }: LinkupReportsListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const filteredReports = reports
    .filter(report => {
      const matchesSearch = 
        report.reporter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.reporter.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.reason.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter = 
        filter === "all" || 
        (filter === "unread" && !report.resolved) || 
        (filter === "read" && report.resolved);

      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      const dateA = new Date(a.timestamp).getTime();
      const dateB = new Date(b.timestamp).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const truncateDescription = (text: string) => {
    if (text.length <= MAX_DESCRIPTION_LENGTH) return text;
    return text.slice(0, MAX_DESCRIPTION_LENGTH) + "...";
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Reports Received
          {reports.filter(r => !r.resolved).length > 0 && (
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
              {reports.filter(r => !r.resolved).length} unread
            </Badge>
          )}
        </h2>
        <p className="text-muted-foreground mt-1">Reports submitted by other users</p>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, username, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filter} onValueChange={(value: "all" | "unread" | "read") => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter reports" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reports</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
            <SelectItem value="read">Read</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="relative">
        <div className="grid grid-cols-[1fr_2fr_1fr_100px_120px] gap-4 py-3 text-sm text-muted-foreground border-b">
          <div>Reporter</div>
          <div>Description</div>
          <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors" onClick={toggleSortOrder}>
            Date & Time
            {sortOrder === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        <div className="divide-y">
          {filteredReports.map((report) => (
            <div key={report.id} className="grid grid-cols-[1fr_2fr_1fr_100px_120px] gap-4 py-4 items-center">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={report.reporter.avatar} alt={report.reporter.name} />
                  <AvatarFallback>{report.reporter.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <Link 
                    to={`/users/${report.reporter.id}`}
                    className="font-medium hover:underline"
                  >
                    {report.reporter.name}
                  </Link>
                  <span className="text-sm text-muted-foreground">@{report.reporter.username}</span>
                </div>
              </div>
              
              <div className="text-sm">
                {truncateDescription(report.reason)}
                {report.reason.length > MAX_DESCRIPTION_LENGTH && (
                  <button
                    onClick={() => setSelectedReport(report)}
                    className="ml-1 text-violet-500 hover:text-violet-600"
                  >
                    Read more
                  </button>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground">
                {format(new Date(report.timestamp), "dd/MM/yyyy, HH:mm:ss")}
              </div>

              <div>
                <Badge 
                  variant="outline" 
                  className={report.resolved 
                    ? "bg-green-100 text-green-800 hover:bg-green-100" 
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  }
                >
                  {report.resolved ? "Read" : "Unread"}
                </Badge>
              </div>

              <div>
                {!report.resolved && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-green-600 hover:text-green-700 gap-1.5"
                    onClick={() => onMarkAsRead(report.id)}
                  >
                    <Check className="h-4 w-4" />
                    Mark as Read
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Report Description</DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-base text-gray-700 whitespace-pre-line">
            {selectedReport?.reason}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
