
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BellRing, 
  Building, 
  CreditCard, 
  Download, 
  Globe, 
  HardDrive, 
  LifeBuoy, 
  Mail, 
  MessageSquare, 
  Package, 
  PhoneCall, 
  Save, 
  Smartphone, 
  Upload, 
  UserCog 
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { CustomInput } from "@/components/ui/custom-input";
import { toast } from "@/components/ui/sonner";

const Settings = () => {
  const [companyName, setCompanyName] = useState("Cornerstone Briques");
  const [email, setEmail] = useState("contact@cornerstonebriques.com");
  const [phone, setPhone] = useState("+228 70 00 00 00");
  const [address, setAddress] = useState("Zone industrielle, Lomé, Togo");
  const [taxId, setTaxId] = useState("TG123456789");
  const [logoPreview, setLogoPreview] = useState("/placeholder.svg");

  const handleSaveCompanyInfo = () => {
    toast.success("Informations entreprise enregistrées", {
      description: "Les paramètres de l'entreprise ont été mis à jour"
    });
  };
  
  const handleSaveSystemSettings = () => {
    toast.success("Paramètres système enregistrés", {
      description: "Les paramètres du système ont été mis à jour"
    });
  };
  
  const handleSaveNotificationSettings = () => {
    toast.success("Paramètres de notification enregistrés", {
      description: "Les paramètres de notification ont été mis à jour"
    });
  };
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Dans une application réelle, nous téléchargerions le fichier
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setLogoPreview(event.target.result.toString());
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleDatabaseBackup = () => {
    toast.success("Sauvegarde démarrée", {
      description: "La sauvegarde de la base de données a été lancée"
    });
  };
  
  const handleDatabaseRestore = () => {
    toast.success("Restauration démarrée", {
      description: "La restauration de la base de données a été lancée"
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres du système</h1>
        <p className="text-muted-foreground">
          Configurez votre application selon vos besoins
        </p>
      </div>
      
      <Tabs defaultValue="company" className="space-y-4">
        <TabsList className="grid grid-cols-1 md:grid-cols-5 gap-2 h-auto">
          <TabsTrigger value="company" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Building className="h-4 w-4 mr-2" />
            Entreprise
          </TabsTrigger>
          <TabsTrigger value="system" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <Package className="h-4 w-4 mr-2" />
            Système
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <BellRing className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="backups" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <HardDrive className="h-4 w-4 mr-2" />
            Sauvegardes
          </TabsTrigger>
          <TabsTrigger value="help" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            <LifeBuoy className="h-4 w-4 mr-2" />
            Aide
          </TabsTrigger>
        </TabsList>
        
        {/* Onglet Informations Entreprise */}
        <TabsContent value="company">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'entreprise</CardTitle>
                <CardDescription>
                  Ces informations seront utilisées dans les factures et les documents officiels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nom de l'entreprise</Label>
                  <Input 
                    id="company-name" 
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-email">Email</Label>
                  <Input 
                    id="company-email" 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-phone">Téléphone</Label>
                  <Input 
                    id="company-phone" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-address">Adresse</Label>
                  <Textarea 
                    id="company-address" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-tax-id">Numéro d'identification fiscale</Label>
                  <Input 
                    id="company-tax-id" 
                    value={taxId}
                    onChange={(e) => setTaxId(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" onClick={handleSaveCompanyInfo}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Logo et apparence</CardTitle>
                <CardDescription>
                  Personnalisez l'apparence de votre application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label>Logo de l'entreprise</Label>
                  <div className="flex justify-center">
                    <div className="h-32 w-32 rounded-md border flex items-center justify-center overflow-hidden">
                      <img 
                        src={logoPreview} 
                        alt="Logo de l'entreprise" 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>
                  <div className="pt-2">
                    <Input 
                      id="company-logo" 
                      type="file" 
                      accept="image/*"
                      onChange={handleLogoUpload}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-theme">Thème</Label>
                  <Select defaultValue="light">
                    <SelectTrigger id="company-theme">
                      <SelectValue placeholder="Choisir un thème" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Clair</SelectItem>
                      <SelectItem value="dark">Sombre</SelectItem>
                      <SelectItem value="system">Système</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-accent-color">Couleur d'accent</Label>
                  <div className="grid grid-cols-5 gap-2">
                    {["#9b87f5", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6"].map((color) => (
                      <div 
                        key={color}
                        className="h-8 rounded-md cursor-pointer border-2 border-transparent hover:border-gray-400 transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto" onClick={handleSaveCompanyInfo}>
                  <Save className="mr-2 h-4 w-4" />
                  Enregistrer
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Onglet Paramètres Système */}
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
              <CardDescription>
                Configurez le comportement global du système
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Paramètres de production</h3>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="production-capacity">Capacité de production journalière</Label>
                      <CustomInput 
                        id="production-capacity" 
                        type="number" 
                        defaultValue={1000} 
                        suffix="briques"
                      />
                    </div>
                    
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="stock-alert-threshold">Seuil d'alerte stock</Label>
                      <CustomInput 
                        id="stock-alert-threshold" 
                        type="number" 
                        defaultValue={100} 
                        suffix="unités"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Paramètres des commandes</h3>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="order-number-prefix">Préfixe numéro de commande</Label>
                      <Input 
                        id="order-number-prefix" 
                        defaultValue="CMD-2024-" 
                      />
                    </div>
                    
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="invoice-number-prefix">Préfixe numéro de facture</Label>
                      <Input 
                        id="invoice-number-prefix" 
                        defaultValue="FACT-2024-" 
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="default-payment-terms">Conditions de paiement par défaut</Label>
                      <Select defaultValue="30">
                        <SelectTrigger id="default-payment-terms">
                          <SelectValue placeholder="Conditions de paiement" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="immediate">Paiement immédiat</SelectItem>
                          <SelectItem value="15">15 jours</SelectItem>
                          <SelectItem value="30">30 jours</SelectItem>
                          <SelectItem value="45">45 jours</SelectItem>
                          <SelectItem value="60">60 jours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2 flex-1">
                      <Label htmlFor="default-vat-rate">Taux de TVA par défaut</Label>
                      <CustomInput 
                        id="default-vat-rate" 
                        type="number" 
                        defaultValue={18} 
                        suffix="%"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Options avancées</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-stock-update" className="block mb-1">Mise à jour automatique des stocks</Label>
                        <p className="text-sm text-muted-foreground">
                          Mettre à jour automatiquement les stocks lors de la validation des commandes
                        </p>
                      </div>
                      <Switch id="auto-stock-update" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="enable-sms" className="block mb-1">Notifications SMS</Label>
                        <p className="text-sm text-muted-foreground">
                          Activer les notifications SMS pour les clients et le personnel
                        </p>
                      </div>
                      <Switch id="enable-sms" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-invoice" className="block mb-1">Facturation automatique</Label>
                        <p className="text-sm text-muted-foreground">
                          Générer automatiquement les factures à la livraison
                        </p>
                      </div>
                      <Switch id="auto-invoice" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">
                Réinitialiser
              </Button>
              <Button onClick={handleSaveSystemSettings}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Onglet Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de notification</CardTitle>
              <CardDescription>
                Configurez comment et quand les notifications sont envoyées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications email</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-new-order" className="block mb-1">Nouvelle commande</Label>
                        <p className="text-sm text-muted-foreground">
                          Envoyer un email lors de la création d'une nouvelle commande
                        </p>
                      </div>
                      <Switch id="email-new-order" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-order-status" className="block mb-1">Changement de statut</Label>
                        <p className="text-sm text-muted-foreground">
                          Envoyer un email à chaque changement de statut d'une commande
                        </p>
                      </div>
                      <Switch id="email-order-status" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-invoice" className="block mb-1">Nouvelle facture</Label>
                        <p className="text-sm text-muted-foreground">
                          Envoyer un email avec la facture lors de sa création
                        </p>
                      </div>
                      <Switch id="email-invoice" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-low-stock" className="block mb-1">Alerte stock bas</Label>
                        <p className="text-sm text-muted-foreground">
                          Envoyer un email quand le stock d'un produit est bas
                        </p>
                      </div>
                      <Switch id="email-low-stock" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications SMS</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-new-order" className="block mb-1">Nouvelle commande</Label>
                        <p className="text-sm text-muted-foreground">
                          Envoyer un SMS au responsable production lors d'une nouvelle commande
                        </p>
                      </div>
                      <Switch id="sms-new-order" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-order-ready" className="block mb-1">Commande prête</Label>
                        <p className="text-sm text-muted-foreground">
                          Envoyer un SMS au client quand sa commande est prête
                        </p>
                      </div>
                      <Switch id="sms-order-ready" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="sms-payment-due" className="block mb-1">Paiement dû</Label>
                        <p className="text-sm text-muted-foreground">
                          Envoyer un SMS de rappel de paiement
                        </p>
                      </div>
                      <Switch id="sms-payment-due" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications dans l'application</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="app-all-events" className="block mb-1">Tous les événements</Label>
                        <p className="text-sm text-muted-foreground">
                          Afficher des notifications pour tous les événements du système
                        </p>
                      </div>
                      <Switch id="app-all-events" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="app-sound" className="block mb-1">Sons de notification</Label>
                        <p className="text-sm text-muted-foreground">
                          Jouer un son lors de la réception d'une notification
                        </p>
                      </div>
                      <Switch id="app-sound" defaultChecked />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotificationSettings}>
                <Save className="mr-2 h-4 w-4" />
                Enregistrer
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Onglet Sauvegardes */}
        <TabsContent value="backups">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sauvegarde de la base de données</CardTitle>
                <CardDescription>
                  Créez des sauvegardes manuelles ou planifiées
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Les sauvegardes automatiques sont effectuées quotidiennement à 23h00 et conservées pendant 30 jours.
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <Label htmlFor="auto-backup" className="block mb-1">Sauvegardes automatiques</Label>
                    </div>
                    <Switch id="auto-backup" defaultChecked />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backup-retention">Conservation des sauvegardes</Label>
                    <Select defaultValue="30">
                      <SelectTrigger id="backup-retention">
                        <SelectValue placeholder="Durée de conservation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 jours</SelectItem>
                        <SelectItem value="14">14 jours</SelectItem>
                        <SelectItem value="30">30 jours</SelectItem>
                        <SelectItem value="60">60 jours</SelectItem>
                        <SelectItem value="90">90 jours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="w-full" onClick={handleDatabaseBackup}>
                    <Download className="mr-2 h-4 w-4" />
                    Créer une sauvegarde maintenant
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Restauration de la base de données</CardTitle>
                <CardDescription>
                  Restaurez une sauvegarde précédente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <h4 className="font-medium">Dernières sauvegardes</h4>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center justify-between py-2 border-b">
                        <div>
                          <p className="font-medium">Sauvegarde automatique</p>
                          <p className="text-sm text-muted-foreground">Aujourd'hui, 23:00</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Restaurer
                        </Button>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b">
                        <div>
                          <p className="font-medium">Sauvegarde automatique</p>
                          <p className="text-sm text-muted-foreground">Hier, 23:00</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Restaurer
                        </Button>
                      </div>
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">Sauvegarde manuelle</p>
                          <p className="text-sm text-muted-foreground">15/04/2024, 15:30</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Restaurer
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-2">
                      Ou restaurez à partir d'un fichier de sauvegarde
                    </p>
                    <div className="flex items-end gap-2">
                      <div className="flex-1">
                        <Input 
                          id="backup-file" 
                          type="file" 
                          accept=".sql,.zip,.gz"
                        />
                      </div>
                      <Button onClick={handleDatabaseRestore}>
                        <Upload className="mr-2 h-4 w-4" />
                        Restaurer
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Onglet Aide */}
        <TabsContent value="help">
          <Card>
            <CardHeader>
              <CardTitle>Aide et support</CardTitle>
              <CardDescription>
                Obtenez de l'assistance et consultez la documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Documentation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Consultez notre documentation complète avec des guides pas à pas.
                    </p>
                    <Button variant="outline" className="w-full">
                      <Globe className="mr-2 h-4 w-4" />
                      Accéder
                    </Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Support technique</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Contactez notre équipe technique pour toute assistance.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>support@cornerstonebriques.com</span>
                      </div>
                      <div className="flex items-center">
                        <PhoneCall className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>+228 70 00 00 01</span>
                      </div>
                      <Button variant="outline" className="w-full mt-2">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Chat en direct
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Formation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Accédez à nos vidéos de formation pour vous aider à utiliser l'application.
                    </p>
                    <Button variant="outline" className="w-full">
                      <UserCog className="mr-2 h-4 w-4" />
                      Voir les formations
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8 border rounded-md p-6">
                <h3 className="text-lg font-medium mb-4">FAQ - Questions fréquemment posées</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Comment ajouter un nouvel utilisateur ?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Rendez-vous dans la section "Utilisateurs", cliquez sur "Nouvel utilisateur" et remplissez le formulaire.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Comment générer une facture ?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Dans la section "Commandes", sélectionnez une commande et cliquez sur "Générer une facture".
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Comment configurer les notifications SMS ?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Allez dans "Paramètres" > "Notifications" et configurez les options SMS selon vos besoins.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Comment mettre à jour mes informations d'entreprise ?</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Rendez-vous dans "Paramètres" > "Entreprise" et modifiez les informations selon vos besoins.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
