
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, FileText } from "lucide-react";
import { formatCreatedDate } from "@/utils/dateFormatting";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LinkupReport {
  id: string;
  linkupId: string;
  linkupTitle: string;
  linkupImage: string;
  reporter: {
    id: string;
    name: string;
    avatar: string;
    username: string;
  };
  reason: string;
  submittedAt: string;
  status: "pending" | "reviewed";
}

const recentReports: LinkupReport[] = [
  {
    id: "1",
    linkupId: "1",
    linkupTitle: "Coffee Chat Meetup",
    linkupImage: "/lovable-uploads/5da9d3ec-be1e-48f8-9977-e23dd8c0b873.png",
    reporter: {
      id: "1",
      name: "John Smith",
      username: "john.smith",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    reason: "Inappropriate content",
    submittedAt: new Date().toISOString(),
    status: "pending"
  },
  {
    id: "2",
    linkupId: "2",
    linkupTitle: "Beach Volleyball",
    linkupImage: "/lovable-uploads/9253be66-4106-4932-84bc-d571d790eb81.png",
    reporter: {
      id: "2",
      name: "Emily Brown",
      username: "emily.brown",
      avatar: "https://i.pravatar.cc/150?img=6"
    },
    reason: "Misleading information",
    submittedAt: new Date(Date.now() - 86400000).toISOString(),
    status: "pending"
  },
  {
    id: "3",
    linkupId: "3",
    linkupTitle: "Book Club Discussion",
    linkupImage: "/lovable-uploads/0e26bd30-b75d-4798-a267-d2275e6c8f22.png",
    reporter: {
      id: "3",
      name: "Sarah Davis",
      username: "sarah.davis",
      avatar: "https://i.pravatar.cc/150?img=8"
    },
    reason: "Suspicious activity",
    submittedAt: new Date(Date.now() - 172800000).toISOString(),
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
              <div className="flex items-center gap-4">
                <img
                  src={report.linkupImage}
                  alt={report.linkupTitle}
                  className="h-10 w-10 rounded-lg object-cover"
                />
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
                      to={`/linkups/${report.linkupId}`}
                      className="font-medium text-sm leading-none text-black hover:underline"
                    >
                      {report.linkupTitle}
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
