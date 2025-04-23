
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, FileText } from "lucide-react";
import { formatCreatedDate } from "@/utils/dateFormatting";
import { Badge } from "@/components/ui/badge";

interface LinkupReport {
  id: string;
  linkupTitle: string;
  reason: string;
  reportCount: number;
  lastReportedAt: string;
  status: "pending" | "reviewed";
}

const recentReports: LinkupReport[] = [
  {
    id: "1",
    linkupTitle: "Evening Yoga Session",
    reason: "Inappropriate content",
    reportCount: 3,
    lastReportedAt: "2024-05-15",
    status: "pending"
  },
  {
    id: "2",
    linkupTitle: "Board Game Night",
    reason: "Misleading information",
    reportCount: 2,
    lastReportedAt: "2024-05-14",
    status: "pending"
  },
  {
    id: "3",
    linkupTitle: "Local Music Festival",
    reason: "Suspicious activity",
    reportCount: 4,
    lastReportedAt: "2024-05-13",
    status: "pending"
  }
];

export function RecentLinkupReports() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-xl font-semibold">Linkup Reports</CardTitle>
          </div>
          <CardDescription>Recent reports on linkups</CardDescription>
        </div>
        <Link to="/reports/linkups">
          <Button variant="ghost" size="sm" className="gap-1 hover:bg-secondary">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentReports.map((report) => (
            <div
              key={report.id}
              className="flex items-center justify-between group hover:bg-secondary/40 p-2 rounded-lg transition-colors"
            >
              <div>
                <p className="font-medium text-sm leading-none mb-1">{report.linkupTitle}</p>
                <p className="text-sm text-muted-foreground">{report.reason}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-secondary/50">
                    {report.reportCount} reports
                  </Badge>
                  <Badge variant="outline">Pending</Badge>
                </div>
                <span className="text-sm text-muted-foreground">
                  {formatCreatedDate(report.lastReportedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
