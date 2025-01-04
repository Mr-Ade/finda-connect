import { Json } from './common';

export interface Business {
  id: string;
  owner_id: string | null;
  name: string;
  description: string | null;
  category: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string | null;
  website: string | null;
  email: string | null;
  created_at: string;
  updated_at: string;
  latitude: number | null;
  longitude: number | null;
}

export interface BusinessInsert extends Omit<Business, 'id' | 'created_at' | 'updated_at'> {
  id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BusinessUpdate extends Partial<BusinessInsert> {}