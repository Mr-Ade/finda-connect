import type { Database } from "./database";

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

export type UserRole = Database['public']['Enums']['user_role'];

export interface Profile extends Tables<'profiles'> {
  email?: string;
  role: UserRole;
  is_active: boolean;
  is_admin: boolean;
  super_admin: boolean;
  last_seen: string;
}