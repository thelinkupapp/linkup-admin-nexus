
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
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
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Linkups</CardTitle>
          <CardDescription>Latest created linkups</CardDescription>
        </div>
        <Link to="/linkups/management">
          <Button variant="ghost" size="sm" className="gap-1">
            View All <ChevronRight className="h-4 w-4" />
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentLinkups.map((linkup) => (
            <div key={linkup.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-linkup-light-purple flex items-center justify-center text-xl">
                  {linkup.emoji}
                </div>
                <div>
                  <p className="font-medium">{linkup.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCreatedDate(linkup.date)}
                  </p>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                {linkup.attendees} attendees
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
