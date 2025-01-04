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