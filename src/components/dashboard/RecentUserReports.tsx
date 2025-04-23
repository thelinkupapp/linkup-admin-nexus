
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCreatedDate } from "@/utils/dateFormatting";
import { Badge } from "@/components/ui/badge";

interface UserReport {
  id: string;
  reporter: {
    id: string;
    name: string;
    avatar: string;
  };
  reportedUser: {
    id: string;
    name: string;
    avatar: string;
  };
  reason: string;
  submittedAt: string;
  status: "pending" | "reviewed";
}

const recentReports: UserReport[] = [
  {
    id: "1",
    reporter: {
      id: "1",
      name: "John Smith",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    reportedUser: {
      id: "2",
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    reason: "Inappropriate behavior",
    submittedAt: "2024-05-15",
    status: "pending"
  },
  {
    id: "2",
    reporter: {
      id: "3",
      name: "Emily Brown",
      avatar: "https://i.pravatar.cc/150?img=6"
    },
    reportedUser: {
      id: "4",
      name: "David Wilson",
      avatar: "https://i.pravatar.cc/150?img=7"
    },
    reason: "Harassment",
    submittedAt: "2024-05-14",
    status: "pending"
  },
  {
    id: "3",
    reporter: {
      id: "5",
      name: "Sarah Davis",
      avatar: "https://i.pravatar.cc/150?img=8"
    },
    reportedUser: {
      id: "6",
      name: "Michael Brown",
      avatar: "https://i.pravatar.cc/150?img=9"
    },
    reason: "Spam",
    submittedAt: "2024-05-13",
    status: "pending"
  }
];

export function RecentUserReports() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-xl font-semibold">User Reports</CardTitle>
          </div>
          <CardDescription>Recent reports submitted by users</CardDescription>
        </div>
        <Link to="/reports/users">
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
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                  <AvatarImage src={report.reportedUser.avatar} alt={report.reportedUser.name} />
                  <AvatarFallback>{report.reportedUser.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm leading-none mb-1">{report.reportedUser.name}</p>
                  <p className="text-sm text-muted-foreground">{report.reason}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant="secondary" className="bg-secondary/50">Pending Review</Badge>
                <span className="text-sm text-muted-foreground">
                  {formatCreatedDate(report.submittedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
