import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Users,
  Map,
  Bell,
  ShieldCheck,
  MessageSquare,
  ChevronDown,
  Shield,
  FileText,
  AlertTriangle,
  Trash2,
  LayoutDashboard,
  LogOut,
  User,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

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
        title: "Verifications",
        href: "/verifications",
        icon: ShieldCheck
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
        title: "Reports",
        href: "/linkups/reports",
        icon: FileText
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
];

export function Sidebar() {
  const location = useLocation();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 fixed left-0 top-0 bg-background border-r z-50">
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="p-3 rounded-lg bg-secondary cursor-pointer hover:bg-secondary/80 transition-colors group">
              <p className="text-xs text-muted-foreground mb-2">Logged in as</p>
              <div className="flex items-center gap-3">
                <img 
                  src="/lovable-uploads/2025b415-79e2-4d69-8a16-54c1f4fffc9e.png" 
                  alt="Jack Peagam" 
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">Jack Peagam</p>
                  <p className="text-xs text-muted-foreground">jack@linkupapp.io</p>
                </div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem asChild>
              <Link 
                to="/account" 
                className="cursor-pointer hover:bg-secondary/50 transition-colors flex items-center"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Account</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => setShowLogoutDialog(true)}
              className="text-destructive focus:text-destructive cursor-pointer hover:bg-destructive/10 transition-colors"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
              <AlertDialogDescription>
                This will end your current session.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleLogout}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Log out
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
