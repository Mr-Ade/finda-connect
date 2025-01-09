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
    name: "Restaurants & Food",
    icon: Utensils,
    count: 0,
    subcategories: [
      "Restaurants",
      "Cafes",
      "Fast Food",
      "Food Delivery",
      "Bakeries",
      "Bars & Pubs"
    ]
  },
  {
    name: "Shopping & Retail",
    icon: Store,
    count: 0,
    subcategories: [
      "Clothing Stores",
      "Electronics",
      "Grocery Stores",
      "Shopping Centers",
      "Specialty Stores"
    ]
  },
  {
    name: "Health & Medical",
    icon: Stethoscope,
    count: 0,
    subcategories: [
      "Doctors",
      "Dentists",
      "Hospitals",
      "Pharmacies",
      "Mental Health"
    ]
  },
  {
    name: "Services",
    icon: Briefcase,
    count: 0,
    subcategories: [
      "Financial Services",
      "Legal Services",
      "Real Estate",
      "Insurance",
      "Consulting"
    ]
  },
  {
    name: "Beauty & Spas",
    icon: Scissors,
    count: 0,
    subcategories: [
      "Hair Salons",
      "Nail Salons",
      "Spas",
      "Barber Shops",
      "Beauty Supplies"
    ]
  },
  {
    name: "Automotive",
    icon: Car,
    count: 0,
    subcategories: [
      "Auto Repair",
      "Car Dealers",
      "Car Wash",
      "Gas Stations",
      "Parking"
    ]
  },
  {
    name: "Home Services",
    icon: Home,
    count: 0,
    subcategories: [
      "Contractors",
      "Plumbers",
      "Electricians",
      "Landscaping",
      "Cleaning"
    ]
  }
];

export const ADDITIONAL_CATEGORIES: Category[] = [
  {
    name: "Entertainment",
    icon: Music,
    count: 0,
    subcategories: [
      "Movie Theaters",
      "Music Venues",
      "Arts & Culture",
      "Nightlife",
      "Gaming"
    ]
  },
  {
    name: "Education",
    icon: GraduationCap,
    count: 0,
    subcategories: [
      "Schools",
      "Tutoring",
      "Training Centers",
      "Language Schools",
      "Art Classes"
    ]
  },
  {
    name: "Travel & Hotels",
    icon: Hotel,
    count: 0,
    subcategories: [
      "Hotels",
      "Travel Agencies",
      "Transportation",
      "Vacation Rentals",
      "Tours"
    ]
  }
];