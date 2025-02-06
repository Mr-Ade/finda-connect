import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BusinessCard } from "@/components/BusinessCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { useState } from "react";
import type { Business } from "@/types/business";

export const BusinessSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const { data: businesses, isLoading } = useQuery({
    queryKey: ['businesses', searchTerm, location],
    queryFn: async () => {
      let query = supabase
        .from('businesses')
        .select(`
          *,
          business_photos (
            id,
            photo_url,
            caption,
            order_index
          ),
          business_hours (
            id,
            day_of_week,
            open_time,
            close_time,
            is_closed
          )
        `);

      if (searchTerm) {
        query = query.ilike('name', `%${searchTerm}%`);
      }

      if (location) {
        query = query.or(`city.ilike.%${location}%,state.ilike.%${location}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as Business[];
    }
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search will be triggered automatically by the query
  };

  const renderBusinessResults = (businesses: Business[]) => {
    if (!businesses.length) {
      return (
        <div className="text-center py-8">
          <p className="text-gray-500">No businesses found matching your search criteria</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search businesses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit">Search</Button>
        </div>
      </form>

      {isLoading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : (
        businesses && renderBusinessResults(businesses)
      )}
    </div>
  );
};