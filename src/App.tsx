import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import OrdersList from "./pages/OrdersList";
import OrderDetail from "./pages/OrderDetail";
import NewOrder from "./pages/NewOrder";
import Production from "./pages/Production";
import Accounting from "./pages/Accounting";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Quotes from "./pages/Quotes";
import Stock from "./pages/Stock";
import { useState } from "react";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/commandes" element={
              <Layout>
                <OrdersList />
              </Layout>
            } />
            <Route path="/commandes/nouvelle" element={
              <Layout>
                <NewOrder />
              </Layout>
            } />
            <Route path="/commandes/:id" element={
              <Layout>
                <OrderDetail />
              </Layout>
            } />
            <Route path="/stock" element={
              <Layout>
                <Stock />
              </Layout>
            } />
            <Route path="/production" element={
              <Layout>
                <Production />
              </Layout>
            } />
            <Route path="/comptabilite" element={
              <Layout>
                <Accounting />
              </Layout>
            } />
            <Route path="/utilisateurs" element={
              <Layout>
                <Users />
              </Layout>
            } />
            <Route path="/parametres" element={
              <Layout>
                <Settings />
              </Layout>
            } />
            <Route path="/devis-factures" element={
              <Layout>
                <Quotes />
              </Layout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
