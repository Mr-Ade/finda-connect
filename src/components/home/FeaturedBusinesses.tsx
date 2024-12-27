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
  {
    id: "4",
    name: "Urban Fitness Center",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    category: "Fitness",
    rating: 4.6,
    reviewCount: 112,
    location: "Downtown",
  },
  {
    id: "5",
    name: "The Green Garden",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17",
    category: "Restaurant",
    rating: 4.9,
    reviewCount: 178,
    location: "Eastside",
  },
  {
    id: "6",
    name: "Tech Hub Repairs",
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc",
    category: "Technology",
    rating: 4.7,
    reviewCount: 143,
    location: "Midtown",
  },
  {
    id: "7",
    name: "Artisan Bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    category: "Bakery",
    rating: 4.8,
    reviewCount: 165,
    location: "Downtown",
  },
  {
    id: "8",
    name: "Sunset Yoga Studio",
    image: "https://images.unsplash.com/photo-1588286840104-8957b019727f",
    category: "Fitness",
    rating: 4.6,
    reviewCount: 98,
    location: "Westside",
  }
];

export const FeaturedBusinesses = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Businesses</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover top-rated local businesses and services in your area
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {FEATURED_BUSINESSES.slice(0, 8).map((business) => (
            <BusinessCard key={business.id} {...business} />
          ))}
        </div>
      </div>
    </section>
  );
};