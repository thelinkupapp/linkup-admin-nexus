
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, UserCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCreatedDate } from "@/utils/dateFormatting";

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
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    status: "pending",
    submittedAt: "2024-05-15"
  },
  {
    id: "2",
    user: {
      id: "2",
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    status: "pending",
    submittedAt: "2024-05-14"
  },
  {
    id: "3",
    user: {
      id: "3",
      name: "James Wilson",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    status: "pending",
    submittedAt: "2024-05-13"
  }
];

export function RecentVerifications() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-muted-foreground" />
            <CardTitle>Verification Requests</CardTitle>
          </div>
          <CardDescription>Recent user verification requests</CardDescription>
        </div>
        <Link to="/verifications">
          <Button variant="ghost" size="sm" className="gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentVerifications.map((request) => (
            <div key={request.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={request.user.avatar} alt={request.user.name} />
                  <AvatarFallback>{request.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{request.user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCreatedDate(request.submittedAt)}
                  </p>
                </div>
              </div>
              <Badge variant="secondary">Pending</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
