import { Database } from "./supabase/database";

export type Profile = Database['public']['Tables']['profiles']['Row'] & {
  email?: string;
};

export type ProfileUpdatePayload = Partial<Profile>;

export type ProfileUpdate = {
  type: 'UPDATE' | 'DELETE';
  payload: ProfileUpdatePayload;
};