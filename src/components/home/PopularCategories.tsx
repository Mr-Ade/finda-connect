import { Building2, Utensils, Scissors, Wrench, ShoppingBag, Laptop, Stethoscope, Brush } from "lucide-react";

const CATEGORIES = [
  { name: "Real Estate", icon: Building2, count: 48 },
  { name: "Restaurants", icon: Utensils, count: 92 },
  { name: "Beauty & Spa", icon: Scissors, count: 54 },
  { name: "Home Services", icon: Wrench, count: 76 },
  { name: "Shopping", icon: ShoppingBag, count: 89 },
  { name: "Technology", icon: Laptop, count: 42 },
  { name: "Healthcare", icon: Stethoscope, count: 36 },
  { name: "Art & Design", icon: Brush, count: 28 },
];

export const PopularCategories = () => {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Popular Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore some of the most searched categories across our platform
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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