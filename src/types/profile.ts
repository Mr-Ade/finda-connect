
import { Database } from "@/integrations/supabase/types";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import { UserRole } from "./auth";

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type ProfileUpdatePayload = {
  username: string | null;
  full_name: string | null;
  bio: string | null;
  mobile: string | null;
  state: string | null;
  city: string | null;
  address: string | null;
  zip_code: string | null;
  role: UserRole | null;
};

export type ProfileUpdate = RealtimePostgresChangesPayload<ProfileUpdatePayload>;

export interface KYCProfile extends Profile {
  verification_status?: string;
}
