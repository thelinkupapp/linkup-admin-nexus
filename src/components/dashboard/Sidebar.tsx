
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Map, 
  AlertTriangle, 
  Mail, 
  Crown, 
  Settings,
  BarChart3
} from "lucide-react";

const navItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: BarChart3
  },
  {
    title: "Users",
    href: "/users",
    icon: Users
  },
  {
    title: "Linkups",
    href: "/linkups",
    icon: Map
  },
  {
    title: "Reports",
    href: "/reports",
    icon: AlertTriangle
  },
  {
    title: "CRM",
    href: "/crm",
    icon: Mail
  },
  {
    title: "Linkup Plus",
    href: "/linkup-plus",
    icon: Crown
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings
  }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-screen w-64 fixed left-0 top-0 bg-sidebar border-r">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-md bg-linkup-purple flex items-center justify-center text-white font-bold">L</div>
          <span className="text-lg font-semibold">Linkup Admin</span>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href || 
              (item.href !== "/" && location.pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "nav-link",
                  isActive && "active"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-3 rounded-lg bg-linkup-light-purple">
          <p className="text-xs text-linkup-dark-purple mb-2">Logged in as</p>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-linkup-purple text-white flex items-center justify-center">
              A
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@linkup.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
