
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { formatCreatedDate } from "@/utils/dateFormatting";
import { ChevronRight } from "lucide-react";

interface RecentUser {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  avatar: string;
}

const recentUsers: RecentUser[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    joinDate: "2024-05-10",
    avatar: "https://i.pravatar.cc/150?img=11"
  },
  {
    id: "2",
    name: "Sara Williams",
    email: "sara@example.com",
    joinDate: "2024-05-09",
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: "3",
    name: "Daniel Brown",
    email: "daniel@example.com",
    joinDate: "2024-05-08",
    avatar: "https://i.pravatar.cc/150?img=13"
  }
];

export function RecentUsers() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Users</CardTitle>
          <CardDescription>Latest users who joined the platform</CardDescription>
        </div>
        <Link to="/users/management">
          <Button variant="ghost" size="sm" className="gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatCreatedDate(user.joinDate)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
