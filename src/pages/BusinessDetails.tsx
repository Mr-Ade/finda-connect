import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/Navbar";
import { BusinessInfo } from "@/components/business/BusinessInfo";
import { ReviewSection } from "@/components/business/ReviewSection";
import { CheckInButton } from "@/components/business/CheckInButton";
import { BookmarkButton } from "@/components/business/BookmarkButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

// UUID validation regex
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default function BusinessDetails() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();

  const { data: business, isLoading } = useQuery({
    queryKey: ["business", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Business ID is required");
      }

      // Validate UUID format
      if (!UUID_REGEX.test(id)) {
        console.error("Invalid UUID format:", id);
        throw new Error("Invalid business ID format");
      }

      console.log("Fetching business with ID:", id);
      
      const { data, error } = await supabase
        .from("businesses")
        .select(`
          *,
          reviews (
            *,
            profiles (
              username,
              avatar_url
            )
          ),
          checkins:checkins(count),
          owner:profiles (
            username,
            avatar_url
          )
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) {
        console.error("Business fetch error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load business details",
        });
        throw error;
      }

      if (!data) {
        throw new Error("Business not found");
      }

      return {
        ...data,
        checkins_count: data.checkins?.[0]?.count || 0
      };
    },
    enabled: !!id,
  });

  if (isLoading) {
    return <BusinessDetailsSkeleton />;
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8 mt-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Business not found</h1>
            <p className="mt-2 text-gray-600">
              The business you're looking for doesn't exist or has been removed.
              This could be because the ID format is invalid or the business no longer exists.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <BusinessInfo business={business} />
            <ReviewSection businessId={business.id} reviews={business.reviews} />
          </div>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex gap-2 mb-4">
                <CheckInButton businessId={business.id} />
                <BookmarkButton businessId={business.id} />
              </div>
              <div className="text-sm text-gray-600">
                <p>{business.checkins_count} check-ins</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const BusinessDetailsSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    <Navbar />
    <main className="container mx-auto px-4 py-8 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-40 w-full mb-4" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div>
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    </main>
  </div>
);