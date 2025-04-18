
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Edit, Lock, Trash } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { UserForm } from "./UserForm";

interface UserTableProps {
  users: User[];
}

export const UserTable = ({ users }: UserTableProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };
  
  const handleResetPassword = (user: User) => {
    setSelectedUser(user);
    setIsResetPasswordDialogOpen(true);
  };
  
  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };
  
  const handleUpdateUser = () => {
    setIsEditDialogOpen(false);
    toast.success("Utilisateur mis à jour avec succès", {
      description: "Les modifications ont été enregistrées"
    });
  };
  
  const handleConfirmResetPassword = () => {
    setIsResetPasswordDialogOpen(false);
    toast.success("Email de réinitialisation envoyé", {
      description: `Un email a été envoyé à ${selectedUser?.email}`
    });
  };
  
  const handleConfirmDelete = () => {
    setIsDeleteDialogOpen(false);
    toast.success("Utilisateur supprimé avec succès", {
      description: `L'utilisateur ${selectedUser?.name} a été supprimé`
    });
  };
  
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <Badge className="bg-red-500">Administrateur</Badge>;
      case "COMMERCIAL":
        return <Badge className="bg-blue-500">Commercial</Badge>;
      case "RESPONSABLE_PROD":
        return <Badge className="bg-green-500">Resp. Production</Badge>;
      case "COMPTABLE":
        return <Badge className="bg-yellow-500">Comptable</Badge>;
      case "OUVRIER":
        return <Badge className="bg-gray-500">Ouvrier</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };
  
  return (
    <>
      <div className="relative overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleResetPassword(user)}>
                      <Lock className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(user)}>
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  Aucun utilisateur trouvé
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Dialog for editing user */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Modifier l'utilisateur</DialogTitle>
            <DialogDescription>
              Mettez à jour les informations de l'utilisateur
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <UserForm user={selectedUser} onSubmit={handleUpdateUser} />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Dialog for resetting password */}
      <Dialog open={isResetPasswordDialogOpen} onOpenChange={setIsResetPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Réinitialiser le mot de passe</DialogTitle>
            <DialogDescription>
              Un email de réinitialisation du mot de passe sera envoyé à l'utilisateur.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 text-center">
            <Lock className="h-16 w-16 mx-auto text-yellow-500 mb-2" />
            <p>Envoyer un lien de réinitialisation à :</p>
            <p className="font-bold mt-1">{selectedUser?.email}</p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResetPasswordDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleConfirmResetPassword}>
              Envoyer l'email
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Dialog for deleting user */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Supprimer l'utilisateur</DialogTitle>
            <DialogDescription>
              Cette action est irréversible. L'utilisateur ne pourra plus se connecter au système.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 text-center">
            <Trash className="h-16 w-16 mx-auto text-red-500 mb-2" />
            <p>Êtes-vous sûr de vouloir supprimer :</p>
            <p className="font-bold mt-1">{selectedUser?.name}</p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
