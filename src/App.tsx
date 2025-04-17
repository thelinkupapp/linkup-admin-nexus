import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Users from "./pages/Users";
import UserProfile from "./pages/UserProfile";
import Linkups from "./pages/Linkups";
import LinkupDetails from "./pages/LinkupDetails";
import NotFound from "./pages/NotFound";
import UserReports from "./pages/reports/UserReports";
import LinkupReports from "./pages/reports/LinkupReports";
import EmailCRM from "./pages/crm/EmailCRM";
import PushNotificationCRM from "./pages/crm/PushNotificationCRM";
import LinkupPlus from "./pages/LinkupPlus";
import UserVerifications from "./pages/UserVerifications";
import UserFeedback from "./pages/feedback/UserFeedback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<UserProfile />} />
          <Route path="/linkups" element={<Linkups />} />
          <Route path="/linkups/:linkupId" element={<LinkupDetails />} />
          <Route path="/reports/users" element={<UserReports />} />
          <Route path="/reports/linkups" element={<LinkupReports />} />
          <Route path="/crm/email" element={<EmailCRM />} />
          <Route path="/crm/push" element={<PushNotificationCRM />} />
          <Route path="/linkup-plus" element={<LinkupPlus />} />
          <Route path="/verifications" element={<UserVerifications />} />
          <Route path="/feedback" element={<UserFeedback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
