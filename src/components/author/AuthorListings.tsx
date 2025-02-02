import { Link } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Star } from "lucide-react";

type BusinessPhoto = {
  id: string;
  photo_url: string;
};

type Business = Database["public"]["Tables"]["businesses"]["Row"] & {
  business_photos?: BusinessPhoto[];
};

interface AuthorListingsProps {
  data: Business[];
}

export const AuthorListings = ({ data }: AuthorListingsProps) => {
  if (!data?.length) return <div>No listings found</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((business) => (
        <Card key={business.id} className="overflow-hidden hover:shadow-lg transition">
          <Link to={`/business/${business.id}`}>
            <div className="relative">
              <img 
                src={business.business_photos?.[0]?.photo_url || "/placeholder.svg"}
                alt={business.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge variant="secondary">Open</Badge>
                <Badge variant="secondary" className="bg-primary text-white">Featured</Badge>
              </div>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline">{business.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">4.5</span>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-2">{business.name}</h3>
              
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{business.city}, {business.state}</span>
                </div>
                {business.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span className="text-sm">{business.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  );
};