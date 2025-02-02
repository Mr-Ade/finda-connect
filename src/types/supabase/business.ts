import type { Database } from "./database";

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];

export type Business = Tables<'businesses'>;
export type BusinessHour = Tables<'business_hours'>;
export type BusinessPhoto = Tables<'business_photos'>;
export type BusinessReview = Tables<'business_reviews'>;
export type MenuItem = Tables<'menu_items'>;