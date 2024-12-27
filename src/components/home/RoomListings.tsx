import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Star, Wifi, Waves, Car, Dog, Fan, Wine } from "lucide-react";

const ROOMS = [
  {
    id: 1,
    title: "3112 Comfort Deluxe Space",
    price: 1800,
    rating: 4.2,
    reviews: 36,
    distance: "1.5 km to Town Center",
    image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
    isFeatured: true,
    discount: null
  },
  {
    id: 2,
    title: "4011 Comfortable Duplex",
    price: 1140,
    rating: 4.4,
    reviews: 12,
    distance: "1.5 km to Town Center",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
    isFeatured: false,
    discount: 20
  },
  {
    id: 3,
    title: "5021 Luxury Suite",
    price: 2200,
    rating: 4.8,
    reviews: 24,
    distance: "0.8 km to Town Center",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    isFeatured: true,
    discount: null
  },
  {
    id: 4,
    title: "2089 Cozy Studio",
    price: 950,
    rating: 4.3,
    reviews: 18,
    distance: "2.0 km to Town Center",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af",
    isFeatured: false,
    discount: 15
  },
  {
    id: 5,
    title: "6033 Executive Room",
    price: 1650,
    rating: 4.6,
    reviews: 42,
    distance: "1.2 km to Town Center",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
    isFeatured: true,
    discount: null
  },
  {
    id: 6,
    title: "3077 Family Suite",
    price: 1920,
    rating: 4.5,
    reviews: 29,
    distance: "1.7 km to Town Center",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843",
    isFeatured: false,
    discount: null
  },
  {
    id: 7,
    title: "4099 Ocean View Room",
    price: 2400,
    rating: 4.9,
    reviews: 56,
    distance: "0.5 km to Town Center",
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd",
    isFeatured: true,
    discount: null
  },
  {
    id: 8,
    title: "2045 Garden Suite",
    price: 1750,
    rating: 4.7,
    reviews: 33,
    distance: "1.3 km to Town Center",
    image: "https://images.unsplash.com/photo-1566195992011-5f6b21e539aa",
    isFeatured: false,
    discount: 10
  }
];

export const RoomListings = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h6 className="text-primary text-sm font-medium">Book Your Space</h6>
          <h2 className="text-3xl font-bold mt-2">Book Your Room in California</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROOMS.map((room) => (
            <Card key={room.id} className="overflow-hidden group">
              <div className="relative">
                <img 
                  src={room.image} 
                  alt={room.title}
                  className="w-full h-48 object-cover"
                />
                <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-lg">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <div className="absolute top-3 left-3 flex gap-2">
                  {room.isFeatured && (
                    <span className="px-2 py-1 text-xs bg-primary text-white rounded">Featured</span>
                  )}
                  {room.discount && (
                    <span className="px-2 py-1 text-xs bg-green-500 text-white rounded">-{room.discount}% Off</span>
                  )}
                </div>
                <div className="absolute bottom-3 right-3 bg-white rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">{room.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xl font-bold text-primary">${room.price}<span className="text-sm text-gray-500">/Night</span></span>
                </div>

                <h3 className="text-lg font-semibold mb-2">{room.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{room.distance}</p>

                <div className="flex gap-3 mb-4">
                  <Wifi className="w-4 h-4 text-gray-400" />
                  <Waves className="w-4 h-4 text-gray-400" />
                  <Car className="w-4 h-4 text-gray-400" />
                  <Dog className="w-4 h-4 text-gray-400" />
                  <Fan className="w-4 h-4 text-gray-400" />
                  <Wine className="w-4 h-4 text-gray-400" />
                </div>

                <Button className="w-full">Book Now</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};