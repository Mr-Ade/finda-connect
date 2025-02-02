export interface Profile {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  business_owner?: boolean;
  created_at: string;
  updated_at: string;
  location_data?: any;
  preferred_currency?: string;
  preferred_language?: string;
  timezone?: string;
  bio?: string;
  mobile?: string;
  state?: string;
  city?: string;
  address?: string;
  zip_code?: string;
  is_admin?: boolean;
  last_seen?: string;
  super_admin?: boolean;
  website?: string;
  role?: string;
  is_active?: boolean;
  email?: string;
}