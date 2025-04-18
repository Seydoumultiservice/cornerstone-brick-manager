
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

export const ExpenseForm = () => {
  const [date, setDate] = useState<Date>(new Date());
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Dépense enregistrée avec succès", {
      description: "La dépense a été ajoutée à la comptabilité",
    });
    
    // Ici, nous réinitialiserions le formulaire dans un cas réel
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="expense-category">Catégorie</Label>
          <Select required>
            <SelectTrigger id="expense-category">
              <SelectValue placeholder="Sélectionner une catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="raw_materials">Matières premières</SelectItem>
              <SelectItem value="salaries">Salaires</SelectItem>
              <SelectItem value="maintenance">Maintenance équipement</SelectItem>
              <SelectItem value="fuel">Carburant</SelectItem>
              <SelectItem value="electricity">Électricité</SelectItem>
              <SelectItem value="rent">Loyer</SelectItem>
              <SelectItem value="office_supplies">Fournitures bureau</SelectItem>
              <SelectItem value="other">Autre dépense</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="expense-amount">Montant</Label>
          <CustomInput 
            id="expense-amount"
            type="number" 
            min="0" 
            step="1000"
            placeholder="0" 
            suffix="FCFA"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="expense-date">Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="expense-date"
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
          <Label htmlFor="expense-payment-method">Mode de paiement</Label>
          <Select required>
            <SelectTrigger id="expense-payment-method">
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
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="expense-description">Description</Label>
        <Textarea 
          id="expense-description"
          placeholder="Détails sur cette dépense..." 
          rows={3}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="expense-proof">Justificatif (optionnel)</Label>
        <Input id="expense-proof" type="file" />
      </div>
      
      <Button type="submit" className="w-full md:w-auto">
        <Save className="mr-2 h-4 w-4" />
        Enregistrer la dépense
      </Button>
    </form>
  );
};
