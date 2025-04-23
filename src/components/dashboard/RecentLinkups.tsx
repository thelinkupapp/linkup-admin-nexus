
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, CalendarDays } from "lucide-react";
import { formatCreatedDate } from "@/utils/dateFormatting";

interface RecentLinkup {
  id: string;
  title: string;
  hostName: string;
  image: string;
  date: string;
}

const recentLinkups: RecentLinkup[] = [
  {
    id: "1",
    title: "Coffee Chat Meetup",
    hostName: "Michael",
    image: "/lovable-uploads/5da9d3ec-be1e-48f8-9977-e23dd8c0b873.png",
    date: new Date().toISOString() // Today
  },
  {
    id: "2",
    title: "Beach Volleyball",
    hostName: "Emma",
    image: "/lovable-uploads/9253be66-4106-4932-84bc-d571d790eb81.png",
    date: new Date(Date.now() - 86400000).toISOString() // Yesterday
  },
  {
    id: "3",
    title: "Book Club Discussion",
    hostName: "Alex",
    image: "/lovable-uploads/0e26bd30-b75d-4798-a267-d2275e6c8f22.png",
    date: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  }
];

export function RecentLinkups() {
  return (
    <Card className="animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
            <CardTitle className="text-xl font-semibold">Recent Linkups</CardTitle>
          </div>
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
            <Link
              to={`/linkups/${linkup.id}`}
              key={linkup.id}
              className="flex items-center justify-between group hover:bg-secondary/40 p-2 rounded-lg transition-colors block"
            >
              <div className="flex items-center gap-4">
                <img
                  src={linkup.image}
                  alt={linkup.title}
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-sm leading-none mb-1">{linkup.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Hosted by{" "}
                    <Link
                      to={`/users/${linkup.hostName.toLowerCase()}`}
                      className="font-bold text-black hover:underline"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {linkup.hostName}
                    </Link>
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatCreatedDate(linkup.date)}
              </p>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
