export interface BusinessFormData {
  // Basic Info
  name: string;
  description: string;
  category: string;
  keywords: string[];
  
  // Location
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  website: string;

  // Social Links
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;

  // Working Hours
  workingHours: {
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
    isClosed: boolean;
  }[];

  // Menu Items
  menuItems: {
    name: string;
    description?: string;
    price: number;
    category?: string;
    imageUrl?: string;
  }[];

  // Amenities
  amenities: {
    name: string;
    available: boolean;
  }[];
}

export interface Business {
  id: string;
  owner_id?: string;
  name: string;
  description?: string;
  category: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone?: string;
  website?: string;
  email?: string;
  created_at: string;
  updated_at: string;
  latitude?: number;
  longitude?: number;
  
  business_photos?: Array<{
    id: string;
    photo_url: string;
    caption?: string;
    order_index: number;
  }>;
  
  menu_items?: Array<{
    id: string;
    name: string;
    description?: string;
    price: number;
    image_url?: string;
    category?: string;
  }>;
  
  business_hours?: Array<{
    id: string;
    day_of_week: number;
    open_time: string;
    close_time: string;
    is_closed: boolean;
  }>;
  
  reviews?: Array<{
    id: string;
    rating: number;
    comment: string;
    created_at: string;
    profiles: {
      username: string;
      avatar_url: string;
    };
    review_responses?: Array<{
      id: string;
      response_text: string;
      created_at: string;
    }>;
    review_photos?: Array<{
      id: string;
      photo_url: string;
    }>;
  }>;
  
  owner?: {
    username?: string;
    avatar_url?: string;
    full_name?: string;
  };
}
