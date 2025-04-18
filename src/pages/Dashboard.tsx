
import StatCard from "@/components/dashboard/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardStats, mockOrders, formatCurrency } from "@/data/mockData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import RecentOrdersTable from "@/components/dashboard/RecentOrdersTable";
import { Briefcase, ClipboardList, Package, TrendingUp, Loader, AlertTriangle } from "lucide-react";
import StockAlertCard from "@/components/dashboard/StockAlertCard";

const Dashboard = () => {
  const stats = getDashboardStats();
  const recentOrders = mockOrders.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tableau de bord</h2>
        <div className="flex items-center bg-muted p-1 px-2 rounded-md">
          <Loader className="h-4 w-4 mr-2 animate-spin" />
          <span className="text-sm">Mise à jour en temps réel</span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<ClipboardList className="h-4 w-4" />}
          title="Commandes du jour"
          value={stats.ordersToday}
          description="Nouvelles commandes enregistrées"
        />
        <StatCard
          icon={<Package className="h-4 w-4" />}
          title="En production"
          value={stats.ordersInProduction}
          description="Commandes en cours de fabrication"
          className="bg-orange-50 dark:bg-transparent"
        />
        <StatCard
          icon={<Briefcase className="h-4 w-4" />}
          title="Revenu du jour"
          value={`${formatCurrency(stats.revenueToday)} FCFA`}
          description="Total des encaissements"
        />
        <StatCard
          icon={<TrendingUp className="h-4 w-4" />}
          title="Chiffre mensuel"
          value={`${formatCurrency(stats.revenueThisMonth)} FCFA`}
          description="Total du mois en cours"
          trend={{ value: 12.5, isPositive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-5">
          <CardHeader>
            <CardTitle>Commandes récentes</CardTitle>
            <CardDescription>
              Les 5 dernières commandes enregistrées dans le système
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentOrdersTable orders={recentOrders} />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Alertes</CardTitle>
            <CardDescription>
              Notifications et alertes système
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {stats.stockAlerts.length > 0 ? (
              stats.stockAlerts.map((alert) => (
                <StockAlertCard
                  key={alert.productId}
                  productName={alert.productName}
                  currentStock={alert.currentStock}
                  minStock={alert.minStockAlert}
                />
              ))
            ) : (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="ml-2">Aucune alerte stock</AlertTitle>
                <AlertDescription className="ml-6">
                  Tous les niveaux de stock sont normaux
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
