import { Json, LocationData } from './common';

export interface Profile {
  avatar_url: string | null;
  bio: string | null;
  business_owner: boolean | null;
  created_at: string;
  full_name: string | null;
  id: string;
  location_data: LocationData | null;
  preferred_currency: string | null;
  preferred_language: string | null;
  timezone: string | null;
  updated_at: string;
  username: string | null;
  email: string | null;
}

export interface ProfileInsert extends Omit<Profile, 'id' | 'created_at' | 'updated_at'> {
  id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProfileUpdate extends Partial<ProfileInsert> {}