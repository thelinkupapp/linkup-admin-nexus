
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCreatedDate } from "@/utils/dateFormatting";

interface UserReport {
  id: string;
  reporter: {
    id: string;
    name: string;
    avatar: string;
    username: string;
  };
  reportedUser: {
    id: string;
    name: string;
    avatar: string;
    username: string;
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
      username: "john.smith",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    reportedUser: {
      id: "2",
      name: "Alice Johnson",
      username: "alice.johnson",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    reason: "Inappropriate behavior",
    submittedAt: new Date().toISOString(),
    status: "pending"
  },
  {
    id: "2",
    reporter: {
      id: "3",
      name: "Emily Brown",
      username: "emily.brown",
      avatar: "https://i.pravatar.cc/150?img=6"
    },
    reportedUser: {
      id: "4",
      name: "David Wilson",
      username: "david.wilson",
      avatar: "https://i.pravatar.cc/150?img=7"
    },
    reason: "Harassment",
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
    status: "pending"
  },
  {
    id: "3",
    reporter: {
      id: "5",
      name: "Sarah Davis",
      username: "sarah.davis",
      avatar: "https://i.pravatar.cc/150?img=8"
    },
    reportedUser: {
      id: "6",
      name: "Michael Brown",
      username: "michael.brown",
      avatar: "https://i.pravatar.cc/150?img=9"
    },
    reason: "Spam",
    submittedAt: new Date(Date.now() - 172800000).toISOString(),
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
          <CardDescription>Latest user reports</CardDescription>
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
                  <AvatarImage src={report.reporter.avatar} alt={report.reporter.name} />
                  <AvatarFallback>{report.reporter.name[0]}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Link
                      to={`/users/${report.reporter.username}`}
                      className="font-medium text-sm leading-none text-black hover:underline"
                    >
                      {report.reporter.name}
                    </Link>
                    <span className="text-sm text-muted-foreground">reported</span>
                    <Link
                      to={`/users/${report.reportedUser.username}`}
                      className="font-medium text-sm leading-none text-black hover:underline"
                    >
                      {report.reportedUser.name}
                    </Link>
                  </div>
                  <p className="text-sm text-muted-foreground">{report.reason}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatCreatedDate(report.submittedAt)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
