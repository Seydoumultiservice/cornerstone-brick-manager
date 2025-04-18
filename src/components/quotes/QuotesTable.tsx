
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
  ArrowDown, 
  Copy, 
  Eye, 
  FileText, 
  MoreHorizontal, 
  Pencil, 
  Send, 
  ShoppingCart, 
  Trash 
} from "lucide-react";
import { formatCurrency } from "@/lib/formatters";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "@/components/ui/sonner";

// Types
interface Quote {
  id: string;
  number: string;
  customerName: string;
  date: Date;
  validUntil: Date;
  amount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
}

// Données fictives pour la démonstration
const mockQuotes: Quote[] = [
  {
    id: "q1",
    number: "DEVIS-2024-001",
    customerName: "Entreprise Kodjo Construction",
    date: new Date("2024-04-10"),
    validUntil: new Date("2024-05-10"),
    amount: 1350000,
    status: 'accepted'
  },
  {
    id: "q2",
    number: "DEVIS-2024-002",
    customerName: "Mairie de Lomé",
    date: new Date("2024-04-12"),
    validUntil: new Date("2024-05-12"),
    amount: 5240000,
    status: 'sent'
  },
  {
    id: "q3",
    number: "DEVIS-2024-003",
    customerName: "Amouzou Constructions",
    date: new Date("2024-04-15"),
    validUntil: new Date("2024-05-15"),
    amount: 875000,
    status: 'draft'
  },
  {
    id: "q4",
    number: "DEVIS-2024-004",
    customerName: "École Primaire Saint-Michel",
    date: new Date("2024-04-18"),
    validUntil: new Date("2024-05-18"),
    amount: 320000,
    status: 'sent'
  },
  {
    id: "q5",
    number: "DEVIS-2024-005",
    customerName: "Église Saint-Jean",
    date: new Date("2024-04-20"),
    validUntil: new Date("2024-05-20"),
    amount: 440000,
    status: 'rejected'
  },
  {
    id: "q6",
    number: "DEVIS-2024-006",
    customerName: "Hôpital Général",
    date: new Date("2024-04-22"),
    validUntil: new Date("2024-05-22"),
    amount: 2680000,
    status: 'draft'
  },
  {
    id: "q7",
    number: "DEVIS-2024-007",
    customerName: "Résidence Les Palmiers",
    date: new Date("2024-04-24"),
    validUntil: new Date("2024-05-24"),
    amount: 1850000,
    status: 'expired'
  }
];

// Composant pour afficher le statut sous forme de badge
const StatusBadge = ({ status }: { status: Quote['status'] }) => {
  switch (status) {
    case 'draft':
      return <Badge variant="outline">Brouillon</Badge>;
    case 'sent':
      return <Badge className="bg-blue-500">Envoyé</Badge>;
    case 'accepted':
      return <Badge className="bg-green-500">Accepté</Badge>;
    case 'rejected':
      return <Badge className="bg-red-500">Refusé</Badge>;
    case 'expired':
      return <Badge variant="secondary">Expiré</Badge>;
    default:
      return <Badge>{status}</Badge>;
  }
};

export const QuotesTable = () => {
  // Actions sur les devis
  const handleViewQuote = (quote: Quote) => {
    toast.info(`Affichage du devis ${quote.number}`);
  };
  
  const handleEditQuote = (quote: Quote) => {
    toast.info(`Modification du devis ${quote.number}`);
  };
  
  const handleDuplicateQuote = (quote: Quote) => {
    toast.success(`Devis ${quote.number} dupliqué`);
  };
  
  const handleSendQuote = (quote: Quote) => {
    toast.success(`Devis ${quote.number} envoyé au client`);
  };
  
  const handleConvertToInvoice = (quote: Quote) => {
    toast.success(`Devis ${quote.number} converti en facture`);
  };
  
  const handleDeleteQuote = (quote: Quote) => {
    toast.success(`Devis ${quote.number} supprimé`);
  };
  
  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>N° Devis</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Validité</TableHead>
            <TableHead>Montant</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockQuotes.map((quote) => (
            <TableRow key={quote.id}>
              <TableCell className="font-medium">{quote.number}</TableCell>
              <TableCell>{quote.customerName}</TableCell>
              <TableCell>{format(quote.date, "dd/MM/yyyy", { locale: fr })}</TableCell>
              <TableCell>{format(quote.validUntil, "dd/MM/yyyy", { locale: fr })}</TableCell>
              <TableCell>{formatCurrency(quote.amount)}</TableCell>
              <TableCell><StatusBadge status={quote.status} /></TableCell>
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
                    <DropdownMenuItem onClick={() => handleViewQuote(quote)}>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>Voir</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditQuote(quote)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      <span>Modifier</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDuplicateQuote(quote)}>
                      <Copy className="mr-2 h-4 w-4" />
                      <span>Dupliquer</span>
                    </DropdownMenuItem>
                    {quote.status === 'draft' && (
                      <DropdownMenuItem onClick={() => handleSendQuote(quote)}>
                        <Send className="mr-2 h-4 w-4" />
                        <span>Envoyer au client</span>
                      </DropdownMenuItem>
                    )}
                    {quote.status === 'accepted' && (
                      <DropdownMenuItem onClick={() => handleConvertToInvoice(quote)}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <span>Convertir en facture</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => handleDeleteQuote(quote)}
                      className="text-red-600"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Supprimer</span>
                    </DropdownMenuItem>
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
