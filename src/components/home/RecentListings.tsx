import { Card } from "@/components/ui/card";
import { Heart, MapPin, Mail, Star, Wifi, Car, Dog, Fan } from "lucide-react";

const RECENT_LISTINGS = [
  {
    id: 1,
    title: "Rajwara Marriage Home",
    category: ["LOVE", "WEDDING"],
    rating: 4.4,
    reviews: 32,
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    location: "Meltron Silver, UK",
    isOpen: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1519741497674-611481863552",
    authorImage: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    title: "Decathlon Sport House",
    category: ["WORKOUT", "FITNESS"],
    rating: 3.4,
    reviews: 19,
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    location: "California, USA",
    isOpen: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    authorImage: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 3,
    title: "The Gold Hotel Lalit",
    category: ["HOTEL", "VILLA"],
    rating: 2.8,
    reviews: 30,
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    location: "Montreal, Australia",
    isOpen: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
    authorImage: "https://randomuser.me/api/portraits/men/2.jpg"
  },
  {
    id: 4,
    title: "Fitness Revolution Gym",
    category: ["GYM", "FITNESS"],
    rating: 4.8,
    reviews: 56,
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    location: "Old Denver, USA",
    isOpen: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    authorImage: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    id: 5,
    title: "Pretty Woman Smart Batra",
    category: ["BEAUTY", "SALON"],
    rating: 3.2,
    reviews: 12,
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    location: "California, USA",
    isOpen: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035",
    authorImage: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    id: 6,
    title: "The Sartaj Blue Night",
    category: ["HOTEL", "EVENT"],
    rating: 4.2,
    reviews: 21,
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    location: "San Francisco, USA",
    isOpen: false,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1575444758702-4a6b9222336e",
    authorImage: "https://randomuser.me/api/portraits/women/3.jpg"
  },
  {
    id: 7,
    title: "Pizza Delight Cafe",
    category: ["CAFE", "COFFEE"],
    rating: 2.3,
    reviews: 17,
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    location: "102 Safirio, Canada",
    isOpen: true,
    isFeatured: false,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    authorImage: "https://randomuser.me/api/portraits/men/4.jpg"
  },
  {
    id: 8,
    title: "The Decore Allante Shop",
    category: ["SHOPPING", "SERVICES"],
    rating: 4.6,
    reviews: 26,
    description: "At vero eos et accusamus et iusto odio dignissimos ducimus",
    location: "Old Denver, USA",
    isOpen: false,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    authorImage: "https://randomuser.me/api/portraits/women/4.jpg"
  }
];

export const RecentListings = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-gray-500">Recent Listings</span>
          <h2 className="text-3xl font-bold mt-2">
            Browse Recent <span className="text-primary">Listings</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RECENT_LISTINGS.map((listing) => (
            <Card key={listing.id} className="overflow-hidden group">
              <div className="relative">
                <img 
                  src={listing.image} 
                  alt={listing.title}
                  className="w-full h-48 object-cover"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <div className="absolute top-3 left-3 flex gap-2">
                  {listing.isOpen && (
                    <span className="px-2 py-1 text-xs bg-green-500 text-white rounded">OPEN</span>
                  )}
                  {listing.isFeatured && (
                    <span className="px-2 py-1 text-xs bg-red-500 text-white rounded">FEATURED</span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{listing.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <img 
                    src={listing.authorImage}
                    alt="Author"
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex gap-2">
                    {listing.category.map((cat, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2">{listing.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{listing.description}</p>

                <div className="flex gap-3 mb-4">
                  <Wifi className="w-4 h-4 text-gray-400" />
                  <Car className="w-4 h-4 text-gray-400" />
                  <Dog className="w-4 h-4 text-gray-400" />
                  <Fan className="w-4 h-4 text-gray-400" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{listing.location}</span>
                  </div>
                  <Mail className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};