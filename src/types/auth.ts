
import type { Session, User } from "@supabase/supabase-js";

export interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

export type UserRole = 'customer' | 'business_owner' | 'admin' | 'super_admin' | 'content_manager';

export interface UserPermission {
  resource: string;
  action: 'read' | 'create' | 'update' | 'delete' | 'manage' | 'approve';
}

export interface RolePermissions {
  [key: string]: UserPermission[];
}
