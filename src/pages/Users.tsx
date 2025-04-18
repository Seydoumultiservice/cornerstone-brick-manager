
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Edit, 
  Lock, 
  PlusCircle, 
  Search, 
  Shield, 
  Trash, 
  User as UserIcon,
  Users as UsersIcon
} from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { UserTable } from "@/components/users/UserTable";
import { UserForm } from "@/components/users/UserForm";

// Utilisateurs fictifs pour la démo
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin Système",
    email: "contact@cornerstonebriques.com",
    role: "ADMIN",
    phone: "+228 70 12 34 56"
  },
  {
    id: "2",
    name: "Koffi Mensah",
    email: "k.mensah@cornerstonebriques.com",
    role: "RESPONSABLE_PROD",
    phone: "+228 91 23 45 67"
  },
  {
    id: "3",
    name: "Afia Abla",
    email: "a.abla@cornerstonebriques.com",
    role: "COMMERCIAL",
    phone: "+228 96 54 32 10"
  },
  {
    id: "4",
    name: "Komi Agbeko",
    email: "k.agbeko@cornerstonebriques.com",
    role: "COMPTABLE",
    phone: "+228 97 65 43 21"
  },
  {
    id: "5",
    name: "Yao Mawuli",
    email: "y.mawuli@cornerstonebriques.com",
    role: "OUVRIER",
    phone: "+228 99 88 77 66"
  }
];

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [isRolesDialogOpen, setIsRolesDialogOpen] = useState(false);
  
  // Filtrer les utilisateurs en fonction de la recherche
  const filteredUsers = mockUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleAddUser = () => {
    setIsAddUserDialogOpen(false);
    toast.success("Utilisateur ajouté avec succès", {
      description: "L'utilisateur a été créé et un email d'invitation a été envoyé"
    });
  };
  
  const handleSaveRoles = () => {
    setIsRolesDialogOpen(false);
    toast.success("Rôles et permissions mis à jour", {
      description: "Les modifications ont été enregistrées"
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Utilisateurs</h1>
          <p className="text-muted-foreground">Gérez les utilisateurs du système et leurs permissions</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog open={isRolesDialogOpen} onOpenChange={setIsRolesDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Rôles et permissions
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Gestion des rôles et permissions</DialogTitle>
                <DialogDescription>
                  Configurez les accès et permissions pour chaque rôle utilisateur
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 space-y-4">
                <Tabs defaultValue="admin">
                  <TabsList className="grid grid-cols-5 w-full">
                    <TabsTrigger value="admin">Admin</TabsTrigger>
                    <TabsTrigger value="commercial">Commercial</TabsTrigger>
                    <TabsTrigger value="prod">Production</TabsTrigger>
                    <TabsTrigger value="comptable">Comptable</TabsTrigger>
                    <TabsTrigger value="ouvrier">Ouvrier</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="admin" className="space-y-4 mt-4">
                    <div className="text-sm text-muted-foreground mb-2">
                      Les administrateurs ont accès à toutes les fonctionnalités. Vous pouvez restreindre certains accès si nécessaire.
                    </div>
                    <div className="space-y-2">
                      {["Tableau de bord", "Commandes", "Production", "Comptabilité", "Utilisateurs", "Paramètres"].map((module) => (
                        <div key={module} className="flex items-center space-x-2">
                          <Checkbox id={`admin-${module}`} defaultChecked />
                          <label
                            htmlFor={`admin-${module}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {module}
                          </label>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="commercial" className="space-y-4 mt-4">
                    <div className="text-sm text-muted-foreground mb-2">
                      Les commerciaux ont accès à la gestion des commandes, des clients et des devis.
                    </div>
                    <div className="space-y-2">
                      {["Tableau de bord", "Commandes", "Devis", "Clients"].map((module, index) => (
                        <div key={module} className="flex items-center space-x-2">
                          <Checkbox id={`commercial-${module}`} defaultChecked={index < 3} />
                          <label
                            htmlFor={`commercial-${module}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {module}
                          </label>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  {/* Autres TabsContent pour les rôles restants... */}
                </Tabs>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsRolesDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleSaveRoles}>
                  Enregistrer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nouvel utilisateur
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Ajouter un nouvel utilisateur</DialogTitle>
                <DialogDescription>
                  Créez un compte pour un nouveau membre de l'équipe
                </DialogDescription>
              </DialogHeader>
              
              <UserForm onSubmit={handleAddUser} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Liste des utilisateurs</CardTitle>
              <CardDescription>
                {filteredUsers.length} utilisateurs au total
              </CardDescription>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <UserTable users={filteredUsers} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Users;
