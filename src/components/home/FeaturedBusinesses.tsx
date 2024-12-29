import { BusinessCard } from "@/components/BusinessCard";

const FEATURED_BUSINESSES = [
  {
    id: "1",
    name: "Pretty Woman Smart Batra",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035",
    category: "Beauty & Makeup",
    rating: 4.8,
    reviewCount: 46,
    location: "California, USA",
    isOpen: false,
    isFeatured: false
  },
  {
    id: "2",
    name: "The Sartaj Blue Night",
    image: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e",
    category: "Night Party",
    rating: 4.1,
    reviewCount: 17,
    location: "San Francisco, USA",
    isOpen: true,
    isFeatured: true
  },
  {
    id: "3",
    name: "Pizza Delight Cafe Shop",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    category: "Coffee & Bars",
    rating: 3.6,
    reviewCount: 30,
    location: "102 Safirio, Canada",
    isOpen: true,
    isFeatured: false
  },
  {
    id: "4",
    name: "The Great Allante Shop",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    category: "Shopping Mall",
    rating: 2.3,
    reviewCount: 42,
    location: "Oliy Denver, USA",
    isOpen: false,
    isFeatured: true
  },
  {
    id: "5",
    name: "Unisex Blue Spa Massage",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef",
    category: "Spa",
    rating: 4.2,
    reviewCount: 12,
    location: "Warmingham, London",
    isOpen: true,
    isFeatured: false
  },
  {
    id: "6",
    name: "Washington, Canada",
    image: "https://images.unsplash.com/photo-1588702547919-26089e690ecc",
    category: "Technology",
    rating: 2.7,
    reviewCount: 36,
    location: "Liverpool, London",
    isOpen: false,
    isFeatured: true
  },
  {
    id: "7",
    name: "Ubber Shopping Services",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    category: "Shopping",
    rating: 4.3,
    reviewCount: 22,
    location: "Metrio General Store",
    isOpen: false,
    isFeatured: false
  },
  {
    id: "8",
    name: "Rajwara Marriage Home",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552",
    category: "Wedding",
    rating: 3.5,
    reviewCount: 12,
    location: "Old California, USA",
    isOpen: true,
    isFeatured: true
  }
];

export const FeaturedBusinesses = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="mb-8 text-center">
          <span className="text-primary text-sm">Featured Listings</span>
          <h2 className="text-3xl font-bold mt-2">Featured Businesses</h2>
          <div className="flex flex-wrap gap-2 mt-4 justify-center items-center">
            <button className="px-4 py-2 rounded-full bg-primary text-white">Places</button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-100">Events</button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-100">Doctors</button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-100">Cars</button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-100">Real Estate</button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-100">Hotels</button>
            <button className="px-4 py-2 rounded-full hover:bg-gray-100">jobs</button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {FEATURED_BUSINESSES.map((business) => (
            <BusinessCard key={business.id} {...business} />
          ))}
        </div>
      </div>
    </section>
  );
};
