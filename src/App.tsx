import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index.tsx";
import StateCommandCenter from "./pages/StateCommandCenter.tsx";
import NNICalculator from "./pages/NNICalculator.tsx";
import VoterRegistration from "./pages/VoterRegistration.tsx";
import VoterCRM from "./pages/VoterCRM.tsx";
import JanConnectTickets from "./pages/JanConnectTickets.tsx";
import CitizenJourney from "./pages/CitizenJourney.tsx";
import SchemeCatalogue from "./pages/SchemeCatalogue.tsx";
import AlertCommandCenter from "./pages/AlertCommandCenter.tsx";
import MLABriefing from "./pages/MLABriefing.tsx";
import WardPerformance from "./pages/WardPerformance.tsx";
import DataFlowVisualizer from "./pages/DataFlowVisualizer.tsx";
import SwingVoterRadar from "./pages/SwingVoterRadar.tsx";
import PagePramukh from "./pages/PagePramukh.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Index /></AppLayout>} />
          <Route path="/state" element={<AppLayout><StateCommandCenter /></AppLayout>} />
          <Route path="/nni" element={<AppLayout><NNICalculator /></AppLayout>} />
          <Route path="/register" element={<AppLayout><VoterRegistration /></AppLayout>} />
          <Route path="/crm" element={<AppLayout><VoterCRM /></AppLayout>} />
          <Route path="/tickets" element={<AppLayout><JanConnectTickets /></AppLayout>} />
          <Route path="/funnel" element={<AppLayout><CitizenJourney /></AppLayout>} />
          <Route path="/schemes" element={<AppLayout><SchemeCatalogue /></AppLayout>} />
          <Route path="/alerts" element={<AppLayout><AlertCommandCenter /></AppLayout>} />
          <Route path="/briefing" element={<AppLayout><MLABriefing /></AppLayout>} />
          <Route path="/wards" element={<AppLayout><WardPerformance /></AppLayout>} />
          <Route path="/dataflow" element={<AppLayout><DataFlowVisualizer /></AppLayout>} />
          <Route path="/swing" element={<AppLayout><SwingVoterRadar /></AppLayout>} />
          <Route path="/page-pramukh" element={<AppLayout><PagePramukh /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
