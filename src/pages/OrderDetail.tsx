
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, mockCustomers, mockOrders, mockProducts } from "@/data/mockData";
import OrderProgressCard from "@/components/orders/OrderProgressCard";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import { ArrowLeft, Printer, CheckCircle, Calendar, FileText, XCircle } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const OrderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
  // Trouver la commande selon l'ID
  const order = mockOrders.find((o) => o.id === id);
  
  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="text-center">
          <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Commande introuvable</h2>
          <p className="text-muted-foreground mb-4">
            Nous n'avons pas trouvé de commande avec l'identifiant "{id}".
          </p>
          <Button asChild>
            <Link to="/commandes">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la liste des commandes
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Trouver le client correspondant
  const customer = mockCustomers.find((c) => c.id === order.customerId);
  
  // Générer les informations sur les produits
  const orderItems = order.items.map((item) => {
    const product = mockProducts.find((p) => p.id === item.productId);
    return {
      ...item,
      productName: product?.name || "Produit inconnu",
      totalPrice: item.quantity * item.unitPrice,
    };
  });

  const handleValidateOrder = () => {
    toast({
      title: "Commande validée",
      description: `La commande ${order.orderNumber} a été validée pour production.`,
      duration: 3000,
    });
  };

  const handleUpdateProgress = () => {
    toast({
      title: "Progression mise à jour",
      description: "La progression de production a été mise à jour.",
      duration: 3000,
    });
  };

  const handleMarkDelivered = () => {
    toast({
      title: "Commande marquée comme livrée",
      description: `La commande ${order.orderNumber} a été marquée comme livrée.`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/commandes">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Retour
              </Button>
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">
              Commande {order.orderNumber}
            </h2>
          </div>
          <p className="text-muted-foreground mt-1">
            Créée le{" "}
            {order.createdAt.toLocaleDateString("fr-FR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="gap-1">
            <Printer className="h-4 w-4 mr-1" />
            Imprimer
          </Button>
          {order.status === "EN_ATTENTE" && (
            <Button className="gap-1" onClick={handleValidateOrder}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Valider pour production
            </Button>
          )}
          {order.status === "EN_PRODUCTION" && (
            <Button className="gap-1" onClick={handleUpdateProgress}>
              <Calendar className="h-4 w-4 mr-1" />
              Mise à jour progression
            </Button>
          )}
          {order.status === "EN_PRODUCTION" && order.progressPercentage === 100 && (
            <Button className="gap-1" onClick={handleMarkDelivered}>
              <FileText className="h-4 w-4 mr-1" />
              Marquer comme livrée
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Détails de la commande</CardTitle>
                <OrderStatusBadge 
                  status={order.status} 
                  showProgress={order.status === 'EN_PRODUCTION'} 
                  progressPercentage={order.progressPercentage}
                />
              </div>
              <CardDescription>
                Informations sur les produits commandés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="px-4 py-3 text-left text-sm font-medium">Produit</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Quantité</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Prix unitaire</th>
                      <th className="px-4 py-3 text-right text-sm font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {orderItems.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 text-sm">{item.productName}</td>
                        <td className="px-4 py-3 text-sm text-right">{item.quantity}</td>
                        <td className="px-4 py-3 text-sm text-right">
                          {formatCurrency(item.unitPrice)} FCFA
                        </td>
                        <td className="px-4 py-3 text-sm font-medium text-right">
                          {formatCurrency(item.totalPrice)} FCFA
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-muted/50">
                      <th colSpan={3} className="px-4 py-3 text-right text-sm font-medium">
                        Total commande
                      </th>
                      <th className="px-4 py-3 text-right text-sm font-bold">
                        {formatCurrency(order.totalAmount)} FCFA
                      </th>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              {order.notes && (
                <div className="mt-4">
                  <p className="text-sm font-medium">Notes:</p>
                  <p className="text-sm text-muted-foreground mt-1">{order.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Informations client</CardTitle>
              <CardDescription>
                Détails du client qui a passé cette commande
              </CardDescription>
            </CardHeader>
            <CardContent>
              {customer ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Nom du client</p>
                    <p className="text-lg">{customer.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Téléphone</p>
                    <p className="text-lg">{customer.phone}</p>
                  </div>
                  {customer.email && (
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-lg">{customer.email}</p>
                    </div>
                  )}
                  {customer.address && (
                    <div>
                      <p className="text-sm font-medium">Adresse</p>
                      <p className="text-lg">{customer.address}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-muted-foreground">Informations client indisponibles</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <OrderProgressCard order={order} />
          
          <Card>
            <CardHeader>
              <CardTitle>Historique de la commande</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="min-w-5 mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Commande créée</p>
                    <p className="text-xs text-muted-foreground">
                      {order.createdAt.toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Par: Commercial
                    </p>
                  </div>
                </div>
                
                <Separator />
                
                {order.status !== 'EN_ATTENTE' && (
                  <div className="flex items-start">
                    <div className="min-w-5 mt-1">
                      <div className="h-2 w-2 rounded-full bg-primary"></div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">Commande validée</p>
                      <p className="text-xs text-muted-foreground">
                        {order.updatedAt.toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Par: Responsable production
                      </p>
                    </div>
                  </div>
                )}
                
                {(order.status === 'EN_PRODUCTION' || order.status === 'LIVREE') && (
                  <>
                    <Separator />
                    <div className="flex items-start">
                      <div className="min-w-5 mt-1">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Production démarrée</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.updatedAt.getTime() + 3600000).toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Responsable: {order.assignedTo}
                        </p>
                      </div>
                    </div>
                  </>
                )}
                
                {order.status === 'LIVREE' && (
                  <>
                    <Separator />
                    <div className="flex items-start">
                      <div className="min-w-5 mt-1">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">Commande livrée</p>
                        <p className="text-xs text-muted-foreground">
                          {order.deliveryDate?.toLocaleDateString("fr-FR", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
