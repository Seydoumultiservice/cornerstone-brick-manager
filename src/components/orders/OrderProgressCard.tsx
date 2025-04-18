
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Order } from "@/types";
import OrderStatusBadge from "./OrderStatusBadge";
import { CalendarClock, CheckCircle, Clock, Loader2, User } from "lucide-react";

interface OrderProgressCardProps {
  order: Order;
}

const OrderProgressCard = ({ order }: OrderProgressCardProps) => {
  const getStepStatus = (stepStatus: string) => {
    if (
      (stepStatus === 'EN_ATTENTE' && order.status === 'EN_ATTENTE') ||
      (stepStatus === 'VALIDEE' && ['VALIDEE', 'EN_PRODUCTION', 'LIVREE'].includes(order.status)) ||
      (stepStatus === 'EN_PRODUCTION' && ['EN_PRODUCTION', 'LIVREE'].includes(order.status)) ||
      (stepStatus === 'LIVREE' && order.status === 'LIVREE')
    ) {
      return true;
    }
    return false;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Progression de la commande</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div className="flex items-start">
            <div className={`rounded-full p-2 ${getStepStatus('EN_ATTENTE') ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              <Clock className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="font-medium">En attente</p>
              <p className="text-sm text-muted-foreground">
                Commande créée le {order.createdAt.toLocaleDateString('fr-FR')}
              </p>
            </div>
          </div>
          
          <div className="w-0.5 h-6 bg-muted mx-auto"></div>
          
          <div className="flex items-start">
            <div className={`rounded-full p-2 ${getStepStatus('VALIDEE') ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="font-medium">Validée</p>
              <p className="text-sm text-muted-foreground">
                {getStepStatus('VALIDEE') 
                  ? `Validée le ${order.updatedAt.toLocaleDateString('fr-FR')}` 
                  : 'En attente de validation'}
              </p>
            </div>
          </div>
          
          <div className="w-0.5 h-6 bg-muted mx-auto"></div>
          
          <div className="flex items-start">
            <div className={`rounded-full p-2 ${getStepStatus('EN_PRODUCTION') ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              <Loader2 className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="font-medium">En production</p>
              <p className="text-sm text-muted-foreground">
                {getStepStatus('EN_PRODUCTION') 
                  ? `Production en cours - ${order.progressPercentage}% terminée` 
                  : 'Production non démarrée'}
              </p>
              {order.assignedTo && getStepStatus('EN_PRODUCTION') && (
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <User className="h-3 w-3 mr-1" />
                  <span>Responsable: {order.assignedTo}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="w-0.5 h-6 bg-muted mx-auto"></div>
          
          <div className="flex items-start">
            <div className={`rounded-full p-2 ${getStepStatus('LIVREE') ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
              <CalendarClock className="h-5 w-5" />
            </div>
            <div className="ml-4">
              <p className="font-medium">Livrée</p>
              <p className="text-sm text-muted-foreground">
                {getStepStatus('LIVREE') 
                  ? `Livrée le ${order.deliveryDate?.toLocaleDateString('fr-FR')}` 
                  : 'Livraison à planifier'}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderProgressCard;
