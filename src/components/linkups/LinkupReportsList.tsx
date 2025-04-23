
import { Check } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Report {
  id: string;
  reporter: {
    id: string;
    name: string;
    username: string;
  };
  reason: string;
  timestamp: string;
  resolved: boolean;
}

interface LinkupReportsListProps {
  reports: Report[];
  onMarkAsRead: (reportId: string) => void;
}

export function LinkupReportsList({ reports, onMarkAsRead }: LinkupReportsListProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Reports Received</h2>
          <p className="text-muted-foreground mt-1">Reports submitted by other users</p>
        </div>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      
      <div className="space-y-6">
        {reports.map((report) => (
          <div key={report.id} className="flex items-start justify-between border-b pb-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-10 w-10">
                <AvatarFallback>{report.reporter.name[0]}</AvatarFallback>
              </Avatar>
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{report.reporter.name}</span>
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
                <p className="text-sm text-muted-foreground">@{report.reporter.username}</p>
                <p className="text-base mt-2">{report.reason}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(report.timestamp), "dd/MM/yyyy, HH:mm:ss")}
                </p>
              </div>
            </div>
            
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
        ))}
      </div>
    </div>
  );
}
