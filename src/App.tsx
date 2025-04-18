import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

// User routes
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";
import UserManagement from "./pages/users/Management";
import UserStatistics from "./pages/users/Statistics";
import UserReports from "./pages/users/Reports";
import UserSuspended from "./pages/users/Suspended";

// Linkup routes
import Linkups from "./pages/Linkups";
import LinkupDetails from "./pages/LinkupDetails";
import LinkupManagement from "./pages/linkups/Management";
import LinkupStats from "./pages/linkups/Stats";
import LinkupReports from "./pages/reports/LinkupReports";
import LinkupRemoved from "./pages/linkups/Removed";

// Other routes
import NotFound from "./pages/NotFound";
import LinkupStaff from "./pages/LinkupStaff";
import UserVerifications from "./pages/UserVerifications";
import UserFeedback from "./pages/feedback/UserFeedback";
import AdminManagement from "./pages/settings/AdminManagement";
import Settings from "./pages/Settings";
import EmailCRM from "./pages/crm/EmailCRM";
import PushNotificationCRM from "./pages/crm/PushNotificationCRM";

const queryClient = new QueryClient();

const App = () => {
  console.log("App rendering");
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* User routes */}
            <Route path="/users" element={<Users />} />
            <Route path="/users/:userId" element={<UserProfile />} />
            <Route path="/users/management" element={<UserManagement />} />
            <Route path="/users/statistics" element={<UserStatistics />} />
            <Route path="/users/reports" element={<UserReports />} />
            <Route path="/users/suspended" element={<UserSuspended />} />
            <Route path="/verifications" element={<UserVerifications />} />
            
            {/* Linkup routes */}
            <Route path="/linkups" element={<Linkups />} />
            <Route path="/linkups/:linkupId" element={<LinkupDetails />} />
            <Route path="/linkups/management" element={<LinkupManagement />} />
            <Route path="/linkups/statistics" element={<LinkupStats />} />
            <Route path="/linkups/reports" element={<LinkupReports />} />
            <Route path="/linkups/removed" element={<LinkupRemoved />} />
            <Route path="/linkups/music-festival" element={<LinkupDetails />} />
            <Route path="/linkups/tech-meetup-2024" element={<LinkupDetails />} />
            
            {/* Other routes */}
            <Route path="/reports/users" element={<UserReports />} />
            <Route path="/reports/linkups" element={<LinkupReports />} />
            <Route path="/crm/email" element={<EmailCRM />} />
            <Route path="/crm/push" element={<PushNotificationCRM />} />
            <Route path="/verifications" element={<UserVerifications />} />
            <Route path="/feedback" element={<UserFeedback />} />
            <Route path="/settings/admin" element={<AdminManagement />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/staff" element={<LinkupStaff />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
