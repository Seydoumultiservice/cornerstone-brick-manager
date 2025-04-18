
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Package } from "lucide-react";

interface StockAlertProps {
  productName: string;
  currentStock: number;
  minStock: number;
}

const StockAlertCard = ({ productName, currentStock, minStock }: StockAlertProps) => {
  const stockDifference = currentStock - minStock;
  const severity = stockDifference < 0 ? "critical" : "warning";

  return (
    <Alert variant={severity === "critical" ? "destructive" : "default"} className="mb-2">
      <Package className="h-4 w-4" />
      <AlertTitle className="ml-2">Alerte stock: {productName}</AlertTitle>
      <AlertDescription className="ml-6">
        {severity === "critical" 
          ? `Stock critique ! Seulement ${currentStock} unités disponibles (minimum requis: ${minStock}).`
          : `Stock bas: ${currentStock} unités (seuil d'alerte: ${minStock}).`
        }
      </AlertDescription>
    </Alert>
  );
};

export default StockAlertCard;
