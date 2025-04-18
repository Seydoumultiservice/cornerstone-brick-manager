
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Transaction } from "@/types";
import { formatCurrency } from "@/lib/formatters";
import { ArrowDown, ArrowUp } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

// Transactions factices pour démonstration
const mockTransactions: Transaction[] = [
  {
    id: "t1",
    type: "RECETTE",
    category: "Vente de briques",
    amount: 250000,
    paymentMethod: "ESPECES",
    date: new Date("2024-05-15"),
    description: "Vente de 500 briques creuses 20",
    createdBy: "user-1",
    orderId: "ord-123"
  },
  {
    id: "t2",
    type: "DEPENSE",
    category: "Achat matières premières",
    amount: 125000,
    paymentMethod: "CHEQUE",
    date: new Date("2024-05-14"),
    description: "Achat d'argile pour production",
    createdBy: "user-2"
  },
  {
    id: "t3",
    type: "RECETTE",
    category: "Vente d'heurels",
    amount: 175000,
    paymentMethod: "MOBILE_MONEY",
    date: new Date("2024-05-13"),
    description: "Vente de 200 heurels",
    createdBy: "user-1",
    orderId: "ord-124"
  },
  {
    id: "t4",
    type: "DEPENSE",
    category: "Salaires",
    amount: 350000,
    paymentMethod: "VIREMENT",
    date: new Date("2024-05-10"),
    description: "Salaires ouvriers - Mai semaine 1",
    createdBy: "user-2"
  },
  {
    id: "t5",
    type: "RECETTE",
    category: "Acompte client",
    amount: 500000,
    paymentMethod: "ESPECES",
    date: new Date("2024-05-09"),
    description: "Acompte commande #CMD-2024-056",
    createdBy: "user-1",
    orderId: "ord-125"
  },
  {
    id: "t6",
    type: "DEPENSE",
    category: "Carburant",
    amount: 45000,
    paymentMethod: "ESPECES",
    date: new Date("2024-05-08"),
    description: "Carburant pour les véhicules",
    createdBy: "user-3"
  },
  {
    id: "t7",
    type: "DEPENSE",
    category: "Maintenance",
    amount: 85000,
    paymentMethod: "MOBILE_MONEY",
    date: new Date("2024-05-07"),
    description: "Réparation four principal",
    createdBy: "user-2"
  }
];

const getPaymentMethodText = (method: Transaction['paymentMethod']) => {
  switch (method) {
    case "ESPECES": return "Espèces";
    case "MOBILE_MONEY": return "Mobile Money";
    case "CHEQUE": return "Chèque";
    case "VIREMENT": return "Virement";
    default: return method;
  }
};

interface TransactionsListProps {
  limit?: number;
}

export const TransactionsList = ({ limit }: TransactionsListProps) => {
  const displayTransactions = limit 
    ? mockTransactions.slice(0, limit) 
    : mockTransactions;

  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Catégorie</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Méthode</TableHead>
            <TableHead className="text-right">Montant</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {displayTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="whitespace-nowrap">
                {format(transaction.date, "dd/MM/yyyy", { locale: fr })}
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  {transaction.type === "RECETTE" ? (
                    <ArrowDown className="h-4 w-4 mr-1 text-green-600" />
                  ) : (
                    <ArrowUp className="h-4 w-4 mr-1 text-red-600" />
                  )}
                  <span className={transaction.type === "RECETTE" ? "text-green-600" : "text-red-600"}>
                    {transaction.type === "RECETTE" ? "Entrée" : "Sortie"}
                  </span>
                </div>
              </TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell className="max-w-xs truncate">{transaction.description}</TableCell>
              <TableCell>{getPaymentMethodText(transaction.paymentMethod)}</TableCell>
              <TableCell className={`text-right font-medium ${
                transaction.type === "RECETTE" ? "text-green-600" : "text-red-600"
              }`}>
                {formatCurrency(transaction.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
