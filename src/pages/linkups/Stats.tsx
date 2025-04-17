
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpCircle, DollarSign, Users, Trophy, Coins, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const mockChartData = {
  today: Array.from({ length: 24 }, (_, i) => ({
    time: `${String(i).padStart(2, '0')}:00`,
    value: Math.floor(Math.random() * 50) + 20
  })),
  daily: Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return {
      time: date.toLocaleDateString('en-US', { weekday: 'short' }),
      value: Math.floor(Math.random() * 100) + 50
    };
  }).reverse(),
  weekly: Array.from({ length: 4 }, (_, i) => ({
    time: `Week ${i + 1}`,
    value: Math.floor(Math.random() * 200) + 100
  })),
  monthly: Array.from({ length: 12 }, (_, i) => ({
    time: new Date(0, i).toLocaleString('default', { month: 'short' }),
    value: Math.floor(Math.random() * 400) + 200
  })),
  yearly: Array.from({ length: 5 }, (_, i) => ({
    time: `${2024 - i}`,
    value: Math.floor(Math.random() * 1000) + 500
  })).reverse()
};

// Component for top stat cards
const TopStatsCards = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Linkups</CardTitle>
          <ArrowUpCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">245</div>
          <p className="text-xs text-muted-foreground">
            +12.5% from last month
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$12,450</div>
          <p className="text-xs text-muted-foreground">
            Including $1,245 (10%) platform earnings
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Most Profitable</CardTitle>
          <Coins className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center">
              💰
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Music Festival</h4>
              <p className="text-xs text-muted-foreground">$2,450 earned</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Most Attended</CardTitle>
          <Trophy className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-lg bg-secondary flex items-center justify-center">
              🎉
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Tech Meetup 2024</h4>
              <p className="text-xs text-muted-foreground">156 attendees</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Component for activity graph
const ActivityGraph = ({ timeframe, setTimeframe }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Linkup Activity</CardTitle>
        <Tabs defaultValue={timeframe} onValueChange={setTimeframe}>
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="yearly">Yearly</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData[timeframe]} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <defs>
                <linearGradient id="activity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="time" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                name="Activity"
                stroke="#8B5CF6"
                fill="url(#activity)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

// Component for super creators
const SuperCreators = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Linkup Super Creators</CardTitle>
        <Users className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/40?u=${i}`} />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">Super Creator {i}</p>
                    <span className="text-xs text-muted-foreground">@supercreator{i}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{30 - i * 2} linkups created</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Link to={`/users/${i}`}>
                  <Button variant="ghost" size="sm">
                    View Profile
                  </Button>
                </Link>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const LinkupStats = () => {
  const [timeframe, setTimeframe] = useState("monthly");

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Header title="Linkup Stats" />
        <main className="p-6 space-y-6">
          <TopStatsCards />
          <ActivityGraph timeframe={timeframe} setTimeframe={setTimeframe} />
          <SuperCreators />
        </main>
      </div>
    </div>
  );
};

export default LinkupStats;
