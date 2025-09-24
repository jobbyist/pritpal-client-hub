import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases";
import Messages from "./pages/Messages";
import Setup from "./pages/Setup";
import NotFound from "./pages/NotFound";
import AppSidebar from "./components/Layout/Sidebar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isLoginPage = location.pathname === "/" || location.pathname === "/login";

  if (isLoginPage || location.pathname === "/setup") {
    return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  return (
    <ProtectedRoute>
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-muted/20 to-accent/10">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <header className="h-14 border-b border-border/50 bg-card/30 backdrop-blur-sm flex items-center px-4">
              <SidebarTrigger className="mr-2" />
              <h2 className="font-semibold text-foreground">Client Portal</h2>
            </header>
            <main className="flex-1 p-6 overflow-auto">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cases" element={<Cases />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/documents" element={<div>Documents Page - Coming Soon</div>} />
                <Route path="/calendar" element={<div>Calendar Page - Coming Soon</div>} />
                <Route path="/billing" element={<div>Billing Page - Coming Soon</div>} />
                <Route path="/profile" element={<div>Profile Page - Coming Soon</div>} />
                <Route path="/settings" element={<div>Settings Page - Coming Soon</div>} />
                <Route path="/help" element={<div>Help Page - Coming Soon</div>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </ProtectedRoute>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
