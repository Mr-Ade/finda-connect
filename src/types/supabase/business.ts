import type { Database } from "./database";

export type Business = Database['public']['Tables']['businesses']['Row'] & {
  business_photos?: BusinessPhoto[];
  business_hours?: BusinessHour[];
  reviews?: Review[];
  owner?: Profile;
};

export type BusinessPhoto = Database['public']['Tables']['business_photos']['Row'];
export type BusinessHour = Database['public']['Tables']['business_hours']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type Profile = Database['public']['Tables']['profiles']['Row'];

export interface BusinessWithStats extends Business {
  rating: number;
  reviewCount: number;
  isOpen: boolean;
}