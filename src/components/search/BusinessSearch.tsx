
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
import type { SearchFilters, BusinessSearchResult, MapMarker } from "@/types/search";

export const BusinessSearch = () => {
  const { city, state } = useLocation();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number[]>([0]);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("relevance");
  const [rating, setRating] = useState<number>(0);
  const [openNow, setOpenNow] = useState<boolean>(false);
  
  const filters: SearchFilters = {
    searchTerm,
    category,
    priceRange,
    city,
    state,
    rating,
    openNow,
    sortBy
  };
  
  const { data: businesses, isLoading } = useQuery<BusinessSearchResult[]>({
    queryKey: ['search-businesses', filters],
    queryFn: async () => {
      console.log('Fetching businesses with filters:', filters);
      
      let query = supabase
        .from('businesses')
        .select(`
          id,
          name,
          category,
          city,
          state,
          average_rating,
          latitude,
          longitude,
          business_photos!inner (photo_url),
          reviews!inner (rating),
          business_hours!inner (day_of_week, open_time, close_time)
        `)
        .order('name', { ascending: true })
        .limit(50);
  
      if (searchTerm) {
        query = query.textSearch('name_fts', searchTerm, {
          type: 'websearch',
          config: 'english'
        });
      }
  
      if (category && category !== 'all') {
        query = query.eq('category', category);
      }
  
      if (city) {
        query = query.eq('city', city).order('average_rating', { ascending: false });
      }
  
      if (state) {
        query = query.eq('state', state);
      }
  
      if (rating > 0) {
        query = query.gte('average_rating', rating);
      }
  
      if (openNow) {
        const now = new Date();
        const dayOfWeek = now.getDay();
        const currentTime = now.toLocaleTimeString('en-US', { hour12: false });
        
        query = query
          .eq('business_hours.day_of_week', dayOfWeek)
          .gte('business_hours.open_time', currentTime)
          .lte('business_hours.close_time', currentTime);
      }
  
      switch(sortBy) {
        case 'rating':
          query = query.order('average_rating', { ascending: false });
          break;
        case 'reviews':
          query = query.order('review_count', { ascending: false });
          break;
        case 'distance':
          if (latitude && longitude) {
            query = query.order('distance', { ascending: true });
          }
          break;
        default:
          // Default relevance sorting handled by FTS
          break;
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
        rating: business.average_rating,
        reviewCount: business.reviews?.length || 0,
        location: `${business.city}, ${business.state}`,
        latitude: business.latitude,
        longitude: business.longitude,
        isOpen: business.business_hours?.some(hours => 
          hours.day_of_week === new Date().getDay() &&
          hours.open_time <= new Date().toLocaleTimeString('en-US', { hour12: false }) &&
          hours.close_time >= new Date().toLocaleTimeString('en-US', { hour12: false })
        ) || false
      }));
    },
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    cacheTime: 1000 * 60 * 30, // Keep cache for 30 minutes
  });
  
  const handleMarkerClick = (businessId: string): void => {
    const element = document.getElementById(`business-${businessId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const mapMarkers: MapMarker[] = businesses?.map(b => ({
    id: b.id,
    latitude: b.latitude,
    longitude: b.longitude,
    title: b.name
  })) || [];
  
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
              <label className="text-sm font-medium">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
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
  
            <div className="space-y-2">
              <label className="text-sm font-medium">Minimum Rating</label>
              <Slider
                defaultValue={[0]}
                max={5}
                step={0.5}
                value={[rating]}
                onValueChange={(value) => setRating(value[0])}
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0</span>
                <span>5</span>
              </div>
            </div>
  
            <div className="flex items-center space-x-2">
              <Checkbox
                id="open-now"
                checked={openNow}
                onCheckedChange={(checked) => setOpenNow(checked as boolean)}
              />
              <label
                htmlFor="open-now"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Open Now
              </label>
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
                markers={mapMarkers}
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
