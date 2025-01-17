import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

type UserRole = 'user' | 'admin' | 'super_admin' | 'business_owner';

interface UserRoleManagerProps {
  userId: string;
  currentRole: UserRole;
  isActive?: boolean;
  onUpdate: () => void;
}

export const UserRoleManager = ({ 
  userId, 
  currentRole, 
  isActive = true,
  onUpdate 
}: UserRoleManagerProps) => {
  const [role, setRole] = useState<UserRole>(currentRole);
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();

  const handleRoleChange = async (newRole: UserRole) => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          role: newRole,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;

      setRole(newRole);
      toast({
        title: "Role updated",
        description: "User role has been successfully updated.",
      });
      onUpdate();
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleStatusToggle = async () => {
    setUpdating(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          is_active: !isActive,
          updated_at: new Date().toISOString()
        })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: isActive ? "User Deactivated" : "User Activated",
        description: `User has been successfully ${isActive ? 'deactivated' : 'activated'}.`,
      });
      onUpdate();
    } catch (error) {
      console.error('Error toggling user status:', error);
      toast({
        title: "Error",
        description: "Failed to update user status.",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Select
        value={role}
        onValueChange={(value: UserRole) => handleRoleChange(value)}
        disabled={updating}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
          <SelectItem value="super_admin">Super Admin</SelectItem>
          <SelectItem value="business_owner">Business Owner</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant={isActive ? "destructive" : "default"}
        onClick={handleStatusToggle}
        disabled={updating}
      >
        {isActive ? "Deactivate" : "Activate"}
      </Button>
    </div>
  );
};