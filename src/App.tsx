import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import Index from "./pages/Index";
import About from "./pages/About";
import Community from "./pages/Community";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import Report from "./pages/Report";
import { useEffect } from "react";

const queryClient = new QueryClient();

// Component to handle password reset navigation (via Supabase magic link)
function PasswordResetHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase recovery can come as #access_token&...&type=recovery or we set a flag on event
    const hash = window.location.hash || '';
    const search = window.location.search || '';
    const hasRecoveryInHash = /type=recovery/.test(hash) || /type=recovery/.test(search);
    const isPasswordRecovery = sessionStorage.getItem('isPasswordRecovery') === 'true';

    if (hasRecoveryInHash || isPasswordRecovery) {
      // Clean flag to avoid loops
      sessionStorage.removeItem('isPasswordRecovery');
      navigate('/auth/reset-password');
    }
  }, [navigate]);

  return null;
}

// Component to handle fresh sign-in navigation
function SignInHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const shouldNavigateToReport = sessionStorage.getItem('navigateToReport');
    if (shouldNavigateToReport) {
      sessionStorage.removeItem('navigateToReport');
      navigate('/report');
    }
  }, [navigate]);

  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <PasswordResetHandler />
          <SignInHandler />
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/community" element={<Community />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/report" element={<Report />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
