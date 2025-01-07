import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import { Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { AuthorCard } from "@/components/author/AuthorCard";
import { AuthorFilters } from "@/components/author/AuthorFilters";

const BrowseAuthors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [sortBy, setSortBy] = useState("name_asc");

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

      return data;
    }
  });

  const renderSkeletons = () => (
    Array(6).fill(0).map((_, i) => (
      <div key={i} className="space-y-4 p-4 border rounded-lg">
        <div className="flex items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
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

          <AuthorFilters 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedLocation={selectedLocation}
            onLocationChange={setSelectedLocation}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {isLoading ? renderSkeletons() : authors?.map((author) => (
              <AuthorCard key={author.id} author={author} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default BrowseAuthors;