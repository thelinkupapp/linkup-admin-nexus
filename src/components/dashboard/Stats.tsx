
import { 
  Users, 
  Map, 
  AlertTriangle, 
  Crown 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
  trend: "up" | "down" | "neutral";
  className?: string;
}

const StatCard = ({ title, value, icon, change, trend, className }: StatCardProps) => (
  <Card className={cn("", className)}>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={cn(
        "text-xs mt-1",
        trend === "up" && "text-status-verified",
        trend === "down" && "text-status-rejected",
        trend === "neutral" && "text-muted-foreground"
      )}>
        {change}
      </p>
    </CardContent>
  </Card>
);

export function Stats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Users"
        value="2,420"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
        change="+8% from last month"
        trend="up"
        className="bg-linkup-soft-blue/50"
      />
      <StatCard
        title="Active Linkups"
        value="185"
        icon={<Map className="h-4 w-4 text-muted-foreground" />}
        change="+12% from last month"
        trend="up"
        className="bg-linkup-soft-green/50"
      />
      <StatCard
        title="Open Reports"
        value="24"
        icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
        change="-3% from last month"
        trend="down"
        className="bg-linkup-soft-yellow/50"
      />
      <StatCard
        title="Linkup Plus"
        value="578"
        icon={<Crown className="h-4 w-4 text-muted-foreground" />}
        change="+5% from last month"
        trend="up"
        className="bg-linkup-soft-pink/50"
      />
    </div>
  );
}
