import { Navbar } from "@/components/Navbar";
import { SearchBar } from "@/components/SearchBar";
import { BusinessCard } from "@/components/BusinessCard";

const FEATURED_BUSINESSES = [
  {
    id: "1",
    name: "The Cozy Corner Café",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24",
    category: "Coffee & Tea",
    rating: 4.5,
    reviewCount: 127,
    location: "Downtown",
  },
  {
    id: "2",
    name: "Fresh Fusion Restaurant",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    category: "Restaurant",
    rating: 4.8,
    reviewCount: 89,
    location: "Midtown",
  },
  {
    id: "3",
    name: "Zen Spa & Wellness",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
    category: "Spa",
    rating: 4.7,
    reviewCount: 156,
    location: "Westside",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover the Best Local Businesses
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Find, review, and connect with the best businesses in your area
          </p>
          <div className="flex justify-center">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Businesses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURED_BUSINESSES.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Restaurants", "Shopping", "Beauty & Spa", "Home Services"].map(
              (category) => (
                <div
                  key={category}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center cursor-pointer"
                >
                  <h3 className="font-semibold">{category}</h3>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;