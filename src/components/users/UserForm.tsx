
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, UserRole } from "@/types";
import { DialogFooter } from "@/components/ui/dialog";

interface UserFormProps {
  user?: User;
  onSubmit: () => void;
}

export const UserForm = ({ user, onSubmit }: UserFormProps) => {
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState<UserRole | "">(user?.role || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [sendInvitation, setSendInvitation] = useState(!user);
  
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setPhone(user.phone || "");
    }
  }, [user]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dans un cas réel, nous enverrions les données au serveur ici
    onSubmit();
  };
  
  const isEditing = !!user;
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="role">Rôle</Label>
          <Select 
            value={role} 
            onValueChange={(value) => setRole(value as UserRole)}
            required
          >
            <SelectTrigger id="role">
              <SelectValue placeholder="Sélectionner un rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Administrateur</SelectItem>
              <SelectItem value="COMMERCIAL">Commercial</SelectItem>
              <SelectItem value="RESPONSABLE_PROD">Responsable Production</SelectItem>
              <SelectItem value="COMPTABLE">Comptable</SelectItem>
              <SelectItem value="OUVRIER">Ouvrier</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+228 XX XX XX XX"
          />
        </div>
        
        {!isEditing && (
          <div className="flex items-center space-x-2 pt-2">
            <input
              type="checkbox"
              id="send-invitation"
              checked={sendInvitation}
              onChange={(e) => setSendInvitation(e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="send-invitation" className="text-sm">
              Envoyer un email d'invitation
            </Label>
          </div>
        )}
      </div>
      
      <DialogFooter>
        <Button type="submit">
          {isEditing ? "Mettre à jour" : "Ajouter l'utilisateur"}
        </Button>
      </DialogFooter>
    </form>
  );
};
