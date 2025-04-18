
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomInput } from "@/components/ui/custom-input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "@/components/ui/sonner";

export const IncomeForm = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isOrderLinked, setIsOrderLinked] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Recette enregistrée avec succès", {
      description: "La recette a été ajoutée à la comptabilité",
    });
    
    // Ici, nous réinitialiserions le formulaire dans un cas réel
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="income-category">Catégorie</Label>
          <Select required>
            <SelectTrigger id="income-category">
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="brick_sales">Vente de briques</SelectItem>
              <SelectItem value="heurels_sales">Vente d'heurels</SelectItem>
              <SelectItem value="deposits">Acompte client</SelectItem>
              <SelectItem value="delivery">Frais de livraison</SelectItem>
              <SelectItem value="other">Autre recette</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="income-amount">Montant</Label>
          <CustomInput 
            id="income-amount"
            type="number" 
            min="0" 
            step="1000"
            placeholder="0" 
            suffix="FCFA"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="income-date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="income-date"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP", { locale: fr }) : <span>Sélectionner une date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="income-payment-method">Mode de paiement</Label>
          <Select required>
            <SelectTrigger id="income-payment-method">
              <SelectValue placeholder="Sélectionner un mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ESPECES">Espèces</SelectItem>
              <SelectItem value="MOBILE_MONEY">Mobile Money</SelectItem>
              <SelectItem value="CHEQUE">Chèque</SelectItem>
              <SelectItem value="VIREMENT">Virement bancaire</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 col-span-1 md:col-span-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="link-to-order"
              checked={isOrderLinked}
              onChange={(e) => setIsOrderLinked(e.target.checked)}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <Label htmlFor="link-to-order">Lier à une commande</Label>
          </div>
        </div>
        
        {isOrderLinked && (
          <div className="space-y-2 col-span-1 md:col-span-2">
            <Label htmlFor="income-order">Numéro de commande</Label>
            <Select>
              <SelectTrigger id="income-order">
                <SelectValue placeholder="Sélectionner une commande" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CMD-2024-001">CMD-2024-001 - Client A</SelectItem>
                <SelectItem value="CMD-2024-002">CMD-2024-002 - Client B</SelectItem>
                <SelectItem value="CMD-2024-003">CMD-2024-003 - Client C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="income-description">Description</Label>
        <Textarea 
          id="income-description"
          placeholder="Détails sur cette recette..." 
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="income-proof">Justificatif (optionnel)</Label>
        <Input id="income-proof" type="file" />
      </div>
      
      <Button type="submit" className="w-full md:w-auto">
        <Save className="mr-2 h-4 w-4" />
        Enregistrer la recette
      </Button>
    </form>
  );
};
