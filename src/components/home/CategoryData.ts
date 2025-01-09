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
}

export const INITIAL_CATEGORIES: Category[] = [
  { name: "Retail & Shopping", icon: Store, count: 0 },
  { name: "Food & Drink", icon: Utensils, count: 0 },
  { name: "Services", icon: Building2, count: 0 },
  { name: "Health & Medical", icon: Stethoscope, count: 0 },
  { name: "Education & Training", icon: GraduationCap, count: 0 },
  { name: "Arts & Entertainment", icon: Brush, count: 0 },
  { name: "Travel & Accommodation", icon: Hotel, count: 0 },
];

export const ADDITIONAL_CATEGORIES: Category[] = [
  { name: "Apparel & Accessories", icon: Shirt, count: 0 },
  { name: "Books, Music & Movies", icon: Book, count: 0 },
  { name: "Home & Garden", icon: Home, count: 0 },
  { name: "Gifts & Specialty", icon: Gift, count: 0 },
  { name: "Restaurants", icon: UtensilsCrossed, count: 0 },
  { name: "Cafes & Beverages", icon: Coffee, count: 0 },
  { name: "Professional Services", icon: Briefcase, count: 0 },
  { name: "Personal Services", icon: Bath, count: 0 },
  { name: "Entertainment Venues", icon: Music, count: 0 },
  { name: "Medical Services", icon: HeartPulse, count: 0 },
  { name: "Educational Services", icon: School, count: 0 },
  { name: "Grocery & Markets", icon: ShoppingCart, count: 0 },
  { name: "Jewelry & Watches", icon: Watch, count: 0 },
  { name: "Eyewear & Opticals", icon: Glasses, count: 0 },
  { name: "Florists", icon: Flower, count: 0 },
  { name: "Art Galleries", icon: Palette, count: 0 },
  { name: "Gaming & Hobbies", icon: GamepadIcon, count: 0 },
  { name: "Printing Services", icon: Printer, count: 0 },
  { name: "Photography", icon: Camera, count: 0 },
  { name: "Childcare Services", icon: Baby, count: 0 },
  { name: "Bars & Nightlife", icon: Wine, count: 0 },
  { name: "Real Estate", icon: Building, count: 0 },
  { name: "Hardware & Tools", icon: Hammer, count: 0 },
  { name: "Hotels & Lodging", icon: Bed, count: 0 },
  { name: "Air Travel", icon: Plane, count: 0 },
  { name: "Public Transport", icon: Bus, count: 0 }
];