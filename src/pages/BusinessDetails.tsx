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

export default function BusinessDetails() {
  const { id } = useParams();
  const { toast } = useToast();

  const { data: business, isLoading } = useQuery({
    queryKey: ["business", id],
    queryFn: async () => {
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
        .eq("id", id)
        .single();

      if (error) {
        console.error("Business fetch error:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load business details",
        });
        throw error;
      }

      return {
        ...data,
        checkins_count: data.checkins?.[0]?.count || 0
      };
    },
  });

  if (isLoading) {
    return <BusinessDetailsSkeleton />;
  }

  if (!business) {
    return <div>Business not found</div>;
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