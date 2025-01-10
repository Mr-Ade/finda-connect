import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const BrowseAuthors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Browse Authors", href: "#", active: true },
  ];

  const { data: authors, isLoading } = useQuery({
    queryKey: ['authors'],
    queryFn: async () => {
      console.log('Fetching authors...');
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          *,
          businesses:businesses(count),
          followers:follows(count)
        `)
        .eq('business_owner', true);

      if (error) {
        console.error('Error fetching authors:', error);
        throw error;
      }

      console.log('Authors fetched:', data);
      return data;
    },
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  const filteredAuthors = authors?.filter(author =>
    author.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    author.username?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-900 py-3">
        <div className="container mx-auto px-4">
          <Breadcrumb items={breadcrumbItems} className="text-white" />
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Browse Authors</h1>
          <p className="text-gray-600 text-center mb-8">
            Connect with our community of business owners and contributors
          </p>

          <div className="max-w-xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search authors..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredAuthors.map((author) => (
                <Link
                  key={author.id}
                  to={`/author/${author.username}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={author.avatar_url || "/placeholder.svg"}
                      alt={author.full_name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{author.full_name}</h3>
                      <p className="text-gray-600">@{author.username}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold">{author.businesses?.[0]?.count || 0}</div>
                      <div className="text-sm text-gray-600">Listings</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="font-semibold">{author.followers?.[0]?.count || 0}</div>
                      <div className="text-sm text-gray-600">Followers</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default BrowseAuthors;