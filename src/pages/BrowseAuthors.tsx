import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, MapPin, ListFilter, Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

type Author = {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  city: string;
  state: string;
  businesses: { count: number }[];
  created_at: string;
};

type SortOption = "name_asc" | "name_desc" | "listings_desc" | "listings_asc" | "date_desc" | "date_asc";

const BrowseAuthors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("name_asc");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Browse Authors", href: "#", active: true },
  ];

  const { data: authors, isLoading } = useQuery({
    queryKey: ['authors', searchTerm, selectedCategory, selectedLocation, sortBy],
    queryFn: async () => {
      console.log("Fetching authors with filters:", { searchTerm, selectedCategory, selectedLocation, sortBy });
      
      let query = supabase
        .from('profiles')
        .select(`
          *,
          businesses:businesses(count)
        `)
        .eq('business_owner', true);

      if (searchTerm) {
        query = query.or(`full_name.ilike.%${searchTerm}%,username.ilike.%${searchTerm}%`);
      }

      if (selectedLocation) {
        query = query.eq('state', selectedLocation);
      }

      // Add sorting
      switch (sortBy) {
        case 'name_asc':
          query = query.order('full_name', { ascending: true });
          break;
        case 'name_desc':
          query = query.order('full_name', { ascending: false });
          break;
        case 'date_desc':
          query = query.order('created_at', { ascending: false });
          break;
        case 'date_asc':
          query = query.order('created_at', { ascending: true });
          break;
      }

      const { data, error } = await query;
      
      if (error) {
        console.error("Error fetching authors:", error);
        throw error;
      }

      return data as Author[];
    }
  });

  const renderAuthorCard = (author: Author) => (
    <Card key={author.id} className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <img 
          src={author.avatar_url || "/placeholder.svg"}
          alt={author.full_name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <Link 
            to={`/author/${author.username}`}
            className="text-lg font-semibold hover:text-primary"
          >
            {author.full_name}
          </Link>
          <div className="flex items-center gap-1 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{author.city}, {author.state}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>{author.businesses?.[0]?.count || 0} Listings</span>
          <span>Joined {new Date(author.created_at).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
  );

  const renderSkeletons = () => (
    Array(6).fill(0).map((_, i) => (
      <Card key={i}>
        <CardHeader className="flex flex-row items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </CardContent>
      </Card>
    ))
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 py-3">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="text-white" />
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 mb-8">
            <Users className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold">Browse Authors</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="restaurants">Restaurants & Food</SelectItem>
                <SelectItem value="shopping">Shopping & Retail</SelectItem>
                <SelectItem value="services">Services</SelectItem>
                {/* Add more categories as needed */}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                <SelectItem value="lagos">Lagos</SelectItem>
                <SelectItem value="abuja">Abuja</SelectItem>
                <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                {/* Add more locations as needed */}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name_asc">Name (A-Z)</SelectItem>
                <SelectItem value="name_desc">Name (Z-A)</SelectItem>
                <SelectItem value="listings_desc">Most Listings</SelectItem>
                <SelectItem value="listings_asc">Least Listings</SelectItem>
                <SelectItem value="date_desc">Newest First</SelectItem>
                <SelectItem value="date_asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? renderSkeletons() : authors?.map(renderAuthorCard)}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default BrowseAuthors;