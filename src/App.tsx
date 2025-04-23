import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";

// User routes
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";
import UserManagement from "./pages/users/Management";
// Removed UserStatistics import
import UserReports from "./pages/users/Reports";
import UserSuspended from "./pages/users/Suspended";
import UserDeleted from "./pages/users/Deleted";

// Linkup routes
import Linkups from "./pages/Linkups";
import LinkupDetails from "./pages/LinkupDetails";
import LinkupManagement from "./pages/linkups/Management";
import LinkupStats from "./pages/linkups/Stats";
import LinkupReports from "./pages/reports/LinkupReports";
// Removed LinkupRemoved import

// Other routes
import NotFound from "./pages/NotFound";
import LinkupStaff from "./pages/LinkupStaff";
import UserVerifications from "./pages/UserVerifications";
import UserFeedback from "./pages/feedback/UserFeedback";
import AdminManagement from "./pages/settings/AdminManagement";
import Settings from "./pages/Settings";
import EmailCRM from "./pages/crm/EmailCRM";
import PushNotificationCRM from "./pages/crm/PushNotificationCRM";
import Account from "./pages/Account";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  
  console.log("ProtectedRoute check:", { user, path: location.pathname });
  
  if (!user) {
    console.log("No user found, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  console.log("User authenticated, rendering protected content");
  return children;
}

const App = () => {
  console.log("App rendering");
  
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              
              {/* User routes */}
              <Route path="/users/*" element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/" element={<Users />} />
                    <Route path=":userId" element={<UserProfile />} />
                    <Route path="management" element={<UserManagement />} />
                    {/* Removed statistics route */}
                    <Route path="reports" element={<UserReports />} />
                    <Route path="suspended" element={<UserSuspended />} />
                    <Route path="deleted" element={<UserDeleted />} />
                  </Routes>
                </ProtectedRoute>
              } />
              
              {/* Linkup routes */}
              <Route path="/linkups/*" element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="/" element={<Linkups />} />
                    <Route path=":linkupId" element={<LinkupDetails />} />
                    <Route path="management" element={<LinkupManagement />} />
                    <Route path="statistics" element={<LinkupStats />} />
                    <Route path="reports" element={<LinkupReports />} />
                    {/* Removed the "removed" route */}
                  </Routes>
                </ProtectedRoute>
              } />
              
              {/* Other protected routes */}
              <Route path="/reports/*" element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="users" element={<UserReports />} />
                    <Route path="linkups" element={<LinkupReports />} />
                  </Routes>
                </ProtectedRoute>
              } />
              
              
              
              <Route path="/verifications" element={
                <ProtectedRoute>
                  <UserVerifications />
                </ProtectedRoute>
              } />
              <Route path="/feedback" element={
                <ProtectedRoute>
                  <UserFeedback />
                </ProtectedRoute>
              } />
              <Route path="/settings/*" element={
                <ProtectedRoute>
                  <Routes>
                    <Route path="admin" element={<AdminManagement />} />
                    <Route path="/" element={<Settings />} />
                  </Routes>
                </ProtectedRoute>
              } />
              <Route path="/staff" element={
                <ProtectedRoute>
                  <LinkupStaff />
                </ProtectedRoute>
              } />
              <Route path="/account" element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
