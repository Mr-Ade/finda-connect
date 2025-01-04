import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText } from "lucide-react";

// Define the category structure
const BUSINESS_CATEGORIES = {
  "Retail & Shopping": {
    "Apparel & Accessories": [
      "Clothing",
      "Shoes & Footwear",
      "Jewelry & Watches",
      "Handbags & Accessories",
      "Eyewear"
    ],
    "Books, Music & Movies": [
      "Bookstores",
      "Music Stores",
      "Video Stores",
      "Online Media Retailers"
    ],
    "Home & Garden": [
      "Furniture Stores",
      "Home Decor",
      "Appliances",
      "Garden & Landscaping Supplies",
      "Hardware Stores"
    ],
    "Gifts & Specialty": [
      "Florists",
      "Gift Shops",
      "Craft & Hobby Shops",
      "Antique Stores",
      "Specialty Food & Drink"
    ],
    "Other Retail": [
      "Pet Stores",
      "Toy Stores",
      "Sporting Goods",
      "Office Supplies",
      "Electronics Stores"
    ]
  },
  "Food & Drink": {
    "Restaurants": [
      "African Cuisine",
      "American Cuisine",
      "Italian Cuisine",
      "Mexican Cuisine",
      "Chinese Cuisine",
      "Indian Cuisine",
      "Thai Cuisine",
      "Japanese Cuisine",
      "French Cuisine",
      "Seafood Restaurants",
      "Vegan/Vegetarian Restaurants",
      "Fast Food",
      "Fine Dining"
    ],
    "Cafes & Beverages": [
      "Cafes & Coffee Shops",
      "Bars & Pubs",
      "Bakeries & Desserts",
      "Breweries, Wineries & Distilleries"
    ],
    "Food Services": [
      "Grocery Stores & Markets",
      "Caterers",
      "Food Trucks"
    ]
  },
  "Services": {
    "Professional Services": [
      "Accounting & Bookkeeping",
      "Legal Services",
      "Consulting Services",
      "Financial Services",
      "Real Estate Agents & Brokers",
      "Insurance Agents"
    ],
    "Home Services": [
      "Plumbing",
      "Electrical",
      "HVAC",
      "Cleaning Services",
      "Landscaping & Lawn Care",
      "Painting",
      "Handyman Services",
      "Moving Services"
    ],
    "Personal Services": [
      "Hair Salons & Barbershops",
      "Spas & Wellness Centers",
      "Nail Salons",
      "Massage Therapy",
      "Fitness Centers & Gyms",
      "Personal Trainers"
    ],
    "Automotive Services": [
      "Auto Repair",
      "Car Dealers",
      "Auto Detailing",
      "Tire Shops",
      "Gas Stations",
      "Towing Services"
    ]
  },
  "Health & Medical": {
    "Medical Practitioners": [
      "General Practitioners",
      "Medical Specialists",
      "Dentists",
      "Optometrists & Eye Care"
    ],
    "Medical Facilities": [
      "Hospitals & Clinics",
      "Pharmacies"
    ],
    "Alternative Medicine": [
      "Chiropractors",
      "Acupuncture",
      "Massage Therapy",
      "Naturopathic Doctors",
      "Mental Health Services"
    ]
  },
  "Education & Training": {
    "Academic Institutions": [
      "Schools (Pre-K, K-12)",
      "Colleges & Universities",
      "Trade Schools"
    ],
    "Specialized Education": [
      "Tutoring Services",
      "Language Schools",
      "Music & Art Schools",
      "Online Courses"
    ]
  },
  "Arts & Entertainment": {
    "Performing Arts": [
      "Live Theaters",
      "Music Venues",
      "Dance Studios"
    ],
    "Cultural Venues": [
      "Museums & Galleries",
      "Cinemas & Movie Theaters"
    ],
    "Entertainment Venues": [
      "Amusement Parks",
      "Nightclubs",
      "Event Venues"
    ]
  },
  "Travel & Accommodation": {
    "Lodging": [
      "Hotels",
      "Motels",
      "Bed & Breakfasts",
      "Vacation Rentals"
    ],
    "Travel Services": [
      "Travel Agencies",
      "Transportation Services",
      "Car Rental",
      "Airport Shuttles"
    ]
  }
};

// Flatten categories for the select component
const flattenCategories = () => {
  const flattened: { value: string; label: string }[] = [];
  
  Object.entries(BUSINESS_CATEGORIES).forEach(([mainCategory, subCategories]) => {
    // Add main category
    flattened.push({ value: mainCategory, label: `📁 ${mainCategory}` });
    
    Object.entries(subCategories).forEach(([subCategory, items]) => {
      // Add subcategory
      flattened.push({ value: `${mainCategory}/${subCategory}`, label: `  ↳ ${subCategory}` });
      
      // Add items
      items.forEach(item => {
        flattened.push({ 
          value: `${mainCategory}/${subCategory}/${item}`,
          label: `    • ${item}`
        });
      });
    });
  });
  
  return flattened;
};

export const ListingInfo = () => {
  const categories = flattenCategories();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 text-primary">
        <FileText className="w-5 h-5" />
        <h3 className="font-medium">Listing Info</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Listing Title</Label>
            <Input id="title" placeholder="Enter business name" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {categories.map((category) => (
                    <SelectItem 
                      key={category.value} 
                      value={category.value}
                      className="whitespace-nowrap"
                    >
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="keywords">Keywords</Label>
              <Input id="keywords" placeholder="Type keywords separated by commas" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">About Listing</Label>
            <Textarea 
              id="description" 
              placeholder="Describe your business"
              className="min-h-[120px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};