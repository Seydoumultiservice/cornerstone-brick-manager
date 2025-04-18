
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, getStatusText, mockOrders } from "@/data/mockData";
import { ArrowRight, CheckCircle, Loader2, Package } from "lucide-react";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Production = () => {
  const { toast } = useToast();
  
  const waitingOrders = mockOrders.filter((order) => order.status === 'VALIDEE');
  const inProductionOrders = mockOrders.filter((order) => order.status === 'EN_PRODUCTION');
  const completedOrders = mockOrders.filter((order) => order.status === 'LIVREE').slice(0, 5);

  const handleStartProduction = (orderId: string) => {
    toast({
      title: "Production démarrée",
      description: "La commande a été mise en production avec succès.",
      duration: 3000,
    });
  };

  const handleUpdateProgress = (orderId: string, newProgress: number) => {
    toast({
      title: "Progression mise à jour",
      description: `La progression a été mise à jour à ${newProgress}%.`,
      duration: 3000,
    });
  };

  const handleCompleteProduction = (orderId: string) => {
    toast({
      title: "Production terminée",
      description: "La commande est prête pour livraison.",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Suivi de Production</h2>
      </div>

      <Tabs defaultValue="in-progress" className="space-y-6">
        <TabsList>
          <TabsTrigger value="waiting" className="relative">
            En attente
            {waitingOrders.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {waitingOrders.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="in-progress">En production</TabsTrigger>
          <TabsTrigger value="completed">Terminées</TabsTrigger>
        </TabsList>

        <TabsContent value="waiting" className="space-y-4">
          {waitingOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Aucune commande en attente</p>
                <p className="text-muted-foreground">
                  Toutes les commandes validées ont été mises en production.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {waitingOrders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                      <OrderStatusBadge status={order.status} />
                    </div>
                    <CardDescription>
                      {order.customerName}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3 space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Produits</p>
                      <ul className="text-sm">
                        {order.items.map((item, index) => (
                          <li key={index} className="flex justify-between">
                            <span>Produit #{item.productId.split('-')[1]}</span>
                            <span>{item.quantity} unités</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <p className="text-sm font-medium">{formatCurrency(order.totalAmount)} FCFA</p>
                      <Button size="sm" onClick={() => handleStartProduction(order.id)}>
                        Lancer la production
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="in-progress" className="space-y-4">
          {inProductionOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Aucune commande en production</p>
                <p className="text-muted-foreground">
                  Il n'y a pas de commandes en cours de fabrication pour le moment.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {inProductionOrders.map((order) => (
                <Card key={order.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                        <CardDescription>{order.customerName}</CardDescription>
                      </div>
                      <OrderStatusBadge status={order.status} />
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3 space-y-4">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Progression</span>
                          <span>{order.progressPercentage}%</span>
                        </div>
                        <Progress value={order.progressPercentage} />
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleUpdateProgress(order.id, Math.min(100, (order.progressPercentage || 0) + 10))}
                        >
                          <Loader2 className="h-4 w-4 mr-1" />
                          Mise à jour
                        </Button>
                        
                        {(order.progressPercentage || 0) >= 100 && (
                          <Button 
                            size="sm"
                            onClick={() => handleCompleteProduction(order.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Terminer
                          </Button>
                        )}
                        
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/commandes/${order.id}`}>
                            <ArrowRight className="h-4 w-4 ml-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Type de produits</p>
                        <p>{order.items.length} type(s)</p>
                      </div>
                      <div>
                        <p className="font-medium">Quantité totale</p>
                        <p>{order.items.reduce((sum, item) => sum + item.quantity, 0)} unités</p>
                      </div>
                      <div>
                        <p className="font-medium">Date de création</p>
                        <p>{order.createdAt.toLocaleDateString("fr-FR")}</p>
                      </div>
                      <div>
                        <p className="font-medium">Montant</p>
                        <p>{formatCurrency(order.totalAmount)} FCFA</p>
                      </div>
                    </div>
                    
                    {order.notes && (
                      <div className="bg-muted p-2 rounded text-sm">
                        <p className="font-medium">Notes:</p>
                        <p className="text-muted-foreground">{order.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-lg font-medium">Aucune commande terminée</p>
                <p className="text-muted-foreground">
                  Les commandes terminées apparaîtront ici.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Commandes récemment livrées</CardTitle>
                <CardDescription>
                  Les dernières commandes terminées et livrées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="min-w-full divide-y divide-border">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-sm font-medium">N° Commande</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Client</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Statut</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Date de livraison</th>
                        <th className="px-4 py-3 text-right text-sm font-medium">Montant</th>
                        <th className="px-4 py-3 text-right text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {completedOrders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-4 py-3 text-sm font-medium">{order.orderNumber}</td>
                          <td className="px-4 py-3 text-sm">{order.customerName}</td>
                          <td className="px-4 py-3 text-sm">
                            <OrderStatusBadge status={order.status} />
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {order.deliveryDate?.toLocaleDateString("fr-FR")}
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            {formatCurrency(order.totalAmount)} FCFA
                          </td>
                          <td className="px-4 py-3 text-sm text-right">
                            <Button variant="ghost" size="sm" asChild>
                              <Link to={`/commandes/${order.id}`}>
                                Détails
                              </Link>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Production;
