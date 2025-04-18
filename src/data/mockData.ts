
import { Customer, Order, OrderStatus, Product, Transaction, User } from "@/types";

// Mock des produits
export const mockProducts: Product[] = [
  {
    id: "prod-001",
    type: "BRIQUE_CREUSE",
    size: "15",
    name: "Brique creuse 15",
    unitPrice: 950,
    stockQuantity: 2500,
    minStockAlert: 500
  },
  {
    id: "prod-002",
    type: "BRIQUE_CREUSE",
    size: "20",
    name: "Brique creuse 20",
    unitPrice: 1050,
    stockQuantity: 1800,
    minStockAlert: 400
  },
  {
    id: "prod-003",
    type: "BRIQUE_PLEINE",
    size: "15",
    name: "Brique pleine 15",
    unitPrice: 1100,
    stockQuantity: 3000,
    minStockAlert: 600
  },
  {
    id: "prod-004",
    type: "BRIQUE_PLEINE",
    size: "20",
    name: "Brique pleine 20",
    unitPrice: 1250,
    stockQuantity: 350,
    minStockAlert: 400
  },
  {
    id: "prod-005",
    type: "HEURELS",
    name: "Heurels standard",
    unitPrice: 1200,
    stockQuantity: 1200,
    minStockAlert: 300
  }
];

// Mock des clients
export const mockCustomers: Customer[] = [
  {
    id: "cust-001",
    name: "Entreprise Togo Construction",
    phone: "+228 90 12 34 56",
    email: "contact@togoconstruction.tg",
    address: "Lomé, Togo"
  },
  {
    id: "cust-002",
    name: "Bâtisseurs Réunis",
    phone: "+228 91 23 45 67",
    address: "Sokodé, Togo"
  },
  {
    id: "cust-003",
    name: "Immobilier Focus",
    phone: "+228 92 34 56 78",
    email: "info@immofocus.tg",
    address: "Kara, Togo"
  },
  {
    id: "cust-004",
    name: "Kofi Amégbo",
    phone: "+228 93 45 67 89",
    address: "Tsévié, Togo"
  }
];

// Mock des utilisateurs
export const mockUsers: User[] = [
  {
    id: "user-001",
    name: "Admin Système",
    email: "admin@cornerstonebriques.tg",
    role: "ADMIN",
    phone: "+228 99 99 99 99"
  },
  {
    id: "user-002",
    name: "Jean Komla",
    email: "jkomla@cornerstonebriques.tg",
    role: "COMMERCIAL",
    phone: "+228 90 11 22 33"
  },
  {
    id: "user-003",
    name: "Afi Mensah",
    email: "amensah@cornerstonebriques.tg",
    role: "RESPONSABLE_PROD",
    phone: "+228 91 22 33 44"
  },
  {
    id: "user-004",
    name: "Kossi Abalo",
    email: "kabalo@cornerstonebriques.tg",
    role: "COMPTABLE",
    phone: "+228 92 33 44 55"
  },
  {
    id: "user-005",
    name: "Yao Mawuli",
    email: "ymawuli@cornerstonebriques.tg",
    role: "OUVRIER",
    phone: "+228 93 44 55 66"
  }
];

// Fonction pour générer un numéro de commande
export const generateOrderNumber = (): string => {
  const year = new Date().getFullYear();
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `CMD-${year}-${randomNum}`;
};

// Mock des commandes
export const mockOrders: Order[] = [
  {
    id: "order-001",
    orderNumber: "CMD-2024-001",
    customerId: "cust-001",
    customerName: "Entreprise Togo Construction",
    items: [
      { productId: "prod-001", quantity: 1000, unitPrice: 950 },
      { productId: "prod-003", quantity: 500, unitPrice: 1100 }
    ],
    status: "LIVREE",
    createdAt: new Date(2024, 3, 1),
    updatedAt: new Date(2024, 3, 5),
    createdBy: "user-002",
    assignedTo: "user-003",
    totalAmount: 1500000,
    progressPercentage: 100,
    deliveryDate: new Date(2024, 3, 5),
    notes: "Livraison complète effectuée"
  },
  {
    id: "order-002",
    orderNumber: "CMD-2024-002",
    customerId: "cust-002",
    customerName: "Bâtisseurs Réunis",
    items: [
      { productId: "prod-002", quantity: 2000, unitPrice: 1050 }
    ],
    status: "EN_PRODUCTION",
    createdAt: new Date(2024, 3, 10),
    updatedAt: new Date(2024, 3, 12),
    createdBy: "user-002",
    assignedTo: "user-003",
    totalAmount: 2100000,
    progressPercentage: 65,
    notes: "Production en cours - Ligne 2"
  },
  {
    id: "order-003",
    orderNumber: "CMD-2024-003",
    customerId: "cust-003",
    customerName: "Immobilier Focus",
    items: [
      { productId: "prod-004", quantity: 800, unitPrice: 1250 },
      { productId: "prod-005", quantity: 300, unitPrice: 1200 }
    ],
    status: "VALIDEE",
    createdAt: new Date(2024, 3, 15),
    updatedAt: new Date(2024, 3, 15),
    createdBy: "user-002",
    assignedTo: "user-003",
    totalAmount: 1360000,
    progressPercentage: 0,
    notes: "Attente de lancement de production"
  },
  {
    id: "order-004",
    orderNumber: "CMD-2024-004",
    customerId: "cust-004",
    customerName: "Kofi Amégbo",
    items: [
      { productId: "prod-001", quantity: 500, unitPrice: 950 }
    ],
    status: "EN_ATTENTE",
    createdAt: new Date(2024, 3, 18),
    updatedAt: new Date(2024, 3, 18),
    createdBy: "user-002",
    totalAmount: 475000,
    progressPercentage: 0,
    notes: "En attente de validation"
  }
];

// Mock des transactions
export const mockTransactions: Transaction[] = [
  {
    id: "trans-001",
    orderId: "order-001",
    type: "RECETTE",
    category: "Vente briques",
    amount: 1500000,
    paymentMethod: "CHEQUE",
    date: new Date(2024, 3, 5),
    description: "Paiement intégral commande CMD-2024-001",
    createdBy: "user-004"
  },
  {
    id: "trans-002",
    orderId: "order-002",
    type: "RECETTE",
    category: "Acompte client",
    amount: 1050000,
    paymentMethod: "VIREMENT",
    date: new Date(2024, 3, 11),
    description: "Acompte 50% commande CMD-2024-002",
    createdBy: "user-004"
  },
  {
    id: "trans-003",
    type: "DEPENSE",
    category: "Achat ciment",
    amount: 450000,
    paymentMethod: "ESPECES",
    date: new Date(2024, 3, 8),
    description: "Achat 100 sacs de ciment",
    createdBy: "user-004"
  },
  {
    id: "trans-004",
    type: "DEPENSE",
    category: "Maintenance four",
    amount: 120000,
    paymentMethod: "MOBILE_MONEY",
    date: new Date(2024, 3, 12),
    description: "Réparation four ligne 1",
    createdBy: "user-004"
  }
];

// Fonction pour formatter un montant en FCFA
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
};

// Fonction pour obtenir la couleur du statut
export const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case 'EN_ATTENTE':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'VALIDEE':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'EN_PRODUCTION':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'LIVREE':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'ANNULEE':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

// Fonction pour obtenir le texte français du statut
export const getStatusText = (status: OrderStatus): string => {
  switch (status) {
    case 'EN_ATTENTE':
      return 'En attente';
    case 'VALIDEE':
      return 'Validée';
    case 'EN_PRODUCTION':
      return 'En production';
    case 'LIVREE':
      return 'Livrée';
    case 'ANNULEE':
      return 'Annulée';
    default:
      return status;
  }
};

// Fonction pour obtenir des statistiques pour le tableau de bord
export const getDashboardStats = () => {
  const today = new Date();
  const ordersToday = mockOrders.filter(order => 
    order.createdAt.getDate() === today.getDate() && 
    order.createdAt.getMonth() === today.getMonth() && 
    order.createdAt.getFullYear() === today.getFullYear()
  ).length;
  
  const ordersInProduction = mockOrders.filter(order => order.status === 'EN_PRODUCTION').length;
  const ordersWaiting = mockOrders.filter(order => order.status === 'EN_ATTENTE').length;
  const ordersDelivered = mockOrders.filter(order => order.status === 'LIVREE').length;
  
  // Calcul du revenu du jour
  const revenueToday = mockTransactions
    .filter(trans => 
      trans.type === 'RECETTE' && 
      trans.date.getDate() === today.getDate() && 
      trans.date.getMonth() === today.getMonth() && 
      trans.date.getFullYear() === today.getFullYear()
    )
    .reduce((total, trans) => total + trans.amount, 0);
  
  // Calcul du revenu du mois
  const revenueThisMonth = mockTransactions
    .filter(trans => 
      trans.type === 'RECETTE' && 
      trans.date.getMonth() === today.getMonth() && 
      trans.date.getFullYear() === today.getFullYear()
    )
    .reduce((total, trans) => total + trans.amount, 0);
  
  // Générer des alertes de stock
  const stockAlerts = mockProducts
    .filter(product => product.stockQuantity <= product.minStockAlert)
    .map(product => ({
      productId: product.id,
      productName: product.name,
      currentStock: product.stockQuantity,
      minStockAlert: product.minStockAlert
    }));
  
  return {
    ordersToday,
    ordersInProduction,
    ordersWaiting,
    ordersDelivered,
    revenueToday,
    revenueThisMonth,
    stockAlerts
  };
};
