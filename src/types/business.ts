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
  status: string;
  approved_at?: string;
  approved_by?: string;
  hero_image?: string;
  gallery_images?: string[];
  menu_categories?: string[];
  business_hours?: BusinessHour[];
  amenities?: Json | { [key: string]: boolean };
  faqs?: {
    question: string;
    answer: string;
  }[];
  delivery_info?: {
    available: boolean;
    minimum_order?: number;
    fee?: number;
    estimated_time?: string;
  };
  social_links?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  
  // Related tables
  business_photos?: {
    id: string;
    photo_url: string;
    caption?: string;
    order_index: number;
  }[];
  
  menu_items?: MenuItem[];
  
  reviews?: Review[];
  
  owner?: {
    username?: string;
    avatar_url?: string;
    full_name?: string;
  };

  is_open?: boolean;
  price_range?: string | null;
  claimed?: boolean;
}

export interface MenuItem {
  id: string;
  business_id: string;
  name: string;
  description?: string | null;
  price: number;
  image_url?: string | null;
  category?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  helpful_count: number;
  reply_count: number;
  user_id: string;
  profiles: {
    username: string;
    avatar_url: string;
    full_name: string;
  };
  review_photos: {
    id: string;
    photo_url: string;
  }[];
  review_responses: {
    id: string;
    response_text: string;
    created_at: string;
  }[];
}

export interface BusinessHour {
  id: string;
  day_of_week: number;
  open_time: string;
  close_time: string;
  is_closed: boolean;
}

export interface CommunityQuestion {
  id: string;
  question: string;
  answer: string;
  askedBy: string;
  answeredBy: string;
  date: string;
  helpful?: number;
  notHelpful?: number;
}
