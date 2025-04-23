
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
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
    image: "/lovable-uploads/28a4fce0-42eb-4672-8d43-7b11ebd21344.png",
    date: new Date().toISOString() // Today
  },
  {
    id: "2",
    title: "Beach Volleyball",
    hostName: "Emma",
    image: "/lovable-uploads/c1f2df94-36e7-4698-b3d2-c6d0f48692b2.png",
    date: new Date(Date.now() - 86400000).toISOString() // Yesterday
  },
  {
    id: "3",
    title: "Book Club Discussion",
    hostName: "Alex",
    image: "/lovable-uploads/28a4fce0-42eb-4672-8d43-7b11ebd21344.png", // Reusing image as placeholder
    date: new Date(Date.now() - 172800000).toISOString() // 2 days ago
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
                <img
                  src={linkup.image}
                  alt={linkup.title}
                  className="h-10 w-10 rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-sm leading-none mb-1">{linkup.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Hosted by {linkup.hostName}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {formatCreatedDate(linkup.date)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
