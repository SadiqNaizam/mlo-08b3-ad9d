import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import AppointmentsPage from "./pages/AppointmentsPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import MedicalRecordsPage from "./pages/MedicalRecordsPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();


const App = () => (
<QueryClientProvider client={queryClient}>
    <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
        <Routes>


          <Route path="/" element={<LoginPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/medical-records" element={<MedicalRecordsPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          {/* catch-all */}
          <Route path="*" element={<NotFound />} />


        </Routes>
    </BrowserRouter>
    </TooltipProvider>
</QueryClientProvider>
);

export default App;
