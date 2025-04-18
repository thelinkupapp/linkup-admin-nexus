
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users,
  Map,
  Settings,
  BarChart3,
  Bell,
  ShieldCheck,
  MessageSquare,
  ChevronDown,
  Shield,
  Megaphone,
  FileText,
  AlertTriangle,
  Trash2,
  Mail,
  LayoutDashboard
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
    icon: LayoutDashboard
  },
  {
    title: "Users",
    type: "dropdown",
    icon: Users,
    items: [
      {
        title: "Management",
        href: "/users/management",
        icon: Users
      },
      {
        title: "Statistics",
        href: "/users/statistics",
        icon: BarChart3
      },
      {
        title: "Reports",
        href: "/users/reports",
        icon: FileText
      },
      {
        title: "Suspended",
        href: "/users/suspended",
        icon: AlertTriangle
      },
      {
        title: "Deleted",
        href: "/users/deleted",
        icon: Trash2
      },
      {
        title: "Verifications",
        href: "/verifications",
        icon: ShieldCheck
      }
    ]
  },
  {
    title: "Linkups",
    type: "dropdown",
    icon: Map,
    items: [
      {
        title: "Management",
        href: "/linkups/management",
        icon: Map
      },
      {
        title: "Statistics",
        href: "/linkups/statistics",
        icon: BarChart3
      },
      {
        title: "Reports",
        href: "/linkups/reports",
        icon: FileText
      },
      {
        title: "Removed",
        href: "/linkups/removed",
        icon: Trash2
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
    title: "Linkup Staff",
    href: "/staff",
    icon: Shield
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
    <div className="h-screen w-64 fixed left-0 top-0 bg-background border-r">
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <img 
            src="/lovable-uploads/8be47164-879f-4e71-9457-a380cd0fbf40.png"
            alt="Linkup Logo"
            className="h-12 w-12 rounded-xl"
          />
          <span className="text-xl font-semibold">Linkup Admin</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            if (item.type === "dropdown") {
              const isActive = item.items?.some(subItem => location.pathname === subItem.href);
              
              return (
                <Collapsible key={item.title}>
                  <CollapsibleTrigger className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-base transition-colors hover:bg-secondary",
                    isActive && "bg-secondary"
                  )}>
                    <item.icon className="h-5 w-5" />
                    <span className="flex-1">{item.title}</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 collapsible-chevron" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="pl-3 mt-1 space-y-1">
                    {item.items?.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={subItem.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-base transition-colors hover:bg-secondary",
                          location.pathname === subItem.href && "bg-secondary"
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

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-base transition-colors hover:bg-secondary",
                  location.pathname === item.href && "bg-secondary"
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
        <div className="p-3 rounded-lg bg-secondary">
          <p className="text-xs text-muted-foreground mb-2">Logged in as</p>
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/2025b415-79e2-4d69-8a16-54c1f4fffc9e.png" 
              alt="Jack Peagam" 
              className="h-9 w-9 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium">Jack Peagam</p>
              <p className="text-xs text-muted-foreground">jack@linkupapp.io</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
