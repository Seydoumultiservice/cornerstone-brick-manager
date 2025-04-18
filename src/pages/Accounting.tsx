
import { useState } from "react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CustomInput } from "@/components/ui/custom-input";
import { Textarea } from "@/components/ui/textarea";
import { Transaction } from "@/types";
import { 
  CalendarIcon, 
  FilePlus, 
  FileText, 
  Inbox, 
  PackageSearch, 
  PieChart, 
  Receipt, 
  Search, 
  User
} from "lucide-react";
import { AccountingReports } from "@/components/accounting/AccountingReports";
import { TransactionsList } from "@/components/accounting/TransactionsList";
import { ExpenseForm } from "@/components/accounting/ExpenseForm";
import { IncomeForm } from "@/components/accounting/IncomeForm";

const Accounting = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Comptabilité</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          <Button variant="outline" size="sm">
            <FilePlus className="mr-2 h-4 w-4" />
            Nouvel exercice
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full max-w-4xl">
          <TabsTrigger value="dashboard">
            <PieChart className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Tableau de bord</span>
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <Receipt className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Transactions</span>
          </TabsTrigger>
          <TabsTrigger value="income">
            <Inbox className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Recettes</span>
          </TabsTrigger>
          <TabsTrigger value="expenses">
            <PackageSearch className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Dépenses</span>
          </TabsTrigger>
          <TabsTrigger value="reports">
            <FileText className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Rapports</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Solde actuel</CardTitle>
                <CardDescription>Total de votre compte</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5,482,750 FCFA</div>
                <div className="text-xs text-muted-foreground">Mise à jour: aujourd'hui à 10:45</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Recettes (mois)</CardTitle>
                <CardDescription>Total des encaissements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">1,250,000 FCFA</div>
                <div className="text-xs text-green-600">+15% par rapport au mois dernier</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Dépenses (mois)</CardTitle>
                <CardDescription>Total des décaissements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">785,500 FCFA</div>
                <div className="text-xs text-red-600">-5% par rapport au mois dernier</div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Transactions récentes</CardTitle>
                <CardDescription>Les 5 dernières transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <TransactionsList limit={5} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Répartition des dépenses</CardTitle>
                <CardDescription>Par catégorie (mois en cours)</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  Graphique de répartition des dépenses
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Toutes les transactions</CardTitle>
                  <CardDescription>Historique de toutes les transactions</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher..."
                      className="pl-8 w-[200px]"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous types</SelectItem>
                      <SelectItem value="income">Recettes</SelectItem>
                      <SelectItem value="expense">Dépenses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <TransactionsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income">
          <Card>
            <CardHeader>
              <CardTitle>Enregistrer une recette</CardTitle>
              <CardDescription>
                Ajoutez une nouvelle entrée de trésorerie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <IncomeForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Enregistrer une dépense</CardTitle>
              <CardDescription>
                Ajoutez une nouvelle sortie de trésorerie
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ExpenseForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <AccountingReports />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Accounting;
