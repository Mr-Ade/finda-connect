import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { BusinessCard } from "@/components/BusinessCard";
import { Search, SlidersHorizontal, MapIcon, List } from "lucide-react";
import { useLocation } from "@/contexts/LocationContext";
import { MapView } from "@/components/map/MapView";

export const BusinessSearch = () => {
  const { city, state } = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState([0]);
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const { data: businesses, isLoading } = useQuery({
    queryKey: ['search-businesses', searchTerm, category, priceRange, city, state],
    queryFn: async () => {
      console.log('Fetching businesses with filters:', { searchTerm, category, priceRange, city, state });
      
      let query = supabase
        .from('businesses')
        .select(`
          *,
          business_photos (photo_url),
          reviews (rating)
        `);

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      if (category && category !== 'all') {
        query = query.eq('category', category);
      }

      if (city) {
        query = query.eq('city', city);
      }

      if (state) {
        query = query.eq('state', state);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching businesses:', error);
        throw error;
      }

      return data.map(business => ({
        id: business.id,
        name: business.name,
        image: business.business_photos?.[0]?.photo_url || "/placeholder.svg",
        category: business.category,
        rating: business.reviews?.reduce((acc: number, review: any) => acc + review.rating, 0) / (business.reviews?.length || 1) || 0,
        reviewCount: business.reviews?.length || 0,
        location: `${business.city}, ${business.state}`,
        latitude: business.latitude || 0,
        longitude: business.longitude || 0,
        isOpen: true,
      }));
    },
  });

  const handleMarkerClick = (businessId: string) => {
    // Implement smooth scroll to business card
    const element = document.getElementById(`business-${businessId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search businesses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowMap(!showMap)}
          >
            {showMap ? (
              <>
                <List className="w-4 h-4 mr-2" />
                Show List
              </>
            ) : (
              <>
                <MapIcon className="w-4 h-4 mr-2" />
                Show Map
              </>
            )}
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="restaurant">Restaurants</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="service">Services</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Price Range</label>
              <Slider
                defaultValue={[0]}
                max={4}
                step={1}
                value={priceRange}
                onValueChange={setPriceRange}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>$</span>
                <span>$$$$</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading businesses...</div>
      ) : businesses?.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No businesses found matching your criteria.</p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className={showMap ? "lg:w-1/2" : "w-full"}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {businesses?.map((business) => (
                <div key={business.id} id={`business-${business.id}`}>
                  <BusinessCard {...business} />
                </div>
              ))}
            </div>
          </div>
          
          {showMap && (
            <div className="lg:w-1/2 h-[calc(100vh-200px)] sticky top-20">
              <MapView
                markers={businesses?.map(b => ({
                  id: b.id,
                  latitude: b.latitude,
                  longitude: b.longitude,
                  title: b.name
                }))}
                onMarkerClick={handleMarkerClick}
                className="w-full h-full rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};