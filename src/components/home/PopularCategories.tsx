import { 
  Building2, Utensils, Scissors, Wrench, ShoppingBag, 
  Laptop, Stethoscope, Brush, GraduationCap, Car, 
  Dumbbell, Hotel, Music2, Shirt, BookOpen, 
  UtensilsCrossed, Church, Briefcase, Camera, Store, 
  Warehouse, Palmtree
} from "lucide-react";

const CATEGORIES = [
  { name: "Real Estate", icon: Building2, count: 48 },
  { name: "Restaurants", icon: Utensils, count: 92 },
  { name: "Fashion & Tailoring", icon: Scissors, count: 154 },
  { name: "Artisans & Repairs", icon: Wrench, count: 176 },
  { name: "Markets & Shops", icon: ShoppingBag, count: 289 },
  { name: "Technology", icon: Laptop, count: 82 },
  { name: "Healthcare", icon: Stethoscope, count: 66 },
  { name: "Events & Entertainment", icon: Music2, count: 128 },
  { name: "Education", icon: GraduationCap, count: 95 },
  { name: "Automotive", icon: Car, count: 73 },
  { name: "Sports & Fitness", icon: Dumbbell, count: 51 },
  { name: "Hotels & Lodging", icon: Hotel, count: 87 },
  { name: "Traditional Wear", icon: Shirt, count: 112 },
  { name: "Religious Centers", icon: Church, count: 156 },
  { name: "Professional Services", icon: Briefcase, count: 94 },
  { name: "Photography & Arts", icon: Camera, count: 68 },
  { name: "Supermarkets", icon: Store, count: 77 },
  { name: "Wholesale & Distribution", icon: Warehouse, count: 83 },
  { name: "Local Cuisine", icon: UtensilsCrossed, count: 167 },
  { name: "Books & Stationery", icon: BookOpen, count: 45 },
  { name: "Tourism & Travel", icon: Palmtree, count: 58 },
  { name: "Art & Culture", icon: Brush, count: 72 }
];

export const PopularCategories = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore some of the most searched business categories across Nigeria
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.name}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 text-center cursor-pointer border border-gray-100 hover:border-primary hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white text-primary transition-colors">
                  <Icon size={32} />
                </div>
                <h3 className="font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} Listings</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};