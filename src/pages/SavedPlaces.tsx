import { useState } from "react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Newsletter } from "@/components/home/Newsletter";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bookmark, MapPin, Phone, Globe, Search, Trash2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const SavedPlaces = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Saved Places", href: "#", active: true },
  ];

  const { data: savedPlaces, isLoading, error } = useQuery({
    queryKey: ['saved-places'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('bookmarks')
        .select(`
          id,
          businesses (
            id,
            name,
            category,
            description,
            address,
            city,
            state,
            phone,
            website
          )
        `)
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const handleRemoveBookmark = async (bookmarkId: string) => {
    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', bookmarkId);

      if (error) throw error;

      toast({
        title: "Place removed",
        description: "The place has been removed from your saved places.",
      });
    } catch (error) {
      console.error('Error removing bookmark:', error);
      toast({
        title: "Error",
        description: "Failed to remove the place. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredPlaces = savedPlaces?.filter(bookmark => 
    bookmark.businesses?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bookmark.businesses?.category.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold mb-2">Saved Places</h1>
                <p className="text-gray-600">
                  Your collection of favorite businesses and places
                </p>
              </div>
              <Bookmark className="w-8 h-8 text-primary" />
            </div>

            <div className="relative mb-8">
              <Input
                type="text"
                placeholder="Search saved places..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12"
              />
              <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading your saved places...</p>
              </div>
            ) : error ? (
              <Card className="bg-red-50 border-red-100">
                <CardContent className="pt-6">
                  <p className="text-red-600">Error loading saved places. Please try again later.</p>
                </CardContent>
              </Card>
            ) : filteredPlaces?.length === 0 ? (
              <Card className="bg-gray-50 border-gray-100">
                <CardContent className="pt-6 text-center">
                  <p className="text-gray-600">No saved places found.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {filteredPlaces?.map((bookmark) => (
                  <Card key={bookmark.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center justify-between">
                        <a 
                          href={`/business/${bookmark.businesses?.id}`}
                          className="text-xl font-semibold hover:text-primary transition-colors"
                        >
                          {bookmark.businesses?.name}
                        </a>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveBookmark(bookmark.id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <p className="text-gray-600">{bookmark.businesses?.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>
                              {bookmark.businesses?.address}, {bookmark.businesses?.city}, {bookmark.businesses?.state}
                            </span>
                          </div>
                          {bookmark.businesses?.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              <span>{bookmark.businesses?.phone}</span>
                            </div>
                          )}
                          {bookmark.businesses?.website && (
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4" />
                              <a 
                                href={bookmark.businesses.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline"
                              >
                                Visit Website
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default SavedPlaces;