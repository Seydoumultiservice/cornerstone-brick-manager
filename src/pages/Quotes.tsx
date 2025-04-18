
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ArrowRightLeft, 
  Calendar, 
  Download, 
  EyeIcon, 
  FileSpreadsheet, 
  Filter, 
  Pencil, 
  Plus, 
  Printer, 
  Search, 
  Send, 
  ShoppingCart 
} from "lucide-react";
import { QuotesTable } from "@/components/quotes/QuotesTable";
import { InvoicesTable } from "@/components/quotes/InvoicesTable";

const Quotes = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("quotes");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Devis et Factures</h1>
          <p className="text-muted-foreground">Gérez vos devis et factures clients</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtres
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {activeTab === "quotes" ? "Nouveau devis" : "Nouvelle facture"}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="quotes" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList className="mb-0">
            <TabsTrigger value="quotes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Devis
            </TabsTrigger>
            <TabsTrigger value="invoices" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Factures
            </TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="draft">Brouillons</SelectItem>
                <SelectItem value="sent">Envoyés</SelectItem>
                <SelectItem value="accepted">Acceptés</SelectItem>
                <SelectItem value="rejected">Refusés</SelectItem>
                <SelectItem value="expired">Expirés</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="recent">
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Récents</SelectItem>
                <SelectItem value="this-month">Ce mois</SelectItem>
                <SelectItem value="last-month">Mois dernier</SelectItem>
                <SelectItem value="this-quarter">Ce trimestre</SelectItem>
                <SelectItem value="this-year">Cette année</SelectItem>
                <SelectItem value="all-time">Tout</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="quotes" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Liste des devis</CardTitle>
                  <CardDescription>
                    15 devis au total, dont 3 en attente
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Période</span>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Exporter</span>
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowRightLeft className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Convertir en factures</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <QuotesTable />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Liste des factures</CardTitle>
                  <CardDescription>
                    22 factures au total, dont 5 impayées
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Période</span>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Exporter</span>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Send className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Envoyer rappels</span>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <InvoicesTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Quotes;
