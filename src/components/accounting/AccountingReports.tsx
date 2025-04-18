
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Download, FileCog, FilePlus, Printer } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, subDays } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "@/components/ui/sonner";

export const AccountingReports = () => {
  const [reportType, setReportType] = useState("income-statement");
  const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 30));
  const [endDate, setEndDate] = useState<Date>(new Date());
  
  const handleGenerateReport = () => {
    toast.success("Rapport généré avec succès", {
      description: "Le rapport est prêt à être téléchargé",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Paramètres du rapport</CardTitle>
          <CardDescription>
            Configurez les détails de votre rapport
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Type de rapport</label>
            <Select 
              value={reportType} 
              onValueChange={setReportType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income-statement">Compte de résultat</SelectItem>
                <SelectItem value="balance-sheet">Bilan comptable</SelectItem>
                <SelectItem value="cash-flow">Flux de trésorerie</SelectItem>
                <SelectItem value="general-ledger">Grand livre</SelectItem>
                <SelectItem value="vat-report">Déclaration TVA</SelectItem>
                <SelectItem value="client-statement">Relevé client</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Période</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-muted-foreground">Début</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy", { locale: fr }) : <span>Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => date && setStartDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <label className="text-xs text-muted-foreground">Fin</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy", { locale: fr }) : <span>Date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => date && setEndDate(date)}
                      initialFocus
                      disabled={(date) => date < startDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Format</label>
            <Select defaultValue="pdf">
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Options supplémentaires</label>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="include-details" className="rounded border-gray-300" />
                <label htmlFor="include-details" className="text-sm">Inclure les détails</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="include-charts" className="rounded border-gray-300" />
                <label htmlFor="include-charts" className="text-sm">Inclure les graphiques</label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="include-summary" className="rounded border-gray-300" defaultChecked />
                <label htmlFor="include-summary" className="text-sm">Inclure le résumé</label>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGenerateReport} className="w-full">
            <FileCog className="mr-2 h-4 w-4" />
            Générer le rapport
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Aperçu du rapport</CardTitle>
          <CardDescription>
            Prévisualisation du rapport généré
          </CardDescription>
        </CardHeader>
        <CardContent className="h-[500px] flex items-center justify-center border-2 border-dashed rounded-md">
          <div className="text-center text-muted-foreground">
            <FilePlus className="mx-auto h-12 w-12 mb-2" />
            <h3 className="text-lg font-medium">Aperçu du rapport</h3>
            <p className="max-w-md mx-auto">
              Configurez les paramètres et cliquez sur "Générer le rapport" pour voir l'aperçu ici
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Imprimer
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Télécharger
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
