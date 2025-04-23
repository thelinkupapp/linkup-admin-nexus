import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { formatCreatedDate } from "@/utils/dateFormatting";
import { Users, ChevronRight } from "lucide-react";

interface RecentUser {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  avatar: string;
  username: string;
}

const recentUsers: RecentUser[] = [
  {
    id: "1",
    name: "Emma Rodriguez",
    email: "emma.rodriguez@example.com",
    joinDate: new Date().toISOString(),
    avatar: "https://i.pravatar.cc/150?img=68",
    username: "emma.rodriguez"
  },
  {
    id: "2",
    name: "Liam Chen",
    email: "liam.chen@example.com",
    joinDate: new Date(Date.now() - 86400000).toISOString(),
    avatar: "https://i.pravatar.cc/150?img=69",
    username: "liam.chen"
  },
  {
    id: "3",
    name: "Sophia Patel",
    email: "sophia.patel@example.com",
    joinDate: new Date(Date.now() - 172800000).toISOString(),
    avatar: "https://i.pravatar.cc/150?img=70",
    username: "sophia.patel"
  }
];

export function RecentUsers() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-xl font-semibold">Users</CardTitle>
          </div>
          <CardDescription>Latest users who have joined the app</CardDescription>
        </div>
        <Link to="/users/management">
          <Button variant="ghost" size="sm" className="gap-1 hover:bg-secondary">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between group hover:bg-secondary/40 p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <Link
                    to={`/users/${user.username}`}
                    className="font-medium text-sm leading-none mb-1 text-black hover:underline block"
                  >
                    {user.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">@{user.username}</p>
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
