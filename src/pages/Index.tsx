
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Stats } from "@/components/dashboard/Stats";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChevronRight } from "lucide-react";

// Mock data for charts
const userActivityData = [
  { name: "Jan", users: 68 },
  { name: "Feb", users: 82 },
  { name: "Mar", users: 93 },
  { name: "Apr", users: 120 },
  { name: "May", users: 135 },
  { name: "Jun", users: 162 },
  { name: "Jul", users: 190 },
];

const linkupActivityData = [
  { name: "Jan", linkups: 12 },
  { name: "Feb", linkups: 19 },
  { name: "Mar", linkups: 25 },
  { name: "Apr", linkups: 32 },
  { name: "May", linkups: 40 },
  { name: "Jun", linkups: 52 },
  { name: "Jul", linkups: 65 },
];

// Mock data for recent users
const recentUsers = [
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

// Mock data for upcoming linkups
const upcomingLinkups = [
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

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="Dashboard" />
        <main className="p-6">
          <div className="space-y-6">
            <Stats />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity</CardTitle>
                  <CardDescription>User growth over the last 7 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="users" stroke="#9b87f5" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Linkup Activity</CardTitle>
                  <CardDescription>Linkup growth over the last 7 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={linkupActivityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="linkups" stroke="#7E69AB" strokeWidth={2} activeDot={{ r: 8 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Recent Users</CardTitle>
                    <CardDescription>Latest users who joined the platform</CardDescription>
                  </div>
                  <Link to="/users">
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
                          <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full" />
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(user.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Linkups</CardTitle>
                    <CardDescription>The next few scheduled linkups</CardDescription>
                  </div>
                  <Link to="/linkups">
                    <Button variant="ghost" size="sm" className="gap-1">
                      View All <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingLinkups.map((linkup) => (
                      <div key={linkup.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-linkup-light-purple flex items-center justify-center text-xl">
                            {linkup.emoji}
                          </div>
                          <div>
                            <p className="font-medium">{linkup.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(linkup.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="text-sm">{linkup.attendees} attendees</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
