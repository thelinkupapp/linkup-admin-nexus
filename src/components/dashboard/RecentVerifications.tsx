
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, UserCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCreatedDate } from "@/utils/dateFormatting";
import { Badge } from "@/components/ui/badge";

interface VerificationRequest {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  status: "pending";
  submittedAt: string;
}

const recentVerifications: VerificationRequest[] = [
  {
    id: "1",
    user: {
      id: "1",
      name: "Michael Smith",
      username: "michael.smith",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    status: "pending",
    submittedAt: new Date().toISOString()
  },
  {
    id: "2",
    user: {
      id: "2",
      name: "Emma Davis",
      username: "emma.davis",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    status: "pending",
    submittedAt: new Date(Date.now() - 86400000).toISOString()
  },
  {
    id: "3",
    user: {
      id: "3",
      name: "James Wilson",
      username: "james.wilson",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    status: "pending",
    submittedAt: new Date(Date.now() - 172800000).toISOString()
  }
];

export function RecentVerifications() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-xl font-semibold">Verification Requests</CardTitle>
          </div>
          <CardDescription>Recent user verification requests</CardDescription>
        </div>
        <Link to="/verifications">
          <Button variant="ghost" size="sm" className="gap-1 hover:bg-secondary">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentVerifications.map((request) => (
            <div
              key={request.id}
              className="flex items-center justify-between group hover:bg-secondary/40 p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                  <AvatarImage src={request.user.avatar} alt={request.user.name} />
                  <AvatarFallback>{request.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm leading-none mb-1">{request.user.name}</p>
                  <p className="text-sm text-muted-foreground">@{request.user.username}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatCreatedDate(request.submittedAt)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
