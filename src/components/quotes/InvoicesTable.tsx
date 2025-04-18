
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  CreditCard, 
  Download, 
  Eye, 
  FileText, 
  MoreHorizontal, 
  Pencil, 
  Printer, 
  Send, 
  Trash 
} from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "@/components/ui/sonner";

// Types
interface Invoice {
  id: string;
  number: string;
  customerName: string;
  date: Date;
  dueDate: Date;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'partially_paid' | 'overdue' | 'cancelled';
  orderNumber?: string;
}

// Données fictives pour la démonstration
const mockInvoices: Invoice[] = [
  {
    id: "i1",
    number: "FACT-2024-001",
    customerName: "Entreprise Kodjo Construction",
    date: new Date("2024-04-05"),
    dueDate: new Date("2024-05-05"),
    amount: 1350000,
    status: 'paid',
    orderNumber: "CMD-2024-012"
  },
  {
    id: "i2",
    number: "FACT-2024-002",
    customerName: "Mairie de Lomé",
    date: new Date("2024-04-08"),
    dueDate: new Date("2024-05-08"),
    amount: 5240000,
    status: 'partially_paid',
    orderNumber: "CMD-2024-015"
  },
  {
    id: "i3",
    number: "FACT-2024-003",
    customerName: "Amouzou Constructions",
    date: new Date("2024-04-10"),
    dueDate: new Date("2024-05-10"),
    amount: 875000,
    status: 'draft'
  },
  {
    id: "i4",
    number: "FACT-2024-004",
    customerName: "École Primaire Saint-Michel",
    date: new Date("2024-04-12"),
    dueDate: new Date("2024-05-12"),
    amount: 320000,
    status: 'sent',
    orderNumber: "CMD-2024-018"
  },
  {
    id: "i5",
    number: "FACT-2024-005",
    customerName: "Église Saint-Jean",
    date: new Date("2024-04-15"),
    dueDate: new Date("2024-04-15"),
    amount: 440000,
    status: 'overdue',
    orderNumber: "CMD-2024-020"
  },
  {
    id: "i6",
    number: "FACT-2024-006",
    customerName: "Hôpital Général",
    date: new Date("2024-04-18"),
    dueDate: new Date("2024-05-18"),
    amount: 2680000,
    status: 'sent',
    orderNumber: "CMD-2024-022"
  },
  {
    id: "i7",
    number: "FACT-2024-007",
    customerName: "Résidence Les Palmiers",
    date: new Date("2024-04-20"),
    dueDate: new Date("2024-05-20"),
    amount: 1850000,
    status: 'cancelled'
  }
];

// Composant pour afficher le statut sous forme de badge
const StatusBadge = ({ status }: { status: Invoice['status'] }) => {
  switch (status) {
    case 'draft':
      return <Badge variant="outline">Brouillon</Badge>;
    case 'sent':
      return <Badge className="bg-blue-500">Envoyée</Badge>;
    case 'paid':
      return <Badge className="bg-green-500">Payée</Badge>;
    case 'partially_paid':
      return <Badge className="bg-yellow-500">Partiellement payée</Badge>;
    case 'overdue':
      return <Badge className="bg-red-500">En retard</Badge>;
    case 'cancelled':
      return <Badge variant="secondary">Annulée</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export const InvoicesTable = () => {
  // Actions sur les factures
  const handleViewInvoice = (invoice: Invoice) => {
    toast.info(`Affichage de la facture ${invoice.number}`);
  };
  
  const handleEditInvoice = (invoice: Invoice) => {
    toast.info(`Modification de la facture ${invoice.number}`);
  };
  
  const handleDownloadInvoice = (invoice: Invoice) => {
    toast.success(`Facture ${invoice.number} téléchargée`);
  };
  
  const handlePrintInvoice = (invoice: Invoice) => {
    toast.info(`Impression de la facture ${invoice.number}`);
  };
  
  const handleSendInvoice = (invoice: Invoice) => {
    toast.success(`Facture ${invoice.number} envoyée au client`);
  };
  
  const handleRegisterPayment = (invoice: Invoice) => {
    toast.success(`Paiement enregistré pour la facture ${invoice.number}`);
  };
  
  const handleDeleteInvoice = (invoice: Invoice) => {
    toast.success(`Facture ${invoice.number} supprimée`);
  };
  
  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° Facture</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Échéance</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Commande</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockInvoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.number}</TableCell>
              <TableCell>{invoice.customerName}</TableCell>
              <TableCell>{format(invoice.date, "dd/MM/yyyy", { locale: fr })}</TableCell>
              <TableCell>{format(invoice.dueDate, "dd/MM/yyyy", { locale: fr })}</TableCell>
              <TableCell>{formatCurrency(invoice.amount)}</TableCell>
              <TableCell><StatusBadge status={invoice.status} /></TableCell>
              <TableCell>{invoice.orderNumber || "-"}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleViewInvoice(invoice)}>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>Voir</span>
                    </DropdownMenuItem>
                    {invoice.status === 'draft' && (
                      <DropdownMenuItem onClick={() => handleEditInvoice(invoice)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        <span>Modifier</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={() => handleDownloadInvoice(invoice)}>
                      <Download className="mr-2 h-4 w-4" />
                      <span>Télécharger PDF</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handlePrintInvoice(invoice)}>
                      <Printer className="mr-2 h-4 w-4" />
                      <span>Imprimer</span>
                    </DropdownMenuItem>
                    {invoice.status === 'draft' && (
                      <DropdownMenuItem onClick={() => handleSendInvoice(invoice)}>
                        <Send className="mr-2 h-4 w-4" />
                        <span>Envoyer au client</span>
                      </DropdownMenuItem>
                    )}
                    {(invoice.status === 'sent' || invoice.status === 'partially_paid' || invoice.status === 'overdue') && (
                      <DropdownMenuItem onClick={() => handleRegisterPayment(invoice)}>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Enregistrer paiement</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    {invoice.status === 'draft' && (
                      <DropdownMenuItem 
                        onClick={() => handleDeleteInvoice(invoice)}
                        className="text-red-600"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Supprimer</span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
