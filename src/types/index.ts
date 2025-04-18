
// Types de produits disponibles
export type ProductType = 'BRIQUE_CREUSE' | 'BRIQUE_PLEINE' | 'HEURELS';

// Tailles standard des briques
export type BrickSize = '15' | '20' | '25' | '30';

// Statuts possibles pour une commande
export type OrderStatus = 'EN_ATTENTE' | 'VALIDEE' | 'EN_PRODUCTION' | 'LIVREE' | 'ANNULEE';

// Rôles utilisateurs dans l'application
export type UserRole = 'ADMIN' | 'COMMERCIAL' | 'RESPONSABLE_PROD' | 'COMPTABLE' | 'OUVRIER';

// Interface pour un produit
export interface Product {
  id: string;
  type: ProductType;
  size?: BrickSize;
  name: string;
  unitPrice: number;
  stockQuantity: number;
  minStockAlert: number;
}

// Interface pour un élément de commande
export interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

// Interface pour un client
export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

// Interface pour un utilisateur du système
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
}

// Interface pour une commande
export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string; // Pour faciliter l'affichage
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // ID de l'utilisateur
  assignedTo?: string; // ID de l'utilisateur responsable production
  totalAmount: number;
  progressPercentage?: number; // Pourcentage de progression (0-100)
  deliveryDate?: Date;
  notes?: string;
}

// Interface pour une transaction financière
export interface Transaction {
  id: string;
  orderId?: string;
  type: 'RECETTE' | 'DEPENSE';
  category: string;
  amount: number;
  paymentMethod: 'ESPECES' | 'MOBILE_MONEY' | 'CHEQUE' | 'VIREMENT';
  date: Date;
  description: string;
  createdBy: string; // ID de l'utilisateur
}

// Interface pour les statistiques du tableau de bord
export interface DashboardStats {
  ordersToday: number;
  ordersInProduction: number;
  ordersWaiting: number;
  ordersDelivered: number;
  revenueToday: number;
  revenueThisMonth: number;
  stockAlerts: {
    productId: string;
    productName: string;
    currentStock: number;
    minStockAlert: number;
  }[];
}
