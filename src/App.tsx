import { Toaster as Sonner } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/public/Index";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "@radix-ui/react-tooltip";

import Services from "./pages/public/Services";
import Therapists from "./pages/public/Therapist";
import Booking from "./pages/public/Booking";
import NotFound from "./pages/public/NotFound";

import Dashboard from "./pages/private/Dashboard";
import DashBooking from "./pages/private/Booking";
import DashClients from './pages/private/Clients';
import DashTherapist from './pages/private/Therapist';
import DashServices from './pages/private/Services';
import DashSlots from './pages/private/Slots';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/servicos" element={<Services />} />
          <Route path="/terapeutas" element={<Therapists />} />
          <Route path="/agendar" element={<Booking />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/bookings" element={<DashBooking />} />
          <Route path="/dashboard/bookings" element={<DashBooking />} />
          <Route path="/dashboard/clients" element={<DashClients />} />
          <Route path="/dashboard/therapists" element={<DashTherapist />} />
          <Route path="/dashboard/services" element={<DashServices />} />
          <Route path="/dashboard/slots" element={<DashSlots />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
