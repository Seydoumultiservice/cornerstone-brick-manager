
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

const queryClient = new QueryClient();

const App = () => (
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
          <Route path="/production" element={
            <Layout>
              <Production />
            </Layout>
          } />
          {/* Ces routes seront implémentées plus tard */}
          <Route path="/comptabilite" element={
            <Layout>
              <div className="flex items-center justify-center min-h-[70vh]">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Module Comptabilité</h2>
                  <p className="text-muted-foreground">
                    Cette fonctionnalité sera disponible dans la prochaine version.
                  </p>
                </div>
              </div>
            </Layout>
          } />
          <Route path="/utilisateurs" element={
            <Layout>
              <div className="flex items-center justify-center min-h-[70vh]">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Gestion des Utilisateurs</h2>
                  <p className="text-muted-foreground">
                    Cette fonctionnalité sera disponible dans la prochaine version.
                  </p>
                </div>
              </div>
            </Layout>
          } />
          <Route path="/parametres" element={
            <Layout>
              <div className="flex items-center justify-center min-h-[70vh]">
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">Paramètres du Système</h2>
                  <p className="text-muted-foreground">
                    Cette fonctionnalité sera disponible dans la prochaine version.
                  </p>
                </div>
              </div>
            </Layout>
          } />
          {/* Route "catch-all" pour 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
