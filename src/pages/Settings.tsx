
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Save, Upload } from "lucide-react";

const Settings = () => {
  const [companyName, setCompanyName] = useState("Cornerstone Briques");
  const [address, setAddress] = useState("Zone Industrielle, Lomé, Togo");
  const [phone, setPhone] = useState("+228 70 00 00 00");
  const [email, setEmail] = useState("contact@cornerstonebriques.com");
  const [taxId, setTaxId] = useState("TG123456789");
  const [stockAlerts, setStockAlerts] = useState(true);
  const [orderNotifications, setOrderNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState("daily");
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("fr");
  const [currency, setCurrency] = useState("XOF");
  const [logo, setLogo] = useState<File | null>(null);
  
  const handleSaveGeneral = () => {
    toast.success("Paramètres généraux enregistrés");
  };
  
  const handleSaveNotifications = () => {
    toast.success("Paramètres de notifications enregistrés");
  };
  
  const handleSaveSystem = () => {
    toast.success("Paramètres système enregistrés");
  };
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
      toast.success("Logo téléchargé avec succès");
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
          <p className="text-muted-foreground">
            Configurez les paramètres de votre application
          </p>
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">Informations Générales</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">Système & Sécurité</TabsTrigger>
        </TabsList>
        
        {/* Onglet Informations Générales */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informations de l'Entreprise</CardTitle>
              <CardDescription>
                Ces informations apparaîtront sur les documents officiels comme les factures et devis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Nom de l'entreprise</Label>
                  <Input
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Adresse</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="taxId">Numéro d'identification fiscale</Label>
                  <Input
                    id="taxId"
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo de l'entreprise</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="w-full" onClick={() => document.getElementById('logo-upload')?.click()}>
                      <Upload className="mr-2 h-4 w-4" />
                      Télécharger un logo
                    </Button>
                    <input
                      id="logo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                    {logo && <span className="text-sm text-muted-foreground">{logo.name}</span>}
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-end">
                <Button onClick={handleSaveGeneral}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Paramètres Régionaux</CardTitle>
              <CardDescription>
                Configurez la langue, la devise et d'autres paramètres régionaux.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Langue</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Sélectionner une langue" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="en">Anglais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Devise</Label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Sélectionner une devise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="XOF">XOF (FCFA)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="theme">Thème</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Sélectionner un thème" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-end">
                <Button onClick={handleSaveGeneral}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Onglet Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de Notifications</CardTitle>
              <CardDescription>
                Configurez quand et comment vous souhaitez recevoir des notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="stockAlerts">Alertes de stock</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications lorsque le stock est bas
                    </p>
                  </div>
                  <Switch
                    id="stockAlerts"
                    checked={stockAlerts}
                    onCheckedChange={setStockAlerts}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="orderNotifications">Notifications de commandes</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications pour les nouvelles commandes et les mises à jour
                    </p>
                  </div>
                  <Switch
                    id="orderNotifications"
                    checked={orderNotifications}
                    onCheckedChange={setOrderNotifications}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="smsNotifications">Notifications SMS</Label>
                    <p className="text-sm text-muted-foreground">
                      Envoyer des SMS aux clients pour les mises à jour de commandes
                    </p>
                  </div>
                  <Switch
                    id="smsNotifications"
                    checked={smsNotifications}
                    onCheckedChange={setSmsNotifications}
                  />
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-end">
                <Button onClick={handleSaveNotifications}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Onglet Système & Sécurité */}
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sauvegardes</CardTitle>
              <CardDescription>
                Configurez la fréquence des sauvegardes automatiques.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="backupFrequency">Fréquence de sauvegarde</Label>
                <Select value={backupFrequency} onValueChange={setBackupFrequency}>
                  <SelectTrigger id="backupFrequency">
                    <SelectValue placeholder="Sélectionner une fréquence" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Toutes les heures</SelectItem>
                    <SelectItem value="daily">Quotidienne</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center p-4 mt-4 bg-amber-50 border border-amber-200 rounded-md">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                <p className="text-sm text-amber-700">
                  Les sauvegardes sont essentielles pour la récupération des données en cas de panne. 
                  Nous recommandons une sauvegarde quotidienne.
                </p>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-end">
                <Button onClick={handleSaveSystem}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>
                Configurez les paramètres de sécurité de l'application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Button variant="destructive" className="w-full md:w-auto">
                  Réinitialiser tous les mots de passe utilisateurs
                </Button>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" className="w-full md:w-auto">
                  Consulter les journaux d'activité
                </Button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex justify-end">
                <Button onClick={handleSaveSystem}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
