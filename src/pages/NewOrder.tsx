
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency, generateOrderNumber, mockCustomers, mockProducts } from "@/data/mockData";
import { MinusCircle, Plus, PlusCircle, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

interface OrderItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  productName: string;
}

const NewOrder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customerId, setCustomerId] = useState("");
  const [items, setItems] = useState<OrderItem[]>([]);
  const [notes, setNotes] = useState("");
  const orderNumber = generateOrderNumber();

  const selectedCustomer = mockCustomers.find((c) => c.id === customerId);

  const addItem = () => {
    if (mockProducts.length > 0) {
      const firstProduct = mockProducts[0];
      setItems([
        ...items,
        {
          productId: firstProduct.id,
          productName: firstProduct.name,
          quantity: 1,
          unitPrice: firstProduct.unitPrice,
        },
      ]);
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    const newItems = [...items];
    
    if (field === 'productId') {
      const product = mockProducts.find((p) => p.id === value);
      if (product) {
        newItems[index] = {
          ...newItems[index],
          [field]: value as string, // Fix for error 1: explicitly cast to string
          productName: product.name,
          unitPrice: product.unitPrice,
        };
      }
    } else {
      newItems[index] = {
        ...newItems[index],
        [field]: value,
      };
    }
    
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.unitPrice, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerId) {
      toast({
        title: "Client requis",
        description: "Veuillez sélectionner un client pour cette commande.",
        variant: "destructive",
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Produits requis",
        description: "Veuillez ajouter au moins un produit à cette commande.",
        variant: "destructive",
      });
      return;
    }

    // Ici nous simulerons l'ajout de la commande
    toast({
      title: "Commande créée",
      description: `La commande ${orderNumber} a été créée avec succès.`,
    });

    // Redirection vers la liste des commandes
    navigate("/commandes");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Nouvelle commande</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Détails de la commande</CardTitle>
              <CardDescription>Ajoutez les produits pour cette commande</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="orderNumber">N° de commande</Label>
                  <Input id="orderNumber" value={orderNumber} readOnly className="bg-muted" />
                </div>
                <div>
                  <Label htmlFor="customer">Client</Label>
                  <Select value={customerId} onValueChange={setCustomerId}>
                    <SelectTrigger id="customer">
                      <SelectValue placeholder="Sélectionner un client" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCustomers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {customer.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label>Produits</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addItem}>
                    <Plus className="h-4 w-4 mr-1" />
                    Ajouter un produit
                  </Button>
                </div>

                {items.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed rounded-lg">
                    <ShoppingCart className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Aucun produit ajouté. Cliquez sur "Ajouter un produit".
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <div key={index} className="grid grid-cols-12 gap-2 items-end">
                        <div className="col-span-5">
                          <Label htmlFor={`product-${index}`}>Produit</Label>
                          <Select
                            value={item.productId}
                            onValueChange={(value) => updateItem(index, "productId", value)}
                          >
                            <SelectTrigger id={`product-${index}`}>
                              <SelectValue placeholder="Sélectionner un produit" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockProducts.map((product) => (
                                <SelectItem key={product.id} value={product.id}>
                                  {product.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor={`quantity-${index}`}>Quantité</Label>
                          <div className="flex items-center">
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateItem(index, "quantity", item.quantity - 1);
                                }
                              }}
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                            <Input
                              id={`quantity-${index}`}
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => updateItem(index, "quantity", parseInt(e.target.value) || 1)}
                              className="text-center"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9"
                              onClick={() => updateItem(index, "quantity", item.quantity + 1)}
                            >
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor={`unitPrice-${index}`}>Prix unitaire</Label>
                          <div className="relative">
                            <Input
                              id={`unitPrice-${index}`}
                              type="number"
                              min="0"
                              value={item.unitPrice}
                              onChange={(e) => updateItem(index, "unitPrice", parseInt(e.target.value) || 0)}
                              className="text-right pr-14"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-sm text-muted-foreground">
                              FCFA
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 text-right">
                          <Label>Total</Label>
                          <div className="h-10 flex items-center justify-end font-medium">
                            {formatCurrency(item.quantity * item.unitPrice)} FCFA
                          </div>
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-destructive"
                            onClick={() => removeItem(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-end space-x-4 mt-6 pt-4 border-t">
                      <div className="text-right">
                        <Label>Total commande</Label>
                        <div className="text-2xl font-bold">
                          {formatCurrency(calculateTotal())} FCFA
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Ajoutez des notes ou instructions spéciales pour cette commande..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link to="/commandes">Annuler</Link>
              </Button>
              <Button type="submit">Créer la commande</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Résumé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium">N° de commande</p>
                <p className="text-lg">{orderNumber}</p>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium">Client</p>
                <p className="text-lg">{selectedCustomer?.name || "Non sélectionné"}</p>
                {selectedCustomer && (
                  <p className="text-sm text-muted-foreground">{selectedCustomer.phone}</p>
                )}
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium">Produits</p>
                {items.length === 0 ? (
                  <p className="text-muted-foreground">Aucun produit ajouté</p>
                ) : (
                  <ul className="space-y-1 mt-2">
                    {items.map((item, index) => (
                      <li key={index} className="text-sm">
                        {item.quantity} x {item.productName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium">Total</p>
                <p className="text-2xl font-bold">{formatCurrency(calculateTotal())} FCFA</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
};

export default NewOrder;
