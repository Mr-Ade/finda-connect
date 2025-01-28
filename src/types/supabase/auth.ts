import type { Database } from "./database";

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type UserRole = Database['public']['Enums']['user_role'];

export interface AuthUser extends Profile {
  email?: string;
  role: UserRole;
}