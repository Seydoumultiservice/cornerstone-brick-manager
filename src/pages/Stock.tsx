
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockProducts } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/formatters";
import { Package } from "lucide-react";

const Stock = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gestion du Stock</h2>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">Liste des Produits</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produit</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Taille</TableHead>
                <TableHead>Prix Unitaire</TableHead>
                <TableHead>Stock Actuel</TableHead>
                <TableHead>Stock Minimum</TableHead>
                <TableHead>État</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    {product.type === 'BRIQUE_CREUSE' ? 'Brique Creuse' :
                     product.type === 'BRIQUE_PLEINE' ? 'Brique Pleine' :
                     'Heurels'}
                  </TableCell>
                  <TableCell>{product.size || '-'}</TableCell>
                  <TableCell>{formatNumber(product.unitPrice)} FCFA</TableCell>
                  <TableCell>{formatNumber(product.stockQuantity)}</TableCell>
                  <TableCell>{formatNumber(product.minStockAlert)}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={product.stockQuantity <= product.minStockAlert ? "destructive" : "default"}
                    >
                      {product.stockQuantity <= product.minStockAlert ? 'Stock Bas' : 'Normal'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Stock;
