import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Stats } from "@/components/dashboard/Stats";
import { RecentUsers } from "@/components/dashboard/RecentUsers";
import { RecentLinkups } from "@/components/dashboard/RecentLinkups";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";

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
              <RecentUsers />
              <RecentLinkups />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
