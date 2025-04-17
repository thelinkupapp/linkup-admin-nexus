
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users, 
  Map,
  AlertTriangle,
  Mail,
  Crown,
  Settings,
  BarChart3,
  Bell,
  ShieldCheck,
  MessageSquare,
  ChevronDown,
  Shield,
  Megaphone
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

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
    type: "dropdown",
    icon: AlertTriangle,
    items: [
      {
        title: "User Reports",
        href: "/reports/users",
        icon: AlertTriangle
      },
      {
        title: "Linkup Reports",
        href: "/reports/linkups",
        icon: AlertTriangle
      }
    ]
  },
  {
    title: "Marketing",
    type: "dropdown",
    icon: Megaphone,
    items: [
      {
        title: "Email CRM",
        href: "/crm/email",
        icon: Mail
      },
      {
        title: "Push Notifications",
        href: "/crm/push",
        icon: Bell
      }
    ]
  },
  {
    title: "Linkup Plus",
    href: "/linkup-plus",
    icon: Crown
  },
  {
    title: "Linkup Staff",
    href: "/staff",
    icon: Shield
  },
  {
    title: "Verifications",
    href: "/verifications",
    icon: ShieldCheck
  },
  {
    title: "User Feedback",
    href: "/feedback",
    icon: MessageSquare
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
            if (item.type === "dropdown") {
              const isActive = item.items?.some(subItem => location.pathname === subItem.href);
              
              return (
                <Collapsible key={item.title}>
                  <CollapsibleTrigger className={cn(
                    "nav-link w-full justify-start gap-2 px-2 py-2 flex items-center text-sm",
                    isActive && "active"
                  )}>
                    <item.icon className="h-5 w-5" />
                    <span className="flex-1">{item.title}</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 collapsible-chevron" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-9 space-y-1">
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className={cn(
                          "nav-link flex items-center gap-2 px-2 py-2",
                          location.pathname === subItem.href && "active"
                        )}
                      >
                        <subItem.icon className="h-5 w-5" />
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              );
            }

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
