
import { Badge } from "@/components/ui/badge";
import { getStatusColor, getStatusText } from "@/data/mockData";
import { OrderStatus } from "@/types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
  showProgress?: boolean;
  progressPercentage?: number;
}

const OrderStatusBadge = ({ 
  status, 
  showProgress = false, 
  progressPercentage = 0 
}: OrderStatusBadgeProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Badge 
        variant="outline" 
        className={`${getStatusColor(status)} font-medium ${status === 'EN_PRODUCTION' ? 'status-pulse' : ''}`}
      >
        {getStatusText(status)}
      </Badge>
      
      {showProgress && status === 'EN_PRODUCTION' && (
        <div className="flex items-center space-x-2">
          <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <span className="text-xs text-muted-foreground">{progressPercentage}%</span>
        </div>
      )}
    </div>
  );
};

export default OrderStatusBadge;
