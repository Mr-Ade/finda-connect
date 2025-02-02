// Import only the essential types from the large types.ts file
import type { Database as SupabaseDatabase } from "@/integrations/supabase/types";

export type Database = SupabaseDatabase;

// Add commonly used type helpers
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T];

// Add type guards for runtime checking
export const isBusinessRow = (obj: unknown): obj is Tables<'businesses'> => {
  return typeof obj === 'object' && obj !== null && 'id' in obj && 'name' in obj;
};

export const isProfileRow = (obj: unknown): obj is Tables<'profiles'> => {
  return typeof obj === 'object' && obj !== null && 'id' in obj && 'role' in obj;
};