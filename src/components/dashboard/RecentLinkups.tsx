
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Users } from "lucide-react";
import { formatCreatedDate } from "@/utils/dateFormatting";

interface RecentLinkup {
  id: string;
  title: string;
  emoji: string;
  date: string;
  attendees: number;
}

const recentLinkups: RecentLinkup[] = [
  {
    id: "1",
    title: "Coffee Meetup",
    emoji: "☕",
    date: "2024-05-15",
    attendees: 8
  },
  {
    id: "2",
    title: "Hiking Adventure",
    emoji: "🏔️",
    date: "2024-05-16",
    attendees: 15
  },
  {
    id: "3",
    title: "Book Club",
    emoji: "📚",
    date: "2024-05-17",
    attendees: 12
  }
];

export function RecentLinkups() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">Recent Linkups</CardTitle>
          <CardDescription>Latest created linkups</CardDescription>
        </div>
        <Link to="/linkups/management">
          <Button variant="ghost" size="sm" className="gap-1 hover:bg-secondary">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentLinkups.map((linkup) => (
            <div
              key={linkup.id}
              className="flex items-center justify-between group hover:bg-secondary/40 p-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-lg">
                  {linkup.emoji}
                </div>
                <div>
                  <p className="font-medium text-sm leading-none mb-1">{linkup.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCreatedDate(linkup.date)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-secondary/50">
                  {linkup.attendees} attendees
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
