import { 
  Building2, Store, Utensils, Scissors, Wrench, ShoppingBag, 
  Laptop, Stethoscope, Brush, GraduationCap, Car, Hotel,
  Shirt, Book, Home, Gift, UtensilsCrossed, Coffee, 
  Briefcase, Bath, Music, HeartPulse, School, ShoppingCart, 
  Watch, Glasses, Flower, Palette, GamepadIcon, Printer, 
  Camera, Baby, Wine, Building, Hammer, Bed, Plane, Bus
} from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Category {
  name: string;
  icon: LucideIcon;
  count: number;
  subcategories?: string[];
}

export const INITIAL_CATEGORIES: Category[] = [
  { 
    name: "Retail & Shopping", 
    icon: Store, 
    count: 0,
    subcategories: ["Department Stores", "Malls", "Boutiques", "Specialty Stores", "Outlets"]
  },
  { 
    name: "Food & Drink", 
    icon: Utensils, 
    count: 0,
    subcategories: ["Fine Dining", "Casual Dining", "Fast Food", "Food Trucks", "Bars & Pubs"]
  },
  { 
    name: "Services", 
    icon: Building2, 
    count: 0,
    subcategories: ["Financial Services", "Legal Services", "Consulting", "Marketing", "Insurance"]
  },
  { 
    name: "Health & Medical", 
    icon: Stethoscope, 
    count: 0,
    subcategories: ["Hospitals", "Clinics", "Dental Care", "Pharmacies", "Mental Health"]
  },
  { 
    name: "Education & Training", 
    icon: GraduationCap, 
    count: 0,
    subcategories: ["Schools", "Universities", "Training Centers", "Tutoring", "Language Schools"]
  },
  { 
    name: "Arts & Entertainment", 
    icon: Brush, 
    count: 0,
    subcategories: ["Theaters", "Museums", "Art Galleries", "Music Venues", "Comedy Clubs"]
  },
  { 
    name: "Travel & Accommodation", 
    icon: Hotel, 
    count: 0,
    subcategories: ["Hotels", "Resorts", "Hostels", "Vacation Rentals", "Travel Agencies"]
  }
];

export const ADDITIONAL_CATEGORIES: Category[] = [
  { 
    name: "Apparel & Accessories", 
    icon: Shirt, 
    count: 0,
    subcategories: ["Men's Clothing", "Women's Clothing", "Children's Clothing", "Shoes", "Accessories"]
  },
  { 
    name: "Books, Music & Movies", 
    icon: Book, 
    count: 0,
    subcategories: ["Bookstores", "Music Stores", "Movie Theaters", "Record Shops", "Libraries"]
  },
  { 
    name: "Home & Garden", 
    icon: Home, 
    count: 0,
    subcategories: ["Furniture", "Garden Centers", "Home Decor", "Hardware", "Appliances"]
  },
];
