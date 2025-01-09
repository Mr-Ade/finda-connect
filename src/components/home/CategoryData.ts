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
    subcategories: [
      "Apparel & Accessories",
      "Books & Media",
      "Home & Garden",
      "Electronics",
      "Gifts & Specialty",
      "Sporting Goods"
    ]
  },
  {
    name: "Food & Drink",
    icon: Utensils,
    count: 0,
    subcategories: [
      "Restaurants",
      "Cafes & Coffee Shops",
      "Bars & Pubs",
      "Bakeries & Desserts",
      "Grocery Stores",
      "Food Trucks"
    ]
  },
  {
    name: "Professional Services",
    icon: Briefcase,
    count: 0,
    subcategories: [
      "Legal Services",
      "Financial Services",
      "Real Estate",
      "Insurance",
      "Consulting",
      "Marketing"
    ]
  },
  {
    name: "Health & Medical",
    icon: Stethoscope,
    count: 0,
    subcategories: [
      "Doctors & Physicians",
      "Dentists",
      "Hospitals & Clinics",
      "Pharmacies",
      "Mental Health",
      "Alternative Medicine"
    ]
  },
  {
    name: "Personal Services",
    icon: Scissors,
    count: 0,
    subcategories: [
      "Hair Salons",
      "Spas & Wellness",
      "Nail Salons",
      "Fitness Centers",
      "Beauty Services",
      "Personal Training"
    ]
  },
  {
    name: "Home Services",
    icon: Home,
    count: 0,
    subcategories: [
      "Plumbing",
      "Electrical",
      "HVAC",
      "Cleaning",
      "Landscaping",
      "Handyman"
    ]
  }
];

export const ADDITIONAL_CATEGORIES: Category[] = [
  {
    name: "Automotive",
    icon: Car,
    count: 0,
    subcategories: [
      "Auto Repair",
      "Car Dealers",
      "Auto Detailing",
      "Tire Shops",
      "Gas Stations",
      "Towing"
    ]
  },
  {
    name: "Arts & Entertainment",
    icon: Palette,
    count: 0,
    subcategories: [
      "Theaters",
      "Museums",
      "Music Venues",
      "Art Galleries",
      "Movie Theaters",
      "Event Venues"
    ]
  },
  {
    name: "Education & Training",
    icon: GraduationCap,
    count: 0,
    subcategories: [
      "Schools",
      "Universities",
      "Trade Schools",
      "Tutoring",
      "Language Schools",
      "Art Schools"
    ]
  },
  {
    name: "Travel & Transportation",
    icon: Plane,
    count: 0,
    subcategories: [
      "Hotels",
      "Travel Agencies",
      "Car Rental",
      "Transportation",
      "Airport Shuttles",
      "Vacation Rentals"
    ]
  },
  {
    name: "Technology",
    icon: Laptop,
    count: 0,
    subcategories: [
      "Computer Services",
      "Web Development",
      "IT Support",
      "Software Services",
      "Digital Marketing",
      "Tech Repair"
    ]
  },
  {
    name: "Event Services",
    icon: Music,
    count: 0,
    subcategories: [
      "Event Planning",
      "Catering",
      "Photography",
      "Videography",
      "DJs & Musicians",
      "Event Rentals"
    ]
  }
];